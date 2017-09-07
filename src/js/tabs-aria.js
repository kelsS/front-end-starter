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