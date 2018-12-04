<template>
    <div class="layout">
        <button @click='export2Excel'> 导出</button>


        <Menu active-name="1-2" :open-names="['1']">
            <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-analytics"></Icon>
                    Navigation One
                </template>
                <MenuGroup title="Item 1">
                    <MenuItem name="1-1">Option 1</MenuItem>
                    <MenuItem name="1-2">Option 2</MenuItem>
                </MenuGroup>
                <MenuGroup title="Item 2">
                    <MenuItem name="1-3">Option 3</MenuItem>
                    <MenuItem name="1-4">Option 4</MenuItem>
                </MenuGroup>
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-filing"></Icon>
                    Navigation Two
                </template>
                <MenuItem name="2-1">Option 5</MenuItem>
                <MenuItem name="2-2">Option 6</MenuItem>
                <Submenu name="3">
                    <template slot="title">Submenu</template>
                    <MenuItem name="3-1">Option 7</MenuItem>
                    <MenuItem name="3-2">Option 8</MenuItem>
                </Submenu>
            </Submenu>
            <Submenu name="4">
                <template slot="title">
                    <Icon type="ios-gear"></Icon>
                    Navigation Three
                </template>
                <MenuItem name="4-1">Option 9</MenuItem>
                <MenuItem name="4-2">Option 10</MenuItem>
                <MenuItem name="4-3">Option 11</MenuItem>
                <MenuItem name="4-4">Option 12</MenuItem>
            </Submenu>
        </Menu>


    </div>
</template>
<script lang="ts">
    var XLSX = require('xlsx')
    import Vue from 'vue'
    import Component from 'vue-class-component'
    @Component({
    })
    export default class App extends Vue {
        list = [
                    {
                        name:'韩版设计时尚风衣大',
                        number:'MPM00112',
                        salePrice:'￥999.00',
                        stocknums:3423,
                        salesnums:3423,
                        sharenums:3423,
                    },
                    {
                        name:'韩版设计时尚风衣大',
                        number:'MPM00112',
                        salePrice:'￥999.00',
                        stocknums:3423,
                        salesnums:3423,
                        sharenums:3423,
                    },
               ]
        // 初始化数据
        export2Excel() {
            require.ensure([], () => {
                const { export_json_to_excel } = require('@/vendor/Export2Excel');
                const tHeader = ['商品名称','商品货号','售价','库存','销量','分享',];
                const filterVal = ['name', 'number', 'salePrice', 'stocknums', 'salesnums', 'sharenums', ];
                const list = this.list;
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, '商品管理列表');
            })
        }
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        }
    }
</script>
