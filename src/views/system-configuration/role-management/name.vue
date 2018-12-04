<template>
    <div class="layout">
        <div class="check-box">
           <span v-if='row.resource_parent_id !== "0"'>&emsp;</span> 
           <span v-if='!(row.node === 0) && row.count === 0' class="check-all" @click='handleOne' 
           :class="{'checked': !(storeRolesMenu.indexOf(row.id + '@' + row.resource_parent_id) === -1)}"> </span> 
        
            <span v-if='(!(row.node === 0) && row.count !== 0 && !(row.count === storeRolesCount[row.id])) ' @click="handleAll" class="check-alls"> </span>
            <span v-if='(!(row.node === 0) && row.count !== 0 && (row.count === storeRolesCount[row.id]))' @click="handleClear" class="check-null"> </span>

           <span class="check-word">{{ row.resource_name }}</span>
           
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {Component, Prop, Emit} from 'vue-property-decorator'
    import { Action, Getter } from 'vuex-class';
    import { setTimeout } from 'timers';
    @Component({
    
    })
    export default class App extends Vue {
        // 初始化数据
        @Prop({default: {}})
        row: Object
       
        @Action
        ActionAddRolesMenu

        @Getter storeRolesList
        @Getter storeRolesMenu
        @Getter storeRolesCount
    

        created() {
            let pid = this.row['resource_parent_id']
        }
       

        handleOne() {
            this.ActionAddRolesMenu(this.row['id'] + '@' + this.row['resource_parent_id'])
        }

        handleAll() {
            let arr = [];
            let pid = this.row['id']
            let sum = 0

        

            this.storeRolesList.map(item=>{
                if(Number(item.resource_parent_id) === Number(pid) && (this.storeRolesMenu.indexOf(item.id + '@' + pid) === -1)) {
                    arr.push(item.id)
                }
            })

            console.log(arr, '全选')
            if(sum === 0 ) {
                arr.map(item=>{
                     this.ActionAddRolesMenu(item + '@' + pid)
                })
            }

        }

        handleClear() {
            let arr = [];
            let pid = this.row['id']
            this.storeRolesMenu.map(item=>{
                if(Number(item.split('@')[1]) === pid) {
                    arr.push(item.split('@')[0])
                }
            })
            arr.map(item=>{
                 this.ActionAddRolesMenu(item + '@' + pid)
            })
        }
     
    }
</script>
<style scoped>
    .check-box {
        text-align: left;
    }

    .check-all {
        width: 14px;
        height: 14px;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 2px;
        vertical-align: middle;
    }

    .check-word {
      
    }

    .checked {
        background: red;
    }

    .check-alls {
        width: 14px;
        height: 14px;
        display: inline-block;
        border: 1px solid #ccc;
        background: red;
        vertical-align: middle;
    }

    .check-null {
        width: 14px;
        height: 14px;
        display: inline-block;
        border: 1px solid #ccc;
        background: green;
        vertical-align: middle;
    }
</style>
