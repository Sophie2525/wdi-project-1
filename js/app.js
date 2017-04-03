$(function() {

// Step 1: Get dustbin div to move along the bottom of the page, controlled by arrow keys.
  $(document).on('keydown', function move(e){
  // $(document).keydown(function(e) {
  // use .which to get the keycode of the arrow keys
    switch (e.which) {
    // move left
      case 37:
        $('.dustbin').stop().animate({
          left: '-=50'
        });
        break;
      // move right
      case 39:
        $('.dustbin').stop().animate({
          left: '+=50'
        }); //right arrow key
        break;
    }
  });

// NB need to make it constant
// NB need to make it stop at edge of parent div

// Step 2: Drop ball from top automatically and make it loop
  $('button').on('click', function loop(){
  // add in function to make it loop continuously
    $('.ball').css({top: 0});
    $('.ball').animate({
      top: '650px'
    }, {
      duration: 5000,
      step: collisionCheck,
      complete: loop
    });
  });

// Step 3: Register score when Ball & Dustbin meet

  function collisionCheck() {
    var dustbin = getPositions(document.getElementsByClassName('dustbin')[0]);
    var ball = getPositions(document.getElementsByClassName('ball')[0]);
    if (dustbin.top < ball.bottom) {
      console.log('IN THE BIIIIN');
    }
    // console.log(ball.bottom);
  }

  function getPositions(element) {
    return element.getBoundingClientRect();
  }
// Step 4: Create a level below which you lose

// Step 5: Create 20 balls all of which register when catch them

// function newFootballs(){
//
// }

// Step 6: Create timer so have 2 minutes to catch balls
// Step 7: Create start to game that triggers timer

// Step 8: Next level - make them come down faster




});
