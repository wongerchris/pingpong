
export default class Paddle{
	constructor(height, x, control) {
      this.width = 3;
      this.height = 50;
      this.x = x;
      this.y = (height / 2) - (this.height / 2);
      this.speed = 25;
      this.maxHeight = height;
   
      document.addEventListener('keydown', event => {
         //console.log(event.keyCode)
      switch (event.keyCode) {
         case control.up:
            this.y = Math.max(0,this.y -this.speed);
            //console.log('up');
            break;
         case control.down:
            this.y = Math.min(this.maxHeight - this.height, this.y + this.speed);
            //console.log('down');
            break;
        }
    });
   }

   render(ctx) { // What is ctx? Where does it come from?
      ctx.fillRect(
         this.x, this.y,
         this.width, this.height
      );
   }
}