$(document).ready(function(){
  $('#quiz').hide();
  $('#assignment').hide();
  $("#item").change(function (){
         var item = $( "#item option:selected" ).val();
         if(item=='assignment'){
            $('#assignment').show();
            $('#quiz').hide();
          }
         else{
            $('#quiz').show();
            $('#assignment').hide();
          }
      });
});
