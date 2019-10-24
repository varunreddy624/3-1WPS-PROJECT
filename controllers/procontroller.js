var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the data base
mongoose.connect("mongodb+srv://test:test1234@todo-qqfes.mongodb.net/test?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true });

//create a schema (Blue print)

var pro = mongoose.model('signup');

//var data = [{item : 'get milk'},{item:'walk dog'},{item:'kick some coding ass'},{item: 'itemmmm'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
  app.get('/pro',function(req,res){
    pro.find({username:req.session.key},function(err,data){
    if(data[0].role==='teacher')
    res.render('pro');
  else
    res.render('prolist',{prolist:data[0]});
  });
});


  app.post('/pro',urlencodedParser,function(req,res){
      pro.updateOne({username:req.session.key},{$push:{item:req.body.item,date:req.body.date}},function(err,data){
        if(err)
         throw err;
        else
        {
          pro.updateMany({role:"student"},{$push:{item:req.body.item,date:req.body.date}},function(err,data){
            if(err)
             throw err;
            else {
              pro.find({username:req.session.key},function(err,data){
                if(err)
                  throw err;
                else
                  res.render('prolist',{prolist:data[0]});
              });
            }
          });
        }
      });
  });

  app.get('/prolist',function(req,res){
    pro.find({username:req.session.key},function(err,data){ //empty list will fetch all items, if we wish to find specific item we specify them in {}
      if(err) throw err;
      res.render('prolist',{prolist: data[0]});
  }
);
});


app.get('/update',function(req,res){
  pro.find({username:req.session.key},function(err,data){ //empty list will fetch all items, if we wish to find specific item we specify them in {}
    if(err) throw err;
    res.render('updatelist',{prolist: data[0]});
}
);
});

app.post('/update',urlencodedParser,function(req,res){
  pro.find({username:req.session.key},function(err,data){ //empty list will fetch all items, if we wish to find specific item we specify them in {}
    if(err) throw err;
    var index=data[0].item.indexOf(req.body.task);
    req.session.date=data[0].date[index];
    req.session.task=req.body.task;
    res.render('updatepage',{task:req.session.task});
}
);
});

app.get('/updatepage',function(req,res){
  pro.find({username:req.session.key},function(err,data){ //empty list will fetch all items, if we wish to find specific item we specify them in {}
    if(err) throw err;
    res.render('updatepage',{task:req.session.task});
}
);
});

app.post('/updatepage',urlencodedParser,function(req,res){
  /* it's working baby!*/
    pro.updateOne({username:req.session.key,item:req.session.task,date:req.session.date},{ $set: { "date.$" : req.body.date }},function(err,data){
      if(err)
       throw err;
      else
      {
        pro.updateMany({role:"student",item:req.session.task,date:req.session.date},{ $set: { "date.$" : req.body.date }},function(err,data){
          if(err)
           throw err;
          else {
            pro.find({username:req.session.key},function(err,data){
              if(err)
                throw err;
              else
                res.render('prolist',{prolist:data[0]});
            });
          }
        });
      }
    });
});


  /*app.delete('/prolist/:item',function(req,res){ // delete the requesting item from mongo db
      pro.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
        if(err) throw err;
        res.json(data);
      });
  });*/
};
