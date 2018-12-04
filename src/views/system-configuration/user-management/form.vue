<template>
    <div class="layout">

        
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">

                    <FormItem label="用户名" prop="name">
                        <Input v-model="formValidate.name" placeholder="用户名"></Input>
                    </FormItem>

                    <FormItem label="邮箱" prop="email">
                        <Input v-model="formValidate.email" placeholder="邮箱"></Input>
                    </FormItem>

                    <FormItem label="密码" prop="password">
                        <Input type="password" v-model="formValidate.password" placeholder="密码"></Input>
                    </FormItem>
                    

                    <FormItem label="确认密码" prop="password_confirm">
                        <Input type="password" v-model="formValidate.password_confirm" placeholder="确认密码"></Input>
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
                let obj = {};
                    for(let v in this.formValidate) {
                        this.formValidate[v] = defaultData[v]
                    }
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
            name: '',
            email: '',
            password: '',
            password_confirm: ''
        }

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

        menuDefaults = []
        nodeDefaults = []


        created() {
             new Vue.prototype.$http('RE').get('default').then(res=>{
                this.menuDefaults = res.menu
                this.nodeDefaults = res.node
            })
            console.log('ddd')
            // console.log(this.$parent.$parent,'parent')
        }

        /**
         * 菜单验证规则
         */
        ruleValidate = {
            name: [
                { required: true, message: '请输入name' }
            ],
            email: [
                 { required: true, message: '请输入email' }
            ],
            password: [
                 { required: true, message: '请输入password' }
            ],
            password_confirm: [
                 { required: true, message: '请输入password_confirm' }
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