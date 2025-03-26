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

