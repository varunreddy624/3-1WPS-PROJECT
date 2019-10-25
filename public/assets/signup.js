$(document).ready(function(){
  $('form').on('submit', function(){

      var username = $('#username');
      var emailid = $('#emailid');
      var password = $('#password');
      var role = $('#role');
      var signup = {username: username.val(),emailid: emailid.val(),password: password.val(),role:role.val()};

      $.ajax({
        type: 'POST',
        url: '/signup',
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
