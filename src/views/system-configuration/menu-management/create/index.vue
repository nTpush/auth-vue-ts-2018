<template>
    <div class="layout">
        <create-form :defaultFormData="defaultFormData" :defaultData='defaultData'
        @getFormDataMenu="handleFormDataMenu" @getFormDataNode="handleFormDataNode"
        @getFormData="handleFormData" ref="reset"></create-form>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop, Emit} from 'vue-property-decorator'
    import { Getter, Action } from 'vuex-class'
    import CreateForm from '@/views/system-configuration/menu-management/form.vue'
    import { AfterObjClear } from '@/tools/index.ts'
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
            console.log(formData,'valueMenu')
            // new Vue.prototype.$http('MENU', formData).post('menu').then(res=>{
            //         if(res) {
            //             this.$emit('handleReset')
            //         }
            // })
        }




        /**
         * 创建菜单
         * @param formData
         */
        handleFormDataMenu(formData) {
            console.log(formData,'valueMenumenu')
            new Vue.prototype.$http('RE', AfterObjClear(formData)).post('menu').then(res=>{
                    if(res) {
                        this.$emit('handleReset')
                    }
            })
        }

         /**
         * 创建菜单
         * @param formData
         */
        handleFormDataNode(formData) {
            console.log(formData,'valueMenunode')
            new Vue.prototype.$http('RE', AfterObjClear(formData)).post('node').then(res=>{
                    if(res) {
                        this.$emit('handleReset')
                    }
            })
        }



        /**
         * 清空表单
         */
        handleSetDefaultData() {
            this.$refs['reset'].handleReset('formValidateMenu')
            this.$refs['reset'].handleReset('formValidateNode')
        }
    }
</script>
