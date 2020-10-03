var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = express();
const port = 3000 || process.env.PORT;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index.ejs')
})






app.listen(port,()=>{
  console.log('listening on',port);
});
