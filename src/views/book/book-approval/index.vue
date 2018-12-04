<template>
    <div class="layout padding">
      <Row>
        <Col span="12">
        <h3>&emsp; 流程</h3>
        <tblFlow></tblFlow></Col>
        <Col span="12">
        <h3>&emsp; 流程节点</h3>
        <tblFlowNode></tblFlowNode></Col>
      </Row>

      <Row>
        <Col span="12">
        <h3>&emsp; 流程线</h3>
        <tblFlowLine></tblFlowLine>
        </Col>

        <Col span="12">
        </Col>
      </Row>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Getter, Action } from 'vuex-class'
    import tblFlow from '@/views/book/book-approval/tblFlow.vue'
    import tblFlowNode from '@/views/book/book-approval/tblFlowNode.vue'
    import tblFlowLine from '@/views/book/book-approval/tblFlowLine.vue'
    @Component({
        components:{ tblFlow, tblFlowNode, tblFlowLine },
        computed: {

        }
    })
    export default class App extends Vue {
        $refs: {
            checkboxElement: HTMLFormElement
        }



    }
</script>
