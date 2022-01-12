// imageSlide
var setIndexNow = 0;
var setIndexPrev = 0;
var setIndexNext = 0;
var numSlide = $('section.banner-slide > div.box > ul.slide > li').length;
var imageNow = 0;
var imagePrev = 0;
var imageNext = 0;
var imageFirst = 1;
var rightDirection = true;
var imageTimer = '';
var setTimer = '';
var imageTimerOn = true;

if (imageTimerOn === true) {
  $('section.banner-slide > p.control > a.play').addClass('on');
} else {
  $('section.banner-slide > p.control > a.play').removeClass('on');
}

setImage(imageFirst);

showImage(imageFirst);

$('section.banner-slide > ul.indicator > li > a').on('click', function() {
  var index = $('section.banner-slide > ul.indicator > li').index($(this).parent());
  showImage(index + 1);
  setImage(index + 1);
});


$('section.banner-slide > p.control > a.prev').on('click', function() {
  rightDirection = "false";
  showImage(imagePrev);
  setTimer = setTimeout(function() {
        setImage(setIndexPrev);
  }, 500);    
})

$('section.banner-slide > p.control > a.next').on('click', function() {
  showImage(imageNext);
  setTimer = setTimeout(function() {
        setImage(setIndexNext);
  }, 500);    
})


$('section.banner-slide > p.control > a.play').on('click', function() {
  if (imageTimerOn === true) {
    clearTimeout(imageTimer);
    $(this).removeClass('on');
    imageTimerOn = false;
  } else {
    imageTimer = setTimeout(function() {
      showImage(imageNext);

      setTimer = setTimeout(function() {
        setImage(setIndexNext);
      }, 500);     

    }, 3000);
    $(this).addClass('on');
    imageTimerOn = true;
  }

});


function showImage(n) {
  clearTimeout(imageTimer);
  if (imageNow === 0) {
    $('section.banner-slide > div.box > ul.slide').css({'left': '0%', 'transition': 'none'});
  }
  else if (rightDirection === true) {
    $('section.banner-slide > div.box > ul.slide').css({'left': '-103%', 'transition': '0.5s'});
  } else {
    $('section.banner-slide > div.box > ul.slide').css({'left': '103%', 'transition': '0.5s'});
    rightDirection = true;
  } 

  $('section.banner-slide > ul.indicator > li').removeClass('on');
  $('section.banner-slide > ul.indicator > li:eq(' + (n - 1) + ')').addClass('on');
  imageNow = n;
  imagePrev = (n === 1) ? numSlide : (n - 1);
  imageNext = (n === numSlide) ? 1 : (n + 1);
  console.log('showImage: ' + imagePrev + '/' + imageNow + '/' + imageNext);

  if (imageTimerOn === true) {
    imageTimer = setTimeout(function() {
      showImage(imageNext);

      setTimer = setTimeout(function() {
        setImage(setIndexNext);
      }, 500);     

    }, 3000);
  }


}

function setImage(n) {
  setIndexPrev = (n === 1) ? numSlide : (n - 1);
  setIndexNext = (n === numSlide) ? 1 : (n + 1);
  console.log(setIndexPrev + '/' + setIndexNow + '/' + setIndexNext);

  $('section.banner-slide > div.box > ul.slide > li:eq(' + (n - 1) + ')').css({'left': '0%'});
  $('section.banner-slide > div.box > ul.slide > li').css({'opacity': '0.4'});
  $('section.banner-slide > div.box > ul.slide > li:eq(' + (n - 1) + ')').css({'opacity': '1'});
  
  $('section.banner-slide > div.box > ul.slide > li:eq(' + (setIndexPrev - 1) + ')').css({'left': '-103%'});
  
  $('section.banner-slide > div.box > ul.slide > li:eq(' + (setIndexNext - 1) + ')').css({'left': '103%'});

  $('section.banner-slide > div.box > ul.slide').css({'left': '0%', 'transition': 'none'});
}

//scroll
var banner = $('section.banner-slide').height();
var blendStart = $('#main-visual').offset().top + $('section.banner-slide').height();
var blendEnd = $('section.blend').offset().top + $('section.blend').height();  
var favStart = $('section.blend').offset().top + 100;
var favEnd = $('section.favorite').offset().top + $('section.favorite').height();
var storeStart = $('section.favorite').offset().top + ($('section.favorite').height() / 2);
var storeEnd = $('section.store').offset().top + $('section.store').height();
var scrollTimerOn = true;

if ($(window).width() < 361) {
  blendStart += 1800;
  favStart += 1100;
} else if ($(window).width() < 650) {
  blendStart += 2000;
  favStart += 1400;
  storeStart += 700;

} else if ($(window).width() < 850) {
  favStart += 400;
  storeStart += 830;
  console.log('favStart: ' + favStart);
}
$(window).on('scroll', function() {

  checkScroll('section.blend', blendStart, blendEnd, scrollTimerOn);
  checkScroll('section.favorite', favStart, favEnd, scrollTimerOn);
  checkScroll('section.store', storeStart, storeEnd, scrollTimerOn);

});  

function checkScroll(selector ,start, end, timerOn) {
  var $selector = $(selector);
  var scrollAmt = $(document).scrollTop();
  
  if (timerOn !== true) {
    start = start - banner;
  } 

  if (scrollAmt >= start && scrollAmt < end) {
    $selector.addClass('move');
  } else {
    $selector.removeClass('move');
  }

  console.log('scrollAmt: ' + scrollAmt);
  console.log('start ~ end : ' +  start + '/' + end);
}


// $('html, body').stop(true).animate({'scrollTop': (storeEnd) + 'px'}, 500);



// promotion-btn
$('div.right-promotion span.btn').on('click', function() {
  // move();
  $('div.right-promotion span.btn').toggleClass('change');
  $('section.banner-slide').toggleClass('change');

  if (imageTimerOn === true) {
    imageTimerOn = false;
    clearTimeout(imageTimer);

  } else {
    imageTimerOn = true;
    imageNow = 0;
    setImage(imageFirst);
    showImage(imageFirst);

  }

  if (scrollTimerOn === true) {
    scrollTimerOn = false;
  } else {
    scrollTimerOn = true;
  }

  console.log(scrollTimerOn);
});
