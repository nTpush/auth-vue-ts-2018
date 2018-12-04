<template>
    <div class="todolist">
       <div class="h1">
           <div>
              <ul>
                <li>toDoList ———— 每天一点点</li>
                <li>
                    <Input v-model="value11" style="width: 300px; margin:8px" placeholder="添加 todo" @on-enter='enterTodo'></Input>
                </li>
              </ul>
           </div>
       </div>
        <div class="list-box">
             <Alert banner closable type="warning">我对它的理解： toodList, 看看其他人的网站，发现自己的不足，将它化成自己的需求一点一点的记录，并时实查看自己的完成情况。</Alert>
             <Row>
                <Col span="12">
                   <!-- <div class="undone"> -->
                        <h2>正在完成</h2>
                        <div class="group_box" v-for="(item, key) in undone">
                            <p>{{ item.date }}</p>
                                <ul>
                                    <li v-for="(itemitem, keykey) in item.todo">
                                        <Row>
                                            <Col span="2">
                                                <div class="check-box">
                                                         <div :class="{ checked : nowId === itemitem.id }" class="check" style="margin: 50% 0; margin-left:10px" @click="handleComputed(itemitem.id)" ></div>
                                                </div>
                                            </Col>
                                            <Col span="20">
                                                <p ref='p' >
                                                {{ itemitem.todo }}
                                                </p>
                                            </Col>
                                            <Col span="2">
                                                <div class="check-box" style="padding-left: 10px" >
                                                  <Icon type="backspace" size='20' style="float:right; margin: 50% 0; " @click.native="handleDeleted(itemitem.id)"></Icon>
                                                </div>
                                            </Col>
                                        </Row>
                                    </li>
                                </ul>
                        <!-- </div> -->
                   </div>
                </Col>
                <Col span="12">
                 <div class="undone">
                     <h2>已经完成</h2>
                        <div class="group_box" v-for="(item, key) in done">
                            <p>{{ item.date }}</p>
                                <ul>
                                    <li v-for="(itemitem, keykey) in item.todo">
                                        <Row>
                                            <Col span="2">
                                                <div class="check-box" >
                                                    <div class="check checked done" style="margin: 50% 0; margin-left:10px" ></div>
                                                </div>
                                            </Col>
                                            <Col span="22">
                                                <p ref='p' >
                                                {{ itemitem.todo }}
                                                </p>
                                            </Col>
                                            <p style="text-align: right; padding-right:10px"> <span>用时：</span> <b>{{ itemitem.hour }}</b> </p>
                                        </Row>
                                    </li>
                                </ul>
                    </div>
                     </div>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    @Component({
         computed: {
            num() {
                return 90;
            },
        }
    })
    export default class todoList extends Vue {
     $refs: {
            checkboxElement: HTMLFormElement
        }
        // 初始化数据
        value11 = ''
        single = ''

        undone = []
        done = []
        disabledGroup = []

        nowId = 0


        mounted() {
        }

        listTodo() {
            new Vue.prototype.$http('USER').get('todo').then(res=>{
                if(res) {
                    this.undone = res.undone
                    this.done = res.done.map(function(item) {
                        item.todo.map(function(itemitem) {
                            let start = new Date(itemitem.created_at).getTime()/1000
                            let end = new Date(itemitem.updated_at).getTime()/1000
                            let result = end - start
                            let leave1=result%(24*3600*1000)
                            let hours=Math.floor(leave1/(3600))
                            itemitem['hour'] = hours + ' h';
                            return itemitem
                        })
                        return item
                    })

                    console.log(this.done,'done')
                }
            })
        }

        /**
         * 创建
         */
        enterTodo() {
            if(this.value11) {
                let obj = {
                    todo: this.value11
                }
                new Vue.prototype.$http('USER', obj).post('todo').then(res=>{
                    if(res) {
                        this.value11 = ''
                        Vue.prototype.$Message.success('添加成功')
                        this.listTodo()
                    }
                })
            }else {
                Vue.prototype.$Message.warning('请输入 todo!')
            }
        }

        handleComputed(id) {
            this.nowId = id
             new Vue.prototype.$http('USER', {}, id).put('todo').then(res=>{
               if(res) {
                    this.listTodo()
                    Vue.prototype.$Message.success('操作成功')
               }

            })
        }

        handleDeleted(id) {
             new Vue.prototype.$http('USER', {}, id).delete('todo').then(res=>{
                if(res) {
                     this.listTodo()
                    Vue.prototype.$Message.success('删除成功')
                }
            })
        }

        created() {
           this.listTodo()
        }

    }
</script>
<style scoped>
    .h1 {
        background: #323232;
        color: #f5f5f5;
        overflow: hidden;
        height: 50px;
        line-height: 50px;
    }
    .h1 div {
        width: 50%;
        margin: 0 auto;
        height: 50px;
    }
    .h1 div ul {
        display: flex;
    }
    .h1 div ul li {
        width: 50%;
    }
     .h1 div ul li:first-child {
         text-align: left;
         font-size: 20px;
         letter-spacing: 1px;
     }
     .h1 div ul li:last-child {
        text-align: right;
     }
    .h1 h1 {
        text-align: left;
    }
    h2 {
        text-align: center;
        line-height: 50px;
        letter-spacing: 1px;
    }
    .list-box {
        background: url('/static/image/todo.jpg');
        background-size: cover;

        height: calc(100vh - 168px);
        width: 100%;
        overflow-y: scroll;
    }
    .list-box ul {
        text-align: center;
    }

    .list-box ul li {
        display: inline-block;
        width: 100%;
        background: #f5f5f5;
        margin-bottom: 10px;
        border-radius: 5px;
        box-shadow: 0 1px 2px rgba(0,0,0,0.07);
        border-left: 7px solid #629A9C;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.5s;
    }

    .list-box ul li:hover {
        background: #fff;
    }

    .list-box ul li p {
        text-align: left;
        line-height: 40px;

    }

    .check-box {
        display:table-cell;
        /* width: 200px; */
        /* text-align: right; */
    }

    .check-box .check {
        width: 14px;
        height: 14px;
        background: #fff;
        box-shadow: 0 0px 1px #C2C2C2;
        cursor: pointer;
        border-radius: 1px;
        transition: all 0.5s;
        /* background: red; */
        /* height: 50px; */
        /* position: absolute; */
        /* left: 50%; */
        /* top: 50%; */
        /* transform: translate(-50%, -50%); */
    }

    .check-box .check:hover {
        box-shadow: 0 1px 3px #2D8CF0;
    }

    .check-box .check.checked:before {
        content: "✓";
        font-size: 16px;
        color: #2D8CF0;
        position: relative;
        font-weight: bold;
        top: -4px;
    }

    .done.checked:before {
        color: #ccc !important;
    }

    .done:hover {
        box-shadow: 0 0px 1px #C2C2C2 !important;
    }

    .group_box {
        width: 70%;
        margin: 0 auto;
    }
    .group_box>p{
        font-size: 16px;
    }

    .undone {
        height: calc(100vh - 168px);
        overflow-y: scroll;
    }
</style>
