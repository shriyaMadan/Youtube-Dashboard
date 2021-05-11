require("dotenv").config();
const key = process.env.API_KEY;
const axios = require("axios").default;
const CONFIG = require("../config");
const google = require("googleapis").google;
const jwt = require("jsonwebtoken");
const Oauth2 = google.auth.OAuth2;

const oauth2client = new Oauth2(
  CONFIG.oauth2Credentials.client_id,
  CONFIG.oauth2Credentials.client_secret,
  CONFIG.oauth2Credentials.redirect_uris[0]
);

function generateLoginLink(config, access_type) {
  const loginLink = oauth2client.generateAuthUrl({
    access_type,
    scope: CONFIG.oauth2Credentials.scopes,
  });
  return loginLink;
}

exports.ownChannel = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res.redirect("/");
  }
  oauth2client.credentials = jwt.verify(req.cookies.jwt, CONFIG.JWTsecret);
  const service = google.youtube("v3");
  service.channels
    .list({ auth: oauth2client, mine: true, part: "snippet, statistics" })
    .then((response) => {
      // console.log(response);
      return res.render("statPub", {
        loginLink: "",
        channels: response.data.items,
        subsCount: "",
        videoCount: "",
        viewCount: "",
      });
    });
}

exports.authCallback = (req, res) => {
  if (req.query.error) {
    //   user permission not granted
    return res.redirect("/");
  }
  oauth2client.getToken(req.query.code, (err, token) => {
    if (err) {
      return res.redirect("/");
    }
    res.cookie("jwt", jwt.sign(token, CONFIG.JWTsecret, { expiresIn: 60 * 3 }));
    return res.redirect("/ownChannel");
  });
};

exports.statPubGET = (req, res, next) => {
  if (!req.cookies.jwt) {
    res.render('statPub', {
      channels: [], loginLink: generateLoginLink(CONFIG, "offline"),
      channelThumbnailURL: "", channelName: "", subsCount: "", videoCount: "", viewCount: ""
    })
  } else {
    res.render('statPub', {
      channels: [], loginLink: "", channelThumbnailURL: "",
      channelName: "", subsCount: "", videoCount: "", viewCount: ""
    })
  }
}

exports.logout = (req, res, next) => {
  res.clearCookie("jwt");
  res.redirect('statPub');
}

exports.searchChannelPOST = (req, res, next) => {
  var query = req.body.searchChannel;
  const urlRegex = /youtube.com/g;

  if (urlRegex.test(query)) {
    var url = req.body.searchChannel;
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
        param + "&key=" + key;
    }
    axios
      .get(url)
      .then(function (response) {
        // res.send(response.data.items[0].statistics);

        var subsCount = formatNumber(
          response.data.items[0].statistics.subscriberCount
        );
        var viewCount = formatNumber(
          response.data.items[0].statistics.viewCount
        );
        //var subsHidden = response.data.items[0].statistics.hiddenSubscriberCount;
        var videoCount = formatNumber(
          response.data.items[0].statistics.videoCount
        );
        var channelName = response.data.items[0].snippet.title;
        var channelThumbnailURL =
          response.data.items[0].snippet.thumbnails.default.url;
        res.render("statPub", {
          loginLink: (req.cookies.jwt ? "" : generateLoginLink(CONFIG, "offline")),
          channels: false,
          subsCount: subsCount,
          videoCount: videoCount,
          viewCount: viewCount,
          channelName,
          channelThumbnailURL,
        });
      })
      .catch(function (error) {
        console.log(error);
        res.send(error);
      })
      .then(function () { });
    //console.log(url)
    //console.log(username)
  } else {
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
        query +
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
      .then(function () { });
  }
};

exports.publicStatChannelID_GET = function (req, res, next) {
  var channelID = req.params.channelID;
  var url =
    "https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=" +
    channelID + "&key=" + key;
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
        loginLink: (req.cookies.jwt ? "" : generateLoginLink(CONFIG, "offline")),
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
    .then(function () { });
};

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
