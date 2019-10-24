$(document).ready(function(){
  $('form').on('submit', function(){

      var i = $(".updatetask:checked").val();
      var item = {task: i};
      $.ajax({
        type: 'POST',
        url: '/update',
        data: item,
        success: function(data){
          window.location='http://127.0.0.1:3000/updatepage'
        }
      });
      return false;
  });
});
