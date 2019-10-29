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
      var a={item:req.body.item,date:new Date(req.body.date)};
      pro.updateOne({username:req.session.key,task:{$elemMatch:{section:req.body.section}}},{$addToSet:{'task.$.a':a}},function(err,data){
        if(err)
         throw err;
        else
        {
          a.subject=req.body.subject;
          pro.updateMany({role:"student",section:req.body.section},{$push:{task:a}},function(err,data){
            if(err)
             throw err;
            else {
              pro.find({username:req.session.key},function(err,data){
                if(err)
                  throw err;
                else{
                  res.json(data);
                }
              });
            }
          });
        }
      });
  });

  app.get('/teacherprolist',function(req,res){
    pro.find({username:req.session.key},function(err,data){ //empty list will fetch all items, if we wish to find specific item we specify them in {}
      if(err) throw err;
      res.render('teacherprolist',{prolist: data[0]});
  });
});

app.get('/studentprolist',function(req,res){
  pro.find({username:req.session.key},function(err,data){ //empty list will fetch all items, if we wish to find specific item we specify them in {}
    if(err) throw err;
    res.render('studentprolist',{prolist: data[0]});
});
});


app.get('/update',function(req,res){
  pro.find({username:req.session.key},function(err,data){ //empty list will fetch all items, if we wish to find specific item we specify them in {}
    if(err) throw err;
    res.render('updatelist',{prolist: data[0],request:"update"});
}
);
});

app.post('/update',urlencodedParser,function(req,res){
  pro.find({username:req.session.key},function(err,data){ //empty list will fetch all items, if we wish to find specific item we specify them in {}
    if(err) throw err;
    req.session.a=req.body;
    res.status(201).end();
}
);
});

app.get('/updatepage',function(req,res){
  pro.find({username:req.session.key},function(err,data){ //empty list will fetch all items, if we wish to find specific item we specify them in {}
    if(err) throw err;
    res.render('updatepage',{task:req.session.a.item});
}
);
});

app.post('/updatepage',urlencodedParser,function(req,res){
  /* it's working baby!*/
  var a={item:req.body.item,date:new Date(req.body.date)};
  var d=new Date();
  var section,subject;
  d.setTime(Date.parse(req.session.a.date,"YYYY-MM-DDTHH:mm:ss.sss+HH:mm"));
  pro.find({username:req.session.key},function(err,data){
    data.forEach(function(item){
      item.task.forEach(function (task){
        task.a.forEach(function(b){
          if(b.item===a.item)
          {
            b.date=d;
          }
        });
      });
    });
    pro.save(data);
  });
  /*pro.find({username:req.session.key}).forEach(function (data){
    data.task.forEach(function(item){
      item.a.forEach(function (task){
        if(task.item===a.item)
        {
          task.date=d;
        }
      });
    });
    pro.save(data);
  });*/
  a.subject=subject;
  pro.updateMany({role:"student",task:{$elemMatch:{item:req.session.a.item,subject:subject}}},{ $set: {"task.$" : a}},function(err,data){
    if(err)
    throw err;
    else {
      pro.find({username:req.session.key},function(err,data){
        if(err)
          throw err;
        else
          res.status(201).end();
     });
    }
  });
});

app.get('/deletetask',function(req,res){
pro.find({username:req.session.key},function(err,data){ //empty list will fetch all items, if we wish to find specific item we specify them in {}
  if(err) throw err;
  res.render('updatelist',{prolist:data[0],request:"delete"});
}
);
});

app.delete('/deletetask/:item',function(req,res){
pro.updateOne({username:req.session.key},{$pull:{task:{item:req.params.item}}},function(err,data){
    if(err)
     throw err;
    else
    {
      pro.updateMany({role:"student"},{$pull:{task:{item:req.params.item}}},function(err,data){
        if(err)
         throw err;
        else {
          pro.find({username:req.session.key},function(err,data){
            if(err)
              throw err;
            else
              res.status(201).end();
          });
        }
      });
    }
  });
});
app.get('/search',function(req,res){
  pro.find({username:req.session.key},function(err,data){
    if (err)
    return err;
    var re = new RegExp(req.session.reg);
    var a=data[0].task.filter(function(c){
      if(re.test(c.item)==true)
        return c;
    });
    data[0].task=a;
    res.render('prolist',{prolist:data[0]});
  });
});

app.post('/searchtask',urlencodedParser,function(req,res){
  req.session.reg=req.body.task;
  pro.find({username:req.session.key},function(err,data){
    if (err)
    return err;
    var re = new RegExp(req.session.reg);
    var a=data[0].task.filter(function(c){
      if(re.test(c.item)==true)
        return c;
    });
    data[0].task=a;
    if(data[0].task.length==0)
      return res.status(404).end();
    res.status(201).end();
    });
});
};
