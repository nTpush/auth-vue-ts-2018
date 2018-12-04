<template>
    <div class="layout padding">
        <Alert banner closable type="warning">我对它的理解： 版本更新，因vue打包后的结果是dist文件夹，在不知第三方发布的情况下，我将它集成到系统中，每次打包后，将打包后的结果压缩成.zip格式并拖动到该页面，
            即可更新网站，因存储空间有限，目前只保存3次记录。</Alert>
        <Upload
            ref="dist"
            multiple
            type="drag"
            :headers= "{'Authorization':'Bearer ' + $store.getters.storeTokenInfo.access_token ,'X-Requested-With': 'XMLHttpRequest'}"
            :action="upload_dist"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :on-success="handleSuccess"
            :format="['zip','rar']"
            >
            <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>请上传文件</p>
            </div>
        </Upload>

        <Table stripe border :columns="columns1" :data="data1" v-if="!(storeNode.indexOf(13) === -1)"></Table>
        <p v-else class="none-node">抱歉您没有权限访问该数据！</p>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { uploadDist } from '@/service/apis.ts'
    import mTStatus from '@/views/system-configuration/version-updating/status.vue'
    import mButton from '@/views/system-configuration/version-updating/button.vue'
    import { Getter } from 'vuex-class';

    @Component({
        components: { mTStatus, mButton }
    })
    export default class App extends Vue {
     $refs: {
            checkboxElement: HTMLFormElement
        }
        // 初始化数据


        @Getter
        storeNode

        upload_dist = ''

        columns1 = [
                    {
                        type: 'index',
                        width: 70,
                        title: '序号',
                        align: 'center'
                    },
                    {
                        title: '版本名称',
                        key: 'dist_path',
                    },
                    {
                        title: '操作人',
                        align: 'center',
                        key: 'operator',
                        width: 140,
                    },
                    {
                        title: '状态',
                        align: 'center',
                        key: 'status',
                        width: 220,
                        render: (h, params) =>{
                        return h (mTStatus, {
                            props: {
                                row: params.row
                            }
                        })
                    }
                    },
                    {
                        title: '更新日期',
                        align: 'center',
                        width: 160,
                        key: 'updated_at'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 140,
                        render: (h, params) => {
                        return h(mButton, {
                            props: {
                                row: params.row
                            },
                            on: {
                                'removeSend' : (val) => {
                                    this.handRemove(val)
                                },
                                'showSend' : (val) => {
                                    this.handShow(val)
                                }
                            }
                        })
                    }
                    }

                ]
                data1 = []

        defaultList() {
            new Vue.prototype.$http('DIST').get('list').then(res=>{
                if(res) {
                    this.data1 = res.data

                }
            })
        }

        /**
         * 回滚
         */
        handShow(id) {
            console.log(id, '回溯')
            let obj = {
                id
            }
            new Vue.prototype.$http('DIST', obj).post('back').then(res=>{
                console.log(res,'结果')
                this.defaultList()
            })
        }

        handRemove(id) {

        }

        created() {
            this.defaultList()
            this.upload_dist = uploadDist
        }

        handleFormatError(file) {
            Vue.prototype.$Message.warning('请上传zip格式的文件！')
        }

        handleMaxSize() {
            Vue.prototype.$Message.warning('请上传小于150M的文件！')
        }

        handleSuccess(res, file) {


            if(!res.code) {
                Vue.prototype.$Message.success('上传成功！')
                this.defaultList();
                this.$refs['dist'].clearFiles();
            }else {
                Vue.prototype.$Message.error(res.message)
            }
        }
    }
</script>

