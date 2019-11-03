var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');

var conn = mongoose.createConnection("mongodb+srv://test:test1234@todo-qqfes.mongodb.net/test?retryWrites=true&w=majority");


var pro = mongoose.model('signup');

let gfs;
conn.once('open',function(){
  //Init Stream
  gfs = Grid(conn.db,mongoose.mongo);
  gfs.collection('uploads');
});

//create storage engine
/*var storage = new GridFsStorage({
  url: 'mongodb+srv://test:test1234@todo-qqfes.mongodb.net/test?retryWrites=true&w=majority',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      var filename = req.session.s+path.extname(file.originalname);
      filename=filename.trim();
    const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
    });
  }
});*/

var storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, './public/uploads');
     },
     filename: function(req, file, callback) {
       callback(null, file.originalname);
     }
 });

 var upload = multer({storage:storage});


//const upload = multer({ storage });

//var data = [{item : 'get milk'},{item:'walk dog'},{item:'kick some coding ass'},{item: 'itemmmm'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

  app.get('/assignment',function(req,res){
    res.render('assignment');
  });

  app.post('/upload', upload.single('file'), (req, res) => {
  res.render('pro');
});

  app.get('/pro',function(req,res){
    pro.find({username:req.session.key},function(err,data){
    if(data[0].role==='teacher')
    res.render('pro');
  else
    res.render('prolist',{prolist:data[0]});
  });
  });

  app.post('/pro',urlencodedParser,function(req,res){
      console.log(req.body);
      var a={item:req.body.item,date:new Date(req.body.date),portion:req.body.portion,file:req.body.filename};
      req.session.s=JSON.stringify({username:req.session.key,section:req.body.section,date:new Date(req.body.date)});
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
  var d;
  var a={item:req.body.item,date:new Date(req.body.date)};
  var d=new Date();
  var section,subject;
  d.setTime(Date.parse(req.session.a.date,"YYYY-MM-DDTHH:mm:ss.sss+HH:mm"));
  pro.find({username:req.session.key},function(err,data){
    data.forEach(function(item){
      item.task.forEach(function (x){
        x.a.forEach(function(b){
          if(b.item===a.item)
          {
            b.date=a.date;
          }
        });
      });
    });
    d=data[0];
  var n = pro(d).save(function(err,data){
    if(err) throw err;
  });
});
  a.subject=subject;
  pro.updateMany({role:"student",task:{$elemMatch:{item:req.session.a.item}}},{ $set: {"task.$" : a}},function(err,data){
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

app.post('/deletetask',urlencodedParser,function(req,res){
  var d;
  pro.find({username:req.session.key},function(err,data){
    data.forEach(function(item){
      item.task.forEach(function (x){
        d=x.a.filter(function(c){
          if(c.item!=req.body.item)
            return c;
        });
        x.a=d;
      });
    });
    d=data[0];
    var n = pro(d).save(function(err,data){
      if(err) throw err;
    });
  });
      pro.updateMany({role:"student"},{$pull:{task:{item:req.body.item}}},function(err,data){
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
app.get('/studentsearch',function(req,res){
  pro.find({username:req.session.key,role:"student"},function(err,data){
    if (err)
    return err;
    var re = new RegExp(req.session.reg);
    var a=data[0].task.filter(function(c){
      if(re.test(c.item)==true)
        return c;
    });
    data[0].task=a;
    res.render('studentprolist',{prolist:data[0]});
  });
});

app.post('/studentsearchtask',urlencodedParser,function(req,res){
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

app.get('/teachersearch',function(req,res){
  var d;
  var re = new RegExp(req.session.reg);
  pro.find({username:req.session.key},function(err,data){
    data.forEach(function(item){
      item.task.forEach(function (x){
        d=x.a.filter(function(c){
          if(re.test(c.item)==true)
            return c;
        });
        x.a=d;
      });
    });
    d=data[0];
    res.render('teacherprolist',{prolist:d});
  });
});

app.post('/teachersearchtask',urlencodedParser,function(req,res){
  req.session.reg=req.body.task;
  var f,d;
  var re = new RegExp(req.session.reg);
  pro.find({username:req.session.key},function(err,data){
    data.forEach(function(item){
      item.task.forEach(function (x){
        f=x.a.filter(function(c){
          if(re.test(c.item)==true)
            return c;
        });
        x.a=f;
      });
    });
    if(f.length==0)
      return res.status(404).end();
    res.status(201).end();
    });
  });
};
