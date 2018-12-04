<template>
    <div class="layout">
      <ul class="rule">
        <li v-for='(item, key) in row.node'>
              <div class="check" @click="handleAddRoles(item.id + '@' + item.resource_parent_id)" :class="{'checked': !(storeRoles.indexOf(item.id + '@' + item.resource_parent_id) === -1)}"></div> {{ item.resource_name.replace(/\|--/g, '') }} 
        </li>
      </ul>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop, Emit} from 'vue-property-decorator'
    import { Action,Getter } from 'vuex-class';    

    @Component({

    })
    export default class App extends Vue {
        // 初始化数据
        @Prop({default: {}})
        row: Object

        @Action
        ActionAddRoles

        @Action
        ActionAddRolesMenu
        

        @Getter storeRoles

        @Getter storeRolesMenu
        @Getter storeRolesList

        created() {
        }

        handleAddRoles(id) {
            console.log(id,'id')

            let pid = id.split('@')[1]
            let arr = []
            let ppid = ''
            this.storeRolesList.map(item=>{
                // console.log(item, pid)
                if(item.id === Number(pid)) {
                    ppid = item.resource_parent_id
                    return
                }
            })
            if(this.storeRolesMenu.indexOf(pid + '@' + ppid) === -1) {
                this.ActionAddRolesMenu(pid + '@' + ppid)
            }
            this.ActionAddRoles(id)
        }
    }
</script>

<style scoped>
    .layout span {
        padding: 10px 12px;
        border-radius: 12px;
        color: #fff;
    }
    .rule {
        display: flex;
    }
    .rule li {
        margin-right: 20px;
    }

    .check {
        width: 14px;
        height: 14px;
        display: inline-block;
        border: 1px solid #ccc;
        vertical-align: middle;
        margin-top: -1px;
        border-radius: 2px;
    }

    .checked {
        background: red;
    }
</style>
