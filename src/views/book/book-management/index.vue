<template>
    <div class="layout padding">
        <p style="margin-bottom: 10px">
          <Button type="primary" v-if="this.storeUserInfo.job_id !== 4 " @click="handleCreateForm" >
          <Icon type="plus-round"></Icon>
            {{ getText }}
            </Button>

          <Button type="primary" @click="handleCreateForm" >
          <Icon type="plus-round"></Icon> 图书创建</Button>
        </p>

       <div >
             <Table border stripe :columns="columns1" :data="defaultData"></Table>
             <Page :total="total" show-total size="small" :page-size="15"></Page>
       </div>

       <!--<p >您没有权限访问该页面</p>-->

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

        <Modal
                width="70%"
                v-model="modal3"
                title="设置角色"
                @on-ok="ok"
                @on-cancel="cancel"
                :styles="{top: '20px'}"
                >
           <role-form :defaultIndex="index" :defaultData='defaultData' ref="refResetRole" @handleReset='handleReset' />
        </Modal>

         <Modal
                width="70%"
                v-model="modal4"
                title="编辑角色"
                @on-ok="ok"
                @on-cancel="cancel"
                :styles="{top: '20px'}"
                >
           <edit-role :defaultIndex="index" :defaultData='defaultData' ref="refResetRole" @handleReset='handleReset' />
        </Modal>

    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Getter, Action } from 'vuex-class'
    import CreateForm from '@/views/book/book-management/create/index.vue'
    import EditForm from '@/views/book/book-management/edit/index.vue'
    import RoleForm from '@/views/book/book-management/role/index.vue'
    import mButton from '@/views/book/book-management/button.vue'
    import mType from '@/views/book/book-management/type.vue'
    import mRoles from '@/views/book/book-management/roles.vue'
   import EditRole from '@/views/book/book-management/role-edit/index.vue'
    @Component({
        components: { CreateForm, EditForm, mButton,  RoleForm, mRoles, EditRole, mType },

        computed: {
          getText() {
//            return this.storeUserInfo.job_id
              switch (this.storeUserInfo.job_id) {
                case 1:
                  return " 区域经理账号创建"
                case 2:
                  return " 组长账号创建"
                case 3:
                  return " 成员账号创建"
                default:
                  return "无权限进行操作"
              }
          }
        }
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

        @Getter
        storeUserInfo

        // 初始化数据
        columns1= [
            {
                type:'index',
                title: '序号',
                key: 'name',
                align: 'center',
            },

            {
                title: '用户名',
                key:  'name',

            },
            {
                title: '邮箱',
                key:  'email',
            },
            {
                title: '状态',
                key: 'status',
                align: 'center',
            },
//            {
//                title: '操作',
//                render: (h, params) => {
//                    return h(mButton, {
//                        props: {
//                            row: params.row
//                        },
//                        on: {
//                            'removeSend' : (val) => {
//                                this.handRemove(val)
//                            },
//                            'showSend' : (val) => {
//                                this.handShow(val)
//                            },
//                            'SetRole' : val => {
//                                this.handSetRoles(val)
//                            },
//                            'EditRole' : val => {
//                                this.handEditRoles(val)
//                            }
//                        }
//                    })
//                }
//
//            }
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
        handSetRoles(val) {
            console.log(val, '设置角色ID')
            this.$refs['refResetRole'].handleSetDefaultData()
            this.modal3 = true
            this.index = val;
        }

        handEditRoles(val) {
            console.log(3, val)
            this.index = val;
            this.modal4 = true
        }

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
         * 列表获取
         */
        reDefaultList() {
          new Vue.prototype.$http('BOOK').get('user').then(res => {
            console.log(res,'9')
            this.defaultData = res.data
            this.total = res.total
          })


        }

        /**
         * 清空
         */
        handleReset() {
            Vue.prototype.$Message.success('操作成功!');
            this.modal1 = this.modal2 = this.modal3 = this.modal4 = false
            this.reDefaultList()
        }

        created() {
            // this.defaultList()

            this.reDefaultList()


        }

    }
</script>
