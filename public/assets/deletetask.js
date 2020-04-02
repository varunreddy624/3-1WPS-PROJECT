$(document).ready(function(){
  $('form').on('submit', function(){
      var i = $(".updatetask:checked").val();
      var item = JSON.parse(i);
      $.ajax({
        type: 'POST',
        url: '/deletetask',
        data: item,
        success: function(data){
          window.location='http://127.0.0.1:3000/teacherprolist'
        }
      });
      return false;
  });
});
