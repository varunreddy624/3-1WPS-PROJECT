$(document).ready(function(){
  $('form').on('submit', function(){

      var username = $('#username');
      var emailid = $('#emailid');
      var password = $('#password');
      var task=[];
      for(var i=1;i<=6;i++)
      {
        var d={};
        var a=$('#section'+i.toString());
        var b=$('#subject'+i.toString());
        if(a.is(":checked"))
        {
          d.section=a.val();
          d.subject=b.val();
          task.push(d);
        }
      }
      var signup = {username: username.val(),emailid: emailid.val(),password: password.val(),task:task,role:"teacher"};
      $.ajax({
        type: 'POST',
        url: '/teachersignup',
        data: {body:JSON.stringify(signup)},
        dataType: 'json',
        success: function(data){
          alert('created teacher account successfully, now return to login page');
          window.location='http://127.0.0.1:3000/'
        },
        error: function(){
           alert('user already exists please provide new username');
           location.reload();
        }
      });
      return false;
  });
});
