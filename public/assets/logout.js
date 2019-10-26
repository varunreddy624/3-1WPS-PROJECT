$(document).ready(function(){
  $('#logout').on('click', function(){
      $.ajax({
        type: 'DELETE',
        url: '/logout',
        success: function(data){
          //do something with the data via front-end framework
          window.location ='http://127.0.0.1:3000/'
        }
      });
  });
});
