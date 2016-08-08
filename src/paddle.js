
export default class Paddle{
	constructor(height, x, control) {
      this.width = 3;
      this.height = 50;
      this.x = x;
      this.y = (height / 2) - (this.height / 2);
      this.speed = 25;
      this.maxHeight = height;
   
      document.addEventListener('keydown', event => {
         
      switch (event.keyCode) {
         case control.up:
            this.y = Math.max(0,this.y -this.speed);
            
            break;
         case control.down:
            this.y = Math.min(this.maxHeight - this.height, this.y + this.speed);
            
            break;
        }
    });
   }

   render(ctx) { 
      ctx.fillRect(
         this.x, this.y,
         this.width, this.height
      );
   }
}