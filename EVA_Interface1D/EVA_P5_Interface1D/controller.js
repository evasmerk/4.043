
// This is where your state machines and game logic lives


class Controller {

    // This is the state we start with.
    constructor() {
        this.gameState = "PLAY";
       
    }
    
    // This is called from draw() in sketch.js with every frame
    update() {

        // STATE MACHINE ////////////////////////////////////////////////
        // This is where your game logic lives
        /////////////////////////////////////////////////////////////////
        switch(this.gameState) {

            // This is the main game state, where the playing actually happens
            case "PLAY":

                // clear screen at frame rate so we always start fresh      
                display.clear();
            
                // show all players in the right place, by adding them to display buffer
                display.setPixel(playerOne.position_x, playerOne.playerColor);
                
                // now add the target
                display.setPixel(target.position_x, target.playerColor);

                
                // check if player has caught target
                if (playerOne.position_x == target.position_x && playerOne.position_y == target.position_y)  {
                    playerOne.score++;              // increment score
                    this.gameState = "COLLISION";   // go to COLLISION state
                }else if (playerOne.position_x == target.position_x && playerOne.position_y < target.position_y) {
                    display.setPixel(playerOne.position_x, playerOne.playerColor);
                }
                

                break;

            // This state is used to play an animation, after a target has been caught by a player 
            case "COLLISION":
                
                // clear screen at frame rate so we always start fresh      
                display.clear();

                // play explosion animation one frame at a time.
                // first figure out what frame to show
                let frameToShow = collisionAnimation.currentFrame();    // this grabs number of current frame and increments it 
                
                // then grab every pixel of frame and put it into the display buffer
                for(let i = 0; i < collisionAnimation.pixels; i++) {
                    display.setPixel(i,collisionAnimation.animation[frameToShow][i]);                    
                }

                //check if animation is done and we should move on to another state
                if (frameToShow == collisionAnimation.animation.length-1)  {
                    
                    // We've hit score max, this player wins
                    if (playerOne.score >= score.max) {
                        score.winner = playerOne.playerColor;   // store winning color in score.winner
                        this.gameState = "SCORE";               // go to state that displays score
                    
                    
                    // We haven't hit the max score yet, keep playing    
                    }else {
                        target.position_x = parseInt(random(0,displaySize));  // move the target to a new random position
                        target.position_y = parseInt(random(0,displaySize));
                        this.gameState = "PLAY";    // back to play state
                    }
                } 

                break;

            // Game is over. Show winner and clean everything up so we can start a new game.
            case "SCORE":       
            
                // reset everyone's score
                playerOne.score = 0;

                // put the target somewhere else, so we don't restart the game with player and target in the same place
                target.position_x = parseInt(random(1,displaySize));
                target.position_y = parseInt(random(1,displaySize));

                //light up w/ winner color by populating all pixels in buffer with their color
                display.setAllPixels(score.winner);                    

                break;

            // Not used, it's here just for code compliance
            default:
                break;
        }
    }
}




// This function gets called when a key on the keyboard is pressed
function keyPressed() {

    // Move player one to the left if letter A is pressed
    if (key == 'A' || key == 'a') {
    playerOne.move(-1, 0);
    }
    if (key == 'D' || key == 'd') {
    playerOne.move(1, 0);
    }    

    if (key == 'W' || key == 'w') {
    playerOne.move(0, 1);
    }
    if (key == 'S' || key == 's') {
    playerOne.move(0, -1);
    }    



    
    // When you press the letter R, the game resets back to the play state
    if (key == 'R' || key == 'r') {
    controller.gameState = "PLAY";
    }
  }