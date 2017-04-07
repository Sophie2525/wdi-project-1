# wdi-project-1
This game was my first project for WDI in London.


##Introduction
The Laundry Bin Basket game is a take on the Dustbin Challenge that has taken over the football world. It is built on the concept of a standard coin collector game where you move up through the levels collecting as many coins as possible.

This was built as my first project on the Web Development Immersive course at General Assembly using JavaScript. A hosted version of the Laundry Bin Challenge can be found [here] (https://ancient-eyrie-15940.herokuapp.com/) The code can be viewed [here] (https://github.com/Sophie2525/wdi-project-1)

##How to Play
When the page is loaded, the user should press the 'Play' button located on the left hand side. Within seconds, footballs will start falling from the top of the game screen. The user will move the laundry bin along the bottom using the **right and left arrow keys** to collect the footballs.

For every football collected, you **score 1 point**. If you make it through the time without missing any footballs then you move onto the next level where the footballs will come down at a slightly fast pace. If you miss the ball, it is immediately **game over** and you have to click 'Reset' and start again.

##How it was built
The **Laundry Bin Challenge** was built in **HTML/CSS and Javascript**. It used the following libraries:
[jQuery Library] (https://code.jquery.com/)
[Animate CSS] (https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css)
[Google Fonts] (https://fonts.google.com/)

##Biggest win/Challenge

The biggest challenge of the project was learning about **Collision Detection** so that a score could be generated when the laundry bin hit the football.

The first step of this was to find out all the dimensions of the football and laundry bin so that a function could be written to check for a collision.

The function **collision** below outlines all these dimensions. It then includes an if statement to remove all the instances where the ball is not colliding with the laundry bin.

    **Game.collision = function collision($ball) {
      <!-- defining dimensions of the ball -->
      const x1 = $ball.offset().left;
      const y1 = $ball.offset().top;
      const h1 = $ball.outerHeight(true);
      const w1 = $ball.outerWidth(true);
      const b1 = y1 + h1;
      const r1 = x1 + w1;
      <!-- defining dimensions of the basket -->
      const x2 = Game.$basket.offset().left;
      const y2 = Game.$basket.offset().top;
      const h2 = Game.$basket.outerHeight(true);
      const w2 = Game.$basket.outerWidth(true);
      const b2 = y2 + h2;
      const r2 = x2 + w2;

      <!-- all measurements of the ball and bin not colliding - return false -->
      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      <!-- all measurements when they do - return true -->
      return true;
    };**

After this, a **collisionCheck** function can be created to say that if there is a collision between the two elements then the ball would disappear from the page and a score of 1 would be added.

    **Game.collisionCheck = function collisionCheck($ball) {
      if (Game.collision($ball)) {
        $ball.stop().remove();
        Game.$score ++;
        $('.score').html(Game.$score);
      }
    };**

This collisionCheck function could then be included as the step in the **animateBall** function to call collisionCheck whenever the function is animated (ie dropping down the screen). Also included here is the **gameOver** function if there is no collision and the ball reaches the bottom of the screen.

Game.animateBall = function animateBall($ball) {
      **$ball.animate({
        top: `+=${$ball.parent().height()}px`
      }, {
        duration: Game.difficulty,
        step: () => Game.collisionCheck($ball),
        complete: Game.gameOver
      });
    };**

##Future Development
The next step in the development of the game is to generated a total scoreboard to contain the scores from each level. 
