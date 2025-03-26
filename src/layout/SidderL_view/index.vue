<template>
    <div class="sidderL">
        <h2>查询</h2>
        <div>
            <ul class="nav_sidderL">
                <li v-for="item in router_sidderL" :key="item.path" @click="goWay(item)" v-show="item.meta.title">
                    
                    <button>{{ item.meta.title }}</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang='ts'>
    import { useRouter } from 'vue-router';
    import useStore from '@/store/modale/datasidderL'
    const router=useRouter()

    const usestore=useStore()
    const router_sidderL=usestore.$state.sidderRoutes
    
   
    const goWay=(val)=>{
        router.push(val)
    }
 

</script>

<style scoped >
    .sidderL{
        overflow: hidden;
        h2{
            text-align: center;
            margin: 5px 0;
        }
        .nav_sidderL{
            text-align: center;
            margin: 50px 0;
            li{
                margin: 10px 0; 
                border-bottom: 1px solid blue;
                button{
                    background-color: transparent;
                    width: 100%;
                    border: none;
                    font-size: large;
                    cursor: pointer;
                }   
                
            }
            
        }
    }
    button:hover{
        color: rgb(61, 58, 58);
        box-shadow: 3px 3px 4px gray;
    }
</style>