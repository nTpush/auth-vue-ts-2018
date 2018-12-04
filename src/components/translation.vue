<template>
    <div class="layout">
        <!--<h1 style="font-size: 16px; text-align: center;">{{ $t("message.hello") }}</h1>-->
        <ul>
            <li v-for='item in $t("message.hellos")'>
                <h1> {{ item.title }} </h1>
            </li>
        </ul>
        <Button v-if="istrans" @click="changeEng">中</Button>
        <Button v-else @click="changeZh">英</Button>
    </div>
</template>
<script lang="ts">


    import Vue from 'vue'
    import Component from 'vue-class-component'
    @Component({
    })
    export default class App extends Vue {
        // 初始化数据
        istrans = true;

        changeEng() {
            console.log('33')
            this.istrans = false;
            this.$i18n.locale = 'zh'
        }

        changeZh() {
            console.log('44')
            this.istrans = true;
            this.$i18n.locale = 'en'
        }
    }
</script>