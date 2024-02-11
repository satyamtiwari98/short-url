const express = require("express");
const urlRoute = require("./routes/url.routes");
const { connectToMongoDB } = require("./connect.mongoose");
const URL = require("./models/url.models");

const server = express();
const PORT = 3001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB connected..")
);

server.use(express.json());
server.use("/url", urlRoute);
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
