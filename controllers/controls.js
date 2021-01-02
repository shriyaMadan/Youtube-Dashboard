require("dotenv").config();
const key = process.env.API_KEY;
const axios = require("axios").default;
const CONFIG = require("../config");
const google = require("googleapis").google;
const jwt = require("jsonwebtoken");

const Oauth2 = google.auth.OAuth2;

exports.statPubGET = function (req, res) {
  if (!req.cookies.jwt) {
    return res.redirect("/");
  }
  const oauth2client = new Oauth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0]
  );

  oauth2client.credentials = jwt.verify(req.cookies.jwt, CONFIG.JWTsecret);
  //   call the youtube api
  const service = google.youtube("v3");
  service.channels
    .list({ auth: oauth2client, mine: true, part: "snippet, statistics" })
    .then((response) => {
      // console.log(response);
      return res.render("statPub", {
        channels: response.data.items,
        subsCount: "",
        videoCount: "",
        viewCount: "",
      });
    });
  service.subscriptions.list({
    auth: oauth2client,
    mine: true,
    part: "snippet,contentDetails",
    maxResults: 50,
  });
  // res.render("statPub", { subsCount: "", videoCount: "", viewCount: "" });
};

exports.authCallback = (req, res) => {
  const oauth2client = new Oauth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0]
  );

  if (req.query.error) {
    //   user permission not granted
    return res.redirect("/");
  }
  oauth2client.getToken(req.query.code, (err, token) => {
    if (err) {
      return res.redirect("/");
    }
    res.cookie("jwt", jwt.sign(token, CONFIG.JWTsecret));
    return res.redirect("/statPub");
  });
};

exports.publicStatChannelID_GET = function (req, res, next) {
  var channelID = req.params.channelID;
  var url =
    "https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=" +
    channelID +
    "&key=" +
    key;
  axios
    .get(url)
    .then(function (response) {
      // res.send(response.data.items[0]);
      var channelName = response.data.items[0].snippet.title;
      var channelThumbnailURL =
        response.data.items[0].snippet.thumbnails.default.url;
      var subsCount = formatNumber(
        response.data.items[0].statistics.subscriberCount
      );
      var viewCount = formatNumber(response.data.items[0].statistics.viewCount);
      //var subsHidden = response.data.items[0].statistics.hiddenSubscriberCount;
      var videoCount = formatNumber(
        response.data.items[0].statistics.videoCount
      );
      res.render("statPub", {
        subsCount,
        videoCount,
        viewCount,
        channelName,
        channelThumbnailURL,
      });
    })
    .catch(function (error) {
      console.log(error);
      res.send(error);
    })
    .then(function () {});
};

exports.homeGET = function (req, res) {
  const oauth2client = new Oauth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0]
  );
  const loginLink = oauth2client.generateAuthUrl({
    access_type: "offline",
    scope: CONFIG.oauth2Credentials.scopes,
  });
  return res.render("index", { loginLink });
};

exports.statPubPOST = function (req, res, next) {
  var url = req.body.channelUrl;
  var param = "";
  var typeOfParam = "";
  if (url.slice(-1) == "/") {
    url = url.slice(0, url.length - 1);
  }
  if (url.indexOf("/c/") != -1) {
    param = url.slice(url.indexOf("/c/") + 3);
    typeOfParam = "forUsername";
  } else if (url.indexOf("/channel/") != -1) {
    param = url.slice(url.indexOf("/channel/") + 9);
    typeOfParam = "Id";
  } else if (url.indexOf("/user/") != -1) {
    param = url.slice(url.indexOf("/user/") + 6);
    typeOfParam = "forUsername";
  } else {
    res.send("invalid url");
  }
  //var stats = get_stats(channelUsername=param,type=typeOfParam, apiKey=key);

  if (typeOfParam == "forUsername") {
    url =
      "https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&forUsername=" +
      param +
      "&key=" +
      key;
  }
  if (typeOfParam == "Id") {
    url =
      "https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=" +
      param +
      "&key=" +
      key;
  }
  axios
    .get(url)
    .then(function (response) {
      res.send(response.data.items[0].statistics);

      var subsCount = formatNumber(
        response.data.items[0].statistics.subscriberCount
      );
      var viewCount = formatNumber(response.data.items[0].statistics.viewCount);
      //var subsHidden = response.data.items[0].statistics.hiddenSubscriberCount;
      var videoCount = formatNumber(
        response.data.items[0].statistics.videoCount
      );

      res.render("statPub", {
        subsCount: subsCount,
        videoCount: videoCount,
        viewCount: viewCount,
      });
    })
    .catch(function (error) {
      console.log(error);
      res.send(error);
    })
    .then(function () {});
  //console.log(url)
  //console.log(username)
};

exports.searchChannelPOST = function (req, res, next) {
  var query = req.body.searchChannel;
  var numResults = req.body.noOfResults;
  var url = "";
  var nextToken = req.body.nextPage;
  var prevToken = req.body.prevPage;

  if (nextToken == "" && prevToken == "") {
    url =
      "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=" +
      numResults +
      "&q=" +
      query +
      "&type=channel&key=" +
      key;
  } else if (prevToken) {
    //console.log(prevToken)
    url =
      "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=" +
      numResults +
      "&q=" +
      query +
      "&pageToken=" +
      prevToken +
      "&type=channel&key=" +
      key;
  } else if (nextToken) {
    //console.log(nextToken)
    url =
      "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=" +
      numResults +
      "&q=" +
      query +ay randomly ask any student to give their VIVA exam.
      Marks of ViVA exam would be included in ASL & Internal Assessment.
      "&pageToken=" +
      nextToken +
      "&type=channel&key=" +
      key;
  }
  axios
    .get(url)
    .then(function (response) {
      // console.log(response.data);
      // res.send(response.data);
      res.render("result", {
        data: response.data,
        listOfItems: response.data.items,
        query: query,
        numResults: numResults,
      });
    })
    .catch(function (error) {
      //console.log(error)
      res.send(error);
    })
    .then(function () {});
};

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
