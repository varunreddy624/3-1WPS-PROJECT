$(document).ready(function(){
  $('form').on('submit', function(){
      var pro;
      var item = $('#item');
      var date = $('#date');
      var subject = $('#subject');
      var section = $('#section');
      var filename = $('#filename');
      if(item.val()=='assignment')
      {
        pro = {item: item.val(),date:date.val(),section:section.val(),subject:subject.val(),filename:filename.val()};
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
          if(item.val()=='assignment')
          {
            window.location='http://127.0.0.1:3000/assignment';
            //window.location='http://127.0.0.1:3000/teacherprolist';
          }
          else {
            window.location='http://127.0.0.1:3000/pro';
          }
      }
    });
      return false;
  });
});
