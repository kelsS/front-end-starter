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
