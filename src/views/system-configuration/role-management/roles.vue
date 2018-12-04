<template>
  <div class="layout role-table">
    <!-- <ul>
        <li v-for="(item, key) in row.roles" >
            <span class="parent-title" :class="{ 'cut-icon':  item.resource_parent === nowIndex, 'show-parent-title': item.resource_parent}" @click="handleShowChild(item.resource_parent)">{{ item.resource_parent }} </span>
            <div :class="{'show-child': item.resource_parent, 'hide-child': item.resource_parent === nowIndex}">
                <span v-if="item.resource_parent" >&emsp;</span> <span :class="{'first-title' : !item.resource_parent, 'first-title-other': item.resource_parent}">{{ item.resource_name }}</span>
                <span v-for="(itemitem, keykey) in item.menu" >
                    <span v-if="item.resource_parent">&emsp;</span>&emsp;  {{ itemitem.node_name }}
                </span>
            </div>
        </li>
    </ul> -->

    <ul>
      <li v-for="(item, key) in row.roles">
        <span class="parent-title" :class="{ 'add': item.title, 'cut':  !(nowIndex.indexOf(item.title) === -1)}"  @click="handleShowChild(item.title)" v-if='item.title'>{{ item.title }}</span>
        <div v-for='(itemitem, keykey) in item.menu' :class="{ 'show-hide': itemitem.resource_parent, 'hide-show': !(nowIndex.indexOf(itemitem.resource_parent) === -1)  }">
          <div style="display: flex" v-if="itemitem.resource_parent">
            <div style="width: 11%">
              <span v-if='itemitem.resource_parent'>&emsp;</span> <span :class="{ 'parent-title': !itemitem.resource_parent, 'node-title': itemitem.resource_parent }" >{{ itemitem.resource_name }}</span>
            </div>
            <div style="width: 89%;">
                                <span v-for='(iii, kkk) in itemitem.menu' class="node-item">
                                    {{ iii.node_name }}
                                    <span><b>备注：</b>{{ iii.node_remark }}</span>
                                </span>
            </div>
          </div>

          <div v-else>
            <span v-if='itemitem.resource_parent'>&emsp;</span> <span :class="{ 'parent-title': !itemitem.resource_parent, 'node-title': itemitem.resource_parent }" >{{ itemitem.resource_name }}</span>
            <span v-for='(iii, kkk) in itemitem.menu' class="node-item" >
                                {{ iii.node_name }}
                                <span><b>备注：</b>{{ iii.node_remark }}</span>
                            </span>
          </div>
        </div>
      </li>
    </ul>
    <br>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop, Emit} from 'vue-property-decorator'
  import { Action,Getter } from 'vuex-class';
  import { create } from 'domain';

  @Component({

  })
  export default class App extends Vue {
    // 初始化数据
    @Prop({default: {}})
    row: Object

    nowIndex = []

    create() {

    }

    handleShowChild(id) {
      if(!(this.nowIndex.indexOf(id) === -1)) {
        this.nowIndex.splice(this.nowIndex.indexOf(id), 1)
      }else {

        this.nowIndex.push(id)
      }

    }

  }
</script>

<style scoped>
  .parent-title {
    font-size: 14px;
    cursor: pointer;
    display: inline-block;

    margin: 5px 0;
    height: 20px;
    line-height: 20px;
    margin-top: 18px;
  }

  .add::before {
    content: "+ ";
  }

  .cut::before {
    content: "- ";
  }

  .show-hide {
    display: none;
    line-height: 25px;
    border-bottom: 1px dotted #E9EAEC;
    margin-bottom: 10px;
  }

  .hide-show {
    display: block;
  }

  .node-item {
    background: #F0F7F7;
    margin-left: 10px;
    padding: 2px 10px;
    border: 1px dashed #ccc;
    border-radius: 2px;
    position: relative;
    cursor: pointer;
  }

  .node-item span {
    /* transform: scaleX(0); */
    display: block;
    position: absolute;
    width: 0px;
    height: 18px;
    line-height: 18px;
    left: 40px;
    z-index: 88;
    top: 0px;
    background: #C6E3E3;
    overflow: hidden;
    transition: all 0.5s;
    text-indent: 5px;
  }
  .node-item:hover span {
    overflow: hidden;
    width: 200px;
  }


  /* ul li .parent-title {
      display: none;
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
  }

  ul li .parent-title::before {
       content: "+";
   }

   ul li .cut-icon::before {
       content: "-";
   }

  .first-title {
      font-weight: bold;
      font-size: 14px;
  }

  ul li .show-child {
       display: none;
   }



  ul li .hide-child {
       display: block;
   }

  ul li .show-parent-title {
      display: block;
  }

  .first-title-other {
      margin-bottom: 10px;
  } */
</style>
