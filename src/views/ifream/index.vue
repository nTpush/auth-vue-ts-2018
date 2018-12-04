<template>
    <div class="layout">
        <!-- <iframe src="/static/demo.html" style="width: 100%; height: calc(100vh - 110px);"></iframe> -->

        <todo-list></todo-list>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    import TodoList from '@/views/todolist/index.vue'

    import Echo from 'laravel-echo'
    



    @Component({
        components: { TodoList }
    })
    export default class Ifream extends Vue {
        // 初始化数据
        created() {
            

          
        }

    }
</script>
