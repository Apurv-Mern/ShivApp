const express = require("express");
const bodyParser = require("body-parser");
const { authenticateToken } = require("./authentication/auth");
const userRouter = require("./routes/userregister.js");
const guestRouter = require("./routes/guest");
const groupRouter = require("./routes/group");
const eventRoutes = require("./routes/event");
const userFunctionRoutes = require("./routes/function");
const foodsRoutes = require("./routes/food");
const userEventsRouter = require("./routes/userEvents");
const userFoodsRouter = require("./routes/userFoods");
const contactUsRouter = require("./routes/contact");
const ceremonyRouter = require("./routes/ceremony");
const pdfRoutes = require("./routes/pdf");
const authRouter = require("./routes/authRoute");
const expressSession = require("express-session");
const passport = require("passport");
const marriageDetailsRoutes = require("./routes/marriageDetailsRoutes");
const cors = require("cors");
require("dotenv").config();

const io = require("@pm2/io");

const reqsec = io.meter({
  name: "req/sec",
  id: "app/requests/volume",
});

const https = require("https");
const fs = require("fs");

const app = express();
const port = process.env.NODE_PORT;
app.use(bodyParser.json());
app.use(cors());

app.use(
  expressSession({
    secret: "secret-key", // replace this with a random secret string
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   // Here you would usually query your database to find the user by their ID
//   // For this example, let's just return an object
//   done(null, {id: id});
// });

//app.use('/', authRoutes);

//app.use(loggingMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//----------post route start-------------
app.get("/post", authenticateToken, (req, res, next) => {
  res.send("Hello world!");
});
//------------post route end -------------

app.use("/user", userRouter);
app.use("/guest", guestRouter);
app.use("/groups", groupRouter);
app.use("/functions", userFunctionRoutes);
app.use("/events", eventRoutes);
app.use("/foods", foodsRoutes);
app.use("/userevents", userEventsRouter);
app.use("/userfoods", userFoodsRouter);
app.use("/contact", contactUsRouter);
app.use("/ceremony", ceremonyRouter);
app.use("/marriagedetails", marriageDetailsRoutes);
app.use("/pdf", pdfRoutes);
app.use("/", authRouter);

app.listen(3001, () => {
  console.log("server started on 3001");
});
process.on("uncaughtException", function (err) {
  console.log("Caught exception: ", err);
  // You can also perform any cleanup tasks here before exiting or restarting the server
  // process.exit(1); // exiting the process with a 'failure' code
});
