var direction ='';
var degree = '';
var easing = '';
var flipCount = 0;
var maxLength = 0;
var isIeNine = false;
var timeout = 0;

$(document).ready(function() {

  if($('html').hasClass('ie9')) { isIeNine = true; };

  // Init flipcards
  initCards();

  if (isIeNine) { initIeNine(); }
  else          { initModernBrowsers(); }

  setButtons();
  // Init end
});

function initCards() {

  $('.karhu.flip-card.holder').each(function(index) {

    if ($(this).find('.card').length > maxLength) {

      maxLength = $(this).find('.card').length;
    };
  });

  $('.karhu.flip-card.holder').each(function(index) {

    thisLength = $(this).find('.card').length;
    if (thisLength < maxLength) {

      for(var a = thisLength; a < maxLength; a++) {

        $(this).append('<div class="card dummy"></div>');
      }
    };
  });
};

function setButtons() {

  $('.karhu.flip-card.btn.next, .karhu.flip-card.btn.prev').removeClass('hide');
  if ($('.karhu.flip-card .current').next('.card').length == 0) { ($('.karhu.flip-card.btn.next').addClass('hide')); }
  else if ($('.karhu.flip-card .current').prev('.card').length == 0) { ($('.karhu.flip-card.btn.prev').addClass('hide')); }
}

function initModernBrowsers() {

  $('.karhu.flip-card.holder').each(function(index) {

    $(this).find('.card:first-child').css({

      '-webkit-transform':'rotateY(360deg)',
      '-moz-transform':'rotateY(360deg)',
      '-ms-transform':'rotateY(360deg)',
      '-o-transform':'rotateY(360deg)',
      'transform:':'perspective(500px) rotateY(270deg)'}).addClass('current');
  });

  $('.karhu.flip-card.btn').on('click', function() {

    if ($(this).hasClass('preventClick')) {
      return;
    };

    if ($(this).hasClass('next')) {

      direction = 'next';
      degree = '450deg';
      $('.current').next('.card').addClass('revealed');
    }
    else if ($(this).hasClass('prev')) {

      direction = 'prev';
      degree = '270deg';
      $('.current').prev('.card').addClass('revealed');
    }

    findFlippinCards(direction, degree);
    $('.karhu.flip-card.btn').addClass('preventClick');
  });

   $('.karhu.flip-card.holder .card').bind( 'transitionend', function() { flipTransitionEndEvent(this); });
};

function findFlippinCards(direction, deg) {

  timeout = 0;
  flipCount = 0;
  $('.karhu.flip-card.holder').each(function(index) {

    var target = $(this).find('.current');
    setTimeout(function(){ flipCard(direction, target, deg, 'ease-in')}, timeout);
    timeout = timeout + 100;
  });
};

function flipCard(direction, target, deg, easing) {

  $(target).addClass(direction).css({

    '-webkit-transform':'rotateY(' + deg + ')',
    '-ms-transform':'rotateY(' + deg + ')',
    'transform':'perspective(500px) rotateY(' + deg + ')'//,
  }); 
}

function flipTransitionEndEvent(_this) {

  if ($(_this).hasClass('next')) {

    $(_this).removeClass('next').removeClass('current');
    flipCard( 'next', $(_this).next('.revealed'), '360deg', 'ease-out');
  }
  else if ($(_this).hasClass('prev')) {

    $(_this).removeClass('prev').removeClass('current');
    flipCard('prev', $(_this).prev('.revealed'), '360deg', 'ease-out');
  }

  if($(_this).hasClass('revealed')) { 

    $(_this).removeClass('revealed').addClass('current');
    flipCount = flipCount + 1;
  }

  if(flipCount == $('.karhu.flip-card.holder').length) {

    $('.karhu.flip-card.preventClick').removeClass('preventClick');
    setButtons();
  }
}

//:::::::::::::::::::::::::::::::::::::::::::::::
// ---------- IE 9
//:::::::::::::::::::::::::::::::::::::::::::::::

function initIeNine() {

  if ($(this).hasClass('preventClick')) { return; };

  $('.karhu.flip-card.holder').each(function(index) {

    $(this).find('.card').css({ 'opacity':'0' });
    $(this).find('.card:first-child').css({ 'opacity':'1' }).addClass('current');
  });

  $('.karhu.flip-card.btn').on('click', function() {

    if ($(this).hasClass('preventClick')) { return; };
    if ($(this).hasClass('next')) {

      $('.current').next('.card').addClass('revealed');
      fadeCards();
    }
    else if ($(this).hasClass('prev')) {

      $('.current').prev('.card').addClass('revealed');
      fadeCards();
    }

    $('.karhu.flip-card.btn').addClass('preventClick');
  });
}

function fadeCards() {

  timeout = 0;
  flipCount = 0;

  $('.karhu.flip-card.holder').each(function(index) {

    var target = $(this).find('.current')

    $(target).delay(timeout).animate({

      opacity: 0
    }, 500, function() {

      $(this).removeClass('current');
      $(this).parent().find('.revealed').animate({

        opacity: 1
      }, 800, function() {

        $(this).removeClass('revealed').addClass('current');
        flipCount = flipCount + 1;
        if(flipCount == $('.karhu.flip-card.holder').length) {

          $('.karhu.flip-card.preventClick').removeClass('preventClick');
          setButtons();
        }
      });
    });

    timeout = timeout + 100;
  });
}