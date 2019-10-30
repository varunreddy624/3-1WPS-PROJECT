var mongoose = require('mongoose');
var email = require('nodemailer');
var node = require('node-schedule');


//Connect to the data base
mongoose.connect("mongodb+srv://test:test1234@todo-qqfes.mongodb.net/test?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true });
var pro = mongoose.model('signup');

//create a schema (Blue print)
module.exports = function(app){
  var sendEmail = node.scheduleJob('*/1 * * * *', function(){
    pro.find({},function(err,data){
      if(err) throw err;
      for(var j=0;j<data.length;j++)
      {
        if(data[j].role=='student')
        {
          var date = new Date();
          var text="";
          const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
          for(var i=0;i<data[j].task.length;i++)
          {
            if(data[j].task[i].date>date)
              text=text+ data[j].task[i].item + '  -  ' + data[j].task[i].date.getDate() + "th of " + monthNames[data[j].task[i].date.getMonth()] + "," + data[j].task[i].date.getFullYear() + '\n';
          }
          var transporter = email.createTransport({
          service: 'gmail',
          auth: {
            user: 'varunreddyforever@gmail.com',
            pass: 'HAPPYUGADI@101'
          }
          });
          var mailOptions = {
            from: 'varunreddyforever@gmail.com',
            to: data[j].emailid,
            subject: 'Super procrastinator',
            text: "following tasks are incomplete\n"+text+"\n"+ "for more info visit our website here\n http://127.0.0.1:3000/pro"
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: to'+data[j].emailid);
            }
          });
        }
      }
    });
  });
};
