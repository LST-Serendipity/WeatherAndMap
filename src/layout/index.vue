<template>
    <div class="countainer">
      <div class="countainerSidder">
        <SidderL_view></SidderL_view>
      </div>
      <div class="countainerMain">
        <Main_view></Main_view>
      </div>
      <div class="containterTabber">
        <SidderR_view></SidderR_view>
      </div>
    </div>
</template>

<script setup lang='ts'>
    import Main_view from '../layout/Main_view/index.vue'
    import SidderL_view from '../layout/SidderL_view/index.vue'
    import SidderR_view from '../layout/SidderR_view/index.vue'
</script>

<style scoped >
    .countainer{
        position: relative;
        display: flex;
        box-sizing: border-box;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background: linear-gradient(to bottom ,rgb(239, 237, 237),rgb(166, 229, 206),rgb(131, 189, 188),rgb(90, 128, 157),
        rgb(93, 77, 145),rgb(114, 80, 143),rgb(126, 82, 138),rgb(145, 92, 146),rgb(132, 71, 117)
        ,rgb(138, 89, 107));

        .countainerSidder{
        width: 15%;
        height: 100%;
        padding: 5px;
        background-color: rgb(232, 229, 229,0.2);
        
        
        }

        .countainerMain{
        
        width: 70%;
        height: 100%;
        
        background: linear-gradient(to bottom ,rgb(239, 237, 237),rgb(166, 229, 206),rgb(131, 189, 188),rgb(90, 128, 157),
        rgb(93, 77, 145),rgb(114, 80, 143),rgb(126, 82, 138),rgb(145, 92, 146),rgb(132, 71, 117)
        ,rgb(138, 89, 107));
        .mainView{
          width: 60%;
          height: 60%;
          margin: auto;
        }
        }
        .containterTabber{
        width: 15%;
        height: 100%;
        padding: 5px;
        background-color: rgb(232, 229, 229,0.2);
        
        }

    }
    .countainerSidder:hover{
      box-shadow: 4px 4px 6px gray;
      z-index: 1;
    }
    .containterTabber:hover{
      box-shadow: -4px 0 6px gray;
      z-index: 1;
    }
</style>