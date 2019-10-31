$(document).ready(function(){
  $('form').on('submit', function(){
      var pro;
      var item = $('#item');
      var date = $('#date');
      var subject = $('#subject');
      var section = $('#section');
      if(item.val=='assignment')
      {
        var file = $('#file');
        pro = {item: item.val(),date:date.val(),section:section.val(),subject:subject.val(),file:file.val()};
      }
      else
      {
        var portion = $('#portion');
        pro = {item: item.val(),date:date.val(),section:section.val(),subject:subject.val(),portion:portion.val()};
      }
      $.ajax({
        type: 'POST',
        url: '/pro',
        data: pro,
        success: function(data){
            window.location='http://127.0.0.1:3000/pro';
            //window.location='http://127.0.0.1:3000/teacherprolist';
          }
      });
      return false;
  });
});
