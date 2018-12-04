<template>
    <div class="layout">
        <span v-if='row.status === 0' style="background: #5ABF9F">可选版本</span>
        <span v-if='row.status === 1' style="background: #DC4B3F">当前版本</span>
        <span v-if='row.status === 2' style="background: #ccc">文件已删除,请重新上传</span>
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
    }
</script>

<style scoped>
    .layout span {
        padding: 10px 12px;
        border-radius: 12px;
        color: #fff;
    }
</style>
