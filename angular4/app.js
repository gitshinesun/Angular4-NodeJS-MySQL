var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();

//DB connection
var mysql = require('mysql');					
var dbconfig = require('./config/database.js');
var connection = mysql.createConnection(dbconfig);
//------------------------------------------------

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended:true}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    if ('OPTIONS' == req.method){
      res.sendStatus(200);
    }
    else{
        next();
    }
});

//request url from client
app.post('/login', function (req, res, next) {

    var username = req.body.username;
    var password = req.body.password;
    console.log("-:", username, password);

    var query = "SELECT * FROM user_info ";
    query += " WHERE user_name='" + username + "'";
    query += " AND user_pwd='" + password + "'";

    connection.query(query, function (err, result) {

        if(err)
            throw err;

        if (result.length > 0)
            res.send({success:true, username:username, password:password});
        else
            res.send({success:false, username:username, password:password});
    });
});
//--------------------------------------------

app.set('port', process.env.PORT || 4100);
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
