$(document).ready(function(){
    $("#quiz").change(function (){
      $('#show').show();
      $('#quizfield').show();
      $('#assignmentfield').hide();
      $('#Form').action="";
      $('#Form').method="";
      $('#Form').enctype="";
      $('#Form').on('submit', function(){
        var date = $('#date');
        var subject = $('#subject');
        var section = $('#section');
        var portion = $('#portion');
        var pro = pro = {item: "quiz",date:date.val(),section:section.val(),subject:subject.val(),portion:portion.val()};
        $.ajax({
            type: 'POST',
            url: '/pro',
            data: pro,
            success: function(data){
                window.location='http://127.0.0.1:3000/pro';
          }
        });
        return false;
      });
    });
    $("#assignment").change(function (){
      $('#show').show();
      $('#quizfield').hide();
      $('#assignmentfield').show();
  });
});
