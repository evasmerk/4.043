
// This holds some player information, like color and position.
// It also has some player methods for managing how a player moves.


class Player {
  
    constructor(_color, _position_x, _position_y, _displaySize) {
        this.playerColor = _color;
        this.position_x = _position_x;
        this.position_y = _position_y;
        this.score = 0;
        this.displaySize = _displaySize;
        this.playerColor.setAlpha(255- this.position_y/30*255);
        
    }



    // Move player based on keyboard input
    move(_direction_x, _direction_y) {

        // increments or decrements player position
        this.position_x = this.position_x + _direction_x;
        this.position_y = this.position_y + _direction_y;
      
        // if player hits the edge of display, loop around
        if (this.position_x == -1) {
            this.position_x = this.displaySize - 1;
        } else if (this.position_x == this.displaySize) {
            this.position_x = 0;
        } 
        if (this.position_y == -1) {
            this.position_y = this.displaySize - 1;
        } else if (this.position_y == this.displaySize) {
            this.position_y = 0;
        } 

        this.playerColor.setAlpha(255- this.position_y/30*255);
         
    } 
  }