<template>
    <div class="layout">
        <Row>
            <Col span="3" >

                <div class="tree tree-fixed" >
                    <Tree :data="data1" @on-select-change="handleSelect"></Tree>
                    <!--<Icon type="arrow-left-a"></Icon>-->
                    <!--<Button icon="arrow-left-a" size="small" class="button"></Button>-->
                </div>
            </Col>
            <Col span="21" style="padding: 10px">

                <Table stripe :columns="columns1" :data="list"></Table>

            <!--<div style="height: 4000px;"></div>-->
            </Col>
        </Row>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    @Component({
    })
    export default class Menu extends Vue {
        // 初始化数据
        data1 = [
            {
                title: 'parent 1',
                expand: true,
                children: [
                    {
                        title: 'parent 1-1',
                        expand: true,
                        children: [
                            {
                                title: 'leaf 1-1-1'
                            },
                            {
                                title: 'leaf 1-1-2'
                            }
                        ]
                    },
                    {
                        title: 'parent 1-2',
                        expand: true,
                        children: [
                            {
                                title: 'leaf 1-2-1'
                            },
                            {
                                title: 'leaf 1-2-1'
                            }
                        ]
                    }
                ]
            }
        ]

        columns1 = [
            {
                title: 'Name',
                key: 'name'
            },
            {
                title: 'Age',
                key: 'age'
            },
            {
                title: 'Address',
                key: 'address'
            }
            ]
        list = [
            {
                name: 'John Brown',
                age: 18,
                address: 'New York No. 1 Lake Park',
                date: '2016-10-03'
            },
            {
                name: 'Jim Green',
                age: 24,
                address: 'London No. 1 Lake Park',
                date: '2016-10-01'
            },
            {
                name: 'Joe Black',
                age: 30,
                address: 'Sydney No. 1 Lake Park',
                date: '2016-10-02'
            },
            {
                name: 'Jon Snow',
                age: 26,
                address: 'Ottawa No. 2 Lake Park',
                date: '2016-10-04'
            }
            ]

        handleSelect(i) {
            console.log(i)
        }

    }
</script>

<style scoped>

    .tree {
        width: 215px;
        padding: 0 10px;
        height: calc(100vh - 109px);
        border: 1px solid #DDDEE1;
        border-right: 3px solid #DDDEE1;

    }

</style>