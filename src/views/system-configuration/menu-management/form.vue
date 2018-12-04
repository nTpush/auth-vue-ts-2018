<template>
    <div class="layout">

         <Tabs :value="menuName" @on-click='clickChange'>
            <TabPane label="菜单（页面）" name="menu" :disabled='menuName === "node"'>
                <Form ref="formValidateMenu" :model="formValidateMenu" :rules="ruleValidate" :label-width="80">
                    <FormItem label="资源类型" prop="type">
                        <Select v-model="formValidateMenu.type" style="width:200px" disabled >
                            <Option v-for="item in typeList" :value="item.id" :key="item.id" >{{ item.name }}</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="菜单名称" prop="resource_name">
                        <Input v-model="formValidateMenu.resource_name" placeholder="菜单名称"></Input>
                    </FormItem>

                    <FormItem label="菜单Icon" prop="icon">
                        <Input v-model="formValidateMenu.icon" placeholder="菜单Icon"></Input>
                    </FormItem>
                    <FormItem label="父级菜单" prop="resource_parent_id">
                        <Select v-model="formValidateMenu.resource_parent_id" placeholder="父级菜单">
                            <Option value="0">顶级菜单</Option>
                            <Option :value="item.id.toString()" v-for="(item, index) in menuDefaults" :key="index">{{ item.resource_name }}</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="菜单URL" prop="resource_url">
                        <Input v-model="formValidateMenu.resource_url" placeholder="菜单URL, 例如：/demo">
                            <span slot="prepend">index</span>
                        </Input>
                    </FormItem>
                    <FormItem label="菜单排序" prop="resource_order">
                        <Input v-model="formValidateMenu.resource_order" placeholder="菜单排序" style="width: 100px" number></Input>
                        <span class="remark">数字越小越靠前</span>
                    </FormItem>

                    <FormItem label="备注" prop="remark">
                        <Input v-model="formValidateMenu.remark" placeholder="请打个备注" type="textarea"></Input>
                    </FormItem>

                   <p style="text-align: right">
                        <Button type="primary"  @click="handleSubmitMenu('formValidateMenu')">提交</Button>
                        <Button type="ghost" style="margin-left: 8px"  @click="handleResetMenu('formValidateMenu')">重置</Button>
                   </p>
                </Form>
            </TabPane>




            <TabPane label="按钮（节点）" name="node" :disabled='menuName === "menu"'>
                <Form ref="formValidateNode" :model="formValidateNode" :rules="ruleValidateNode" :label-width="80">
                    <FormItem label="资源类型" prop="type">
                        <Select v-model="formValidateNode.node_type" style="width:200px" disabled>
                            <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="按钮名称" prop="node_name">
                        <Input v-model="formValidateNode.node_name" placeholder="菜单名称"></Input>
                    </FormItem>


                    <FormItem label="归属菜单" prop="menu_id">
                        <Select v-model="formValidateNode.menu_id" placeholder="父级菜单">
                            <Option :value="item.id" v-for="(item, index) in nodeDefaults" :key="index">{{ item.resource_name }}</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="按钮URL" prop="node_url">
                        <Input v-model="formValidateNode.node_url" placeholder="菜单URL">
                            <span slot="prepend">index</span>
                        </Input>
                    </FormItem>
                    <FormItem label="按钮排序" prop="node_order">
                        <Input v-model="formValidateNode.node_order" placeholder="菜单排序" style="width: 100px" number></Input>
                        <span class="remark">数字越小越靠前</span>
                    </FormItem>

                    <FormItem label="备注" prop="node_remark">
                        <Input v-model="formValidateNode.node_remark" placeholder="请打个备注" type="textarea"></Input>
                    </FormItem>
                     <p style="text-align: right">
                        <Button type="primary"  @click="handleSubmitNode('formValidateNode')">提交</Button>
                        <Button type="ghost" style="margin-left: 8px"  @click="handleResetNode('formValidateNode')">重置</Button>
                     </p>
                </Form>
            </TabPane>
        </Tabs>


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

                if(defaultData.type === 1) {
                    this.type = 1
                    this.menuName = 'menu'
                    for(let v in this.formValidateMenu) {
                        this.formValidateMenu[v] = defaultData[v]
                    }
                }

                if(defaultData.type === 2) {
                    this.type = 2
                    this.menuName = 'node'
                    for(let val in this.formValidateNode) {
                        this.formValidateNode[val] = defaultData[val]
                    }
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
            resource_name: '',
            resource_url: '',
            resource_parent_id: '0',
            resource_order: '',
            icon:'',
            type: 1,
            remark:''
        }

         formValidateMenu = {
            resource_name: '',
            resource_url: '',
            resource_parent_id: '0',
            resource_order: '',
            icon:'',
            type: 1,
            remark:''
        }

         formValidateNode = {
            node_name: '',
            node_url: '',
            menu_id: '',
            node_order: '',
            node_type: 2,
            node_remark:''
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

        defaultSetData() {
            
        }

        /**
         * 菜单验证规则
         */
        ruleValidate = {
            resource_name: [
                { required: true, message: '请输入菜单名称' }
            ],
            resource_url: [
                 { required: true, message: '请输入url' }
            ]
        }

         ruleValidateNode = {
            menu_id: [
                { required: true, message: '请选择归属菜单' }
            ],
            node_name: [
                { required: true, message: '请输入按钮名称' }
            ],
            node_url: [
                { required: true, message: '请输入url' }
            ]
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
            new Vue.prototype.$http('RE').get('default').then(res=>{
                this.menuDefaults = res.menu
                this.nodeDefaults = res.node
            })
       
            this.$refs[name].resetFields();
        }



        /**
         * 表单数据提交到父组件
         * @param name
         */
        handleSubmitMenu (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // console.log(this.formValidate, '表单数据')
                    this.$emit('getFormDataMenu', this.formValidateMenu)
                    // Vue.prototype.$Message.success('Success!');
                } else {
                    Vue.prototype.$Message.error('表单内容不能为空！');
                }
            })
        }

          /**
         * 表单数据提交到父组件
         * @param name
         */
        handleSubmitNode (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // console.log(this.formValidate, '表单数据')
                    this.$emit('getFormDataNode', this.formValidateNode)
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
        handleResetMenu (name) {
            this.$refs[name].resetFields();
        }

         /**
         * 表单 重置
         * @param name
         */
        handleResetNode (name) {
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
