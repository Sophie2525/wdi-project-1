var Game = Game || {};

Game.difficulty = 2500;
Game.$basket;
Game.$score;
Game.$time;
Game.$counter;
Game.audio = new Audio('sounds/MOTD.mp3');
Game.$createBalls;

Game.init = function init() {
  const $playButton = $('#play');
  Game.$basket = $('.dustbin');
  $playButton.on('click', Game.startGame);
};

Game.startGame = function startGame() {
  $('.alert').html('');
  Game.$time = 60;
  Game.$score = 0;
  $('.score').text('');
  timer();

  Game.audio.play();


  Game.moveBasket();
  Game.$createBalls = setInterval(Game.createBall, Game.difficulty);

  Game.$counter = setInterval(timer, 1000);

  function timer() {
    Game.$time -= 1;
    if (Game.$time === 0) {
      clearInterval(Game.$counter);
      clearInterval(Game.$createBalls);
      $('.ball').remove().stop();
      $('.alert').html('You scored' + ' ' + Game.$score);
      Game.animation('.alert', 'bounce');
      setTimeout(Game.nextLevel, 1000);
    }
    $('.timer').html(Game.$time);
  }
};

Game.moveBasket = function moveBasket() {
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
};

Game.getRandomNumberFromRange = function getRandomNumberFromRange() {
  return Math.floor(Math.random() * (585 - 0 + 1)) + 0;
};

Game.createBall = function createBall() {
  const $ball = $('<div class="ball"></div>');
  const randomLeftValue = Game.getRandomNumberFromRange();
  $ball.css('left', randomLeftValue);
  $('.container').append($ball);
  Game.animateBall($ball);
};

Game.animateBall = function animateBall($ball) {
  $ball.animate({
    top: `+=${$ball.parent().height()}px`
  }, {
    duration: Game.difficulty,
    step: () => Game.collisionCheck($ball),
    complete: Game.gameOver
  });
};

Game.collisionCheck = function collisionCheck($ball) {
  if (Game.collision($ball)) {
    $ball.stop().remove();
    Game.$score ++;
    $('.score').html(Game.$score);
  }
};

Game.collision = function collision($ball) {
  const x1 = $ball.offset().left;
  const y1 = $ball.offset().top;
  const h1 = $ball.outerHeight(true);
  const w1 = $ball.outerWidth(true);
  const b1 = y1 + h1;
  const r1 = x1 + w1;
  const x2 = Game.$basket.offset().left;
  const y2 = Game.$basket.offset().top;
  const h2 = Game.$basket.outerHeight(true);
  const w2 = Game.$basket.outerWidth(true);
  const b2 = y2 + h2;
  const r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
};

Game.gameOver = function gameOver(){
  Game.audio.pause();
  $('.alert').html('GAME OVER!');
  Game.animation('.alert', 'bounce');
  clearInterval(Game.$counter);
  clearInterval(Game.$createBalls);
  $('.ball').remove().stop();

  $('#reset').on('click', function(){
    $('.score').html('');
    $('.timer').html('');
    $('.alert').html('');
  });
};

Game.nextLevel = function nextLevel(){
  Game.difficulty -= 250;
  $('.alert').html('Next Level!');
  Game.animation('.alert', 'bounce');
  setTimeout(Game.nextLevelText, 1000);
  setTimeout(Game.startGame, 3000);
};

Game.nextLevelText = function nextLevelText(){
  $('.alert').html('Get Ready...');
  Game.animation('.alert', 'bounce');
};

Game.animation = function animation(element, animation) {
  $(element).addClass(animation).one('webkitAnimationEnd', () => $(element).removeClass(animation));
};

$(Game.init.bind(Game));
