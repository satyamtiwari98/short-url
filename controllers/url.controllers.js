// const { nanoid } = require("nanoid");
const shortid = require("shortid");
const URL = require("../models/url.models");

async function handleGenerateShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });
  //   const shortId = nanoid(8);
  const shortId = shortid();
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitedHistory: [],
  });

  return res.json({ id: shortId });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visitHistory.length,
    analystics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateShortURL,
  handleGetAnalytics,
};
