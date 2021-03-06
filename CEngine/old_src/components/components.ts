import GameObject from './gameObject';
import Vector2D from '../modules/vector';
import {createVertices} from '../modules/utils';

export class Component{
    gameObject: GameObject;
    constructor(){
        this.gameObject = null;
    }
}

class Player extends Component{};

class Solid extends Component{};

class Renderable extends Component{};

class Viewable extends Component{;}

class Movable extends Component{};

class Bounce extends Component{
    bounce: Vector2D;
    constructor(value){
        super();
        this.bounce = value || 5;
    }
}

class Gravity extends Component{
    gravity: Vector2D;
    constructor(value){
        super();
        this.gravity = new Vector2D(0, value || .1);
    }
};

class Inputs extends Component{
    inputs: any;
    constructor(){
        super();
        this.inputs = {};
    }
};

class CameraFocus extends Component{};

class Killable extends Component{
    dead: boolean;
    constructor(){
        super();
        this.dead = false;
    }
}

class zIndex extends Component{
    index: number;
    constructor(index: number){
        super();
        this.index = index;
    }
};

class Animate extends Component{
    map: any;
    constructor(map){
        super();
        this.map = map;
    }
};

class Sprite extends Component{
    spriteSheetName: string;
    constructor(spriteSheet: string){
        super();
        this.spriteSheetName = spriteSheet;
    }
};

class State extends Component{
    state: string;
    constructor(currentState: string){
        super();
        this.state = currentState;
    }
};

class Entity extends Component{
    entityType: number | string;
    sheetType: string;
    constructor(entityType: string | number, sheetType: string){
        super();
        this.entityType = entityType;
        this.sheetType = sheetType;
    }
};

class Tile extends Component{
    tileType: number | string;
    sheetType: string;
    constructor(type: string, sheetType: string){
        super();
        this.tileType = type;
        this.sheetType = sheetType;
    }
};

class Position extends Component{
    pos: Vector2D;
    constructor(x, y){
        super();
        this.pos = new Vector2D(x, y);
    }
};

class Size extends Component{
    size: Vector2D;
    constructor(w, h){
        super();
        this.size = new Vector2D(w, h);
    }
};

class Polygon extends Component{
    vertices: Vector2D[];
    constructor(vertices){
        super();
        this.vertices = createVertices(vertices);
    }
};


class Physics extends Component{
    collided: boolean;
    mass: number;
    velocity: Vector2D;
    friction: Vector2D;
    acceleration: Vector2D;
    resolve: any;
    constructor(v?, f?, a?){
        super();
        this.velocity = v ? new Vector2D(v.x, v.y) : new Vector2D(0,0);
        this.friction = f ?  new Vector2D(f.x, f.y) : new Vector2D(.6,.6);
        this.acceleration = new Vector2D(0,0);
        this.mass = a || 1
    };
};

class Collectible extends Component{}

class Emitter extends Component{
    
}

class Particle extends Component{
    life: number;
    lifeTime: number;
    currentLife: number;
    constructor(lifeTime){
        super();
        this.lifeTime = lifeTime;
        this.currentLife = 0;
    }
}


class Components{
    comp: any;
    constructor(){
        this.comp =  {
            Player,
            Solid,
            Renderable,
            Viewable,
            Movable,
            Gravity,
            Inputs,
            Killable,
            zIndex,
            Sprite,
            Animate,
            State,
            Tile,
            Position,
            Size,
            Polygon,
            Physics,
            Entity,
            CameraFocus,
            Bounce,
            Collectible,
            Emitter,
            Particle 
        }
    }

    get components(){
        return this.comp;
    }

    getComponents(){
        return this.comp;
    }

    addComponents(components){
        components.forEach(com =>{
            let temp = new com({});
            this.comp[temp.constructor.name] = com;
        })
    }
}


export default new Components()