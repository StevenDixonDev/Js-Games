import System_Base from './system_base';
import SpriteSheet from '../modules/spriteSheet';
import Store from '../modules/store';
import Renderer from '../modules/renderer';
import spriteSheet from '../modules/spriteSheet';
import components from '../components/components';

class Render_System extends System_Base{
    private spriteSheets: any;
    private renderer: any;

    constructor(){
        super();
        this.order = 99;
        this.targetComponents = ['Position', 'Renderable'];
        this.spriteSheets = SpriteSheet;
        this.renderer = null
    }

    init(){
        const {sheets, imageRoot} = Store.getStore('asset').access('sheets', 'imageRoot');
        const {ctx} = Store.getStore('engine').access('ctx')
        this.spriteSheets.create(sheets, imageRoot);
        this.renderer = Renderer(ctx)('system');
    }

    update(deltaTime, enities){
        const [tiles, sprites] = partition(enities, (e) => e.hasComponent('Tile'));

        const {camera, totalTime, ctx} = Store.getStore('engine').access('camera', 'totalTime');
        const {images} = Store.getStore('asset').access('images');

        //const offset = {  x:0 , y: 0 }
        // if(camera){
        //     if(!camera.checkifViewable(tileIn)){
        //         return
        //     }
        //     offset.x = camera.xOffset;
        //     offset.y = camera.yOffset;
        //     }


        tiles.forEach(t => {

         
            const {pos} = t.getComponent('Position');
            const {spriteSheetName} = t.getComponent('Sprite')
            const {size} = t.getComponent('Size');
            const {tileType} = t.getComponent('Tile');
            const ss = this.spriteSheets.resolve(spriteSheetName)
            const {tile, imageName} = (ss.resolveTileData(tileType, totalTime));
            const image = images[imageName];
            if(image && tile){
                this.renderer.drawTile(image, tile,  pos.x, pos.y, size.x, size.y)
            }
            
        })

        sprites.forEach(t => {
            if(t.hasComponent('Sprite'))  {
                const {pos} = t.getComponent('Position');
                const {spriteSheetName} = t.getComponent('Sprite')
                const {size} = t.getComponent('Size');
                const {entityType} = t.getComponent('Entity');
                const ss = this.spriteSheets.resolve(spriteSheetName)
                const {sprite, imageName} = (ss.resolveSpriteData(entityType, totalTime));

                const image = images[imageName];
                if(image && sprite){
                    this.renderer.drawSprite(image, sprite,  pos.x, pos.y, size.x, size.y)
                }
            }else if(t.hasComponent('Size')){
                const {pos} = t.getComponent('Position');
                const {size} = t.getComponent('Size');
                this.renderer.drawRect(pos.x, pos.y, size.x, size.y, 'red', false, true)
            } else if (t.hasComponent('Polygon')){
                const {vertices} = t.getComponent('Polygon');
                const {pos} = t.getComponent('Position');
            
                this.renderer.drawPolygon('red', false, true, pos, vertices);
            }
            
        })


        
    }
}

function partition(array, isValid) {
    return array.reduce(([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    }, [[], []]);
}

export default Render_System;