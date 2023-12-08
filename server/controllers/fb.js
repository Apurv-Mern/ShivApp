passport.use(new FacebookStrategy({
    clientID: process.env.FB_ID, 
    clientSecret: process.env.FB_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name'] 
},
async function(accessToken, refreshToken, profile, done) {
    console.log("fb", profile._json);

    const { last_name, first_name, email } = profile._json;
    const name =first_name+" "+last_name;
    
    try {
        const user = await pool.query(
            "SELECT id,username,number,date_of_birth FROM users WHERE email = $1",
            [email]
        );

        if (user.rows[0]) {
            const jwtaccessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 });
            const jwtrefreshToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60 });
            
            const userInfo = {
                success: true,
                userId: `${user.rows[0].id}`,
                accessToken: jwtaccessToken,
                refreshToken: jwtrefreshToken,
            };

            done(null, userInfo);
        }
        else {
            const newUser = await pool.query(
                "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *",
                [name, email],
            );

            const jwtaccessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 });
            const jwtrefreshToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60 });

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
}));

module.exports = {
    authenticate: passport.authenticate('facebook', { scope : ['email'] }),
    authenticateCallback: (req, res, next) => {
        passport.authenticate('facebook', (error, user) => {
            if (error) return res.status(401).json({ error: error.message });
            if (!user) return res.status(401).json({ error: 'Authentication failed' });
            
            res.status(201).json(user);
        })(req, res, next);
    },
};
/*
 const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const pool = require('../database/connection').pool;
const jwt = require("jsonwebtoken");
passport.use(new FacebookStrategy({
    clientID: 637874308059622, //process.env.FB_ID, 
    clientSecret: '7b1402fce14da1eb22c72eee2e5fe4bd',//process.env.FB_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name'] 
  },
  async function(accessToken, refreshToken, profile, done) {

    console.log("fb", profile._json);

    const { last_name, first_name, email  } = profile._json;
    const name =first_name+" "+last_name;
    const user = await pool.query(
      "SELECT id,username,number,date_of_birth FROM users WHERE email = $1",
      [email]
  );

    const jwtaccessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 60,
    });
    const jwtrefreshToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 60 * 60,
    });

  if (user.rows[0]) {
  
      return  res.status(201).json({
        success: true,
        userId: `${user.rows[0].id}`,
        accessToken: jwtaccessToken,
        refreshToken: jwtrefreshToken,
    });
  }
  else{
    try {
    
      pool.query(
          "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *",
          [name,  email],
          (error, results) => {
              if (error) {
                  res.status(401).json({ error: error });
                  throw error;
              }
  
              res.status(201).json({
                  success: true,
                  userId: `${results.rows[0].id}`,
                  accessToken: accessToken,
                  refreshToken: refreshToken,
              });
          }
      );
  } catch (error) {
      res.status(401).json({ error: error.message });
  }
  }

    // This is where you would typically find or create a user in your database
    // Here, profile object will contain the user details
    // accessToken and refreshToken are related to the user's session
    // ...
    done(null, profile);
  }
));

module.exports = {
  authenticate: passport.authenticate('facebook', { scope : ['email'] }),
  authenticateCallback: passport.authenticate('facebook', { 
    successRedirect: 'https://shivappdev.24livehost.com/shiv_app/dashboard', 
    failureRedirect: '/login' 
  }),
};

 */