<template>
    <div class="layout">
       <div v-if="row.roles.length">
           <ul>
               <li v-for="(item, key) in row.roles">{{item.role_name}}</li>
           </ul>
       </div>
        <div v-else>
            该用户尚未设置角色
       </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop, Emit} from 'vue-property-decorator'
    @Component({

    })
    export default class App extends Vue {
        // 初始化数据
        @Prop({default: {}})
        row: Object

        created() {
        }
    }
</script>

<style scoped>
    ul {
        display: flex;
    }

    ul li{
        display: block;
        border: 1px dashed #ccc;
        padding: 2px 5px;
        margin-right: 10px;
        border-radius: 3px;
    }
</style>
