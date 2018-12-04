<template>
    <div class="layout log padding">
         <Tabs>
            <TabPane label="用户操作日志" icon="social-apple" v-if='!(storeNode.indexOf(21) === -1)'>
                <Table stripe border :columns="columns1" :data="data1"></Table>
                <Page :total="total" show-total size='small' :page-size="15" @on-change="changePageOperation"></Page>
            </TabPane>
            <TabPane label="用户登录日志" icon="social-windows" v-if='!(storeNode.indexOf(22) === -1)'>
                  <Table stripe border :columns="columns2" :data="data2" ></Table>
                  
                  <Page :total="tota2" show-total size='small' :page-size="15" @on-change="changePageUser" ></Page>
            </TabPane>
        </Tabs>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import expandRow from '@/views/system-configuration/operation-log/expand.vue'
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
                    title: '行为名称',
                    key: 'user_id1'
                },
                {
                    title: '操作人',
                    key: 'user_id'
                },
                {
                    title: '请求url',
                    key: 'path'
                },
                {
                    title: '请求方式',
                    key: 'method'
                },
                {
                    title: '执行时间',
                    key: 'created_at'
                },
                {
                    title: 'IP地址',
                    key: 'ip'
                }
            ]

        data1 = []
        columns2 = [
                 {
                    title: '用户ID',
                    key: 'user_id',
                    align: 'center'
                },
                {
                    title: '设备名称',
                    key: 'device',
                    align: 'center'
                },
                 {
                    title: '设备类型',
                    key: 'device_type',
                    align: 'center'
                },
                {
                    title: '操作系统',
                    key: 'platform',
                    align: 'center'
                },
                {
                    title: '浏览器',
                    key: 'browser',
                    align: 'center'
                },
                {
                    title: 'IP地址',
                    key: 'ip',
                    align: 'center'
                },
                {
                    title: '登录时间',
                    key: 'login_time',
                    align: 'center'
                }
            ]

        data2 = []

        total = 0
        tota2 = 0

        @Getter
        storeNode

        created() {
            new Vue.prototype.$http('LOG').get('user').then(res=>{
                if(res) {
                    this.data1 = res.data
                    this.total = res.total
                }
            })

             new Vue.prototype.$http('LOG').get('operation').then(res=>{
                 if(res) {
                    this.tota2 = res.total
                    this.data2 = res.data
                 }

            })
        }

        changePageOperation(p) {
             new Vue.prototype.$http('LOG', {}, '?page='+p).get('user').then(res=>{
                 if(res) {
                    this.data1 = res.data
                    this.total = res.total
                 }
            })
        }

        changePageUser(p) {
            new Vue.prototype.$http('LOG', {}, '?page='+p).get('operation').then(res=>{
                if(res) {
                    this.tota2 = res.total
                    this.data2 = res.data
                }
            })
        }

    }
</script>