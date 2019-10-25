$(document).ready(function(){
  $('form').on('submit', function(){

      var item = $('#gettask');
      var pro = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/searchtask',
        data: pro,
        success: function(data){
          //alert('successfully added task');
          window.location='http://127.0.0.1:3000/prolist'
        }
      });
      return false;
  });
});
