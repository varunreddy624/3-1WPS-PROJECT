$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('#Input');
      var todo = {item: item.val()};
      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          location.reload();
        }
      });
      return false;
  });

  $('li').on('click', function(){
      var item = $(this).text();
      var todo = {item:item};
      $.ajax({
        type: 'POST',
        url: '/tododelete',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });
});
