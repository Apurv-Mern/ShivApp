const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const pool = require("../database/connection").pool;
const jwt = require("jsonwebtoken");
passport.use(
  new FacebookStrategy(
    {
      clientID: 637874308059622, //process.env.FB_ID, ,
      clientSecret: "7b1402fce14da1eb22c72eee2e5fe4bd", //process.env.FB_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "emails", "name"],
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log("fb", profile._json);

      const { last_name, first_name, email } = profile._json;
      const name = first_name + " " + last_name;

      try {
        const user = await pool.query(
          "SELECT id,username,number,date_of_birth FROM users WHERE email = $1",
          [email]
        );

        if (user.rows[0]) {
          const jwtaccessToken = jwt.sign(
            { email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: 60 }
          );
          const jwtrefreshToken = jwt.sign(
            { email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: 60 * 60 }
          );

          const userInfo = {
            success: true,
            userId: `${user.rows[0].id}`,
            accessToken: jwtaccessToken,
            refreshToken: jwtrefreshToken,
          };

          done(null, userInfo);
        } else {
          const newUser = await pool.query(
            "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *",
            [name, email]
          );

          const jwtaccessToken = jwt.sign(
            { email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: 60 }
          );
          const jwtrefreshToken = jwt.sign(
            { email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: 60 * 60 }
          );

          const userInfo = {
            success: true,
            userId: `${newUser.rows[0].id}`,
            accessToken: jwtaccessToken,
            refreshToken: jwtrefreshToken,
          };

          done(null, userInfo);
        }
      } catch (error) {
        done(error, false);
      }
    }
  )
);

module.exports = {
  authenticate: passport.authenticate("facebook", { scope: ["email"] }),
  //   authenticateCallback: (req, res, next) => {
  //       passport.authenticate('facebook',(error, user) => {

  //           if (error) return res.status(401).json({ error: error.message });
  //           if (!user) return res.status(401).json({ error: 'Authentication failed' });
  //           res.redirect('https://shivappdev.24livehost.com/dashboard');
  //           res.status(201).json(user);
  //       })(req, res, next);
  //   },
  // };
  authenticateCallback: (req, res, next) => {
    passport.authenticate("facebook", (error, user) => {
      if (error) {
        res.redirect("/login?error=" + encodeURIComponent(error.message));
      } else if (!user) {
        res.redirect(
          "/login?error=" + encodeURIComponent("Authentication failed")
        );
      } else {
        res.redirect("https://shivappdev.24livehost.com/dashboard");
      }
    })(req, res, next);
  },
};
