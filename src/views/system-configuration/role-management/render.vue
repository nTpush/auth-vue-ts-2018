<template>
    <div class="layout">
       <b>备注：</b>
       <span v-if='row.remark'>{{ row.remark }}</span>
       <span v-else>暂无备注信息</span>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop, Emit} from 'vue-property-decorator'
    @Component({
    })
    export default class App extends Vue {
    @Prop({default: {}})
    row: Object

     $refs: {
            checkboxElement: HTMLFormElement
        }
        // 初始化数据
  
    }
</script>