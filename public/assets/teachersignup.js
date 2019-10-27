$(document).ready(function(){
  $('form').on('submit', function(){

      var username = $('#username');
      var emailid = $('#emailid');
      var password = $('#password');
      var task={};
      for(var i=1;i<=6;i++)
      {
        var a=$("#section"+toString(i));
        var b=$("#subject"+toString(i));
        if(a.is(":checked"))
        {
          task.section=a.val();
          task.subject=b.val();
        }
      }
      var signup = {username: username.val(),emailid: emailid.val(),password: password.val(),role:"teacher",task:task};

      $.ajax({
        type: 'POST',
        url: '/teachersignup',
        data: signup,
        success: function(data){
          alert('created account successfully, now return to login page');
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
