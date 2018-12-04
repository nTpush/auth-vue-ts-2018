<template>
    <div>
        <Breadcrumb :style="{margin: '13px 5px'}" >
            <!--<router-link class="router-click" :to="'/'+paths.slice(0,key+1).join('/')" v-if="pathChinese[item]" v-for="(item, key) in paths">-->
            <!--<router-link class="router-click" to="/index" >-->
                <BreadcrumbItem @click.native="handleGoHome" style="color: #2E2E2E; cursor: pointer">主页</BreadcrumbItem>
            <!--</router-link>-->
            <!--<span style="margin-left: -7px; margin-right: 6px; color: #dddee1">/ </span>-->
              <BreadcrumbItem v-if="pathChinese[item]" v-for="(item, key) in paths" :key="key"> {{ pathChinese[item] }} </BreadcrumbItem>
            <!--</router-link>-->
        </Breadcrumb>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Getter, Action } from 'vuex-class'
    import { B } from '@/_config/M.ts'
    @Component({
       watch: {
           $route() {
               this.handlePath()
           }
       }
    })
    export default class App extends Vue {
        @Action ActionSetBread

        // 初始化数据
        paths = [];
        pathChinese = {}

        handlePath() {
            this.paths = this.$route.path.split('/').slice(1)
        }

        /**
         * 返回首页，重置菜单
         */
        handleGoHome() {
            const path = {
                 id: 1,
                'resource_name': '主页',
                'resource_url' : '/index'
            }
            this.$router.push('/index')
            this.ActionSetBread(path)
        }

        created() {
            this.pathChinese = B
            this.handlePath()
        }

    }
</script>

<style scoped>
    .router-click:last-child {
        pointer-events: none;
    }
</style>
