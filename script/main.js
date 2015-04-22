$(document).ready(function() {

  var direction ='';
  var degree = '';
  var easing = '';

  $('.flip-card.holder').each(function(index) {

    $(this).find('.card-1').css({

      '-webkit-transform':'rotateY(360deg)',
      '-moz-transform':'rotateY(360deg)',
      '-ms-transform':'rotateY(360deg)',
      '-o-transform':'rotateY(360deg)',
      'transform:':'perspective(500px) rotateY(270deg)'}).addClass('current');
  });

  $('.btn').on('click', function() {

    if      ($(this).hasClass('next')) {

      direction = 'next';
      degree = '450deg';
      $('.current').next('.card').addClass('toBeAnimated');

    }
    else if ($(this).hasClass('prev')) {

      direction = 'prev';
      degree = '270deg';
      $('.current').prev('.card').addClass('toBeAnimated');
    }
    findFlippinCards(direction, degree);
  });

  $('.flip-card.holder .card').bind( 'transitionend', function() { transitionEndEvent(this); });
});

function findFlippinCards(direction, deg) {

  var timeout = 0;
  $('.flip-card.holder').each(function(index) {

    var target = $(this).find('.current')
    setTimeout(function(){ flipCard(direction, target, deg, 'ease-in')}, timeout);
    timeout = timeout + 100;
  });
};

function flipCard(direction, target, deg, easing) {

  $(target).addClass(direction).css({

    '-webkit-transform':'rotateY(' + deg + ')',
    '-ms-transform':'rotateY(' + deg + ')',
    'transform':'perspective(500px) rotateY(' + deg + ')',
    '-webkit-transition-transition' : '0.5s ' + easing,
    '-ms-transition' : '0.5s ' + easing,
    'transition' : '0.5s ' + easing
  });
}

function transitionEndEvent(_this) {

  if ($(_this).hasClass('next')) {

    $(_this).removeClass('next').removeClass('current');
    flipCard( 'next', $(_this).next('.toBeAnimated'), '360deg', 'ease-out');
  }
  else if ($(_this).hasClass('prev')) {

    $(_this).removeClass('prev').removeClass('current');
    flipCard('prev', $(_this).prev('.toBeAnimated'), '360deg', 'ease-out');
  }

  if($(_this).hasClass('toBeAnimated')) {

    $(_this).removeClass('toBeAnimated').addClass('current');
  }
}