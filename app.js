var express = require('express');
var signupcontroller = require('./controllers/signupcontroller');
var logincontroller = require('./controllers/logincontroller');
var todocontroller = require('./controllers/todocontroller');
var procontroller = require('./controllers/procontroller');
//var mailcontroller = require('./controllers/mailcontroller');
var session = require('express-session');
var redis = require('redis');
var redisStore = require('connect-redis')(session);
var client  = redis.createClient();

var app = express();

app.use(session({
  secret: 'shhhhh',
  store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : 260}),
  saveUninitialized: false,
  resave: false
}));

//set up template engine
app.set('view engine','ejs');


//static files
app.use('/assets',express.static('./public/assets')); //express.static is the buil-in middle-ware
//fire controllers
signupcontroller(app);
logincontroller(app);
todocontroller(app);
procontroller(app);
//listen to port

app.delete('/logout',function(req,res){
    req.session.destroy();
    res.render('login');
});

app.listen(3000);
console.log('You are listenig to port 3000');
