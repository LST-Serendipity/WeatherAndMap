
import GeoJSON from 'ol/format/GeoJSON.js'
import VectorLayer from 'ol/layer/Vector.js'
import { Vector } from 'ol/source.js'
export default function addgeojson(map,url){
    //
    const sourelayer=new Vector({
        url:url,
        format:new GeoJSON()
    })
    const geolayer=new VectorLayer({
        source:sourelayer,
        zIndex:5
    })
    map.addLayer(geolayer)
    return {sourelayer,geolayer}
}
