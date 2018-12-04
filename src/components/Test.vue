<template>
    <div class="layout">
       <zk-table :columns="columns" :data="data1"
        :stripe="props.stripe" 
        :border="props.border" 
        :show-header="props.showHeader" 
        :show-summary="props.showSummary"
        :show-row-hover="props.showRowHover"
        :show-index="props.showIndex"
        :tree-type="props.treeType" 
        :is-fold="props.isFold" 
        :expand-type="props.expandType"
        :selection-type="props.selectionType"
       ></zk-table>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    @Component({
    })
    export default class App extends Vue {
     $refs: {
            checkboxElement: HTMLFormElement
        }
        // 初始化数据

     props = {
          stripe: false,//是否显示间隔斑马纹
          border: false,//是否显示纵向边框
          showHeader: true,//是否显示表头
          showSummary: false,//是否显示表尾合计行
          showRowHover: true,//鼠标悬停时，是否高亮当前行
          showIndex: false,//是否显示数据索引
          treeType: true,//是否为树形表格
          isFold: true,//树形表格中父级是否默认折叠
          expandType: false,//是否为展开行类型表格（为 True 时，需要添加作用域插槽, 它可以获取到 row, rowIndex)
          selectionType: false,//是否显示间隔斑马纹
        }

      data1 = [
          {
            name: '根组织',
            description: '111',
            owner:'admin',
            active: true,
            children: [
              {
                name: '大中华区',
                description: '',
                owner: '',
                active: true,
                children: [
                  {
                    name: '浙江省',
                    description: '',
                    owner: '',
                    active: true,
                    children: [
                      {
                        name: '杭州市',
                        description: '',
                        owner: '',
                        active: true
                      }
                    ]
                  }
                ]
              }
            ],
          },
          {
            name: 'Tom',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 20,
          },
        ]

        columns= [
            {
                label: "用户组名",
                prop: "name"
            },
            {
                label: "描述",
                prop: "description",
                minWidth: "50px"
            },
            {
                label: "所有者",
                prop: "owner"
            },
            {
                label: "状态",
                prop: "active",
                type: "template",
                template: "active"
            },
            {
                label: "授权",
                type: "template",
                template: "empower"
            }
        ]


  
    }
</script>