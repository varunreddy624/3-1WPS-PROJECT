$(document).ready(function(){
  $('#quiz').hide();
  $("#item").change(function (){
         var item = $( "#item option:selected" ).val();
         if(item=='assignment'){
            $('#quiz').hide();
          }
         else{
            $('#quiz').show();
          }
      });
});
