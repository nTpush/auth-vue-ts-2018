<template>
    <div class="layout">

        
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">

                    <FormItem label="设置角色" prop="roles">
                        <Select v-model="formValidate.roles" filterable multiple>
                            <Option v-for="(item,key) in roleList" :value="item.id" :key="item.value">{{ item.role_name }}</Option>
                        </Select>
                    </FormItem>
                    
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

    @Component({

        watch:{
            // 解决异步传参
            defaultFormData(defaultData){
               let arr = [];
               defaultData.map(item=>{
                   arr.push(item.id)
               })
               this.formValidate.roles = arr
            },
            defaultData(value) {
                // console.log(value, 'from')
                this.defaultData = value
            }
        },
    })
    export default class App extends Vue {

        @Getter menus

        @Prop({default: {}})
        defaultFormData: Object

        @Prop()
        defaultData: Object

        $refs: {
            checkboxElement: HTMLFormElement
        }


        type = 1
        menuName = ''


        formValidate = {
            roles:[]
        }
     
        roleList = []

        created() {
            this.listRoles()
            // console.log(this.$parent.$parent,'parent')
        }

        /**
         * 菜单验证规则
         */
        ruleValidate = {
            roles: [
                { required: true, message: '请选择roles' }
            ],
        }


        /**
         * 表单数据提交到父组件
         * @param name
         */
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
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


        clickChange(nowPage) {
            console.log(nowPage)
        }

        /**
         * 角色管理初始值设计
         */
        listRoles() {
            new Vue.prototype.$http('USER').get('ro').then(res=>{
                if(res)　this.roleList = res
            })
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
        /* float: right; */
    }
</style>