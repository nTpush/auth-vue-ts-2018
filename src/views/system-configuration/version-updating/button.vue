<template>
    <div class="layout">
        <Button type="primary" @click="show" size="small" v-if='row.status === 0' :disabled="(storeNode.indexOf(14) === -1)">回滚</Button>
        <Poptip size="small" v-if='row.status === 0'
                confirm
                title="确定要删除嘛?"
                @on-ok="ok"
                >
            <Button type="error" size="small" :disabled="(storeNode.indexOf(15) === -1)">删除</Button>
        </Poptip>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop, Emit} from 'vue-property-decorator'
import { Getter } from 'vuex-class';
    @Component({

    })
    export default class App extends Vue {
        // 初始化数据
        @Prop({default: {}})
        row: Object

        @Getter
        storeNode

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