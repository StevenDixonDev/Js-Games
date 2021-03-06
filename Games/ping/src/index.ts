
// import game library to handle the game
import {GameManager} from './lib/index';

//import user defined scenes
import StartScreen from './scenes/start/startScreen';
import GameScreen from './scenes/game/gameScreen';
import EndScreen from './scenes/end/endScreen';

// import user defined sounds
import sounds from './sounds';
// import user defined images

//create a new game object
const myGame = new GameManager();

//tell the game to use the canvas object with and id of game and a scale of 1 and tell it which screen to start on
myGame.setup('game', 1, 'StartScreen');
// load user defined sounds into game
myGame.loadSounds(sounds);
// todo: load user defined images into game
myGame.loadData({
    playerScore: 0,
    aiScore: 0,
    playerWin: false
})
// load user defined screens into game
myGame.addScreens(
    {
        StartScreen,
        GameScreen,
        EndScreen
    }
);

// tell the game manager to start the game with the defined resources
myGame.start();