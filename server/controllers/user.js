const { lineGap } = require("pdfkit");

const pool = require("../database/connection.js").pool;

module.exports.find = async (email) => {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return res.rows[0];
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
};

module.exports.updateResetPasswordToken = async (email, hash, expires) => {
  const client = await pool.connect();
  try {
    await client.query(
      "UPDATE users SET resetPasswordToken = $1, resetPasswordExpires = $2 WHERE email = $3",
      [hash, expires, email]
    );
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
};

module.exports.findUserByResetPasswordToken = async (token) => {
  const client = await pool.connect();
  try {
    const res = await client.query(
      "SELECT * FROM users WHERE resetPasswordToken = $1",
      [token]
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
};

module.exports.updatePassword = async (email, password) => {
  const client = await pool.connect();
  try {
    await client.query(
      "UPDATE users SET password = $1, resetPasswordToken = NULL, resetPasswordExpires = NULL WHERE email = $2",
      [password, email]
    );
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
};

module.exports.updateUser = async (req,res) => {
 const user_id= req.params.user_id;
 const {username,email,number}= req.body;
  try {
    const isuserexist= await pool.query(`select username from users where id= $1`,[user_id]);
    if (isuserexist.rowCount<1) {
      return res.status(404).json({Error: `user with userId ${user_id} doesn't exists.`});
    }
    await pool.query(
      "UPDATE users SET username = $1, email = $2, number = $3 WHERE id = $4",
      [username, email,number,user_id]
    );
    res.status(201).json({"Msg": "profile updated successfully"})
  } catch (err) {
    res.status(500).json({"Msg": "Error while updating profile data"})
    console.error(err);
  } 
};

module.exports.findUserByNumber = async (number) => {
  const client = await pool.connect();
  try {
    const users = await client.query("SELECT * FROM users WHERE number = $1", [
      number,
    ]);
    if (users.rows.length === 0) return false;
    return users;
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
};

module.exports.otpSignin = async (otp) => {
  const client = await pool.connect();
  try {
    //otp logic of twilio

    return otp;
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
};

module.exports.InsertUserQuestions = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    console.log(user_id);
    const user_validation = await pool.query(
      "SELECT package FROM user_payment WHERE user_id=$1",
      [parseInt(user_id)]
    );

    if (user_validation.rowCount < 1) {
      return res.status(400).json({ message: "User payment not found" });
    }
    const pkg = user_validation.rows[0].package;
    const user_questions = await pool.query(
      "SELECT * FROM package_questions where package_name = $1",
      [pkg]
    );

    for (let i = 0; i < user_questions.rows.length; i++) {
      console.log(
        " user_questions.rows[i].question_number",
        user_questions.rows[i].question_number
      );
      await pool.query(
        "INSERT INTO user_question (user_id, package, questions, question_id, question_type, question_number) VALUES ($1, $2, $3, $4, $5, $6)",
        [
          user_id,
          pkg,
          user_questions.rows[i].questions,
          user_questions.rows[i].question_id,
          user_questions.rows[i].question_type,
          user_questions.rows[i].question_number,
        ]
      );
    }
    res.status(200).json({ message: "User questions added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }

}

  module.exports.updateAndGetUserQuestions = async (req,res)=>{
    const user_id=req.params.user_id;
    const {questions_data}= req.body;
    try {
      
      for (let index = 0; index < questions_data.length; index++) {
        const element = questions_data[index];
        await pool.query("UPDATE user_question SET selected = $1 WHERE user_id = $2 AND question_id = $3", [element.selected, user_id, element.question_id]);
      }
      return res.status(200).json({ message: "User questions updated successfully" });
    }   catch (error) {
      console.log(error);
      res.status(500).json({ message: error});

    }

  }



module.exports.updateAndGetUserQuestions = async (req, res) => {
  const user_id = req.params.user_id;
  const { questions_data } = req.body;
  try {
    for (let index = 0; index < questions_data.length; index++) {
      const element = questions_data[index];
      await pool.query(
        "UPDATE user_question SET selected = $1 WHERE user_id = $2 AND id = $3",
        [element.selected, user_id, element.question_id]
      );
    }
    return res
      .status(200)
      .json({ message: "User questions updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });

  }
};

module.exports.getUserQuestions = async (req, res) => {
  // console.log(Date.now());
  const user_id = req.params.user_id;
  try {
    const selected_foods = await pool.query(
      "SELECT food_name FROM selected_foods AS sf LEFT JOIN foods AS f ON f.id = sf.food_id WHERE user_id = $1",
      [user_id]
    );
    // console.log(Date.now());
    const arrayOfValuesfood = selected_foods.rows.map((obj) => obj.food_name);
    // console.log(Date.now());
    // console.log(typeof selected_foods.rows.food_name,"<-type ",selected_foods.rows.food_name);
    await pool.query(
      `UPDATE user_question
    SET question_value = $1
    WHERE user_id = $2 AND question_number = 7
    `,
      [arrayOfValuesfood, user_id]
    );
    // console.log(Date.now());

    const selected_drinks = await pool.query(
      "SELECT drink_name FROM selected_drinks AS sd LEFT JOIN drinks AS d ON d.id = sd.drink_id WHERE user_id = $1",
      [user_id]
    );
    // console.log(Date.now());
    const arrayOfValuesdrinks = selected_drinks.rows.map(
      (obj) => obj.drink_name
    );
    // console.log(Date.now());
    await pool.query(
      `UPDATE user_question
    SET question_value = $1
    WHERE user_id = $2 AND question_number = 10
    `,
      [arrayOfValuesdrinks, user_id]
    );
    // console.log(Date.now());
    await pool.query(
      `UPDATE user_question
    SET question_value = $1
    WHERE user_id = $2 AND question_number = 11
    `,
      [arrayOfValuesdrinks, user_id]
    );
    // console.log(Date.now());
    const selected_ceremony = await pool.query(
      `SELECT c.ceremony_name
    FROM ceremony as c LEFT JOIN ceremony_icons as ci ON ci.id=c.icon WHERE  user_id= $1 AND c.selected=true;`,
      [user_id]
    );
    // console.log(Date.now());
    const arrayOfValuesSC = selected_ceremony.rows.map(
      (obj) => obj.ceremony_name
    );
    await pool.query(
      `UPDATE user_question
    SET question_value = $1
    WHERE user_id = $2 AND question_number = 6
    `,
      [arrayOfValuesSC, user_id]
    );
    // console.log(Date.now());
    const user_questions = await pool.query(
      "SELECT id,questions, selected ,question_type,question_value,question_number FROM user_question WHERE user_id = $1 AND selected=true ORDER BY  (question_id) asc ",
      [user_id]
    );
    // console.log(Date.now());
    return res.status(200).json({
      message: "User questions retrieved successfully",
      user_questions: user_questions.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

module.exports.getGuestCeremony =async (req,res) =>{
  const guest_id =req.params.guest_id;
  if(!guest_id) return res.status(400).json({"Msg":"guest_id not provided"});
  const ceremonyData= await pool.query(`select c.ceremony_name from guests as gst
  left join ceremony_groups as cgu on cgu.group_id=gst.group_id
  left join ceremony as c on c.id=cgu.ceremony_id
  where gst.id=$1`,[guest_id]);
  res.json({"data":ceremonyData.rows});
}

