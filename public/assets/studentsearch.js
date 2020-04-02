$(document).ready(function(){
  $('#searchtask').click(function(){

      var item = $('#gettask');
      var pro = {task: item.val()};
      $.ajax({
        type: 'POST',
        url: '/studentsearchtask',
        data: pro,
        credentials: 'include',
        success: function(data){
          //alert('successfully added task');
          window.location='http://127.0.0.1:3000/studentsearch'
        },
        error: function(){
          alert('no task found');
          window.location='http://127.0.0.1:3000/studentprolist'
        }
      });
      return false;
  });
});
