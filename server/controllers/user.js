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
};

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
  const user_id = req.params.user_id;
  try {
    const selected_foods = await pool.query(
      "SELECT food_name FROM selected_foods AS sf LEFT JOIN foods AS f ON f.id = sf.food_id WHERE user_id = $1",
      [user_id]
    );
    const arrayOfValuesfood = selected_foods.rows.map((obj) => obj.food_name);

    // console.log(typeof selected_foods.rows.food_name,"<-type ",selected_foods.rows.food_name);
    await pool.query(
      `UPDATE user_question
    SET question_value = $1
    WHERE user_id = $2 AND question_number = 7
    `,
      [arrayOfValuesfood, user_id]
    );

    const selected_drinks = await pool.query(
      "SELECT drink_name FROM selected_drinks AS sd LEFT JOIN drinks AS d ON d.id = sd.drink_id WHERE user_id = $1",
      [user_id]
    );
    const arrayOfValuesdrinks = selected_drinks.rows.map(
      (obj) => obj.drink_name
    );

    await pool.query(
      `UPDATE user_question
    SET question_value = $1
    WHERE user_id = $2 AND question_number = 10
    `,
      [arrayOfValuesdrinks, user_id]
    );
    await pool.query(
      `UPDATE user_question
    SET question_value = $1
    WHERE user_id = $2 AND question_number = 11
    `,
      [arrayOfValuesdrinks, user_id]
    );

    const selected_ceremony = await pool.query(
      `SELECT c.ceremony_name
    FROM ceremony as c LEFT JOIN ceremony_icons as ci ON ci.id=c.icon WHERE  user_id= $1`,
      [user_id]
    );
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

    const user_questions = await pool.query(
      "SELECT id,questions, selected ,question_type,question_value FROM user_question WHERE user_id = $1 AND selected=true ORDER BY  (question_id) asc ",
      [user_id]
    );
    return res.status(200).json({
      message: "User questions retrieved successfully",
      user_questions: user_questions.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
