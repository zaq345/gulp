$(document).ready(function(){
  $('.frame4__slider').slick({
    dots: 0,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: $('.frame4__slider-prev-btn'),
    nextArrow: $('.frame4__slider-next-btn'),
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }, {
      breakpoint: 550,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });

  $(".frame4__menu-item").on('click', function(){
    var filter = $(this).data('filter');
    $(".frame4__slider").slick('slickUnfilter');
    
    if(filter == 'Male' || 'Female' || 'Kids'){
      $(".frame4__slider").slick('slickFilter', function() {
        return $('[data-filter="'+filter+'"]', this).length === 1;
      })
    }
    if(filter == 'All'){
      $(".frame4__slider").slick('slickUnfilter');
    }
    
  })

});