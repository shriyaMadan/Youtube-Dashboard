var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = express();
const port = 3000 || process.env.PORT;
const axios = require('axios').default;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/statPub', function(req, res){
  res.render('statPub.ejs')
})

app.get('/', function (req, res) {
  res.redirect('/statPub')
})

app.get('/results',function(req,res){
  res.render('result.ejs')
})

const key = '';  //personal 

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
      //console.log(response.data.items[0].statistics);
      res.send(response.data.items[0].statistics);

      var viewCount = response.data.items[0].statistics.viewCount;
      var subsCount = response.data.items[0].statistics.subscriberCount;
      var subsHidden = response.data.items[0].statistics.hiddenSubscriberCount;
      var videoCount = response.data.items[0].statistics.videoCount;
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
