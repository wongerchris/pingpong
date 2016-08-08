export default class ScoreBoard {
   constructor(x, y, score) {
      this.x = x;
      this.y = y;
      this.score = score;
   }
   render(ctx) {
      ctx.font = "20px Helvetica";
      ctx.fillText(this.score, this.x, this.y);
   } 
}