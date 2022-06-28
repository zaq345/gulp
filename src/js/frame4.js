$(document).ready(function(){
  $('.frame4__slider').slick({
    dots: 0,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: $('.frame4__slider-prev-btn'),
    nextArrow: $('.frame4__slider-next-btn'),
  });

  $(".frame4__menu-item").on('click', function(){
    var filter = $(this).data('filter');
    $(".frame4__slider").slick('slickUnfilter');

    // console.log("click-event, filter = "+filter);
    
    if(filter == 'Male' || 'Female' || 'Kids'){
      // console.log("Male click-event");
      // $(".frame4__slider").slick('slickFilter','.frame4__slider-card_Male');
      $(".frame4__slider").slick('slickFilter', function() {
        return $('[data-filter="'+filter+'"]', this).length === 1;
      })
    }
    // else if(filter == 'Female'){
    //   // console.log("Female click-event");
    //   $(".frame4__slider").slick('slickFilter',function() {
    //     return $('[data-filter="'+filter+'"]', this).length === 1;
    //   })
    // }
    // else if(filter == 'Kids'){
    //   // console.log("Kids click-event");
    //   $(".frame4__slider").slick('slickFilter',function() {
    //     return $('[data-filter="'+filter+'"]', this).length === 1;
    //   })
    // }
    /*else*/ if(filter == 'All'){
      // console.log("All click-event");
      $(".frame4__slider").slick('slickUnfilter');
    }
    
  })

});