const size = 3;

export default class Ball {
   constructor(width,height) {
      this.x = width/2; // random x
      this.y = height/2; // random y
      this.vy = Math.floor(Math.random() * 12 - 6);
      this.vx = (7 - Math.abs(this.vy)-7);
      this.size = size;
      this.speed = 2;
  		this.boardHeight = height;
  		this.boardWidth = width;
   }
   draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
  
  bounce() {
      const hitLeft = this.x >= this.boardWidth;
      const hitRight = this.x <= 0;
      const hitTop = this.y  <= 0;
      const hitBottom = this.y >= this.boardHeight;

      if(hitLeft || hitRight){
        this.vx = -this.vx;
      }else if (hitTop || hitBottom){
      	this.vy = -this.vy;
      }
    }

   sounds() {
    const hitLeft = this.x >= this.boardWidth + this.size;
    const hitRight = this.x + this.size <= 0;
    const hitTop = this.y <= 0;
    const hitBottom = this.y >= this.boardHeight;
    const sound1 = document.getElementById("pongSound1");
    const sound3 = document.getElementById("pongSound3");
    if(hitTop || hitBottom){
      sound1.play();
    }else if (hitLeft || hitRight){
      sound3.play();
    }

   } 

  // paddle collision method: 
   paddleCollision(player1, player2) {
       if (this.vx > 0) {
           const inRightEnd = player2.x <= this.x + this.size &&
               player2.x > this.x - this.vx + this.size;
           if (inRightEnd) {
               const collisionDiff = this.x + this.size  - player2.x;
               const k = collisionDiff / this.vx;
               const y = this.vy * k + (this.y - this.vy);
               const hitRightPaddle = y >= player2.y && y + this.size <= player2.y + player2.height;
               const sound2 = document.getElementById("pongSound2");
               if (hitRightPaddle) {
                   this.x = player2.x - this.size;
                   this.y = Math.floor(this.y - this.vy + this.vy * k);
                   this.vx = -this.vx;
                   sound2.play();
               }
           }
       } else {
           const inLeftEnd = player1.x + player1.width >= this.x -this.size;
           if (inLeftEnd) {
               const collisionDiff = player1.x + player1.width - this.x;
               const k = collisionDiff / -this.vx;
               const y = this.vy * k + (this.y - this.vy);
               const hitLeftPaddle = y >= player1.y && y + this.size <= player1.y + player1.height;
               const sound2 = document.getElementById("pongSound2");
              if (hitLeftPaddle) {
                  this.x = player1.x + player1.width;
                  this.y = Math.floor(this.y - this.vy + this.vy * k);
                  this.vx = -this.vx;
                  sound2.play();
               }
           }
       }
   }

   render(ctx,player1,player2) {
   	this.bounce();
    this.sounds();
   	this.paddleCollision(player1,player2);
	  this.x += this.vx;
	  this.y += this.vy;
	  this.draw(ctx); 	
   }
}