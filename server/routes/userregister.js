const express = require("express");
const router = express.Router();
const pool = require("../database/connection.js").pool;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const isValidDate = require("../controllers/utils.js");
const {
  forgotPassword,
  resetPassword,
} = require("../controllers/passwordreset.js");

const validator = require("validator");
const { signwithOTP } = require("../controllers/usercontroller.js");
const {
  InsertUserQuestions,
  updateAndGetUserQuestions,
  getUserQuestions,
} = require("../controllers/user.js");

router.post("/signup", async (req, res) => {
  const { name, password, email, number, dob, gender } = req.body;
  // console.log(name, password, email, number, dob,gender);
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }
  if (!isValidDate(dob)) {
    return res.status(400).json({
      Error: "Invalid Date format",
      Hint: "YYYY-MM-DD or out of bound value",
    });
  }

  const valid_email = await pool.query(
    "SELECT email FROM users WHERE email = $1",
    [email]
  );
  //   console.log(valid_email.rows[0]);
  if (valid_email.rows[0]) {
    return res.status(400).end("Email already exists.");
  }

  // const valid_username = await pool.query(
  //   "SELECT username FROM users WHERE username = $1",
  //   [name]
  // );

  // if (valid_username.rows[0]) {
  //   return res.status(400).end("Username already exists.");
  // }
  const valid_number = await pool.query(
    "SELECT number FROM users WHERE number = $1",
    [number]
  );


  try {
    const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: 60,
    });
    const refreshToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: 60 * 60,
    });
    const hashedPassword = await bcrypt.hash(password, 10);

    pool.query(
      "INSERT INTO users (username,password, email, number, date_of_birth, gender) VALUES ($1, $2,$3,$4,$5, $6) RETURNING *",
      [name, hashedPassword, email, number, dob, gender],
      async (error, results) => {
        if (error) {
          res.status(401).json({ error: error });
          throw error;
        }

        const allEvents = [
          "We're Engaged",
          "Save The Date",
          "Wedding",
          "Thank You",
        ];

        const ceremonies = [
          "Pre Wedding Ceremony 1",
          "Pre Wedding Ceremony 2",
          "Pre Wedding Ceremony 3",
          "Pre Wedding Ceremony 4",
          "Civil Ceremony",
          "Wedding Ceremony",
          "Reception",
        ];
        for (let index = 0; index < allEvents.length; index++) {
          const element = allEvents[index];
          const eventQuery =
            "INSERT INTO events (event_name,  user_id, event_icon ) VALUES ($1, $2, $3) RETURNING *";
          const values = [
            element,
            results.rows[0].id,
            // events.rows[1].id,
            index + 1,
          ];
          const result = await pool.query(eventQuery, values);
        }

        console.log(results.rows[0].id);
        const events = await pool.query(
          "SELECT id FROM events WHERE user_id =$1",
          [results.rows[0].id]
        );
        console.log(events.rows);

        await pool.query(
          `
  INSERT INTO rsvp_attendance (total_invitation_sent, total_response_received, user_id, event_id)
  SELECT $1, $2, u.id, e.id
  FROM users u, events e
  WHERE u.id = $3 AND e.id IN ($4, $5,$6,$7);
`,
          [
            0,
            0,
            results.rows[0].id,
            events.rows[0].id,
            events.rows[1].id,
            events.rows[2].id,
            events.rows[3].id,
          ]
        );

        for (let index = 0; index < ceremonies.length; index++) {
          const element = ceremonies[index];

          const query =
            "INSERT INTO ceremony (ceremony_name,  user_id, event_id, icon ) VALUES ($1, $2, $3, $4) RETURNING *";
          const values = [
            element,
            results.rows[0].id,
            events.rows[1].id,
            index + 1,
          ];
          //  console.log("line 101",values);
          const result = await pool.query(query, values);
        }

        await pool.query(
          "INSERT INTO groups (user_id, groupname) VALUES ($1, $2)",
          [results.rows[0].id, "Unassigned"]
        );
        res.status(201).json({
          success: true,
          userId: `${results.rows[0].id}`,
          userName: results.rows[0].username,
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
        // if new user is created successfully then create two default events on behalf of user one is "We're Engaged" another is "Wedding"
      }
    );
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.post("/signin", async (req, res) => {
  //-----------with jwt--------
  try {
    const { email, password } = req.body;
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (users.rows.length === 0)
      return res.status(401).json({ error: "invalid credential" });
    //     //PASSWORD CHECK
    const passwordMatch = await bcrypt.compare(
      password,
      users.rows[0].password
    );

    if (!passwordMatch) {
      // Incorrect password
      return res.status(401).json({ error: "Invalid credentials" });
    } else {
      const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 60,
      });
      const refreshToken = jwt.sign(
        { email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10h" }
      );
      res.status(200).json({
        success: true,
        userId: `${users.rows[0].id}`,
        userName: users.rows[0].username,
        isAdmin: users.rows[0].isAdmin,
        profilePhoto: users.rows[0].profile_photo,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.post("/dynamic-social-login",async (req,res)=>{
  const data= req.body;
  console.log(req.body);
  console.log("line 207",data);
  const  email  = data.email;
  try {
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (users.rowCount >0) {
      //signin
      const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 60,
      });
      const refreshToken = jwt.sign(
        { email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10h" }
      );
    console.log(users.rows[0]);
      res.status(200).json({
        success: true,
        userId: `${users.rows[0].id}`,
        profilePhoto: data.photo,
        isAdmin: users.rows[0].isAdmin,
        userName: users.rows[0].username,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    }
    else{
      //signup
       try {
         const accessToken = jwt.sign(
           { email },
           process.env.ACCESS_TOKEN_SECRET,
           {
             expiresIn: 60,
           }
         );
         const refreshToken = jwt.sign(
           { email },
           process.env.ACCESS_TOKEN_SECRET,
           {
             expiresIn: 60 * 60,
           }
         );
         

         pool.query(
           "INSERT INTO users (username, email,  profile_photo) VALUES ($1,$2,$3) RETURNING *",
           [data.name, data.email,  data.photo],
           async (error, results) => {
             if (error) {
               res.status(401).json({ error: error });
               throw error;
             }

             const allEvents = [
               "We're Engaged",
               "Save The Date",
               "Wedding",
               "Thank You",
             ];

             const ceremonies = [
               "Pre Wedding Ceremony 1",
               "Pre Wedding Ceremony 2",
               "Pre Wedding Ceremony 3",
               "Pre Wedding Ceremony 4",
               "Civil Ceremony",
               "Wedding Ceremony",
               "Reception",
             ];
             for (let index = 0; index < allEvents.length; index++) {
               const element = allEvents[index];
               const eventQuery =
                 "INSERT INTO events (event_name,  user_id, event_icon ) VALUES ($1, $2, $3) RETURNING *";
               const values = [
                 element,
                 results.rows[0].id,
                 // events.rows[1].id,
                 index + 1,
               ];
               const result = await pool.query(eventQuery, values);
             }

             console.log(results.rows[0].id);
             const events = await pool.query(
               "SELECT id FROM events WHERE user_id =$1",
               [results.rows[0].id]
             );
             console.log(events.rows);

             await pool.query(
               `
  INSERT INTO rsvp_attendance (total_invitation_sent, total_response_received, user_id, event_id)
  SELECT $1, $2, u.id, e.id
  FROM users u, events e
  WHERE u.id = $3 AND e.id IN ($4, $5,$6,$7);
`,
               [
                 0,
                 0,
                 results.rows[0].id,
                 events.rows[0].id,
                 events.rows[1].id,
                 events.rows[2].id,
                 events.rows[3].id,
               ]
             );

             for (let index = 0; index < ceremonies.length; index++) {
               const element = ceremonies[index];

               const query =
                 "INSERT INTO ceremony (ceremony_name,  user_id, event_id, icon ) VALUES ($1, $2, $3, $4) RETURNING *";
               const values = [
                 element,
                 results.rows[0].id,
                 events.rows[1].id,
                 index + 1,
               ];
               //  console.log("line 101",values);
               const result = await pool.query(query, values);
             }

             await pool.query(
               "INSERT INTO groups (user_id, groupname) VALUES ($1, $2)",
               [results.rows[0].id, "Unassigned"]
             );
             res.status(201).json({
               success: true,
               userId: `${results.rows[0].id}`,
               profilePhoto: data.photo,
               userName: results.rows[0].username,
               accessToken: accessToken,
               refreshToken: refreshToken,
             });
             // if new user is created successfully then create two default events on behalf of user one is "We're Engaged" another is "Wedding"
           }
         );
       } catch (error) {
         res.status(400).json({ error: error.message });
       }
    }
    
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
})

// console.log(forgotPassword);
router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword/:token", resetPassword);
router.post("/otpsignin", signwithOTP);

router.post("/post_user_questions/:user_id", InsertUserQuestions);
router.put("/updateAndGetUserQuestions/:user_id", updateAndGetUserQuestions);
router.get("/getUserQuestions/:user_id", getUserQuestions);

module.exports = router;
