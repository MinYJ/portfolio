// gnb-pc
'use strict';

$('#gnb > ul > li > a').on('mouseenter', function() {
  var index = $('#gnb > ul > li').index($(this).parent());
  console.log('index: ' + index);
  showMenu(index + 1);

});

$('#header').on('mouseleave', function() {
  $('#gnb > ul > li > ul').removeClass('open');
  $('#gnb > ul > li > ul > li').removeClass('open');
  $('#gnb > ul > li > div.txt-box').removeClass('open');
  $('#header').removeClass('open');
});

function showMenu(n) {
  $('#header').addClass('open');
  $('#gnb > ul > li > ul').removeClass('open');
  $('#gnb > ul > li:eq(' + (n - 1) + ') > ul').addClass('open');
  $('#gnb > ul > li > ul > li').removeClass('open');
  $('#gnb > ul > li:eq(' + (n - 1) + ') > ul > li').addClass('open');
  $('#gnb > ul > li > div.txt-box').removeClass('open');
  $('#gnb > ul > li:eq(' + (n - 1) + ') > div.txt-box').addClass('open');
}

$('#gnb > ul > li > a').on('focusin', function() {
  var index = $('#gnb > ul > li').index($(this).parent());
  console.log('index: ' + index);
  showMenu(index + 1);
  
});

$('#gnb > ul > li:last-child > div.txt-box > p.txt-down').on('focusout', function() {
  $('#gnb > ul > li > ul').removeClass('open');
  $('#gnb > ul > li > ul > li').removeClass('open');
  $('#gnb > ul > li > div.txt-box').removeClass('open');
  $('#header').removeClass('open');
});

