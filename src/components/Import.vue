<template>
    <div class="layout">
        <input type="file" @change="importfxx(this)" ref="upload">

        <Table stripe :columns="columns1" :data="data1"></Table>
    </div>
</template>
<script lang="ts">
    var XLSX = require('xlsx')
    import Vue from 'vue'
    import Component from 'vue-class-component'
    @Component({
    })
    export default class Import extends Vue {
        file = null

        data1 = [];

        columns1= [
            {
                title: '商品ID',
                key: 'code'
            },
            {
                title: '商品名称',
                key: 'tag'
            },
            {
                title: '商品价格',
                key: 'price'
            },
            {
                title: '商品数量',
                key: 'num'
            }
        ]

        importfxx(obj) {

            this.file = event['currentTarget']['files'][0];    // 获取文件。。

            let rABS = false; //是否将文件读取为二进制字符串

            const f = this.file;

            let reader = new FileReader();

            var that = this;

            FileReader.prototype.readAsBinaryString = function(f) {
                var binary = "";

                var wb; //读取完成的数据

                var outdata;

                var reader = new FileReader();
                reader.onload = function (e) {
                    var bytes = new Uint8Array(reader.result);
                    var length = bytes.byteLength;
                    for (var i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    var XLSX = require('xlsx');
                    if (rABS) {
                        wb = XLSX.read(btoa(binary), { //手动转化
                            type: 'base64'
                        });
                    } else {
                        wb = XLSX.read(binary, {
                            type: 'binary'
                        });
                    }
                    outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西

                    that.data1 = outdata;

                    console.log(outdata, 'data')
                }
                reader.readAsArrayBuffer(f);
            }
            if(rABS) {
                reader.readAsArrayBuffer(f);
            } else {
                reader.readAsBinaryString(f);
            }
        }
    }
</script>
