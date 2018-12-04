<template>
  <div class="layout padding">
    <draggable v-model="colors" @update="datadragEnd" :options = "{animation:500}">
      <transition-group>
        <div v-for="element in colors" :key="element.text" class = "drag-item">
          {{element.text}}
        </div>
      </transition-group>
    </draggable>

  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Getter, Action } from 'vuex-class'
  import draggable from 'vuedraggable'
  @Component({
    components: {
      draggable
    },
    computed: {

    }
  })
  export default class App extends Vue {
    $refs: {
      checkboxElement: HTMLFormElement
    }
    msg="这是测试组件"
    colors= [
      {
        text: "Aquamarine",
      },
      {
        text: "Hotpink",
      },
      {
        text: "Gold",
      },
      {
        text: "Crimson",
      },
      {
        text: "Blueviolet",
      },
      {
        text: "Lightblue",
      },
      {
        text: "Cornflowerblue",
      },
      {
        text: "Skyblue",
      },
      {
        text: "Burlywood",
      }
      ]
    startArr=[]
    endArr=[]
    count=0
    getdata (evt) {
      console.log(evt.draggedContext.element.text)
    }
    datadragEnd (evt) {
      evt.preventDefault();
      console.log('拖动前的索引 :' + evt.oldIndex)
      console.log('拖动后的索引 :' + evt.newIndex)
      console.log(this.colors);
    }


    mounted () {
      //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
      document.body.ondrop = function (event) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }
</script>

<style scoped="">
  .drag-item {
    background: red;
    margin-bottom: 10px;
    height:50px;
  }
</style>
