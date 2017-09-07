/*
*** SLIDER ***
*/


$(document).ready(function() {
    $('.slick-slider').slick({
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    // cssEase: 'linear',
    autoplay: true, 
    autoplaySpeed: 2000,
    lazyLoad: 'progressive',
    centerMode: true,
    arrows: true,
    prevArrow:'<span aria-hidden="true" class="next fa fa-angle-left"></span>',
    nextArrow:'<span aria-hidden="true" class="prev fa fa-angle-right"></span>',
  });
});

$('.pause').on('click', function() {
    $('.slick-slider').slick('slickPause');
});

$('.play').on('click', function() {
    $('.slick-slider').slick('slickPlay');
});

    