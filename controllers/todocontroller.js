var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the data base
mongoose.connect("mongodb+srv://test:test1234@todo-qqfes.mongodb.net/test?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true });

//create a schema (Blue print)
var Todo = mongoose.model('signup');



//var data = [{item : 'get milk'},{item:'walk dog'},{item:'kick some coding ass'},{item: 'itemmmm'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

  app.get('/todo',function(req,res){
    //get data from mongodb and pass it to a view
    Todo.find({username:req.session.key},function(err,data){ //empty list will fetch all items, if we wish to find specific item we specify them in {}
      if(err) throw err;
      console.log(data[0]);
      res.render('todo',{todos: data[0]});
    });
  });

  app.post('/todo',urlencodedParser,function(req,res){ // get data from the view and add it to mongo db
    Todo.updateOne({username:req.session.key},{$push:{todo:req.body.item}},function(err,data){
      if(err)
       throw err;
      else
      {
        Todo.find({username:req.session.key},function(err,data){
          if(err)
            throw err;
          else
            res.json(data[0]);
        });
      }
    });
  });

  /*app.delete('/todo/:item',function(req,res){ // delete the requesting item from mongo db
      Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
        if(err) throw err;
        res.json(data);
      });
  });*/
};
