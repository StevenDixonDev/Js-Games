function createAnimation(frames, length){
    return function resolveFrame(d){
        const index = Math.floor(d/ length) % frames.length;
        return frames[index];
    }
}

function createTiledAnimation(frames, options){
    
    let direction = 'loop';
   
    if(options){
        options.forEach(op => op.name == 'direction'? direction = op.value: '');
    }
    
    let ended = false
    
    const totalFrameTime = frames.reduce((acc, cur)=>{return acc + cur.duration}, 0);
    
    return function resolveFrame(d, e){
        let clampedT = (d % totalFrameTime);
        let i = 0;

        if(direction == 'loop'){
            frames.forEach(frame => {
                clampedT -= frame.duration;
                if(clampedT >= 0){ i += 1}
            })

            return frames[i].tileid;
        }

        if(direction == 'forward' && !ended){
            frames.forEach(frame => {
                clampedT -= frame.duration;
                if(clampedT >= 0){ i += 1}
                if(i == frames.length -1) {ended = true}
            })
        } else if (direction == 'forward' && ended) {
            i = frames.length - 1
        }

        return frames[i].tileid;
    }
}


class SpriteSheet {
    src:  any;
    data: any;
    image: any;
    name: string
    tiles: any;
    animations: any;
    offset: number;
    map: any;
    type: string;
    root: string;

    constructor(data, type, root){
        this.image = null;
        this.data = data;
        this.tiles = new Map();
        this.animations = new Map();
        this.map = new Map();
        this.offset = 0;
        this.type = type;
        this.root = root;

        this.setup(data);
    }

    setup(data){

        if(data.spec && this.type == 'custom'){
            if(data.spec.offset){
                this.offset = data.spec.offset;
            }
        }
        // check for frames
        if(data.frames && this.type == 'custom'){
            data.frames.forEach(tile => {
                this.tiles.set(tile.name, 
                    {x: tile.rect[0] + (tile.rect[0]/ tile.rect[2] * this.offset) ,
                    y:tile.rect[1] + (tile.rect[1]/ tile.rect[3] * this.offset),
                    w: tile.rect[2],
                    h: tile.rect[3]
                })
            })
        }

        //check for animations
        if(data.animations && this.type == 'custom'){
            data.animations.forEach(animation => {
                this.animations.set(animation.name, createAnimation(animation.frames, animation.frameLen));
            })
        }

        if(this.type == 'tiled'){
            const {tileheight, tilewidth, margin, spacing, tilecount, columns} = this.data;
            let iy = 0;
            for(let i = 0; i < tilecount; i++){
                
                this.tiles.set(i, {
                    x: margin + ((i%columns) *tilewidth) + ((i%columns) * spacing),
                    y: margin + (iy*tileheight) + (iy * spacing),
                    w: tilewidth,
                    h: tileheight
                })
                iy = Math.floor(i/(columns-1))
            }
            //tiled stores animations under the tiles section
            if(data.tiles){
                this.data.tiles.forEach(anim => {
                    this.animations.set(
                        anim.id,
                        createTiledAnimation(anim.animation, anim.properties)
                    )
                })
            }
        }
        this.image = data.name;
    }

    resolveSpriteData(name, time){
        if(this.animations.get(name)){
            let anim = this.animations.get(name);
            return {sprite: this.tiles.get(anim(time)), imageName: this.image};
        }else {
            return {sprite: this.tiles.get(name), imageName: this.image};
        }
    }
    resolveTileData(index, time){
        let imageName = '';
        if(this.type == 'tiled'){
            imageName = index;
        }else {
            imageName = this.data.map[index];
        }
        if(this.animations.get(imageName)){
            let anim = this.animations.get(imageName);
            return {tile: this.tiles.get(anim(time)), imageName: this.image};
        }else {
            return {tile: this.tiles.get(imageName), imageName: this.image};
        }
    }
}




function spriteSheet_Factory(){
    const _sheets = {};
    return {
        create: function(sheets){
            sheets.forEach(sheet => {
                if(sheet.tiledversion){
                    //         // this is a tile sheet from tiled
                    _sheets[sheet.name] = new SpriteSheet(sheet, 'tiled', this.imageRoot);
                }else {
                    _sheets[sheet.name] = new SpriteSheet(sheet, 'custom', this.imageRoot);
                }
            })
        },
        resolve: function(name){
            return _sheets[name];
        }
    }
}

export default spriteSheet_Factory();
