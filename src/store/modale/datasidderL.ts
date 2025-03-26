import { defineStore } from "pinia";
import {constantRoute} from '@/router/routes.js'
import Request from "@/unit/request.js";
import * as echarts from 'echarts';


export default defineStore('store',{
    //保存数据
    state:()=>({
        //路由数据
        //天气请求数据
        sidderRoutes:constantRoute,
        name:'',
        weather:{},
        main:{},
        wind:{},
        forecast:[],
        forecastTime:[],
        forecastTemp:[],
        //地图图层显隐数据
        Visible:{
            vecLayer:true,
            cavLayer:true,
            imgLayer:false,
            terLayer:false,
        }as Record<string,boolean>
       
    }),
    actions:{
        // 发送请求获取当前数据
        async getResult(city){
            
            try{
                await Request.request(city).then((result)=>{

                    if(result){
                        this.name=result.data.name,
                        this.weather=result.data.weather
                        this.main=result.data.main
                        this.wind=result.data.wind
                    } 
                })
            }catch(err){
                
                alert(err.message)
                
                return Promise.reject(err)
            } 
        },
        //发送请求获取预测数据
        async getMulTemp(city){
            try{
                const result=Request.requestForecast(city).then((data)=>{
                    this.forecast=data.data.list
                    // 获取预测数据的前六项数据（当前时间的及前后两个，三个小时数据）并返回
                    //温度及时间（由于openweather是三小时测一次）
                    function getForecast(data){
                        
                        let arrTemp=[]
                        let arrTime=[]
                        
                        for(let i=0;i<6;i++){
                            arrTime.push(data[i].dt_txt.split(" "))
                            
                            arrTemp.push(data[i].main.temp)
                        }
                        
                        let arrTimeHour=[]
                        arrTime.forEach(item => {
                            arrTimeHour.push(item[1])
                        });

                        return {arrTemp,arrTimeHour}

                    }
                    //将数据保存在仓库
                    const {arrTemp,arrTimeHour}=getForecast(data.data.list)

                    // let arr=data.data.list
                    // let arrTemp=[]
                    // let arrTime=[]
                    
                    // let a=[]

                    // for(let i=0;i<6;i++){
                    //     a.push(arr[i].dt_txt.split(" "))
                    //     arrTime.push(arr[i].dt_txt)
                    //     arrTemp.push(arr[i].main.temp)
                    // }
                    // console.log(a);
                    // let b=[]
                    // a.forEach(item => {
                    //     b.push(item[1])
                    // });
                    // console.log(b);
                    
                    // console.log(arrTemp);
                    // console.log(arrTime);

                    this.forecastTime=arrTimeHour
                    this.forecastTemp=arrTemp

                   return 'ok'
                })
                            
                            // console.log(result);
                
            }catch(err){
                alert(err)
                return Promise.reject(err)
            }
        },
        //制作图表
        async makeChart(chartDom,myChart,forecastTime,forecastTemp) {
            //制作图表
            if (chartDom.value) {
                myChart = echarts.init(chartDom.value);
                const option = {
                xAxis: {
                    type: 'category',
                    // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    data:forecastTime
                },
                yAxis: {
                    
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                },
                series: [{
                    // data: [150, 230, 224, 218, 135, 147, 260],
                    data:forecastTemp,
                    type: 'line'
                }]
                };
                myChart.setOption(option);
        }
    
        },
        // 得到visible值
        getVisible(layer:string){
            return this.Visible[layer]||false
        },
        // 设置visible值
        setVisible(layer:string,visible:boolean){
            this.Visible[layer]=visible
        } ,
        // 改变图层显隐
        togglevalue(layer:string){
            this.Visible[layer]=!this.Visible[layer]
        }  

    }
})