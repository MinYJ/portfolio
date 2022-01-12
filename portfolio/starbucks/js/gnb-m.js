// gnb-m
'use strict'

$('li.gnb-btn').on('click', function() {
  $('#header').addClass('show');
  $('#main').addClass('move');
  $('#footer').addClass('move');
});

$('a.btn-close').on('click', function() {
  $('#header').removeClass('show');
  $('#main').removeClass('move');
  $('#footer').removeClass('move');
});

$('#gnb > ul > li').each(function() {
  var firstDepthNumSub = $(this).find('> ul > li').length;
  console.log('firstDepthNumSub: ' + firstDepthNumSub);
  if (firstDepthNumSub > 0) {
    $(this).find('> a').append('<img class="mobile" src="./img/common/m_gnb_arrow_down_w.png" alt="화살표 아래 하얀색"></img>');
  }
});

$('#gnb > ul > li > ul > li').each(function() {
  var secondDepthNumSub = $(this).find('> ul > li').length;
  console.log('secondDepthNumSub: ' + secondDepthNumSub);
  if (secondDepthNumSub > 0) {
    $(this).find('> a').append('<img class="mobile" src="./img/common/m_gnb_arrow_down_g.png" alt="화살표 아래 회색"></img>');
  }
});


var checkIndex = -1;
$('#gnb > ul > li > a').on('click', function(e) {
  if ($(window).width() < 1024 && $(this).next().find('li').length > 0) {
    e.preventDefault();
    var index = $('#gnb > ul > li').index($(this).parent());
    console.log('gnb-index: ' + index);
    if (checkIndex === index) {
      $(this).next().css({'height': '0px'});
      $(this).find('img').attr({'src': './img/common/m_gnb_arrow_down_w.png', 'alt':'화살표 아래 하얀색'})
      checkIndex = -1;
    } else {
      var height = 0;
      var thirdDepthHeight = 0;
      $(this).next().find('li > a').each(function(i) {
        height += $(this).outerHeight(true);
        console.log(i + '/' + height);
      });
      $(this).next().find('li > ul > li > a').each(function(i) {
        thirdDepthHeight += $(this).outerHeight(true);
        console.log(i + '/' + thirdDepthHeight);
      });

      $(this).next().css({'height': (height - thirdDepthHeight) + 'px'});
      $(this).find('img').attr({'src': './img/common/m_gnb_arrow_up_w.png', 'alt':'화살표 아래 하얀색'});

      $(this).parent().siblings().find('ul').css({'height': 0});
      $(this).parent().siblings().find('> a > img').attr({'src': './img/common/m_gnb_arrow_down_w.png', 'alt':'화살표 아래 하얀색'});

      checkIndex = index;
    }
  }
});

var secondDepthCheckIndex = -1;
var gnbSecondDepthUlHeight = 0;
var gnbThirdDepthUlHeight = 0;
$('#gnb > ul > li > ul > li > a').on('click', function(e) {
  if ($(window).width() < 1024 && $(this).next().find('li').length > 0) {
    e.preventDefault();
    var index = $('#gnb > ul > li > ul > li').index($(this).parent());
    var firstDepthtIndex = $('#gnb > ul > li').index($(this).parent().parent().parent());
    console.log('gnb-index: ' + index);
    if (secondDepthCheckIndex === index) {
      $(this).next().css({'height': '0px'});
      $(this).find('img').attr({'src': './img/common/m_gnb_arrow_down_g.png', 'alt':'화살표 위 회색'})
      gnbSecondDepthUlHeight -= gnbThirdDepthUlHeight;
      $('#gnb > ul > li' + ':nth-child(' + (firstDepthtIndex + 1) +')' + '> ul').css({'height': gnbSecondDepthUlHeight + 'px'});
      secondDepthCheckIndex = -1;
    } else {
      var height = 0;
      $(this).next().find('li > a').each(function(i) {
        height += $(this).outerHeight(true);
        console.log(i + '/' + height);
      });
      $(this).next().css({'height': (height) + 'px'});
      gnbSecondDepthUlHeight = $('#gnb > ul > li' + ':nth-child(' + (firstDepthtIndex + 1) +')' + '> ul').height() + height;
      gnbThirdDepthUlHeight = height;
      $('#gnb > ul > li' + ':nth-child(' + (firstDepthtIndex + 1) +')' + '> ul').css({'height': gnbSecondDepthUlHeight + 'px'});
      $(this).find('img').attr({'src': './img/common/m_gnb_arrow_up_g.png', 'alt':'화살표 아래 회색'});

      $(this).parent().siblings().find('ul').css({'height': 0});
      $(this).parent().siblings().find('> a > img').attr({'src': './img/common/m_gnb_arrow_down_g.png', 'alt':'화살표 아래 회색'});

      secondDepthCheckIndex = index;
    }
  }
});

// $('#gnb').on('focusin', function() {
//   $(this).find('> a').trigger('click');
// });

$(window).on('resize', function() {
  if ($(window).width() >= 1024) {
    $('#gnb > ul > li > ul').removeAttr('style');
    $('#gnb > ul > li > a > img').attr({'src': './img/common/m_gnb_arrow_down_w.png'})
    $('#gnb > ul > li > ul > li > ul').removeAttr('style');
    $('#gnb > ul > li > ul > li > a > img').attr({'src': './img/common/m_gnb_arrow_down_g.png'})
    $('#header').removeClass('show');
    $('#main').removeClass('move');
    $('#footer').removeClass('move');
    checkIndex = -1;
    secondDepthCheckIndex = -1;
  }
});
