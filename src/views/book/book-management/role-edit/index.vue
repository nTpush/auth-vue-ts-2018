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
    import CreateForm from '@/views/book/book-management/form-role.vue'
    import { AfterObjClear } from '@/tools/index.ts'
    @Component({
        components: { CreateForm },

        watch: {
            defaultData(value) {
                this.defaultData = value
            },

            defaultIndex(val) {
                this.defaultFormData = val.roles
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


        @Prop()
        defaultIndex: Object


        created() {

        }


        /**
         * 设置角色
         * @param formData
         */
        handleFormData(formData) {
            let obj = {
                ...formData,
                id: this.defaultIndex['id']
            }
            new Vue.prototype.$http('USER', obj).post('edit').then(res=>{
                if(res) {
                        this.$emit('handleReset')
                    }
            })
            // new Vue.prototype.$http('USER', obj).post('USER').then(res=>{
            //     console.log(res)
            // })
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
