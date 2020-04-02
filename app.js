var express = require('express');
var signupcontroller = require('./controllers/signupcontroller');
var logincontroller = require('./controllers/logincontroller');
var todocontroller = require('./controllers/todocontroller');
var procontroller = require('./controllers/procontroller');
var mailcontroller = require('./controllers/mailcontroller');
var session = require('express-session');
var redis = require('redis');
var redisStore = require('connect-redis')(session);
var client  = redis.createClient();
const methodOverride = require('method-override');

var app = express();

process.env.GCS_BUCKET="wps-5d927.appspot.com";
process.env.GCLOUD_PROJECT = "wps-5d927";
process.env.GCS_KEYFILE = "./wps-5d927-fae2625c07a5.json";


app.use(session({
  secret: 'shhhhh',
  store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : 260}),
  saveUninitialized: false,
  resave: false
}));

//set up template engine
app.set('view engine','ejs');


//static files
app.use('/assets',express.static('./public/assets'));
app.use('/uploads',express.static('./public/uploads'));//express.static is the buil-in middle-ware
app.use(methodOverride('_method'));

//fire controllers
signupcontroller(app);
logincontroller(app);
todocontroller(app);
procontroller(app);
//mailcontroller(app);
//listen to port

app.delete('/logout',function(req,res){
    req.session.destroy();
    res.render('login');
});

//Connect to the data base
app.listen(3000);
console.log('You are listenig to port 3000');


