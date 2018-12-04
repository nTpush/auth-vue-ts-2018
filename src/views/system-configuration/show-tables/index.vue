<template>
  <div class="layout log padding">
    <Table stripe border :columns="columns1" :data="data1"></Table>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import expandRow from '@/views/system-configuration/show-tables/expand.vue'
  import { Getter } from 'vuex-class';
  @Component({
    components: { expandRow }
  })
  export default class App extends Vue {
    // 初始化数据
    columns1 = [
      {
        type: 'expand',
        width: 50,
        render: (h, params) => {
          return h(expandRow, {
            props: {
              row: params.row
            }
          })
        }
      },
      {
        title: '表名称',
        key: 'TABLE_NAME'
      },
      {
        title: '数据量',
        key: 'TABLE_ROWS'
      },
      {
        title: '数据长度',
        key: 'DATA_LENGTH'
      },
      {
        title: '创建时间',
        key: 'CREATE_TIME'
      },
    ]

    data1 = []


    @Getter
    storeNode

    created() {
      new Vue.prototype.$http('DATABASES').get('tables').then(res=>{
        if(res) {
          this.data1 = res
        }
      })

    }

  }
</script>
