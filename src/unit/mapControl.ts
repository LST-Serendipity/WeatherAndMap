import FullScreen from 'ol/control/FullScreen.js';

export default function setControl(map,id){

    const fullScreen=new FullScreen({
        target:id
    })
    map.addControl(fullScreen)
}
