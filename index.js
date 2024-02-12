const express = require("express");
const urlRoute = require("./routes/url.routes");
const { connectToMongoDB } = require("./connect.mongoose");
const URL = require("./models/url.models");
const path = require("path");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

const server = express();
const PORT = 3001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB connected..")
);

server.set("view engine", "ejs");
server.set("views", path.resolve("./views"));

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());

// EJS
// server.get("/test", async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.render("home", {
//     urls: allUrls,
//   });
// });

server.use("/", checkAuth, staticRoute);
server.use("/url", restrictToLoggedinUserOnly, urlRoute);
server.use("/user", userRoute);
// server.get("/", (req, res) => {
//   res.send("Hi Welcome to our server.");
// });

server.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

server.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
