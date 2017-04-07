$(init);

let difficulty = 2500;
let $basket;
let $score;
let $time;
let $counter;
const audio = new Audio('sounds/MOTD.mp3');
let $createBalls;

function init() {
  const $playButton = $('#play');
  $basket = $('.dustbin');
  $playButton.on('click', startGame);
}

function startGame() {
  $('.alert').html('');
  $time = 60;
  $score = 0;
  $('.score').text('');
  timer();

  audio.play();


  moveBasket();
  $createBalls = setInterval(createBall, difficulty);

  $counter = setInterval(timer, 1000);

  function timer() {
    $time -= 1;
    if ($time === 0) {
      clearInterval($counter);
      clearInterval($createBalls);
      $('.ball').remove().stop();
      $('.alert').html('You scored' + ' ' + $score);
      animation('.alert', 'bounce');
      setTimeout(nextLevel, 1000);
    }
    $('.timer').html($time);
  }
}

function moveBasket() {
  $(document).on('keydown', function move(e){
    switch (e.which) {
      case 37:
        $('.dustbin').stop().animate({
          left: '-=100'
        });
        break;
      case 39:
        $('.dustbin').stop().animate({
          left: '+=100'
        });
        break;
    }
  });
}

function getRandomNumberFromRange() {
  return Math.floor(Math.random() * (585 - 0 + 1)) + 0;
}

function createBall() {
  const $ball = $('<div class="ball"></div>');
  const randomLeftValue = getRandomNumberFromRange();
  $ball.css('left', randomLeftValue);
  $('.container').append($ball);
  animateBall($ball);
}

function animateBall($ball) {
  $ball.animate({
    top: `+=${$ball.parent().height()}px`
  }, {
    duration: difficulty,
    step: () => collisionCheck($ball),
    complete: gameOver
  });
}

function collisionCheck($ball) {
  if (collision($ball)) {
    $ball.stop().remove();
    $score ++;
    $('.score').html($score);
  }
}

function collision($ball) {
  const x1 = $ball.offset().left;
  const y1 = $ball.offset().top;
  const h1 = $ball.outerHeight(true);
  const w1 = $ball.outerWidth(true);
  const b1 = y1 + h1;
  const r1 = x1 + w1;
  const x2 = $basket.offset().left;
  const y2 = $basket.offset().top;
  const h2 = $basket.outerHeight(true);
  const w2 = $basket.outerWidth(true);
  const b2 = y2 + h2;
  const r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
}

function gameOver(){
  audio.pause();
  $('.alert').html('GAME OVER!');
  animation('.alert', 'bounce');
  clearInterval($counter);
  clearInterval($createBalls);
  $('.ball').remove().stop();

  $('#reset').on('click', function(){
    $('.score').html('');
    $('.timer').html('');
    $('.alert').html('');
  });
}

function nextLevel(){
  difficulty -= 250;
  $('.alert').html('Next Level!');
  animation('.alert', 'bounce');
  setTimeout(nextLevelText, 1000);
  setTimeout(startGame, 3000);
}

function nextLevelText(){
  $('.alert').html('Get Ready...');
  animation('.alert', 'bounce');
}

function animation(element, animation) {
  $(element).addClass(animation).one('webkitAnimationEnd', () => $(element).removeClass(animation));
}
