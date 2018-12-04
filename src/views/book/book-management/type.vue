<template>
    <div class="layout">
        <span v-if='row.type === 1' style="background: #5CB85C">菜单111</span>
        <span v-if='row.type === 2' style="background: #F0AD4E">按钮111</span>
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
