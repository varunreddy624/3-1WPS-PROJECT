$(document).ready(function(){
  $('form').on('submit', function(){

      var i = $(".updatetask:checked").val();
      $.ajax({
        type: 'DELETE',
        url: '/deletetask/'+i,
        success: function(data){
          window.location='http://127.0.0.1:3000/prolist'
        }
      });
      return false;
  });
});
