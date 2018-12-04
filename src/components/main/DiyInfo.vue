<template>
    <div class="layout">
        <div style="display: flex">
            <Card :style="{ width: Number(item.id) !== -1 ? '150px': '100px' }"
                  style="height: 30px; line-height: 28px; margin: 2px; cursor: pointer"
                  v-for="(item,index) in stateBreads" :key="index"  @click.native.stop="handleJumpRouter(item)">
                <Row >
                    <Col :span="Number(item.id) !== -1 ? 6: 9" style="text-align: center">
                          <Icon type="record" :style="{ color: (Number(stateNowIndex) === Number(item.id)) ? '#2D8CF0' : '#BCBCC0' }"></Icon>
                    </Col>
                    <Col span="14">{{ item.resource_name }}</Col>
                    <Col span="2" style="text-align: right" v-if="Number(item.id) !== -1"><Icon style="margin-top: 5px" size='18' type="ios-close-empty" @click.native.stop="handleClose(item)"></Icon></Col>
                </Row>
            </Card>
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import { Getter, Action } from 'vuex-class'
    import Component from 'vue-class-component'
    @Component({

    })
    export default class Info extends Vue {

        @Getter stateBreads
        @Getter stateNowIndex

        @Action ActionSetBread
        @Action ActionDelBread

        $refs: {
            checkboxElement: HTMLFormElement
        }
        // 初始化数据
        created() {
            console.log(this.stateNowIndex, '999')
        }

        handleClose(path) {
            this.ActionDelBread(path)
        }

        handleJumpRouter(path) {
            this.$router.push(path['resource_url'])
            this.ActionSetBread(path);
        }

    }
</script>
