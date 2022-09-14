$(document).ready(function(){
  $('.frame1__slider').slick({
    dots: 0,
    fade: true,
    cssEase: 'linear',
    prevArrow: $('.frame1__slider-prev-btn'),
    nextArrow: $('.frame1__slider-next-btn'),
  });
});
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
$(document).ready(function(){
  $('.frame5__slider').slick({
    dots: 0,
    fade: true,
    cssEase: 'linear',
    prevArrow: $('.frame5__slider-prev-btn'),
    nextArrow: $('.frame5__slider-next-btn'),
  });
});
// $(document).ready(function(){
//   $('.slider').slick({
//     dots: true
//   });
// });