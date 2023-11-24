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

app.use("/api/user", userRouter);
app.use("/api/guest", guestRouter);
app.use("/api/groups", groupRouter);
app.use("/api/functions", userFunctionRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/foods", foodsRoutes);
app.use("/api/drinks", drinksRoutes);
app.use("/api/userevents", userEventsRouter);
app.use("/api/userfoods", userFoodsRouter);
app.use("/api/contact", contactUsRouter);
app.use("/api/ceremony", ceremonyRouter);
app.use("/api/marriagedetails", marriageDetailsRoutes);
app.use("/api/coordinates", coordinateRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/payment", stripeRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/rsvp", rsvpRoutes);
app.use("/api/", authRouter);
app.use("/api/cronjob", cornJobRouter);
app.use("/api/fb", facebook);
app.use("/api/media", mediaRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/usergift", usergiftRouter);
app.use("/api/weddinglist", weddinglistRouter);
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRouter);

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
