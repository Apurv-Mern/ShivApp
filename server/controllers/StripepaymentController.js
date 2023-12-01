// This is your test secret API key.
//const stripe = require('stripe')(process.env.STRIPE_SECRECT_KEY);
const stripe = require("stripe")(
  "sk_test_51NfOR1FkQqbaeuTEFKNYaRF6cwKwsuf3HNUD0Y979JIZEVCuqbfJZeSUvHZDpeLRUw01tnRqrV5oMe8RMpBOdDIf005Xhdlxpq"
);

const pool = require("../database/connection").pool;

const serverUrl = "https://shivappdev.24livehost.com:3004";
const fEurl = "https://shivappdev.24livehost.com";
const localUrl = "https://localhost:3004";

const getAllPaymentHistory = async (req, res) => {
  try {
    const paymentHistory = await pool.query("SELECT * FROM user_payment;");
    if (paymentHistory.rows[0] === 0) {
      res.end("No Payment History Available");
    }
    res.status(200).json(paymentHistory.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const creatPaymentIntent = async (req, res) => {
  try {
    const product = await stripe.products.retrieve("prod_ORqBl7i4vJcnXV");
    ////console.log(product);
    const price = await stripe.prices.retrieve(
      "price_1NewVUSDhOAMhgwYRRg7133x"
    );
    //console.log(price);

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd", // Currency of your product
      description: "Payment for Product", // Description of the payment
      payment_method_types: ["card"], // Payment method types
      setup_future_usage: "off_session", // For one-time payments
      // Pass the price ID in line_items
      line_items: [
        {
          price: "price_1NewVUSDhOAMhgwYRRg7133x",
          quantity: 1,
        },
      ],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
    //console.log(paymentIntent.client_secret);
  } catch (err) {
    //console.log(err);
  }
};

const createPaymentLink = async (req, res) => {
  const { user_id, id, event } = req.params;
  //console.log(event);
  const eve = event.replace(/\s/g, "");
  const pkg = parseInt(id);
  //const pkg =req.params.id;
  let priceId = "";
  let packg = "";
  let pname = "";
  let default_guest = 0;
  switch (pkg) {
    case 1:
      priceId = "price_1O7FT5FkQqbaeuTEqg1ic2Gg";
      packg = "pkg1";
      pname = "Bronze Package";
      default_guest = 100;
      //console.log("pkg1");
      break;
    case 2:
      priceId = "price_1O7FUDFkQqbaeuTEyqylDWM6";
      packg = "pkg2";
      pname = "Sliver Package";
      default_guest = 150;
      //console.log("pkg2");
      break;
    case 3:
      priceId = "price_1O7FVYFkQqbaeuTEutgGUkdN";
      packg = "pkg3";
      pname = "Gold Package";
      default_guest = 200;
      //console.log("pkg3");
      break;
    case 4:
      priceId = "price_1O7FODFkQqbaeuTEf2MpmRjW";
      packg = "pkg4";
      pname = "Platinum Package";
      default_guest = 250;
      //console.log("pkg4");
      break;
    case 5:
      priceId = "price_1O7FQWFkQqbaeuTEnjStYttP";
      packg = "pkg5";
      pname = "Diamond Package";
      default_guest = 300;
      //console.log("pkg5");
      break;
    default:
      //console.log("no pkg provided");
      break;
  }

  // //console.log("priceId ",priceId);
  try {
    // const product = await stripe.products.retrieve('price_1NnbDxFkQqbaeuTEKTVASUA8');
    // //console.log(product);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      invoice_creation: {
        enabled: true,
      },
      line_items: [
        {
          price: priceId, // Replace with your price_id
          quantity: 1,
        },
      ],
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${serverUrl}/payment/success/user/${user_id}/${packg}/${eve}`, // Redirect URL after successful payment
      cancel_url: `${serverUrl}/payment/cancel/user/${user_id}/${packg}/${eve}`,
    });
    ////console.log(session.id);
    await pool.query(
      "INSERT INTO user_payment (user_id,default_guest_limit,package,session_id,package_name) VALUES ($1,$2,$3,$4,$5)",
      [user_id, default_guest, packg, session.id, pname]
    );
    await pool.query(
      "INSERT INTO user_additional_guests (user_id,package,additional_guests,package_name) VALUES ($1,$2,$3,$4)",
      [user_id, packg, default_guest, pname]
    );

    res.redirect(303, session.url);
    user_id;
    //res.json({ url: session.url }session.url);
  } catch (error) {
    console.error("Error creating Payment Link:", error);
    res.status(500).json({ error: error.message });
  }
};

const success = async (req, res) => {
  const { user_id, pkg, eve } = req.params;
  //console.log("eventNmae", eve);
  try {
    // Retrieve the session ID from the database
    const { rows } = await pool.query(
      "SELECT session_id,package FROM user_payment WHERE user_id = $1;",
      [user_id]
    );

    const session_id = rows[0].session_id;
    const package = rows[0].package;
    let default_guest = 0;
    switch (package) {
      case "pkg1":
        default_guest = 100;
        break;
      case "pkg2":
        default_guest = 150;
        break;
      case "pkg3":
        default_guest = 200;
        break;
      case "pkg4":
        default_guest = 250;
        break;
      case "pkg5":
        default_guest = 300;
        break;
      default:
        //console.log("no pkg provided");
        break;
    }

    // Fetch line items and amount from the Stripe session
    const lineItems = await stripe.checkout.sessions.listLineItems(session_id);

    if (lineItems && lineItems.data && lineItems.data.length > 0) {
      const amount = lineItems.data[0].amount_total;

      // Update the user_payment record
      await pool.query(
        "UPDATE user_payment SET amount = $1, status = $2, date = CURRENT_TIMESTAMP WHERE user_id = $3 AND package = $4",
        [amount, "Success", user_id, pkg]
      );

      if (eve === "template") {
        res.redirect(`${fEurl}/guest/template`);
      }
      if (eve === "questions") {
        res.redirect(`${fEurl}/guest/questions`);
      }
      if (eve === "Wedding") {
        res.redirect(`${fEurl}/eventList`);
      }
      if (
        eve === "We'reEngaged" ||
        eve === "SaveTheDate" ||
        eve === "ThankYou"
      ) {
        res.redirect(`${fEurl}/template`);
      }

      // Redirect to a thank you page or show a success message
      // res.redirect("https://shivappdev.24livehost.com/eventList");
      //const user_id = req.params.user_id;

      const user_validation = await pool.query(
        "SELECT package FROM user_payment WHERE user_id=$1",
        [parseInt(user_id)]
      );

      if (user_validation.rowCount < 1) {
        return res.status(400).json({ message: "User payment not found" });
      }
      const package = user_validation.rows[0].package;
      const user_questions = await pool.query(
        "SELECT * FROM package_questions where package_name = $1",
        [package]
      );

      for (let i = 0; i < user_questions.rows.length; i++) {
        await pool.query(
          "INSERT INTO user_question (user_id, package, questions, question_id, question_type, question_number, question_value) VALUES ($1, $2, $3, $4, $5, $6, $7)",
          [
            user_id,
            package,
            user_questions.rows[i].questions,
            user_questions.rows[i].question_id,
            user_questions.rows[i].question_type,
            user_questions.rows[i].question_number,
            user_questions.rows[i].question_value,
          ]
        );
      }
    } else {
      throw new Error("No line items found in the Stripe session.");
    }
  } catch (error) {
    console.error("Error handling successful payment:", error);
    res.status(500).json({ error: error.message });
  }
};

const cancel = async (req, res) => {
  const { user_id, pkg } = req.params;
  // JSON.stringify(req.query),
  try {
    // Insert data into PostgreSQL database for successful payment
    const { rows } = await pool.query(
      "SELECT session_id FROM user_payment WHERE user_id = $1;",
      [user_id]
    );
    const session_id = rows[0].session_id;

    // Fetch line items and amount from the Stripe session
    const lineItems = await stripe.checkout.sessions.listLineItems(session_id);

    if (lineItems && lineItems.data && lineItems.data.length > 0) {
      const amount = lineItems.data[0].amount_total;

      // Update the user_payment record
      await pool.query(
        "UPDATE user_payment SET amount = $, status = $2, date = CURRENT_TIMESTAMP WHERE user_id = $3 AND package = $4",
        [amount, "Failed", user_id, pkg]
      );

      // Redirect to a thank you page or show a success message
      res.redirect(`${fEurl}/payment/cancel`);
    } else {
      throw new Error("No line items found in the Stripe session.");
    }
  } catch (error) {
    console.error("Error handling successful payment:", error);
    res.status(500).json({ error: error.message });
  }
};

const getPaymentStatus = async (req, res) => {
  const { user_id } = req.params;

  try {
    const status = await pool.query(
      " SELECT * FROM user_payment WHERE user_id= $1 order by (id) desc",
      [user_id]
    );
    if (status.rows.length === 0) {
      res.status(404).send("Payment not found");
      return;
    }
    res.send({ "payment status: ": status.rows[0] });
  } catch (error) {
    //console.log(error);
    res.status(500).json(error);
  }
};

const additionalGuests = async (req, res) => {
  const { user_id, event, id } = req.params;

  const pkg = parseInt(id);
  //const pkg =req.params.id;
  let priceId = "";
  let packg = "";
  switch (pkg) {
    case 1:
      priceId = "price_1O5nhqFkQqbaeuTEb78ildKk";
      packg = "100guests";
      //console.log("100guests");
      break;
    case 2:
      priceId = "price_1O5njhFkQqbaeuTEdBJ9DDiz";
      packg = "200guests";
      //console.log("200guests");
      break;
    case 3:
      priceId = "price_1O5nlGFkQqbaeuTEKVWPtQ44";
      packg = "300guests";
      //console.log("300guests");
      break;
    case 4:
      priceId = "price_1O5nmnFkQqbaeuTEOSJKV4nW";
      packg = "400guests";
      //console.log("400guests");
      break;
    case 5:
      priceId = "price_1O5nnPFkQqbaeuTECvkzYLES";
      packg = "500guests";
      //console.log("500guests");
      break;
    case 6:
      priceId = "price_1O5no4FkQqbaeuTE6Rh4Bd9s";
      packg = "600guests";
      //console.log("600guests");
      break;
    case 7:
      priceId = "price_1O6oIzFkQqbaeuTEj2k04orJ";
      packg = "700guests";
      //console.log("700guests");
      break;
    case 8:
      priceId = "price_1O6oW5FkQqbaeuTEhykSIEwI";
      packg = "800guests";
      //console.log("800guests");
      break;
    case 9:
      priceId = "price_1O6oWjFkQqbaeuTEj9XGzxzc";
      packg = "900guests";
      //console.log("900guests");
      break;
    case 10:
      priceId = "price_1O6oXPFkQqbaeuTERjJFynmr";
      packg = "1000guests";
      //console.log("1000guests");
      break;
    default:
      //console.log("no pkg provided");
      break;
  }
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      invoice_creation: {
        enabled: true,
      },
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      allow_promotion_codes: true,
      // success_url: `${localUrl}/payment/successadditional/user/${user_id}/${packg}`, // Redirect URL after successful payment
      // cancel_url: `${localUrl}/payment/canceladditional/user/${user_id}/${packg}`, // Redirect URL if the user cancels
      success_url: `https://shivappdev.24livehost.com:3004/payment/successadditional/user/${user_id}/${packg}`, // Redirect URL after successful payment
      cancel_url: `https://shivappdev.24livehost.com:3004/payment/canceladditional/user/${user_id}/${packg}`, // Redirect URL if the user cancels
    });
    //console.log(session.id);
    // await pool.query(
    //   "INSERT INTO user_additional_guests (user_id,package,session_id) VALUES ($1,$2,$3)",
    //   [user_id, packg, session.id]
    // );

    // const addguests = parseInt(packg.replace(/guests/, ""));
    // await pool.query(
    //   "INSERT INTO user_additional_guests (user_id,package,session_id,additional_guests) VALUES ($1,$2,$3,$4)",
    //   [user_id, packg, session.id, addguests]
    // );
    await pool.query(
      "UPDATE user_additional_guests SET session_id=$1 WHERE user_id=$2",
      [session.id, user_id]
    );

    res.redirect(303, session.url);
  } catch (error) {
    console.error("Error creating Payment Link:", error);
    res.status(500).json({ error: error.message });
  }
};

