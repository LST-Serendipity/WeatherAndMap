import GeoJSON from 'ol/format/GeoJSON.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';

export default function addPolygonGeoJSONLayer(map,arrCoordinates){

    //创建一个面的GeoJSON数据
    const geoPolygon={
        "type":"Feature",
        "geometry":{
            "type":"Polygon",
            "coordinates":[
                    arrCoordinates
            ]
        }
    }

    const geoPolygonformat=new GeoJSON()
    const geoPolygonsourece=geoPolygonformat.readFeature(geoPolygon)

    const geoVector=new VectorSource({
        features:[geoPolygonsourece],
        format:geoPolygonformat
    })
    
    const geoPolygonlayer=new VectorLayer({
        source:geoVector,
        zIndex:1300
    })
    map.addLayer(geoPolygonlayer)

    return geoPolygonlayer
}