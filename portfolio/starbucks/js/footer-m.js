'use strict'
var isUnder650 = true;

if ($(window).width() < 650) {
  $('#footer div.top > nav > ul > li').each(function() {
    var firstDepthNumSub = $(this).find('> ul > li').length;
    console.log('footerfirstDepthNumSub: ' + firstDepthNumSub);
    if (firstDepthNumSub > 0) {
      $(this).find('> a').append('<img class="under-650" src="./img/common/m_footer_arrow_down_w.png" alt="하얀색 아래 화살표">');
    }
  });
  isUnder650 = false;
}

$(window).on('resize', function() {
  if ($(window).width() < 650) {
    if (isUnder650 === true) {
      $('#footer div.top > nav > ul > li').each(function() {
        var firstDepthNumSub = $(this).find('> ul > li').length;
        console.log('footerfirstDepthNumSub: ' + firstDepthNumSub);
        if (firstDepthNumSub > 0) {
          $(this).find('> a').append('<img class="under-650" src="./img/common/m_footer_arrow_down_w.png" alt="하얀색 아래 화살표">');
        }
      });
      isUnder650 = false;
    }
  }
});


$('#footer div.top > nav > ul > li > ul > li').each(function() {
  var secondDepthNumSub = $(this).find('> ul > li').length;
  console.log('footersecondDepthNumSub: ' + secondDepthNumSub);
  if (secondDepthNumSub > 0) {
    $(this).find('> a').append('<img class="under-650" src="./img/common/m_footer_arrow_down_g.png" alt="회색 아래 화살표">')
  }
});

var footerCheckIndex = -1;
$('#footer div.top > nav > ul > li > a').on('click', function(e) {
  if ($(window).width() < 650 && $(this).next().find('li').length > 0) {
    var index = $('#footer div.top > nav > ul > li').index($(this).parent());
    console.log('footer-index: ' + index);
    if (footerCheckIndex === index) {
      $(this).next().css({'height': '0px'});
      $(this).find('img').attr({'src': './img/common/m_footer_arrow_down_w.png', 'alt':'하얀색 아래 화살표'});
      footerCheckIndex = -1;
    } else {
      var height = 0;
      var thirdDepthHeight = 0;
      $(this).next().find('li > a').each(function(i) {
        height += $(this).outerHeight(true);
        console.log('footer ' + i + '/' + height);
      })
      $(this).next().find('li > ul > li > a').each(function(i) {
        thirdDepthHeight += $(this).outerHeight(true);
        console.log('footer ' + i + '/' + thirdDepthHeight);
      });
      
      $(this).next().css({'height': (height - thirdDepthHeight) + 'px'});
      $(this).find('img').attr({'src': './img/common/m_footer_arrow_up_w.png', 'alt':'하얀색 위 화살표'});
      
      $(this).parent().siblings().find('ul').css({'height': 0});
      $(this).parent().siblings().find('> a > img').attr({'src': './img/common/m_footer_arrow_down_w.png', 'alt': '하얀색 아래 화살표'});
      footerCheckIndex = index;
    }

  }
})


var footerSecondDepthCheckIndex = -1;
var secondDepthUlHeight = 0;
var thirdDepthUlHeight = 0;
$('#footer div.top > nav > ul > li > ul > li > a').on('click', function(e) {
  if ($(window).width() < 650 && $(this).next().find('li').length > 0) {
    var index = $('#footer div.top > nav > ul > li > ul > li').index($(this).parent());
    var firstDepthtIndex = $('#footer div.top > nav > ul > li').index($(this).parent().parent().parent());
    console.log(firstDepthtIndex);
    if (footerSecondDepthCheckIndex === index) {
      $(this).next().css({'height': '0px'});
      $(this).find('img').attr({'src': './img/common/m_footer_arrow_down_g.png', 'alt': '회색 아래 화살표'});
      secondDepthUlHeight -= thirdDepthUlHeight;
      $('#footer div.top > nav > ul > li' + ':nth-child(' + (firstDepthtIndex + 1) +')' + '> ul').css({'height': secondDepthUlHeight + 'px'});
      console.log('secondDepthUlHeight: ' + secondDepthUlHeight );
      console.log('thirdDepthUlHeight: ' + thirdDepthUlHeight);
      footerSecondDepthCheckIndex = -1;
    } else {
      var height = 0;
      $(this).next().find('li > a').each(function() {
        height += $(this).outerHeight(true);
      });
      $(this).next().css({'height': height + 'px'});
      secondDepthUlHeight = $('#footer div.top > nav > ul > li' + ':nth-child(' + (firstDepthtIndex + 1) +')' + '> ul').height() + height;
      thirdDepthUlHeight = height;
      $('#footer div.top > nav > ul > li' + ':nth-child(' + (firstDepthtIndex + 1) +')' + '> ul').css({'height': secondDepthUlHeight + 'px'});
      $(this).find('img').attr({'src': './img/common/m_footer_arrow_up_g.png', 'alt': '회색 위 화살표'});
      $(this).parent().siblings().find('ul').css({'height': 0});
      $(this).parent().siblings().find('> a > img').attr({'src': './img/common/m_footer_arrow_down_g.png', 'alt': '회색 아래 화살표'});
    
      footerSecondDepthCheckIndex = index;
    }
  }
});