import {System_Base, Event} from 'GameLib';


class Collision_Resolver_System extends System_Base {
    constructor(){
        super();
    }

    init(){
        Event.subscribe('Open_Door', (data)=>this.handle(data));
    }

    update({deltaTime, entities}){
        //console.log(entities)
    }

    handle({data, gameObject}){
        gameObject.query('Door').forEach(item =>{
            let {door} = item.getComponent('Door');
            if(door == data){
                gameObject.removeGameObject(item)
            }
        })
    }
}

export default Collision_Resolver_System;