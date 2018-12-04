<template>
    <div class="layout">
        <Button type="primary" @click="show" size="small">编辑</Button>
        <Poptip
                confirm
                title="确定要删除嘛?"
                @on-ok="ok"
                >
            <Button type="error" size="small">删除</Button>
        </Poptip>
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
            this.$emit('showSend', this.row);
        }

        /**
         * 向父组件传值， 删除
         */
        ok() {
            this.$emit('removeSend', this.row);
        }
    }
</script>