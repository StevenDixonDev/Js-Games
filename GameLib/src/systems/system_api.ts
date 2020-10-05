import Renderer from './renderer';
import Sound from './sound_handler';
import Level_Handler from './level_handler';

import store from '../modules/store';

function api(){
    const renderer = new Renderer(store);
    const sound = new Sound(store);
    const level = new Level_Handler(store);

    renderer.setup();

    return {
        ...renderer.getTools(),
        ...sound.getTools(),
        ...level.getTools(),
        getStore: (key?: string) => {
            return store.getStore('user').access(key);
        },
        getCamera: () => {
            return store.getStore('engine').access('camera');
        },
        nextScene: (scene: number) => store.getStore('engine').update('currentScene', scene)
    }
}

export default api;