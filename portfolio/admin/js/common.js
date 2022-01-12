$(document).ready(function() {
  preventDefaultAnchor();
  setHeaderUI();
  setGNB();
  setCurrentPage();
});

// a[href="#"] 기본 동작 방지(상단 이동)
function preventDefaultAnchor() {
  $(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
  });
}

function setCurrentPage() {
  var bodyClass = $('body').attr('class');
  var classArray = bodyClass.split(' ');
  console.log(classArray);
  if (classArray[0] === 'main') return false;

  
  // 타이틀 입력
  $('#gnb ul.nav a').each(function() {
    var content = $(this).text();
    $(this).attr({'title': content});
  });
  
  // 서브메뉴 유무 표시
  $('#gnb ul.nav > li').each(function() {
    if ($(this).find('ul').length > 0) {
      $(this).find('> a').append('<i class="fas fa-angle-right fa-fw"><span>서브메뉴 열림/닫힘</span></i>');
    }
  });
  
  
  $('#gnb h3').each(function() {
    if ($(this).attr('data-menu') === classArray[1]) {
      $(this).addClass('on');
       return;
    }
  });
  
  $('#gnb h3.on + ul.nav > li').each(function() {
    if ($(this).attr('data-menu') === classArray[2]) {
      $(this).addClass('on');
      return false;
    }
  });
  
  $('#gnb ul.nav > li.on > ul > li').each(function() {
    if ($(this).attr('data-menu') === classArray[3]) {
      $(this).addClass('on');
      return false;
    }
  });
}

function setHeaderUI() {
  $('#header a.toggle').on('click', function() {
    $('body').toggleClass('close');
  });

  $('#header div.user a.user').on('click', function() {
    $('#header div.user').toggleClass('open');
  });
}

function setGNB() {
  var timerId = '';

  $('#gnb ul.nav > li > a').on('click', function() {
    if ($(this).parent().find('ul').length > 0) {
      var height = 0;
      $(this).next().find('> li').each(function() {
        height += $(this).outerHeight(true);
      });
      $('#gnb ul.nav > li > ul').css({'height': 0 + 'px'});
      $(this).next().css({'height': height + 'px'});
    }
  });

  $('#gnb').on('mouseleave', function() {
    timerId = setTimeout(function() {refresh();}, 500);
  }).on('mouseenter', function() {
    clearTimeout(timerId);
  });

  function refresh() {
    $('#gnb ul.nav > li:not(.on) > ul').css({'height': 0 + 'px'});
    if ($('#gnb ul.nav > li.on').find('ul').length > 0) {
      var height = 0;
      $('#gnb ul.nav > li.on > ul > li').each(function() {
        height += $(this).outerHeight(true);
      });
      $('#gnb ul.nav > li.on > ul').css({'height': height + 'px'});
    }
  }
}