const successadditional = async (req, res) => {
  const { user_id, packg } = req.params;
  const addguests = parseInt(packg.replace(/guests/, ""));
  await pool.query(
    "UPDATE user_additional_guests SET additional_guests = additional_guests+ $1 WHERE user_id =$2",
    [addguests, user_id]
  );
  res.redirect("https://shivappdev.24livehost.com/add/group/ceremonies");
};
const canceladditional = async (req, res) => {
  res.redirect("https://shivappdev.24livehost.com/add/group/ceremonies");
};

const getAdditionalGuestInfo = async (req, res) => {
  const user_id = req.params.user_id;
  //console.log(user_id);
  const additionalguestsData = await pool.query(
    "SELECT * FROM user_additional_guests WHERE user_id=$1;",
    [user_id]
  );
  //console.log(additionalguestsData.rows[0]);
  if (additionalguestsData.rowCount < 1) {
    res.status(400).send(`No data was found for this userid ${user_id}`);
  } else {
    res.status(200).send({ data: additionalguestsData.rows[0] });
  }
};

module.exports = {
  creatPaymentIntent,
  createPaymentLink,
  success,
  cancel,
  getPaymentStatus,
  getAllPaymentHistory,
  additionalGuests,
  successadditional,
  canceladditional,
  getAdditionalGuestInfo,
};
