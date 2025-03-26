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