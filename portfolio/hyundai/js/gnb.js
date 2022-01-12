'use strict'
// gnb
$('#header #gnb').on('mouseenter', function() {
  $('#header').addClass('open');
});

$('#header #gnb').on('mouseleave', function() {
  $('#header').removeClass('open');
});

$('#gnb').on('focusin', function() {
  $('#header').addClass('open');
});

$('#gnb').on('focusout', function() {
  $('#header').removeClass('open');
});

$('#header a.menu').on('click', function() {
  $('#gnb').addClass('open');
  $('div.mask').addClass('open');
})

$('#header div.mask').on('click', function() {
  $('#gnb').removeClass('open');
  $('div.mask').removeClass('open');
});

$('#gnb > ul > li').each(function() {
  var numSub = $(this).find('> ul > li').length;
  console.log(numSub);
  if (numSub > 0) {
    $(this).find('> a').append('<i class="fas fa-plus mobile"><span>열림</span></i>');
  }
});

var checkIndex = '';
$('#gnb > ul > li > a').on('click', function(e) {
  if ($(window).width() < 1024 && $(this).next().find('li').length > 0) {
    e.preventDefault();
    var index = $('#gnb > ul > li').index($(this).parent());
    console.log(index);
    if (checkIndex === index) {
      $(this).next().css({'height': '0px'});
      $(this).find('i').attr({'class': 'fas fa-plus mobile'});
      checkIndex = '';

    } else {
      var height = 0;
      $(this).next().find('li').each(function() {
        height += $(this).outerHeight(true);
      });
      $(this).next().css({'height': height + 'px'});
      $(this).find('i').attr({'class': 'fas fa-minus mobile'});

      $(this).parent().siblings().find('ul').css({'height': 0});
      $(this).parent().siblings().find('> a i').attr({'class': 'fas fa-plus mobile'});
      
      checkIndex = index;
    }
  }
});

$(window).on('resize', function() {
  if ($(window).width() >= 1024) {
    $('#gnb > ul > li > ul').removeAttr('style');
    $('#gnb').removeClass('open');
    $('#gnb').find('i').attr({'class': 'fas fa-plus mobile'});
    $('#header div.mask').removeClass('open');
  }
});