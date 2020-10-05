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

axios.get('https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=thevenusproject&key=AIzaSyAZHmeCtdm0T_IOGeuG3SdUJ5KuOh7X2xQ')
  .then(function (response) {
    // handle success

    console.log(response.data.items[0].statistics);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

app.post('/statPub', function(req, res, next){
  var url  = req.body.channelUrl
  var username = ''
  if (url.slice(-1)=='/'){
    url = url.slice(0, url.length-1)
  }
  if (url.indexOf('/c/')!=-1) {
    username = url.slice((url.indexOf('/c/')+3))
  }
  else if (url.indexOf('/channel/')!=-1) {
    username = url.slice((url.indexOf('/channel/')+9))
  } else {
    res.send('invalid url')
  }


  //console.log(url)
  //console.log(username)
  res.send('')
})





app.listen(port,()=>{
  console.log('listening on',port);
});
