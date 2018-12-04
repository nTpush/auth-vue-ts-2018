<template>
    <div class="layout">
        <div class="check-box" v-if='row["node"].length'>
            <span class="check-all" @click='handleAll' v-if='storeRolesCountNode[row["node"][0].resource_parent_id] !== row["node"].length'>
                
                全 </span>
            <span class="check-all" @click='handleClear' v-if='storeRolesCountNode[row["node"][0].resource_parent_id] === row["node"].length'>取 
               </span>
        </div>
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

        @Getter storeRoles

        @Getter storeRolesMenu

        @Getter storeRolesCountNode

        @Action
        ActionAddRoles

        @Action ActionAddRolesMenu

        created() {
            // console.log(this.storeRolesCountNode ,'数据', this.row["node"].length)
        }


        handleAll() {
            this.row['node'].map(item=>{
                if(this.storeRoles.indexOf(item.id + '@' + item.resource_parent_id) === -1) {
                    this.ActionAddRoles(item.id + '@' + item.resource_parent_id)
                }
            })

            if((this.storeRolesMenu.indexOf(this.row['id'] + '@' + this.row['resource_parent_id']) === -1)) {
                this.ActionAddRolesMenu(this.row['id'] + '@' + this.row['resource_parent_id'])
            }

        }

        handleClear() {
            this.row['node'].map(item=>{
                this.ActionAddRoles(item.id + '@' + item.resource_parent_id)
            })
            if(!(this.storeRolesMenu.indexOf(this.row['id'] + '@' + this.row['resource_parent_id']) === -1)) {
                this.ActionAddRolesMenu(this.row['id'] + '@' + this.row['resource_parent_id'])
            }
        }
     
    }
</script>
<style scoped>
    .check-box {
        width: 100%;
        text-align: center;
    }

    .check-all {
        /* width: 14px;
        height: 14px;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 2px; */
    }
</style>
