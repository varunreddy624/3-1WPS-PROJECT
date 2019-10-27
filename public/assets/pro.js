$(document).ready(function(){
  $('form').on('submit', function(){

      var item = $('#item');
      var date = $('#date');
      var subject = $('#subject');
      var section = $('#section');
      var pro = {item: item.val(),date:date.val(),section:section.val(),subject:subject.val()};

      $.ajax({
        type: 'POST',
        url: '/pro',
        data: pro,
        success: function(data){
            window.location='http://127.0.0.1:3000/teacherprolist';
          }
      });
      return false;
  });
});
