# API封装

````md
````
## 密钥封装
**key.ts**


```ts

export const Key= ()=>{    
  const key='请求密钥（key）'
  return {key}
}

```


## 地图初始化封装

**map.ts**


```ts
  //初始化map
import { Map, View } from "ol"

export default function setMap(map_container:string,x:number,y:number,Zoom:number){
    const map=new Map({
        target:map_container,
        layers:[],
        view:new View({
            center:[x,y],
            zoom:Zoom,
            projection:'EPSG:4326'
        })

    })
    return map
}
 
```
````md