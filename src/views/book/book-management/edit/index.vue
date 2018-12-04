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
    import CreateForm from '@/views/book/book-management/form-info.vue'
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


        @Prop()
        defaultIndex: Object


        created() {

        }


        /**
         * 编辑菜单
         * @param formData
         */
        handleFormData(formData) {
            new Vue.prototype.$http('IUSER', formData, this.defaultIndex['id']).put('user').then(res=>{
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
