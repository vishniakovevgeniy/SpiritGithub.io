$(document).ready(function(){
  $('.slider').bxSlider({
    mode: 'fade',
    autoDirection: 'next',
  });
});

$(document).ready(function(){
  $('.view').hover(
    function() {
      $( this ).addClass('');
    }, function() {
      $( this ).removeClass('');
    }
  );
});
