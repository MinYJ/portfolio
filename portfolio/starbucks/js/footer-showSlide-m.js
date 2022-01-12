'use strict'
var rewardNextIndex = 0; 
var rewardPrevIndex = 0;
var rewardSum = $('#footer div.middle-bottom ul.reward > li').length;
var rewardNext = 0;
var rewardPrev = 0; 
var rewardImageNow = 0;
var rewardtimerId = '';
var rewardSetTimerId = '';
var rewardTimerOn = true;
console.log(rewardSum);

if (rewardTimerOn === true) {
  $('div.middle-bottom > div.controller > a.play').addClass('on');
} else {
  $('div.middle-bottom > div.controller > a.play').removeClass('on');
}

$(window).on('resize', function() {
  if ($(window).width() > 850) {
    $('#footer div.middle-bottom ul.reward > li').css({'display': 'block'});
    clearTimeout(rewardtimerId);
  }
});

if ($(window).width() < 850) {
  setreward(3);
  showreward(3);
}

$('div.middle-bottom > div.controller > a.play').on('click', function() {
  if (rewardTimerOn === true) {
    clearTimeout(rewardtimerId);
    $(this).removeClass('on');
    rewardTimerOn = false;
  } else {
    rewardtimerId = setTimeout(function() {
      showreward(rewardNextIndex);
      
      rewardSetTimerId = setTimeout(function() {
        setreward(rewardNextIndex);
      }, 1500);
    }, 2000);
    $(this).addClass('on');
    rewardTimerOn = true;
  }
});



function showreward(n) {
  clearTimeout(rewardtimerId);
  if (rewardImageNow === 0) {
    $('#footer div.middle-bottom ul.reward').css({'left': '0%', 'transition': 'none'});
  } else {
    $('#footer div.middle-bottom ul.reward').css({'left': '-150%', 'transition': '1.5s'});
  }


  rewardImageNow = n;  
  rewardNext = (n === rewardSum) ? 1 : (n + 1);
  rewardPrev = (n === 1) ? rewardSum : (n - 1);

  if (rewardTimerOn === true) {
    rewardtimerId = setTimeout(function() {
      showreward(rewardNextIndex);
      
      rewardSetTimerId = setTimeout(function() {
        setreward(rewardNextIndex);
      }, 1500);
    }, 3000)
  }
  
}


function setreward(n) {
  rewardPrevIndex = (n === 1) ? rewardSum : (n - 1);
  rewardNextIndex = (n === rewardSum) ? 1 : (n + 1);
  $('#footer div.middle-bottom ul.reward > li').css({'display': 'none'});
  $('#footer div.middle-bottom ul.reward > li:eq(' + (rewardPrevIndex - 1) +')').css({'left': '-150%'});
  $('#footer div.middle-bottom ul.reward > li:eq(' + (rewardPrevIndex - 1) +')').css({'display': 'block'});
  $('#footer div.middle-bottom ul.reward > li:eq(' + (n - 1) +')').css({'left': '0%'});
  $('#footer div.middle-bottom ul.reward > li:eq(' + (n - 1) +')').css({'display': 'block'});
  $('#footer div.middle-bottom ul.reward > li:eq(' + (rewardNextIndex - 1) +')').css({'left': '150%'});
  $('#footer div.middle-bottom ul.reward > li:eq(' + (rewardNextIndex - 1) +')').css({'display': 'block'});

  $('#footer div.middle-bottom ul.reward').css({'left': '0%', 'transition': 'none'});
}