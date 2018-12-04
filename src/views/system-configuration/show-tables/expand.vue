<template>
    <div class="layout">
       <!-- <Table stripe :columns="columns1" :data="row.tables"></Table> -->

        <ul>
            <li v-for="(item, index) in row.tables"><span>{{ item.Field }}</span> : {{ item.Type }}</li>
            
        </ul>

    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop, Emit} from 'vue-property-decorator'
    @Component({
           })
    export default class App extends Vue {
        // 初始化数据
        @Prop({default: {}})
        row: Object
      
        created() {
        }

        /**
         * 向父组件传值， 编辑
         */
        show(){
            this.$emit('showSend', this.row['id']);
        }

        /**
         * 向父组件传值， 删除
         */
        ok() {
            this.$emit('removeSend', this.row['id']);
        }
    }
</script>

<style scoped>
    ul {
        display: flex;
    }

    ul li {
        padding: 2px 10px;
    }

    ul li span {

        color: #000;
    }
</style>
