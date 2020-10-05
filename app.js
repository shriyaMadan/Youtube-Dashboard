var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = express();
const port = 3000 || process.env.PORT;
var https = require('https');
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

const key = 'AIzaSyAZHmeCtdm0T_IOGeuG3SdUJ5KuOh7X2xQ';

function get_stats(channelUsername,type, apiKey){
  if (type=='forUsername'){
    url = 'https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername='+channelUsername+'&key='+apiKey
  }
  if (type=='Id'){
    url = 'https://www.googleapis.com/youtube/v3/channels?part=statistics&id='+channelUsername+'&key='+apiKey
  }
axios.get(url)
  .then(function (response) {
    // handle success
    //console.log(response.data.items[0].statistics);
    return response.data;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {

    // always executed
  });
};

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
  var stats = get_stats(channelUsername=param,type=typeOfParam, apiKey=key);
  console.log(stats)

  //console.log(url)
  //console.log(username)
  res.send()
})





app.listen(port,()=>{
  console.log('listening on',port);
});
