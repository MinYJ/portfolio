// notice
'use strict';

var noticeLetterNow = 0;
var noticeLetterPrev = 0;
var noticeLetterNext = 0;
var noticeTimer ='';
var noticeFirst = 1;
var noticeIndexPrev = 0;
var noticeIndexNext = 0;
var numNotice = $('div.left-notice div.box > ul.slide > li').length;

setNotice(1);

showNotice(1);

function showNotice(n) {
  clearTimeout(noticeTimer);
  $('div.left-notice > div.box > ul.slide').css({'top': '-100%', 'transition': 'top 0.5s ease-in'});
  noticeLetterNow = n;
  noticeLetterPrev = (n === 1) ? numNotice : (n - 1);
  noticeLetterNext = (n == numNotice) ? 1 : (n + 1);

  noticeTimer = setTimeout(function() {
    showNotice(noticeLetterNext);

    setTimeout(function() {
      setNotice(noticeIndexNext);
    }, 500);
  }, 3000);
}


function setNotice(n) {
  noticeIndexPrev = (n === 1) ? numNotice : (n - 1);
  noticeIndexNext = (n == numNotice) ? 1 : (n + 1);

  $('div.left-notice > div.box > ul.slide > li').css({'display':'none'});

  $('div.left-notice > div.box > ul.slide > li:eq(' + (n - 1) + ')').css({'display':'block'});
  $('div.left-notice > div.box > ul.slide > li:eq(' + (n - 1) + ')').css({'top': '0%'});

  $('div.left-notice > div.box > ul.slide > li:eq(' + (noticeIndexPrev - 1) + ')').css({'display':'block'});
  $('div.left-notice > div.box > ul.slide > li:eq(' + (noticeIndexPrev - 1) + ')').css({'top': '-150%'});

  $('div.left-notice > div.box > ul.slide > li:eq(' + (noticeIndexNext - 1) + ')').css({'display':'block'});
  $('div.left-notice > div.box > ul.slide > li:eq(' + (noticeIndexNext - 1) + ')').css({'top': '150%'});

  $('div.left-notice > div.box > ul.slide').css({'transition': 'none' ,'top': '50%'});
}