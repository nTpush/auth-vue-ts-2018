<template>
    <div class="layout">
       <img src="/static/image/love.png" alt="">

        <div class="z_header_box">
           
            <input type="password" class="z_input"> 
             <div class="z_header">
                <img src="/static/image/head.png" alt="">
            </div>

            <p class="z_error" v-if="false">———— 密码输入错误！</p>
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    @Component({
    })
    export default class App extends Vue {
        $refs: {
                checkboxElement: HTMLFormElement
            }
        // 初始化数据
  
    }
</script>
<style scoped>
    .layout {
        background: #222222;
        text-align: center;
        height: 100vh;
        animation: layout 0.5s forwards;
    }

    .z_input {
        width: 370px;
        border-radius: 45px;
        height: 45px;
        border: none;
        outline: none;
        padding-left: 60px;
        margin-top: -20px;
        background: #ccc;
        transition: all 0.5s;
        font-size: 16px;
        opacity: 0;
        animation: w 1s forwards;
        animation-delay: 0.5s;
       
    }

    .z_input:focus {
        background: #fff;
    }

    .z_header_box {
        position: relative;
    }

    .z_header {
        width: 55px;
        height: 55px;
        background: #81CC50;
        position: absolute;
        left: 40%;
        top: -20px;
        border-radius: 50%;
        overflow: hidden;
        transform: scale(0);
        animation: heade 0.5s forwards;
        animation-delay: 1s;
    }

    .z_header img {
        width: 100%;
        margin-top: -5px;
    }

    .z_error {
        line-height: 50px;
        color: #A7271E;
        text-indent: 200px;
    }


    @keyframes layout {
        0%{
            transform: translateY(-100vh)
        }
        100% {
            transform: translateY(0)
        }
    }

    @keyframes heade {
        0%{
            transform: scale(0)
        }
        100% {
            transform: scale(1)
        }
    }


    @keyframes w {
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
</style>
