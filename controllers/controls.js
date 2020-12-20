require("dotenv").config();
const key = process.env.API_KEY;
const axios = require("axios").default;

exports.statPubGET = function (req, res) {
  res.render("statPub", { subsCount: "", videoCount: "", viewCount: "" });
};

exports.publicStatChannelID_GET = function (req, res, next) {
  var channelID = req.params.channelID;
  var url =
    "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" +
    channelID +
    "&key=" +
    key;
  axios
    .get(url)
    .then(function (response) {
      //res.send(response.data.items[0].statistics);
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
};

exports.homeGET = function (req, res) {
  res.redirect("/statPub");
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
      "https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=" +
      param +
      "&key=" +
      key;
  }
  if (typeOfParam == "Id") {
    url =
      "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" +
      param +
      "&key=" +
      key;
  }
  axios
    .get(url)
    .then(function (response) {
      //res.send(response.data.items[0].statistics);

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
    .then(function () {});
};

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
