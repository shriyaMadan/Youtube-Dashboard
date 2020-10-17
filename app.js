var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var http = require('http');
var helmet = require('helmet')
var app = express();
var port = process.env.PORT|| 3000;
require('dotenv').config();

const key= process.env.API_KEY;

const axios = require('axios').default;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

app.get('/statPub', function(req, res){
  res.render('statPub', { subsCount: "", videoCount: "", viewCount: "" })
})

app.get('/', function (req, res) {
  res.redirect('/statPub')
})


app.get('/publicStat/:channelID', function(req, res, next){
  var channelID = req.params.channelID
  var url = 'https://www.googleapis.com/youtube/v3/channels?part=statistics&id='+channelID+'&key='+key;
  axios.get(url)
    .then(function (response) {
      //res.send(response.data.items[0].statistics);
      var subsCount = formatNumber(response.data.items[0].statistics.subscriberCount)
      var viewCount = formatNumber(response.data.items[0].statistics.viewCount)
      //var subsHidden = response.data.items[0].statistics.hiddenSubscriberCount;
      var videoCount = formatNumber(response.data.items[0].statistics.videoCount)
      res.render('statPub', { subsCount: subsCount, videoCount: videoCount, viewCount: viewCount })
    })
    .catch(function (error) {
      console.log(error)
      res.send(error)
    })
    .then(function () { });
})

app.post('/searchChannel', function(req, res, next){
  var query = req.body.searchChannel
  var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q='+query+'&type=channel&key='+key
  axios.get(url)
    .then(function (response) {
      //console.log(response.data)
      //res.send(response.data)
      res.render('result', {data: response.data, listOfItems: response.data.items })
    })
    .catch(function (error) {
      console.log(error)
      res.send(error)
    })
    .then(function () {
    });
})

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}


app.post('/statPub', function(req, res, next){
  var url  = req.body.channelUrl
  var param = ''
  var typeOfParam = ''
  if (url.slice(-1)=='/'){
    url = url.slice(0, url.length-1)
  }
  if (url.indexOf('/c/')!=-1) {
    param = url.slice((url.indexOf('/c/')+3))
    typeOfParam = 'forUsername'
  }
  else if (url.indexOf('/channel/')!=-1) {
    param = url.slice((url.indexOf('/channel/')+9))
    typeOfParam = 'Id'
  } else if(url.indexOf('/user/')!=-1) {
    param = url.slice((url.indexOf('/user/')+6))
    typeOfParam = 'forUsername'
  } else {
    res.send('invalid url')
  }
  //var stats = get_stats(channelUsername=param,type=typeOfParam, apiKey=key);

  if (typeOfParam=='forUsername'){
    url = 'https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername='+param+'&key='+key
  }
  if (typeOfParam=='Id'){
    url = 'https://www.googleapis.com/youtube/v3/channels?part=statistics&id='+param+'&key='+key
  }
  axios.get(url)
    .then(function (response) {
      //res.send(response.data.items[0].statistics);

      var subsCount = formatNumber(response.data.items[0].statistics.subscriberCount)
      var viewCount = formatNumber(response.data.items[0].statistics.viewCount)
      //var subsHidden = response.data.items[0].statistics.hiddenSubscriberCount;
      var videoCount = formatNumber(response.data.items[0].statistics.videoCount)

      res.render('statPub', { subsCount: subsCount, videoCount: videoCount, viewCount: viewCount })

    })
    .catch(function (error) {
      console.log(error)
      res.send(error)
    })
    .then(function () {
    });
  //console.log(url)
  //console.log(username)
})

app.listen(port,()=>{
  console.log('listening on',port);
});
