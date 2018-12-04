<template>
    <div class="layout">
        <create-form :defaultFormData="defaultFormData" :defaultData='defaultData' @getFormData="handleFormData" ref="reset"></create-form>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop, Emit} from 'vue-property-decorator'
    import { Getter, Action } from 'vuex-class'
    import CreateForm from '@/views/system-configuration/role-management/form.vue'
    @Component({
        components: { CreateForm },

        watch: {
            defaultData(value) {
                this.defaultData = value
            }
        }
    })
    export default class App extends Vue {

        

        defaultFormData = {}
        $refs: {
            checkboxElement: HTMLFormElement
        }

         @Prop()
        defaultData: Object


        created() {
            
        }


        /**
         * 创建菜单
         * @param formData
         */
        handleFormData(formData) {
            console.log(formData,'value')

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

            new Vue.prototype.$http('ROLE', obj).post('role').then(res=>{
                if(res) {
                    this.$emit('handleReset')
                }
            })
        }

        /**
         * 清空表单
         */
        handleSetDefaultData() {
            this.$refs['reset'].handleReset('formValidate')
        }
    }
</script>