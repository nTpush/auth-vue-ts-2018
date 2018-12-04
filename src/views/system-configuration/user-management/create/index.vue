<template>
    <div class="layout">
        <create-form :defaultFormData="defaultFormData" :defaultData='defaultData' 
      
        @getFormData="handleFormData" ref="reset"></create-form>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop, Emit} from 'vue-property-decorator'
    import { Getter, Action } from 'vuex-class'
    import CreateForm from '@/views/system-configuration/user-management/form.vue'

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
            new Vue.prototype.$http('IUSER', formData).post('user').then(res=>{
                console.log(res, 'res')
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
            // this.$refs['reset'].handleReset('formValidateNode')
        }
    }
</script>