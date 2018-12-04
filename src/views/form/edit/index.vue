<template>
    <div class="layout">
        <tForm :defaultFormData="defaultFormData" @getFormData="handleFormData"></tForm>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
//    import Component from 'vue-class-component'

    import {Component, Prop, Emit} from 'vue-property-decorator'
    import tForm from '@/views/form/form.vue'

    @Component({
        components: { tForm },
    })
    export default class Edit extends Vue {
        // 初始化数据

        defaultFormData = {}

        created() {
            setTimeout(()=>{
                this.defaultFormData = {
                    name: 'shining',
                    mail: '1095950397@qq.com',
                    city: 'beijing',
                    gender: 'male',
                    interest: [ 'Eat', 'Run' ],
                    date: '2018-05-09',
                    time: '02:01:02',
                    desc: '这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述'
                }
            },1000)
        }
        handleFormData(value) {
            console.log(value, '获取到的值')
        }
    }
</script>