$(init);

const difficulty = 3000;
let $basket;
let $score = 0;
let $time = 60;

function init() {
  $basket = $('.dustbin');
  $('button').on('click', startGame);
}

function startGame() {
  timer();
  moveBasket();
  setInterval(createBall, difficulty);

  const counter = setInterval(timer, 1000);
  function timer() {
    $time -= 1;
    // console.log($time);
    if ($time === 0) {
      clearInterval(counter);
      alert('You scored' + '' + $score);
    }
    $('.timer').html($time);
  }
}

function moveBasket() {
  $(document).on('keydown', function move(e){
    // $(document).keydown(function(e) {
    // use .which to get the keycode of the arrow keys
    switch (e.which) {
      // move left
      case 37:
        $('.dustbin').stop().animate({
          left: '-=100'
        });
        break;
      // move right
      case 39:
        $('.dustbin').stop().animate({
          left: '+=100'
        }); //right arrow key
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
    // console.log('score');
  }
}

function collision($ball) {
  var x1 = $ball.offset().left;
  var y1 = $ball.offset().top;
  var h1 = $ball.outerHeight(true);
  var w1 = $ball.outerWidth(true);
  var b1 = y1 + h1;
  var r1 = x1 + w1;
  var x2 = $basket.offset().left;
  var y2 = $basket.offset().top;
  var h2 = $basket.outerHeight(true);
  var w2 = $basket.outerWidth(true);
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
}

function gameOver() {
  alert('Game Over!');
  document.location.reload();
  // console.log('gameover');
}
