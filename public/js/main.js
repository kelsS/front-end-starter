/*
*** HOME ***
*/
/*
*** GLOBAL ***
*/

$(document).ready(function() {
    mainNavToggle();
    subNavToggle();
    tabsInit();
    vpmDropDown();
    jwplayerInit();

    $('#accordion').on('hidden.bs.collapse', toggleIcon);
    $('#accordion').on('shown.bs.collapse', toggleIcon);
    $( "#tabs" ).tabs();
    $( ".jq-accordion" ).accordion({
      collapsible: true
    });

    $('#search-table').dataTable();
    $('[data-toggle="tooltip"]').tooltip();
    $('.slick-modal').slickLightbox();
    $('select.select-multiple').multipleSelect();

});

function mainNavToggle() {
    $('#main-toggle-container').click(function(e) {
        e.preventDefault();
        $('body').toggleClass('mob-open');
        console.log("clicked main nav");
    });
    $('#quicklinkmenu .menu_head').click(function(e) {
        e.preventDefault();
        $('body').toggleClass('ql-open');
    });
}

function subNavToggle() {
    $('#subnav-toggle').click(function(e) {
        e.preventDefault();
        $('body').toggleClass('subnav-open');
    });

    $('.list-toggle').click(function(e) {
        e.preventDefault();
        $(this).parent().toggleClass('list-item-open');
    });
}   

function toggleIcon(e) {
    $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('glyphicon-plus glyphicon-minus')

        .prev('.card-header')
        .find(".more-less")
        .toggleClass('fa-plus fa-minus');
}

function tabsInit() {

    $('#tabs-nav li:first-child').addClass('active');
    $('.content').hide();
    $('.content:first').show();

    $('#tabs-nav li').click(function(){
      $('#tabs-nav li').removeClass('active');
      $(this).addClass('active');
      $('.content').hide();
      
      var activeTab = $(this).find('a').attr('href');
      $(activeTab).fadeIn();
      return false;
    });
}

function jwplayerInit() {
    jwplayer('embed-jwplayer').setup({
        file: 'http://vpmdev.com/pg/steven/rabbit-demo.mp4',
        autostart: 1,
        primary: "html5",
    });
}

function vpmDropDown() {
    $('.dropdown-vpm').on('keypress click',function(e){
        if (e.which === 13 || e.type === 'click') {
            e.preventDefault();
            $(this).parents('.drop-container').toggleClass('open');
        };
        if (e.type === 'click') {
            $(this).blur();
        };
    });
}

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

    
/*
*** TABS - ARIA ***
*/

"use strict";

var initTabPanel = function() {
    $('.tablist > li')
        .keydown(tabListKeyPress)
        .click(tabListClick);
}

var tabListKeyPress = function(event) {
    if (event.which === 37 || event.which === 38 || 
        (event.which === 33 && event.ctrlKey)) { //left/up/ctrl+pageup
        var prevItem = $(event.currentTarget).prev("li");
        if (prevItem.length > 0) {
            focusTab(prevItem);
			event.preventDefault(); 
        } else {
            //go to the last one
            var lastItem = $(event.currentTarget).siblings("li").last();
            focusTab(lastItem);
			event.preventDefault(); 
        }
    } else if (event.which === 39 || event.which === 40 || 
               (event.which === 34 && event.ctrlKey)) { //right/down/ctrl+pagedown
        var nextItem = $(event.currentTarget).next("li");
        if (nextItem.length > 0) {
            focusTab(nextItem);
			event.preventDefault(); 
        } else {
            //go to the first one
            var firstItem = $(event.currentTarget).siblings("li").first();
            focusTab(firstItem);
			event.preventDefault(); 
        }

    }
}

var tabListClick = function(event) {
    focusTab($(event.currentTarget));
}

var focusTab = function(newTab) {
    // Identify existing focus tab and: 1) Unset aria-selected, 2) set tabindex=-1, 3) replace
    // active class with inactive on both the tab and the panel, 4) set aria-hidden on panel
    var activeTab = $('.tablist > li.active');
    
    activeTab
        .addClass("inactive")
        .removeClass("active")
        .attr("aria-selected", "false")
        .attr("tabindex", "-1");

    $("#" + activeTab.attr("aria-controls"))
        .addClass("inactive")
        .removeClass("active")
        .attr("aria-hidden", "true");

    // For newly focused tab: 1) Set aria-selected, 2) set tabindex=0, 3) replace inactive class
    // with active on both tab and panel, 4) unset aria-hidden on panel
    
    newTab
        .addClass("active")
        .removeClass("inactive")
        .attr("aria-selected", "true")
        .attr("tabindex", "0");

    $("#" + newTab.attr("aria-controls"))
        .addClass("active")
        .removeClass("inactive")
        .attr("aria-hidden", "false");

    newTab.focus();
}

$(document).ready(initTabPanel);