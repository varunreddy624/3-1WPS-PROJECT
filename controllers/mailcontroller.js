var mongoose = require('mongoose');
var email = require('nodemailer');
var node = require('node-schedule');
var async = require("async");


mongoose.connect("mongodb+srv://test:test1234@todo-qqfes.mongodb.net/test?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true });
var pro = mongoose.model('signup');

//create a schema (Blue print)
module.exports = function(app){
  var sendEmail = node.scheduleJob('*/1 * * * *', function(){
    var transporter = email.createTransport({
    service: 'gmail',
    auth: {
      user: 'varunreddyforever@gmail.com',
      pass: 'HAPPYUGADI@101'
    }
  });
    var date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    pro.find({},function(err,data){
      if(err) throw err;
    async.each(data, function(student, callback){
        if(student.role=='student')
        {
          var text="";
          async.each(student.task,function(a,callback){
            if(a.date>date)
              text=text+ a.item + '  -  ' + a.date.getDate() + "th of " + monthNames[a.date.getMonth()] + "," + a.date.getFullYear() + '\n';
          });
          var mailOptions = {
            from: 'varunreddyforever@gmail.com',
            to: student.emailid,
            subject: 'Super procrastinator',
            text: "following tasks are incomplete\n"+text+"\n"+ "for more info visit our website here\n http://127.0.0.1:3000/"
          };
          transporter.sendMail(mailOptions);
        }
      });
    });
  });
};
