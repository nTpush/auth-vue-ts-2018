<template>
    <div class="layout padding">
        <!-- <p style="margin-bottom: 10px"><Button type="primary" @click="handleCreateForm" :disabled="(storeNode.indexOf(24) === -1)"><Icon type="plus-round"></Icon> 添加用户</Button></p> -->

       <div v-if='!(storeNode.indexOf(23) === -1)'>
             <Table border stripe :columns="columns1" :data="defaultData"></Table>
             <Page :total="total" show-total size="small" @on-change='gotoPage' :page-size='15'></Page>
       </div>

       <p v-else>您没有权限访问该页面</p>

        <Modal
                width="70%"
                v-model="modal1"
                title="新增用户"
                @on-ok="ok"
                @on-cancel="cancel"
                :styles="{top: '20px'}"
                >
            <create-form ref="refResetCreate" :defaultData='defaultData' @handleReset='handleReset' />
        </Modal>

        <Modal
                width="70%"
                v-model="modal2"
                title="修改密码"
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
    import CreateForm from '@/views/zzz/user-management/create/index.vue'
    import EditForm from '@/views/zzz/user-management/edit/index.vue'
    import RoleForm from '@/views/zzz/user-management/role/index.vue'
    import mButton from '@/views/zzz/user-management/button.vue'
    import mType from '@/views/zzz/user-management/type.vue'
    import mRoles from '@/views/zzz/user-management/roles.vue'
   import EditRole from '@/views/zzz/user-management/role-edit/index.vue'
    @Component({
        components: { CreateForm, EditForm, mButton,  RoleForm, mRoles, EditRole, mType },
    })
    export default class App extends Vue {
        $refs: {
            checkboxElement: HTMLFormElement
        }

        defaultData = []

        modal1 = false
        modal2 = false
        modal3 = false
        modal4 = false
        index = 0

        total = 0

        @Getter
        storeNode


        // 初始化数据
        columns1= [
            {
                type:'index',
                title: '序号',
                key: 'name',
                width: 100,
                align: 'center',
            },
           
            {
                title: '用户名',
                key:  'user',
                 
            },
             {
                title: '创建时间',
                key: 'created_at',
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
                            },
                            // 'SetRole' : val => {
                            //     this.handSetRoles(val)
                            // },
                            // 'EditRole' : val => {
                            //     this.handEditRoles(val)
                            // }
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
            console.log(value,'val')
            // TODO 删除
            // new Vue.prototype.$http('MENU', {}, value).delete('menu').then(res=>{
            //     if(res) this.defaultList()
            // })
        }

        /**
         * 设置角色
         */
        // handSetRoles(val) {
        //     console.log(val, '设置角色ID')
        //     this.$refs['refResetRole'].handleSetDefaultData()
        //     this.modal3 = true
        //     this.index = val;
        // }

        // handEditRoles(val) {
        //     console.log(3, val)
        //     this.index = val;
        //     this.modal4 = true
        // }

        /**
         * 创建
         */
        handleCreateForm() {
            this.modal1 = true;
            this.$refs['refResetCreate'].handleSetDefaultData()
        }

        // defaultList() {
        //    new Vue.prototype.$http('IUSER').get('user').then(res=>{
        //        console.log(res, 'resddddd')
        //        if(res) this.defaultData = res
        //     })
        // }

        /**
         * 重写
         */
        reDefaultList(page = null) {
            if(page) {
                new Vue.prototype.$http('ZZZ', {}, '?page=' + page).get('userList').then(res=>{
                if(res) 
                    {
                        this.defaultData = res.data
                        this.total = res.total
                        }
                    console.log(res, 'res')
                })
            }else {
                new Vue.prototype.$http('ZZZ').get('userList').then(res=>{
                if(res) 
                    {
                        this.defaultData = res.data
                        this.total = res.total
                        }
                    console.log(res, 'res')
                })
            }
           
        }

        /**
         * 清空
         */
        handleReset() {
            Vue.prototype.$Message.success('操作成功!');
            this.modal1 = this.modal2 = this.modal3 = this.modal4 = false
            this.reDefaultList()
        }

        gotoPage(p) {
            this.reDefaultList(p)
        }

        created() {
            // this.defaultList()

            this.reDefaultList()

         
        }

    }
</script>