var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://test:test1234@todo-qqfes.mongodb.net/test?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true });

var signUpSchema = new mongoose.Schema({
  username: String,
  emailid: String,
  password: String,
  task: [Object],
  section: String,
  todo: [String],
  role: String
});

var signup = mongoose.model('signup',signUpSchema);

//var data = [{item : 'get milk'},{item:'walk dog'},{item:'kick some coding ass'},{item: 'itemmmm'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
  app.get('/teachersignup',function(req,res){
    res.render('teachersignup');
  });

  app.get('/studentsignup',function(req,res){
    res.render('studentsignup');
  });

  app.post('/studentsignup',urlencodedParser,function(req,res){
    var a = {username:req.body.username};
    signup.find(a,function(err,data){
      if(err) throw err;
      else
      {
        if(data.length == 0)
        {
          var newsignup = signup(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
          });
        }
        else
          res.status(404).end();
      }
    });
  });

  app.post('/teachersignup',urlencodedParser,function(req,res){
    req.body=JSON.parse(req.body.body);
    var a = {username:req.body.username};
    signup.find(a,function(err,data){
      if(err) throw err;
      else
      {
        if(data.length == 0)
        {
          var newsignup = signup(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
          });
        }
        else
          res.status(404).end();
      }
    });
  });
};
