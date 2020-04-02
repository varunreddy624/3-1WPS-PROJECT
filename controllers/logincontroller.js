var bodyParser = require('body-parser');
var mongoose = require('mongoose');

/*no changes right!*/
mongoose.connect("mongodb+srv://test:test1234@todo-qqfes.mongodb.net/test?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true });
var login = mongoose.model('signup');

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
  app.get('/',function(req,res){
    if(req.session.key){
      return res.redirect('default');
    }
    else
      res.render('login');
  });
  app.post('/',urlencodedParser,function(req,res){
    login.find(req.body,function(err,data){
      if(err) throw err;
      else
      {
        if(data.length == 0)
          res.status(404).end();
        else
        {
          req.session.key=data[0].username;
          req.session.role=data[0].role;
          res.json(req.session);
        }
      }
  });
});
};
