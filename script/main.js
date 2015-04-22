$(document).ready(function() {

  var direction ='';
  var degree = '';

  console.log('Hunting a bug, eh?');

  $('.flip-card.holder').each(function(index) {

    $(this).find('.card-1').css({

      '-webkit-transform':'rotateY(360deg)',
      '-moz-transform':'rotateY(360deg)',
      '-ms-transform':'rotateY(360deg)',
      '-o-transform':'rotateY(360deg)',
      'transform:':'perspective(500px) rotateY(270deg)'}).addClass('current');
  });
  $('.btn').on('click', function() {

    console.log('click'); 
    if ($(this).hasClass('next')) {

      $('.current').next('.card').addClass('nextToAnimate');
      flipCard('next', '.current', '450deg', 'ease-in');
    }
    else if ($(this).hasClass('prev')) {

      $('.current').prev('.card').addClass('nextToAnimate')
      flipCard('prev', '.current', '270deg', 'ease-in');
    }
  });

  $('.flip-card.holder .card').bind( 'transitionend', function() {

    console.log('transitionend');
    if ($(this).hasClass('next')) {

      $(this).removeClass('next').removeClass('current');
      flipCard( 'next', $(this).next('.nextToAnimate'), '360deg', 'ease-out');
    }
    else if ($(this).hasClass('prev')) {

      $(this).removeClass('prev').removeClass('current');
      flipCard('prev', $(this).prev('.nextToAnimate'), '360deg', 'ease-out');
    }

    if($(this).hasClass('nextToAnimate')) {

      $(this).removeClass('nextToAnimate').addClass('current');
    }
  });

});

function flipCard(direction, target, deg, easing) {

  console.log('animate');
  $(target).addClass(direction).css({

    '-webkit-transform':'rotateY(' + deg + ')',
    '-ms-transform':'rotateY(' + deg + ')',
    'transform':'perspective(500px) rotateY(' + deg + ')',
    '-webkit-transition-transition' : '0.5s ' + easing,
    '-ms-transition' : '0.5s ' + easing,
    'transition' : '0.5s ' + easing
    //console.log($(this).find(target).next('.card'));
  });
} 