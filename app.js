var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var http = require('http');
var helmet = require('helmet');
var app = express();
var port = process.env.PORT|| 3000;

var indexRouter = require('./routes/index.js');
require('dotenv').config();
const axios = require('axios').default;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use('/', indexRouter);

app.listen(port,()=>{
  console.log('listening on',port);
});
