import GeoJSON from 'ol/format/GeoJSON.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
// [120.2,30.2]

export default function addPointGeoJSONLayer(map,x,y){
    //创建一个点的GeoJSON数据
    const geoPoint={
        "type":"Feature",
        "geometry":{
            "type":"Point",
            "coordinates":[x,y]
        },
        "properties":{
            "name":"杭州市",
            "weather":"26.5 ℃"
        }
    }
    
    //创建一个GeoJSON实例，用于 VectorSource 的 format 选项
    const geojsonFormat=new GeoJSON()
    //用readFeature读取geoPoint中数据
    const geojsonFeature=geojsonFormat.readFeature(geoPoint) 
    //创建VectorSource实例
    const ownsource= new VectorSource({
        //features用于指定要添加到矢量数据源中的要素集合
        features:[geojsonFeature],
        // format用于指定数据源的格式
        format:geojsonFormat
    })
    
    const layerOwnGeo=new VectorLayer({
        // 指定 VectorLayer 要绑定的数据源
        source:ownsource,
        zIndex:1200
    })
    map.addLayer(layerOwnGeo)

    return layerOwnGeo
}