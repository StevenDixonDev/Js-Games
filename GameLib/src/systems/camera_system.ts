import System_Base from './system_base';
import Store from '../core/store';
import Vector from "../modules/vector";
import {createCollidable, convertToCollidable, round} from '../modules/utils';
import {SAT} from '../modules/collider';



class Camera_System extends System_Base{
    constructor(){
        super();
        this.targetComponents = ['CameraFocus'];
    }

    init(){}

    update({deltaTime, entities}){
       const {camera, scale, cameraBorder} = Store.getStore('engine').access('camera', 'scale', 'cameraBorder');
       
     
        entities.query(...this.targetComponents).forEach(e => {
            
           
           if(e.hasComponent('Size', 'Position')){
            const {pos} = e.getComponent("Position");
            const {size} = e.getComponent("Size");
            let newOffsets = new Vector(round((-camera.size.x/(2*scale)) + pos.x + size.x/2)  , round(-camera.size.y/(2*scale) + pos.y + size.y/2))
                camera.offSets.set(newOffsets);
           }

       })
    }
}

export default Camera_System;
