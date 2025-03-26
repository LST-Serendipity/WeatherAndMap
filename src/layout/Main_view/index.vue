<template>
    <div class="tabber"></div>
    <div class="router_main">
        <router-view></router-view>
    </div>
</template>

<script setup lang='ts'>
  
</script>

<style scoped >
    .tabber{
        width: 100%;
        height: 8%;
        background-color:linear-gradient(to bottom ,rgb(239, 237, 237),rgb(166, 229, 206),rgb(131, 189, 188));
        margin-bottom:20px ;
        border-top: 1px solid black;
        border-bottom: 2px solid black;
    }
    .tabber:hover{
        box-shadow: 4px 0px 8px gray;
        z-index: 1;
    }
    .router_main{
        position: relative;
        width: 100%;
        height: 80%;
    }
</style>