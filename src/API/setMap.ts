import { Map ,View} from "ol"

const setmap=(id:string,center:any,zoom:number)=>{
    const map=new Map({
        target:id,
        layers:[],
        view:new View({
            center:center,
            zoom:zoom,
            minZoom:0,
            maxZoom:15,
            projection:'EPSG:4326'
        })
    })
    return map
}

export default {setmap}