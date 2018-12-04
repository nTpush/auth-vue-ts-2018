<template>
    <div class="layout">
        <!--<Alert banner closable type="warning"></Alert>-->
        <Button type="primary" @click="show" size="small" :disabled="(storeNode.indexOf(25) === -1)">密码重置</Button>
        <Button type="success" @click="handleSetRole" size="small" v-if="!row.roles.length" :disabled="(storeNode.indexOf(26) === -1)">设置角色</Button>
        <Button type="warning" @click="handleEditRole" size="small" v-else :disabled="(storeNode.indexOf(27) === -1)">编辑角色</Button>
        <Poptip
                confirm
                title="确定要删除嘛?"
                @on-ok="ok"
                >
            <Button type="error" size="small" :disabled="(storeNode.indexOf(28) === -1)">删除</Button>
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
            this.$emit('showSend', this.row);
        }

        /**
         * 向父组件传值， 删除
         */
        ok() {
            this.$emit('removeSend', this.row['id']);
        }

        handleSetRole() {
            this.$emit('SetRole', this.row);
        }

        handleEditRole() {
            this.$emit('EditRole', this.row);
        }
    }
</script>
