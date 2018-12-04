<template>
    <div class="layout">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <!-- <FormItem label="资源类型" prop="type">
                <Select v-model="formValidate.type" style="width:200px">
                    <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem> -->

            <FormItem label="角色描述" prop="role_name">
                <Input v-model="formValidate.role_name" placeholder="角色名称"></Input>
            </FormItem>

             <FormItem label="备注" prop="remark">
                <Input v-model="formValidate.remark" placeholder="请打个备注" type="textarea"></Input>
            </FormItem>

             <Table border stripe :columns="columns1" :data="storeRolesList"></Table>
            <br />
           
             <p style="text-align: right">
                <Button type="primary"  @click="handleSubmit('formValidate')">提交</Button>
                <Button type="ghost" style="margin-left: 8px"  @click="handleReset('formValidate')">重置</Button>
             </p>
        </Form>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import { Getter, Action } from 'vuex-class'
    import {Component, Prop, Emit} from 'vue-property-decorator'
    import mType from '@/views/system-configuration/role-management/type.vue'
    import mAll from '@/views/system-configuration/role-management/all.vue'
    import mName from '@/views/system-configuration/role-management/name.vue'

    @Component({

        watch:{
            // 解决异步传参
            defaultFormData(defaultData){
                let obj = {};
                for(let val in defaultData) {
                    if(defaultData[val]) {
                        this.formValidate[val] = defaultData[val]
                    }
                }
//                console.log(defaultData,'初始值')
            },
            defaultData(value) {
                // console.log(value, 'from')
                this.defaultData = value
            }
        },
    })
    export default class App extends Vue {

        @Action
        ActionAddRolesList

        @Getter storeMenuList

        @Getter storeRolesList

        @Getter storeRolesMenu
        @Getter storeRoles

        @Prop({default: {}})
        defaultFormData: Object

        @Prop()
        defaultData: Object

        $refs: {
            checkboxElement: HTMLFormElement
        }

        formValidate = {
            role_name: '',
            // resource_url: '',
            // resource_parent_id: '0',
            // resource_order: '',
            // icon:'',
            // type: 1,
            remark:''
        }


         columns1 = [
              {
                type:'index',
                title: '序号',
                key: 'resource_name',
                width: 100,
                align: 'center',
                
            },
            {
                title: '菜单权限',
                key: 'resource_name',
                width: 300,
                render: (h, params) =>{
                    return h (mName, {
                        props: {
                            row: params.row,
                        }
                    })
                }
                
            },
            {
                title: '按钮权限',
                key: 'resource_name',
                align: 'center',
                render: (h, params) =>{
                    return h (mType, {
                        props: {
                            row: params.row
                        }
                    })
                }

            },
            {
                title: '全选',
                key: 'resource_name',
                width: 100,
                align: 'center',
                render: (h, params) =>{
                return h (mAll, {
                    props: {
                        row: params.row
                    }
                })
            }
            },

         ]

         data1 = []

        typeList = [
            {
                id: 1,
                name: '菜单'
            },
            {
                id: 2,
                name: '按钮'
            }
        ]


        created() {
            this.getMenuList()
        }


        getMenuList() {
            this.ActionAddRolesList()
            // new Vue.prototype.$http('USER').get('role').then(res=>{
            //     if(res) {
            //         this.data1 = res
            //     }
            // })
        }


        /**
         * 菜单验证规则
         */
        ruleValidate = {
            role_name: [
                { required: true, message: '请输入角色名称' }
            ],
        }

        /**
         * 表单数据提交到父组件
         * @param name
         */
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {

                    this.formValidate['menus'] = this.storeRolesMenu
                    this.formValidate['node'] = this.storeRoles
                    // console.log(this.formValidate, '表单数据')
                    this.$emit('getFormData', this.formValidate)
                    // Vue.prototype.$Message.success('Success!');
                } else {
                    Vue.prototype.$Message.error('表单内容不能为空！');
                }
            })
        }

        /**
         * 表单 重置
         * @param name
         */
        handleReset (name) {
            this.$refs[name].resetFields();
        }
    }
</script>

<style scoped>
    .remark {
        background: red;
        color: #fff;
        border-radius: 50px;
        padding: 3px 10px;
        font-size: 12px !important;
    }
</style>