<template>
  <div class="hello">
    <div>
      <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
      <p>地址3级联动：{{myAddressProvince}} {{myAddressCity}} {{myAddresscounty}}</p>
    </div>

    <h1>{{propB}}</h1>
    <mt-button type="primary">primary</mt-button>
    <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-distance="10">
      <li v-for="item in list">{{ item }}</li>
      <div v-if="loading">正在加载</div>
    </ul>
  </div>
</template>


<script lang="ts">
    import { Prop } from 'vue-property-decorator'

    import Vue from 'vue'
    import Component from 'vue-class-component'
    import myaddress from '@/components/address.js'
    @Component
    export default class App extends Vue {
        @Prop({ default: 'default valudde' })
        propB: string


        // 初始化数据
        msg = 123
        pickerValue = null
        list = [1,2,3]
        loading = true
        myAddressProvince='省'
        myAddressCity='市'
        myAddresscounty='区/县'
        myAddressSlots = [
            {
                flex: 1,
                defaultIndex: 1,
                values: Object.keys(myaddress),  //省份数组
                className: 'slot1',
                textAlign: 'center'
            }, {
            divider: true,
            content: '-',
            className: 'slot2'
        }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
        },
            {
                divider: true,
                content: '-',
                className: 'slot4'
            },
            {
                flex: 1,
                values: [],
                className: 'slot5',
                textAlign: 'center'
            }
            ]
        created() {
            for(var i=0;i<100;i++) {
                this.list.push(i)
            }
        }

        // 声明周期钩子
        mounted () {
            this.$nextTick(() => { //vue里面全部加载好了再执行的函数  （类似于setTimeout）
                this.myAddressSlots[0].defaultIndex = 0
                // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
                //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
            });
        }

        // 计算属性
        get computedMsg () {
            return 'computed ' + this.msg
        }

        // 方法
        onMyAddressChange(picker, values) {
            if(myaddress[values[0]]){  //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
                picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
                picker.setSlotValues(2,myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
                this.myAddressProvince = values[0];
                this.myAddressCity = values[1];
                this.myAddresscounty = values[2];
            }
        }
        onValuesChange(picker, values, defaultIndex) {
            console.log(this.pickerValue, 'value')
            if (values[0] > values[1]) {
                picker.setSlotValue(2, values[0]);
            }
        }
        loadMore() {
            this.loading = true;
            setTimeout(() => {
                let last = this.list[this.list.length - 1];
                for (let i = 1; i <= 10; i++) {
                    this.list.push(last + i);
                }
                this.loading = false;
            }, 2500);
        }
    }
</script>