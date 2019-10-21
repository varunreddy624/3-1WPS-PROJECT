$(document).ready(function(){
  $('p').on('click', function(){
      console.log('i am here');
      var item = $(this).text().replace(/ /g, "-"); // replaces space with '-'
      $.ajax({
        type: 'DELETE',
        url: '/prolist/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });
});
