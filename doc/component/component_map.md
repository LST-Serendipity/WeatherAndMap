# 地图组件
````md
````

## 地图布局
```vue
    <template>
        <div id="map">
            <!-- 变换地图 -->
            <div class="mapbtn">
                <button id="vec">矢量图</button>
                <button id="img">影像图</button>
                <button id="ter">地形图</button>
            </div>
            <!-- 点击获取经纬度 -->
            <div class="coordinate">
                <p id="lon"></p>
                <p id="lat"></p>
            </div>
            <!-- 比例尺 -->
            <div id="scaleline"></div>
            <!-- 控件 -->
            <div id="allcontrol"></div>
            <div id="marke_point">
                <div id="point"></div>
            </div>
        </div>
    </template>
```
## 地图显示与交互
```vue
    <script setup lang='ts'>
        import Map from '@/API/setMap';
        import TileLayer from 'ol/layer/Tile';
        import { Vector, XYZ } from 'ol/source';
        import getKey from '@/API/mapkey';
        import { onMounted, ref} from 'vue';
        import useStore from '@/store/modale/datasidderL'
        import setControl from '@/unit/mapControl'
        import ScaleLine from 'ol/control/ScaleLine.js';
        import addgeojson from '@/unit/addGeoJSON';
        import { Overlay } from 'ol';
        import addPointGeoJSONLayer from '@/unit/adoptGeoJsonAddPoint';
        import addPolygonGeoJSONLayer from '@/unit/adoptGeoJSONAddPolygon';

        //引入key
        const {cva_w,vec_w,img_w,ter_w}=getKey()
        const usestore=useStore()

        //挂载完后执行
        onMounted(()=>{
            const map=Map.setmap('map',[105.45,34.45],4)
            //矢量注记图
            const cvaLayer=new TileLayer({
                source:new XYZ({
                    url:cva_w,
                    wrapX:false
                }), 
                zIndex:2,
            })
            //矢量图
            const vecLayer=new TileLayer({
                source:new XYZ({
                    url:vec_w,
                    wrapX:false
                }), 
                zIndex:1,
            })
            //影像图
            const imgLayer=new TileLayer({
                source:new XYZ({
                    url:img_w,
                    wrapX:false
                }), 
                zIndex:1,
                
            })
            // 地形图
            const terLayer=new TileLayer({
                source:new XYZ({
                    url:ter_w,
                    wrapX:false
                }), 
                zIndex:1,
            })
            //添加图层
            map.addLayer(vecLayer)
            map.addLayer(cvaLayer)
            map.addLayer(imgLayer)
            map.addLayer(terLayer)
        
            // 设置显隐
            function visibleLayer(){
                vecLayer.setVisible(usestore.getVisible('vecLayer'))
                imgLayer.setVisible(usestore.getVisible('imgLayer'))
                terLayer.setVisible(usestore.getVisible('terLayer'))
            }
            visibleLayer()

            // 按钮点击事件，控制图层显隐
            document.getElementById('vec').addEventListener('click',()=>{
                usestore.togglevalue('vecLayer')
                visibleLayer()
            })
            document.getElementById('img').addEventListener('click',()=>{
                usestore.togglevalue('imgLayer')
                visibleLayer()
            })
            document.getElementById('ter').addEventListener('click',()=>{
                usestore.togglevalue('terLayer')
                visibleLayer()
            })

            const scaleLine=new ScaleLine({
                target:'scaleline'
            })
            map.addControl(scaleLine)

            setControl(map,'allcontrol')

            // 调用addgeojson方法获取GeoJSON数据，并添加到地图上，中国地图GeoJOSON数据
            const {sourelayer,geolayer}=addgeojson(map,'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
            
            // 调用addPointGeoJSONLayer方法，创建一个点，可以指定坐标
            addPointGeoJSONLayer(map,120.2,30.2)

            // 创建一个坐标数组，用于画面
            const arr=[
                [120.1, 30.1],
                [120.2, 30.1],
                [120.2, 30.2],
                [120.1, 30.2],
                [120.1, 30.1]
            ]
            // 调用addPolygonGeoJSONLayer方法，创建一个面，可以指定坐标arr
            addPolygonGeoJSONLayer(map,arr)
        

            //map点击事件
            map.on('click',(event)=>{
                // console.log(map.getCoordinateFromPixel(event.pixel) );
                //获取点击位置的坐标
                let coor=map.getCoordinateFromPixel(event.pixel)
                const lon=ref(coor[0])
                const lat=ref(coor[1])
                
                document.getElementById('lon').innerHTML=`${lon.value.toFixed(3)}`
                document.getElementById('lat').innerHTML=`${lat.value.toFixed(3)}`
                
                const marke_point=document.getElementById('marke_point')
                const point=document.getElementById('point')
                //map.forEachFeatureAtPixel用于遍历地图上指定像素位置处的所有要素
                //返回feature
                const feature=map.forEachFeatureAtPixel(event.pixel,(feature)=>{
                    return feature
                })
                //判断返回的feature，如果有就执行，没有就隐藏
                if(feature){
                    //获取点击点的坐标
                    const coordinates=event.coordinate
                    //如果点击的是point元素，就展示name
                    if(point){
                        //获取geojson数据里面的name
                        const name=feature.getProperties().name
                        point.innerHTML=`<p>${name}</p>`
                    }
                    if(marke_point){
                        //显示容器
                        marke_point.style.display='block'
                    }
                    //新建overlay实例
                    const overlay=new Overlay({
                        //绑定marke_point容器
                        element:marke_point,
                        //显示位于点击点的下面
                        positioning:'bottom-center',
                        
                        // stopEvent:false
                    })
                    //添加覆盖物
                    map.addOverlay(overlay)
                    // 设置覆盖物的位置为点击点的坐标
                    overlay.setPosition(coordinates)
                    
                }else{
                    //如果feature为null或undefine就隐藏
                    if(marke_point){
                        marke_point.style.display='none'
                    }
                }
            })
        })
 
    </script>
``` 
## style样式
```vue       
    <style scoped >
        #map{
            position: relative;
            
            width: 90%;
            height: 100%;
            border-radius: 10px;
            border: 1px solid black;
            overflow: hidden;
            margin: auto;
            /* 变换地图*/
            .mapbtn{
                position: absolute;
                width: 150px;
                height: 30px;
                margin: 5px;
                z-index: 5;
                right: 0;
                button{
                    width: 50px;
                    height: 30px;
                    border-radius: 10px;
                    background-color: rgb(239, 236, 236,0.5);
                }
            }
            /* 点击获取经纬度 */
            .coordinate{
                position: absolute;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                width: 90px;
                height: 20px;
                z-index: 5;
                bottom: 5px;
                left: 5px;
                background-color: rgb(239, 236, 236,0.5);
                p{
                    font-size: 12px;
                    text-shadow: 0px 0px 10px white;
                }
            }
            /* 控件 */
            #allcontrol{
                position: absolute;
                
                top: 50px;
                width: 15px;
                height: 150px;
                
                gap: 5px;
                background-color: transparent;
                z-index: 1000;
            }
            /* 比例尺 */
            #scaleline{
                position: absolute;
                width: 50px;
                height: 20px;
                left: 105px;
                bottom: 5px;
                z-index: 5;
                font-size: 12px;
                background-color: rgb(239, 236, 236,0.5);
            }
            #marke_point{
                border: 1px solid black;
                display: none;
                padding: 5px;
                border-radius: 10px;
                background-color: rgba(116, 226, 251, 0.3);
            }
        }
        button:hover{
            box-shadow: 2px 2px 4px black;
        }
    </style>
```


````md