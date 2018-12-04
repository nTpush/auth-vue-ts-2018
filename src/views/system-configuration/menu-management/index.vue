<template>
    <div class="layout padding">
        <p style="margin-bottom: 10px"><Button type="primary" @click="handleCreateForm"><Icon type="plus-round"></Icon> 新增资源</Button></p>

        <Table border stripe :columns="columns1" :data="defaultData"></Table>

        <Modal
                width="70%"
                v-model="modal1"
                title="新增资源"
                @on-ok="ok"
                @on-cancel="cancel"
                :styles="{top: '20px'}"
                >
            <create-form ref="refResetCreate" :defaultData='defaultData' @handleReset='handleReset' />
        </Modal>

        <Modal
                width="70%"
                v-model="modal2"
                title="编辑资源"
                @on-ok="ok"
                @on-cancel="cancel"
                :styles="{top: '20px'}"
                >
            <edit-form :defaultIndex="index" :defaultData='defaultData' ref="refResetEdit" @handleReset='handleReset' />
        </Modal>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Getter, Action } from 'vuex-class'
    import CreateForm from '@/views/system-configuration/menu-management/create/index.vue'
    import EditForm from '@/views/system-configuration/menu-management/edit/index.vue'
    import mButton from '@/views/system-configuration/menu-management/button.vue'
    import mType from '@/views/system-configuration/menu-management/type.vue'
    @Component({
        components: { CreateForm, EditForm, mButton },
    })
    export default class App extends Vue {
        $refs: {
            checkboxElement: HTMLFormElement
        }

        defaultData = []

        modal1 = false
        modal2 = false
        index = 0
        // 初始化数据
        columns1= [
            {
                type:'index',
                title: '序号',
                key: 'name',
                width: 70,
                align: 'center',
            },

            {
                title: '菜单名称',
                key: 'resource_name',
            },
             {
                title: '菜单图标',
                key: 'icon',
                width: 140,
                align: 'center',
                render: (h, params) => {
                    return h('Icon', {
                        props: {
                            'type' : params.row.icon,
                            'size' : 16
                        }
                    })
                }
            },
            {
                title: '排序',
                key: 'resource_order',
                align: 'center',
                width: 70,
            },
            {
                title: '菜单URL',
                key: 'resource_url',

            },
            {
                title: '类型',
                key: 'type',
                align: 'center',
                width: 140,
                render: (h, params) =>{
                    return h (mType, {
                        props: {
                            row: params.row
                        }
                    })
                }

            },
            {
                title: '级别',
                key: 'level',
                width: 70,
                align: 'center',
            },
            {
                title: '状态',
                key: 'status',
                width: 70,
                align: 'center',
            },
            {
                title: '操作',
                width: 140,
                render: (h, params) => {
                    return h(mButton, {
                        props: {
                            row: params.row
                        },
                        on: {
                            'removeSend' : (val) => {
                                this.handRemove(val)
                            },
                            'showSend' : (val) => {
                                this.handShow(val)
                            }
                        }
                    })
                }

            }
            ]
        ok() {
        }
        cancel() {
        }

        /**
         * 表单编辑
         * @param index
         */
        handShow(index) {
            // 优化值被改变的动作
               setTimeout(()=>{
                   this.modal2 = true;
               },300)
               this.index = index;
               this.$refs['refResetEdit'].handleSetDefaultData()
        }

        /**
         * 删除
         * @param value
         */
        handRemove(value) {
            if(value.type === 1) {
                new Vue.prototype.$http('RE', {}, value.id).delete('menu').then(res=>{
                    if(res) {
                        this.handleReset()
                        this.$refs['refResetCreate'].handleSetDefaultData()
                    }
                })
            }


            if(value.type === 2) {
                 new Vue.prototype.$http('RE', {}, value.id).delete('node').then(res=>{
                    if(res) {
                        this.handleReset()
                        this.$refs['refResetCreate'].handleSetDefaultData()
                    }
                })
            }

            // console.log(value,'删除')
            // TODO 删除
            // new Vue.prototype.$http('MENU', {}, value).delete('menu').then(res=>{
            //     if(res) this.defaultList()
            // })
        }

        /**
         * 创建
         */
        handleCreateForm() {
            this.modal1 = true;
            this.$refs['refResetCreate'].handleSetDefaultData()
        }

        defaultList() {
           new Vue.prototype.$http('MENU').get('menu').then(res=>{
               console.log(res, 'res')
               if(res) this.defaultData = res
            })
        }

        /**
         * 重写
         */
        reDefaultList() {
            new Vue.prototype.$http('RE').get('menu').then(res=>{
              if(res) this.defaultData = res
                console.log(res, 'res')
            })
        }

        /**
         * 清空
         */
        handleReset() {
            Vue.prototype.$Message.success('操作成功!');
            this.modal1 = this.modal2 = false
            this.reDefaultList()


            
        }

        created() {
            // this.defaultList()

            this.reDefaultList()
        }

    }
</script>
