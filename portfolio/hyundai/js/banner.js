function setBannerSlide(selector, first) {
  var $selector = $(selector);
  var numBannerSlide = $selector.find('ul.slide li').length;
  var offsetX = 0;
  var bannerNow = 0;
  var bannerPrev = 0;
  var bannerNext = 0;
  var bannerFirst = first;
  var boxWidth = $selector.find('div.banner-box').innerWidth();
  var barWidth = 0;
  var minOffsetX = 0;
  var timerId2 = '';
  var i = 0;
  console.log('boxWidth ' + boxWidth);
  
  resetUI();

  showBanner(bannerFirst);

  $selector.find('a.prev').on('click', function() {
    showBanner(bannerPrev);
  });

  $selector.find('a.next').on('click', function() {
    showBanner(bannerNext);
  });

 $(window).on('resize', function() {
  clearTimeout(timerId2);
  timerId2 = setTimeout(function() {
    resetUI();
    showBanner(bannerFirst);
  }, 100);
 });


  function showBanner(n) {
    var offsetX = -$selector.find('.slide li:eq(' + (n - 1) + ')').position().left;
    $selector.find('.slide').css({'transition': 'left 0.3s','left': offsetX + 'px'});
    bannerNow = n;
    bannerPrev = (n === 1) ? 1 : (n - 1);
    bannerNext = (n === numBannerSlide) ? numBannerSlide : (n + 1);
    console.log('배너슬라이드: ' + bannerPrev + '/' + bannerNow + '/' + bannerNext + ' / ' + numBannerSlide);
  }

  function resetUI() {
    boxWidth = $selector.find('div.banner-box').innerWidth();
    $selector.find('ul.slide li').each(function(i) {
      if (boxWidth <= 374) {
        $(this).css({'left': (i * 50) + '%'});
      } else {
        $(this).css({'left': (i * 25) + '%'});
      }
    });

    $selector.find('ul.slide li').each(function(i) {
      barWidth += $(this).outerWidth(true);
      console.log(i + ' barWidth: ' + barWidth);
    });

    minOffsetX = boxWidth - barWidth;

    console.log(minOffsetX);

    $selector.find('.slide li').each(function(i) {
      var tempOffsetX = -$(this).position().left;
      // console.log(i + '/' + tempOffsetX);

      if (tempOffsetX <= minOffsetX) {
        numBannerSlide = i + 1;
        // console.log('numBannerSlide: ' + numBannerSlide);
        return false;
      }
    });
    
  }
}
