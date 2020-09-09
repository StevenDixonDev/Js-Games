import Screen from '../../managers/classes/screen'

class EndScreen extends Screen{
    constructor(gameProps){
        super(gameProps);
    }
    update(dt){
        
    }
    draw(dt){
        this.ctx.fillStyle = "Red";
        this.ctx.textAlign = "center";
        this.ctx.font = "2px Arial";
        this.ctx.fillText("Game Over", this.canvas.clientWidth/this.scale/2, this.canvas.height/this.scale/2- 3);
        this.ctx.fillText(`${this.data.score}`, this.canvas.clientWidth/this.scale/2, this.canvas.height/this.scale/2);
    }
    handleInput(event){
        if(event.keyCode > 0){
            this.nextScreen('end');
        }
    }
}

export default EndScreen