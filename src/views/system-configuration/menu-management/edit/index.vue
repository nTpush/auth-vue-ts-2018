<template>
    <div class="layout">
        <create-form :defaultFormData="defaultFormData" :defaultData='defaultData' @getFormData="handleFormData"
        @getFormDataMenu="handleFormDataMenu" @getFormDataNode="handleFormDataNode"
        ></create-form>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop, Emit} from 'vue-property-decorator'
    import { Getter, Action } from 'vuex-class'
    import CreateForm from '@/views/system-configuration/menu-management/form.vue'
    @Component({
        components: { CreateForm },
        watch:{
            // 解决异步传参
            defaultIndex(defaultIndex){
                console.log(defaultIndex,'obj')
                /**
                 * 菜单、按钮 数据分别读取
                 */
                if(defaultIndex.type === 1) {
                    // console.log('菜单')
                    new Vue.prototype.$http('MENU', {} ,defaultIndex.id + '@' + 1).get('menu').then(res=>{
                        // console.log(res, '删除无效数据')
                        this.defaultFormData = res
                    })
                }

                if(defaultIndex.type === 2) {
                    // console.log('按钮')
                     new Vue.prototype.$http('RE', {} ,defaultIndex.id + '@' + 2).get('menu').then(res=>{
                        if(res) {
                            // console.log(res, '删除无效数据')
                            this.defaultFormData = res
                            this.defaultFormData['type'] = 2
                        }
                    })
                }
            },
            defaultData(value) {
                this.defaultData = value
            }
        },
    })
    export default class App extends Vue {
        @Action getMenus

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
            
            //  new Vue.prototype.$http('MENU', formData, this.defaultIndex['id']).put('menu').then(res=>{
                     
            //     if(res) this.$emit('handleReset')
                    
            // })
        }


         /**
         * 编辑菜单
         * @param formData
         */
        handleFormDataMenu(formData) {
            // console.log(formData,'valueMenumenuedit')
            // console.log(this.defaultIndex['id'],'id')
            new Vue.prototype.$http('RE', formData, this.defaultIndex['id']).put('menu').then(res=>{
                if(res) this.$emit('handleReset')
            })
           
        }

         /**
         * 编辑菜单
         * @param formData
         */
        handleFormDataNode(formData) {
            new Vue.prototype.$http('RE', formData, this.defaultIndex['id']).put('node').then(res=>{
                if(res) this.$emit('handleReset')
            })
        }
    }
</script>