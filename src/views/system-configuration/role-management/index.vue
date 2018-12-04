<template>
    <div class="layout padding role">
        <p style="margin-bottom: 10px"><Button type="primary" @click="handleCreateForm" :disabled="(storeNode.indexOf(17) === -1)"><Icon type="plus-round"></Icon> 新建角色</Button></p>


        <Table border stripe :columns="columns1" :data="defaultData" v-if="!(storeNode.indexOf(16) === -1)"></Table>
        <p class="none-node" v-else>对不起您没有权限</p>

        <Modal
                width="89%"
                v-model="modal1"
                title="新建角色"
                @on-ok="ok"
                @on-cancel="cancel"
                :styles="{ top: '20px' }"
                >
                 <!-- :styles="{top: '55px', left: '95px'}" -->
            <create-form ref="refResetCreate" :defaultData='defaultData' @handleReset='handleReset' />
        </Modal>

        <Modal
                width="80%"
                v-model="modal2"
                title="编辑角色"
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
    import CreateForm from '@/views/system-configuration/role-management/create/index.vue'
    import EditForm from '@/views/system-configuration/role-management/edit/index.vue'
    import mButton from '@/views/system-configuration/role-management/button.vue'
    import mType from '@/views/system-configuration/role-management/type.vue'
    import mRolse from '@/views/system-configuration/role-management/roles.vue'
    import expandRow from '@/views/system-configuration/role-management/render.vue'
    @Component({
        components: { CreateForm, EditForm, mButton, expandRow },
    })
    export default class App extends Vue {
        $refs: {
            checkboxElement: HTMLFormElement
        }

        @Action
        ActionClearAllRoles

        @Getter
        storeNode

        defaultData = []

        modal1 = false
        modal2 = false
        index = 0
        // 初始化数据
        columns1= [
            {
                type: 'expand',
                width: 50,
                render: (h, params) => {
                    return h(expandRow, {
                        props: {
                            row: params.row
                        }
                    })
                }
            },
            {
                type:'index',
                title: '序号',
                key: 'name',
                width: 100,
                align: 'center',
            },
           
            {
                title: '角色名称',
                key: 'role_name',
                align: 'center',
            },
  
            {
                title: '拥有权限',
                key: 'resource_url',
                width: 700,
                render: (h, params) =>{
                return h (mRolse, {
                    props: {
                        row: params.row
                    }
                })
            }
              
            },
            {
                title: '状态',
                key: 'status',
                align: 'center',
            },
            {
                title: '操作',
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
               },500)
               this.index = index;
               this.$refs['refResetEdit'].handleSetDefaultData()
        }

        /**
         * 删除
         * @param value
         */
        handRemove(value) {
            console.log(value,'val')
            // TODO 删除
            new Vue.prototype.$http('ROLE', {}, value).delete('role').then(res=>{
                if(res) this.defaultList()
            })
        }

        /**
         * 创建
         */
        handleCreateForm() {
            this.ActionClearAllRoles()
            this.modal1 = true;
            this.$refs['refResetCreate'].handleSetDefaultData()
        }

        defaultList() {
           new Vue.prototype.$http('ROLE').get('role').then(res=>{
               if(res) {
                   this.defaultData = res

                //     for(let item in this.defaultData) {
                //          let arr = []
                //         for(let itemitem in this.defaultData[item]['roles']) {
                //             let obj = {}
                //             obj['title'] = itemitem
                //             obj['menu'] = this.defaultData[item]['roles'][itemitem]
                //             arr.push(obj)
                //         }
                //         this.defaultData[item]['roles'] = arr
                //     }
                //    console.log(this.defaultData, 'res')
               }
            })
        }


        handleReset() {
            Vue.prototype.$Message.success('操作成功!');
            this.modal1 = this.modal2 = false
            this.defaultList()
        }

        created() {
            this.defaultList()
        }

    }
</script>