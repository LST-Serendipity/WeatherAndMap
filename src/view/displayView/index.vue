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