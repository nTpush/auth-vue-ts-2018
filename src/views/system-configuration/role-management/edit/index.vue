<template>
    <div class="layout">
        <create-form :defaultFormData="defaultFormData" :defaultData='defaultData' @getFormData="handleFormData"></create-form>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop, Emit} from 'vue-property-decorator'
    import { Getter, Action } from 'vuex-class'
    import CreateForm from '@/views/system-configuration/role-management/form.vue'
    @Component({
        components: { CreateForm },

        watch:{
            // 解决异步传参
            defaultIndex(defaultIndex){
                console.log(defaultIndex, '9wwww')
                new Vue.prototype.$http('ROLE', {} ,defaultIndex).get('role').then(res=>{

                    if(res) {
                        let obj = {
                        'remark' : res.remark,
                        'role_name' : res.role_name,
                        'id' : res.id,
                        }
                        this.ActionClearAllRoles()
                        this.defaultFormData = obj
                        res['menu'].map(item=>{
                            this.ActionAddRolesMenu(item)
                        })

                        res['node'].map(item=>{
                            this.ActionAddRoles(item)
                        })
                    }else {
                         let obj = {
                            'remark' : '',
                            'role_name' : '',
                            'id' : '',
                        }
                        this.defaultFormData = obj
                    }
                 
                })
            },
            defaultData(value) {
                this.defaultData = value
            }
        },
    })
    export default class App extends Vue {
        @Action ActionAddRolesMenu
        @Action ActionAddRoles
        @Action
        ActionClearAllRoles
        
        @Getter storeRolesMenu


        @Prop({default: '0'})
        defaultIndex: String

        @Prop()
        defaultData: Object

        munuId = ''

        defaultFormData = {}

        created() {
        }

        /**
         * 给表单赋初始值
         */
        handleSetDefaultData() {
        }

        /**
         * 编辑菜单
         * @param formData
         */
        handleFormData(formData) {
            let arr = []
            formData.menus.map(item=>{
                arr.push(item.split('@')[0] + '@' + 1)
            })

            formData.node.map(item=>{
                arr.push(item.split('@')[0] +'@' + '2')
            })

            let obj = {
                role_name : formData.role_name,
                remark : formData.remark,
                rules: arr
            }



             new Vue.prototype.$http('ROLE', obj, formData.id).put('role').then(res=>{
               if(res) this.$emit('handleReset')
            })
        }
    }
</script>