$(init);

const difficulty = 2500;
let $basket;
let $score = 0;
let $time = 60;
const $audio = $('#audio');

function init() {
  $basket = $('.dustbin');
  $('button').on('click', startGame);
}

function startGame() {
  $time = 60;
  $score = 0;
  $('.score').text('');
  timer();
  var newAudio = new Audio('../sounds/MOTD.mp3');
  
  // $audio.src = '../sounds/MOTD.mp3';
  newAudio.play();
  // console.log($audio);
  // $audio.play();
  moveBasket();
  var createBalls = setInterval(createBall, difficulty);

  const counter = setInterval(timer, 1000);

  function timer() {
    $time -= 1;
    // console.log($time);
    // nextLevel();
    if ($time === 0) {
      clearInterval(counter);
      clearInterval(createBalls);
      $('.ball').remove().stop();
      $('.alert').html('You scored' + ' ' + $score);
      console.log('You scored' + ' ' + $score);
      // startGame();
      // document.location.reload();
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

// function nextLevel(){
//   if (($time === 0) && ($score > 15)){
//     alert( 'next level');
//   } else if (($time === 0) & ($score <= 15)){
//     alert('Game Over!');
//   }
// }

function gameOver() {
  alert('Game Over!');
  document.location.reload();
  // console.log('gameover');
}
