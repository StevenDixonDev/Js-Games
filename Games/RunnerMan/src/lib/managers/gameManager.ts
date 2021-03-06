import DataManager from './dataManager';
import SoundManager from './soundManager';
import ImageManager from './imageManager';
import Controller from '../classes/controller';

import Screen from '../classes/screen';

interface isScreens {
   [key: string]: Screen
}

class Game {
        scale: number;
        ctx: CanvasRenderingContext2D;
        canvas: HTMLCanvasElement;
        lastTime: number;
        screens: isScreens;
        currentScreen: string;
        dataManager: DataManager;
        soundManager: SoundManager;
        imageManager: ImageManager;
        controller: Controller;
        controllerEnabled: boolean;
        controllerMap: object;
        enableDebug: boolean;

    constructor() {
        this.scale = 1;
        this.ctx = null;
        this.canvas = null;
        this.screens = {};
        this.currentScreen = '';
        this.dataManager = new DataManager({});
        this.soundManager = new SoundManager();
        this.imageManager = new ImageManager();
        this.controller = new Controller();
        this.controllerMap = {0: 24};
        this.controllerEnabled = false;
        this.enableDebug = false;
    }
    setup({target, scale, startingScreen, size, useController, debug}): void {

        this.canvas = document.getElementById(target) as any;

        if(typeof size == 'object')   {
            this.canvas.width  = size.w;
            this.canvas.height = size.h;
        } else if(size == 'full'){
            this.canvas.width  = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        this.ctx = this.canvas.getContext('2d');
        this.scale = scale;
        this.ctx.scale(scale, scale);
        this.currentScreen = startingScreen;
        this.controllerEnabled = useController;
        // give image manager the context and canvas for use in drawing sprites
        this.imageManager.setup(this.ctx, this.canvas, this.scale);

        //debug options
        if(debug){
            this.enableDebug = debug;
            this.imageManager.debug(this.enableDebug);
        }
        
        
    }
    async start(): Promise<object>{

        let ready = await this.imageManager.loadImages();
        
        if(ready){
            this.handleInput();
            this.update();
        }else {
            throw new Error('Image loader failed to load images');
        }
        return
    }
    update(time: number = 0): void{
        const now = performance.now();
        const deltaTime =  now - time;

        
        this.screens[this.currentScreen].updateGameData(this.dataManager.store);
        this.screens[this.currentScreen].update(
            deltaTime, 
            this.dataManager.getDataTools(), 
            this.soundManager.getAudioTools());

        this.draw(deltaTime);   
        requestAnimationFrame(() => this.update(now));
    }
    draw(dt): void{
       // draw background
        this.ctx.clearRect(0,0,this.canvas.clientWidth, this.canvas.height)
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0,0, this.canvas.clientWidth, this.canvas.height);
        //draw current scene
        this.screens[this.currentScreen].draw(
            dt, 
            this.imageManager.getRenderer() 
        );


        // draw debug info
        if (this.enableDebug){
           /// console.log('fps', 1/(dt/1000));
            this.ctx.font = '10px Arial';
            this.ctx.fillStyle = 'red';
            this.ctx.fillText(`FPS: ${Math.floor(1/(dt/1000))}`, this.canvas.width - 40, 10);
        }
        
        
    }
    handleInput(): void{
       // this.InputHandler.startListening().then(e => console.log(e))
        document.addEventListener('keydown', event => {this.screens[this.currentScreen].handleInput(event)});
        if(this.controllerEnabled){
            this.controller.listenForGamePad(event => this.screens[this.currentScreen].handleInput(event));
        }
    }
    addScreens(screens): void{
        this.setupScreens(screens);
    }
    setupScreens(screens): void{
        for(let screen in screens){
            this.screens[screen] = new screens[screen](
                {
                    ctx: this.ctx, 
                    canvas: this.canvas, 
                    scale: this.scale, 
                    gotoScreen: this.gotoScreen.bind(this),
                    data: this.dataManager.store
                })
            this.screens[screen].setup();
        }
       
    }
    gotoScreen(target: string): void{
        this.currentScreen = target;
    }
    addSounds(sounds: object): void{
        this.soundManager.addSounds(sounds);
    }
    addData(data: object) {
        this.dataManager.update(data);
    }
    addImages(images: object){
        this.imageManager.addImages(images);
    }
    useCustomControllerMap(map){
        this.controller.overrideControllerMapping(map)
    }

}

export default Game;