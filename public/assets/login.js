$(document).ready(function(){
  $('form').on('submit', function(){

      var username = $('#username');
      var password = $('#password');
      var login = {username: username.val(),password: password.val()};

      $.ajax({
        type: 'POST',
        url: '/',
        data: login,
        success: function(data){
          if(data.role==='teacher'){
          window.location='http://127.0.0.1:3000/pro'
          }
          else{
            window.location='http://127.0.0.1:3000/prolist'
          }
        },
        error: function(){
          alert('invalid credentials');
          location.reload();
        }
      });
      return false;
  });
});
