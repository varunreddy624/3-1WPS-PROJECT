$(document).ready(function(){
  $('form').on('submit', function(){

      var item = $('#item');
      var date = $('#date');
      var pro = {item: item.val(),date:date.val()};

      $.ajax({
        type: 'POST',
        url: '/updatepage',
        data: pro,
        success: function(data){
          //alert('successfully added task');
          window.location='http://127.0.0.1:3000/teacherprolist'
        }
      });
      return false;
  });
});
