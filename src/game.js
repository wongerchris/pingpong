import Board from './board';
import Paddle from './paddle';
import Ball from './ball';
import ScoreBoard from './scoreboard';


const gap = 10;

const p1Keys ={
   up: 38,
   down: 40,
};
const p2Keys ={
   up: 65,
   down: 90,
};



export default class Game {
   constructor() {
      const canvas = document.getElementById('game');
      this.context = canvas.getContext('2d');
      this.width = canvas.width;
      this.height = canvas.height;
      this.scorePosition1 = this.width/4;
      this.scorePosition2 = this.width - (this.width/4);
      this.context.fillStyle = 'white';
      this.middleLine = new Board(this.width, this.height); 
      this.player1 = new Paddle(this.height, gap, p2Keys);
      this.player2 = new Paddle(this.height, this.width - 4 - gap, p1Keys);
      this.ball1 = new Ball(this.width, this.height);
      this.scoreBoard1 = new ScoreBoard(this.scorePosition1,18,0);
      this.scoreBoard2 = new ScoreBoard(this.scorePosition2,18,0);
      
    }
     drawLine() { 
    }

    ballRest() {
      this.ball1.x = this.width/2;
      this.ball1.y = this.height/2;
    }

    goal(){
      const hitRight = this.ball1.x >= this.width;
      const hitLeft = this.ball1.x <= 0;
      const score1 = this.scoreBoard1;
      const score2 = this.scoreBoard2;
     
      if(hitLeft){
        score2.score ++;
        this.ballRest();
      
      }else if(hitRight){
        score1.score ++;
        this.ballRest();
      }
    }

     render() {
      this.goal();
      this.middleLine.render(this.context);
      this.context.fillStyle = "#234059";
      this.player1.render(this.context);
      this.player2.render(this.context);
      this.context.fillStyle = "#cc0052";
      this.scoreBoard1.render(this.context);
      this.scoreBoard2.render(this.context);
      this.context.fillStyle = "#99CC00";
      this.ball1.render(this.context, this.player1, this.player2);

   }
}





