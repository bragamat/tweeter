$(document).ready(function(){
  $("textarea").keyup(function(){
    let count = $(this).val().length;
    let length = 140 - count;
    $(".counter").html(length);
    if(length >= 0) {
     $(".counter").css('color', 'black');
    } else {
      $(".counter").css('color', 'red').html(`<strong>${length}</strong>`);
    }
  })
});
