# 封装的方法
````md

````
## 获取当前时间


```ts
    // 获取当前时间（年月日时分秒）
    export default function getDate(){
        const date=new Date()
        const time=date.toLocaleDateString()+'/'+date.toLocaleTimeString()
        return time
    }
```




## 发送当前天气请求与预测天气请求

```ts
    import axios from "axios";
    // 引入api
    const key=import.meta.env.VITE_OPENWEATHER_API_KEY

    // 发送请求地址
    const weather='https://api.openweathermap.org/data/2.5/weather'
    const weather_forecast='https://api.openweathermap.org/data/2.5/forecast'

    //发送获取当前天气数据请求
    const request=async (city)=>{
        try{
        const result= await axios.get(weather,{
            params:{
                q:city,
                units: 'metric', // 摄氏度
                appid: key,
                lang:'zh-cn'     
            }
        })
        // console.log(result.data);
        
        return result
        }
        catch(err){
            console.log(err.message);

            return Promise.reject(err)
        }
    }

    //发送获取预测天气数据请求
    const requestForecast=async(city)=>{
        try{
            const request=await axios(weather_forecast,{
                params:{
                    q:city,
                    units: 'metric', // 摄氏度
                    appid: key,
                    lang:'zh-cn'
                }
            })
            // console.log(request);
            
            return request
        }catch(err){
            console.log(err);
            return Promise.reject(err)
            
        }
    }
    // 暴露出去
    export default {request,requestForecast}

```


## 添加控件
```ts
    import FullScreen from 'ol/control/FullScreen.js';

    export default function setControl(map,id){

        const fullScreen=new FullScreen({
            target:id
        })
        map.addControl(fullScreen)
    }

```

## 添加GeoJOSN数据
```ts
    export default function addgeojson(map,url){
        
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
```

## 创建点的GeoJSON数据，并添加点的GeoJSON数据到图层
```ts
    import GeoJSON from 'ol/format/GeoJSON.js';
    import VectorLayer from 'ol/layer/Vector.js';
    import VectorSource from 'ol/source/Vector.js';
   
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
```

## 创建面的GeoJSON数据，并添加面的GeoJSON数据到图层
```ts
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
```

````md