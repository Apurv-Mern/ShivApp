const express = require("express");
const bodyParser = require("body-parser");
const { authenticateToken } = require("./authentication/auth");
const userRouter = require("./routes/userregister.js");
const guestRouter = require("./routes/guest");
const mediaRouter = require("./routes/media");
const groupRouter = require("./routes/group");
const eventRoutes = require("./routes/event");
const userFunctionRoutes = require("./routes/function");
const foodsRoutes = require("./routes/food");
const userEventsRouter = require("./routes/userEvents");
const userFoodsRouter = require("./routes/userFoods");
const drinksRoutes = require("./routes/drinks");
const contactUsRouter = require("./routes/contact");
const ceremonyRouter = require("./routes/ceremony");
const dashboardRouter = require("./routes/dashboard");
const pdfRoutes = require("./routes/pdf");
const facebook = require("./routes/facebook");
const stripeRouter = require("./routes/stripe");
const rsvpRoutes = require("./routes/RSVPinvitation");
const coordinateRoutes = require("./routes/coordinates");
const authRouter = require("./routes/authRoute");
const expressSession = require("express-session");
const authRoute = require("./routes/authRoute.js");
const marriageDetailsRoutes = require("./routes/marriageDetailsRoutes");
const adminRoutes = require("./routes/adminRoute");
const usergiftRouter = require("./routes/gift");
const weddinglistRouter = require("./routes/weddingList.js");
const cornJobRouter = require("./routes/cronjobRoute.js");
const profileRouter = require("./routes/profileRoute.js");
const cors = require("cors");
const passport = require("passport");
const passportSetup = require("./passport");
const pool = require("./database/connection").pool;

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

//app.use(loggingMiddleware);

app.get("/", authenticateToken, (req, res) => {
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
app.use("/drinks", drinksRoutes);
app.use("/userevents", userEventsRouter);
app.use("/userfoods", userFoodsRouter);
app.use("/contact", contactUsRouter);
app.use("/ceremony", ceremonyRouter);
app.use("/marriagedetails", marriageDetailsRoutes);
app.use("/coordinates", coordinateRoutes);
app.use("/pdf", pdfRoutes);
app.use("/payment", stripeRouter);
app.use("/dashboard", dashboardRouter);
app.use("/rsvp", rsvpRoutes);
app.use("/", authRouter);
app.use("/cronjob", cornJobRouter);
app.use("/fb", facebook);
app.use("/media", mediaRouter);
app.use("/admin", adminRoutes);
app.use("/usergift", usergiftRouter);
app.use("/weddinglist", weddinglistRouter);
app.use("/auth", authRoute);
app.use("/profile", profileRouter);

const httpsOptions = {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
};

let serv = https.createServer(httpsOptions, app).listen(port, function () {
  reqsec.mark();
  console.log(
    `Server listening on port ${port}! Go to https://localhost:${port}/`
  );
});
serv.on("secureConnection", (sock) => {
  sock.on("error", (err) => {
    console.log(err);
  });
});

process.on("uncaughtException", function (err) {
  console.log("Caught exception: ", err);
});
