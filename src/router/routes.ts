
export const constantRoute=[
    {
        path:'/',
        name:'home',
        component:()=>import('@/view/home/index.vue'),
        meta:{
            title:'主页',
            
        }
    },
    {
        path:'/weather',
        name:'weather',
        component:()=>import('@/view/queryweather/index.vue'),
        meta:{
            title:'天气'
        },
        
      
    },
    {
        path:'/displayView',
        name:'displayView',
        component:()=>import('@/view/displayView/index.vue'),
        meta:{
            title:''
        },
        children:[
            {
                path:'/dispalyMapWea',
                name:'dispalyMapWea',
                component:()=>import('@/view/displayView/diaplaymapWea/index.vue'),
                meta:{
                    title:'显示天气地图'
                },
            }
        ]
        
    },
    
    {
        path:'/seeMap',
        name:'seeMap',
        component:()=>import('@/view/seeMap/index.vue'),
        meta:{
            title:'查看地图'
        }
        
    }

]