# 天气组件
````md
````

## 查询组件

**布局**
```vue
    <template>
    
        <div class="containerCheck">
            <h2>天气查询</h2>
            <input v-model="city" placeholder="输入城市名称(英文)" class="search"  >  
            <button class="checkBtn" @click=getWeather>查询</button>  
        </div>
        
        <div class="picture">
            <img src="https://haowallpaper.com/link/common/file/previewFileImg/15063730819272000" alt="">
        </div>
        
    </template>
```
**交互**
```vue
    <script setup lang='ts'>
        
        import { ref } from 'vue';
        import useStore from '@/store/modale/datasidderL'
        import {useRouter} from 'vue-router'
        
        const city=ref('')
        const usestore=useStore()
        const $router=useRouter()
        
        async function getWeather(){
            if(city.value.trim()==''){
                $router.push('/weather')
                alert('请输入城市名')
                return
            }
            else{
                
                try{
                    await usestore.getResult(city.value)
                    await usestore.getMulTemp(city.value)
                    $router.push('/displayView')
                }catch{
                    console.log('请求失败！');
                    return 
                }   
            }
        }

        

    </script>
```
**样式**
```vue

    <style scoped>
        
        .containerCheck{
            position: relative;
            width: 50%;
            height: 35%;
            margin: auto;
            border: 1px solid black;
            border-radius: 20px;
            align-items: center;
            box-shadow: 0 0 5px rgb(65, 63, 63);
            overflow: hidden;
            h2{
                text-align: center;
            }
            .search{
                display: block;
                margin: 20px auto;
                height: 30px;
                border-radius: 20px;
                border: none;
                text-align: center;
                transition: transform 0.5s ease;
            }
            .checkBtn{
                display: block;
                width: 100px;
                height: 30px;
                margin: 20px auto;
                border-radius: 5px;
                border-color: gray;
                background-color: transparent;
                transition: transform 0.5s ease;
            }
        }
        
        .search:hover{
            box-shadow: 2px 2px 4px gray;
            transform: scale(1.1);
        }
        .checkBtn:hover{
            box-shadow: 2px 2px 4px gray;
            transform: scale(1.1);
        }

        .picture{
            position: relative;
            width: 90%;
            height: 70%;
            margin: auto;
            margin-top: 10px;
            img{
                position: relative;
                width: 100%;
                height: 100%;
                border-radius: 20px;
                box-shadow: 0 0 5px rgb(65, 63, 63);
    
                
            }
        }
    </style>
```

## 展示组件
**布局**
```vue
    <template>
        <div class="containerCheckview">
            <div class="weather">
                <img :src="`https://openweathermap.org/img/wn/${icon}@2x.png`" alt="" class="icon">
                <h1> {{temp}} ℃</h1>
            </div>
            <p class="description">{{ description }}</p>
            <h4 class="city"> 城市： {{ name }}</h4>
            <h4 class="speed">风速：{{ speed }} m/s</h4>
            <p class="time">{{ time }}</p>
            <button @click="backCheck">返回</button>
        </div>
        
        <div class="containerForecast">
            <div ref="chartDom" class="tempECharts"></div>
        </div>
    </template>
```
**交互**
```vue
    <script setup lang='ts'>
        import useStore from '@/store/modale/datasidderL'
        import { onMounted, ref } from 'vue'
        import {useRouter} from 'vue-router'
        import getDate from '@/unit/NowDate';

        const usestore=useStore()
        //获取仓库数据
        const {main,name,wind,weather,forecastTemp,forecastTime}=usestore.$state

        //获取数据并渲染页面
        const temp=ref((main as {temp:number}).temp)
        const speed=ref((wind as {speed:number}).speed)
        const icon=ref((weather as {icon:any})[0].icon)
        const description=ref((weather as {description:string})[0].description)
        
        const time=getDate()
        
        const chartDom = ref(null);
        let myChart = null;

        onMounted(()=>{
            usestore.makeChart(chartDom,myChart,forecastTime,forecastTemp)
        })

        // const windSpeed=ref(main) 
        const $router=useRouter()
        
        const backCheck=()=>{
            $router.push('/weather')
        }
    </script>
```
**样式**
```vue
    <style scoped >
        .containerCheckview{
            position: relative;
            display: grid;
            grid-template-columns: repeat(20,1fr);
            grid-template-rows: repeat(7,1fr);
            gap: 5px;
            background-color: rgb(193, 240, 240,0.2);
            width: 50%;
            height: 40%;

            margin: auto;
            border: 1px solid black;
            border-radius: 20px;
            align-items: center;
            overflow: hidden;
            .weather{
                width: 100%;
                height: 100%;
                grid-row-start: 0;
                grid-row-end: 1;
                grid-column-start: 1;
                grid-column-end: 18;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .icon{
                    width: 20%;
                    height: 100%;
                    transition: transform 0.5s ease;
                }
                h1{
                    width: 80%;
                    height: 50%;
                    
                }
            }
            .description{
                grid-row-start: 1;
                grid-row-end: 2;
                grid-column-start: 7;
                grid-column-end: 15;
            }
            p{
                
                text-align: center;
            
            }
            h4{
                
                text-align: center;
            
            }
            .city{
                grid-row-start: 2;
                grid-row-end: 3;
                grid-column-start: 7;
                grid-column-end: 15;
            }
            .speed{
                grid-row-start: 3;
                grid-row-end: 4;
                grid-column-start: 7;
                grid-column-end: 15;
            }
            
            .time{
                grid-row-start: 4;
                grid-row-end: 5;
                grid-column-start: 7;
                grid-column-end: 15;
            }
            button{
                grid-row-start: 5;
                grid-row-end: 6;
                grid-column-start: 7;
                grid-column-end: 15;
                display: block;
                width: 100%;
                height: 100%;
                
                border-radius: 5px;
                border-color: gray;
                background-color: transparent;
                transition: transform 0.5s ease;
            }
            
        }
        button:hover{
            box-shadow: 2px 2px 4px gray;
            transform: scale(1.1);
        }
        .icon:hover{
            transform: scale(1.2);
        }
        
        .containerForecast{
            
            display: grid;
            position: relative;
            width: 95%;
            height: 350px;
            margin: auto;
            margin-top: 30px;
            border-radius: 20px;
            background-color: rgb(107, 166, 166,0.6);
            overflow: hidden;
            .tempECharts{
                position: relative;
                width: 90%;
                height: 100%;
                background-color: aquamarine;
                margin: 0 auto;
            }
        }
    </style>
```


````md