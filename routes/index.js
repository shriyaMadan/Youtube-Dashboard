var express = require("express");
var router = express.Router();
var controller = require("../controllers/controls.js");
/*
router.get("/statPubTest", (req, res, next) => {
  res.render("statPub", {channels: [], loginLink: "https://google.com", channelThumbnailURL: "google.com", channelName: "tst", subsCount: "", videoCount: "" ,viewCount: ""})
})
*/

router.get('/logout', controller.logout);
router.get("/statPub", controller.statPubGET);
router.get("/ownChannel", controller.ownChannel);
router.get("/", (req, res, next) => {
  res.redirect('/statPub')
});

router.get("/statPub/:channelID", controller.publicStatChannelID_GET);
router.get("/auth/oauth2/callback", controller.authCallback);
router.post("/searchChannel", controller.searchChannelPOST);

module.exports = router;
