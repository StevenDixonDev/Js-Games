import {Components} from 'GameLib';


export function Player(){
    let comp = Components.getComponents();
    return [
        new comp.Position(15,15),
        {component: comp.Size, values: "8,8"},
        {component: comp.Sprite, values: "player"},
        {component: comp.Renderable, values: ""},
        {component: comp.Entity, values: "5,Tiled"},
        {component: comp.Player, values: ""},
        {component: comp.Movable, values: ""},
        {component: comp.Inputs, values: ""},
        {component: comp.CameraFocus, values: ""},
        {component: comp.Physics, values: ""},
        {component: comp.Solid, values: ""},
        //{component: comp.Gravity, values: ".5"},
        //{component: comp.Bounce, values: "1"}
        //,new comp.Gravity(.3),
        new comp.State('idle'),
        new comp.Animate({
          'idle': 0,
          'walk-up': 2,
          'walk': 5
        })
      ]; 
    
}
