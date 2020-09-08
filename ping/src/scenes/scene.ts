interface SceneData {
    ctx: any,
    canvas: any,
    scale: number,
    nextScene: () => void,
    updateGameStore: () => void;
    data: any
}

class Scene {
    private _scale : number;
    private _ctx: any;
    private _canvas: any;
    private _data: object;
    private _nextScene: () => void;
    private _updateGameStore: (data: any) => void;
    
    constructor({ctx, canvas, scale, nextScene, updateGameStore, data}: SceneData){
        this._ctx = ctx;
        this._canvas = canvas;
        this._scale = scale;
        this._nextScene = nextScene;
        this._updateGameStore = updateGameStore;
        this._data = data;
    }
    get scale(): number {
        return this._scale;
    }
    get ctx(): any {
        return this._ctx;
    }
    get canvas(): any {
        return this._canvas;
    }
    get data(): any {
        return this._data;
    }
    updateGameData(data: object): void{
        this._data = {...this._data, ...data};
    }
    update(deltaTime: number, updateStore: object): void{

    }
    draw(deltaTime: number): void{
    }

    handleInput(event: object): void{
    }
    gotoNextScene(): void {
        this._nextScene()
    }
    updateGameStore(data: any){
        this._updateGameStore(data);
    }
}

export default Scene;