var direction ='';
var degree = '';
var easing = '';
var flipCount = 0;

$(document).ready(function() {

  $('.karhu.flip-card.holder').each(function(index) {

    $(this).find('.card-1').css({

      '-webkit-transform':'rotateY(360deg)',
      '-moz-transform':'rotateY(360deg)',
      '-ms-transform':'rotateY(360deg)',
      '-o-transform':'rotateY(360deg)',
      'transform:':'perspective(500px) rotateY(270deg)'}).addClass('current');
  });

  $('.karhu.flip-card.btn').on('click', function() {

    if ($(this).hasClass('preventClick')) {
      console.log('clickPrevented');
      return;
    };

    console.log('does reach?');

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

  $('.karhu.flip-card.holder .card').bind( 'transitionend', function() { transitionEndEvent(this); });
});

function findFlippinCards(direction, deg) {

  var timeout = 0;
  flipCount = 0;
  $('.karhu.flip-card.holder').each(function(index) {

    var target = $(this).find('.current')
    setTimeout(function(){ flipCard(direction, target, deg, 'ease-in')}, timeout);
    timeout = timeout + 100;
  });

  console.log(timeout);
};

function flipCard(direction, target, deg, easing) {

  $(target).addClass(direction).css({

    '-webkit-transform':'rotateY(' + deg + ')',
    '-ms-transform':'rotateY(' + deg + ')',
    'transform':'perspective(500px) rotateY(' + deg + ')'//,
  }); 
}

function transitionEndEvent(_this) {

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

    console.log('tilili');
    $('.karhu.flip-card.preventClick').removeClass('preventClick');
  }
}