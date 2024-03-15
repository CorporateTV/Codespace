function irsegundaPagina() {
  window.scroll({top: window.innerHeight,behavior:'smooth'})
}



$('.navbar .container ul a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    var id = $(this).attr('href'),
    targetOffset = $(id).offset().top;
      
    $('html, body').animate({ 
      scrollTop: targetOffset - 100
    }, 500);
  });
