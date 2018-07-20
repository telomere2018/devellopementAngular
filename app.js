var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var route = require('./routes/routeTelomere.js');
var app = express();

//mongodb
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/meanCellEnvironement', { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
  mongoose.set('debug', true);
  //insert filelds
  
 

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type : undefined , Accept, Authorization");
    next();
   });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
//here file is the name of the input

 // app.use('/uploads',express.static(__dirname +'/uploads'));
  
 
var upload = multer({dest: './uploads/'}).single('file');
app.use('uploads',express.static(path.join(__dirname, '/uploads')));
app.use(upload);
app.use(logger('dev'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.static(path.join(__dirname, '/dist/projet')));
app.use('/accueil', express.static(path.join(__dirname, '/dist/projet')));
app.use('/route', route);

// parse incoming requests


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;