<template>
  <div class="layout padding">
    <Timeline   >
      <TimelineItem color="green">
        <Icon type="trophy" slot="dot"></Icon>
        <span>{{ flowNodes.flow_name }}</span>
      </TimelineItem>
      <TimelineItem v-for="(item, key) in flowNodes.children">{{ item.flow_node_name }}</TimelineItem>
    </Timeline>


    <Form ref="formValidateFlow" :model="formValidateFlow" :rules="ruleValidateFlow" :label-width="80">

      <FormItem label="流程名称" prop="flow_no">
        <Select v-model="formValidateFlow.flow_no" placeholder="Select your city" @on-change="handleFlowNode">
          <Option v-for="(item, key) in flows" :value="item.flow_no.toString()">{{ item.flow_name }}</Option>
        </Select>
      </FormItem>

      <FormItem label="节点名称" prop="flow_node_name">
        <Input v-model="formValidateFlow.flow_node_name" placeholder="Enter your 流程名称"></Input>
      </FormItem>

      <FormItem label="流程角色" prop="flow_node_role">
        <Input v-model="formValidateFlow.flow_node_role" placeholder="Enter your 流程角色"></Input>
      </FormItem>

      <FormItem label="备注" prop="remark">
        <Input v-model="formValidateFlow.remark" placeholder="Enter your 备注" type="textarea"></Input>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidateFlow')">Submit</Button>
        <Button type="ghost" @click="handleReset('formValidateFlow')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>

  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Getter, Action } from 'vuex-class'
  @Component({
    computed: {

    }
  })
  export default class App extends Vue {
    $refs: {
      checkboxElement: HTMLFormElement
    }
    formValidateFlow = {
      flow_no:'',
      flow_node_name: '',
      flow_node_role:'',
      remark: '',
    }
    ruleValidateFlow = {
      flow_node_name: [
        { required: true, message: 'The 流程名称 cannot be empty', trigger: 'blur' }
      ],
      flow_node_role: [
        { required: true, message: 'The 流程节点 cannot be empty', trigger: 'blur' }
      ],
      flow_no: [
        { required: true, message: 'The 流程节点 cannot be empty', trigger: 'change' }
      ],

    }
    flows = []
    flowNodes = {}
    mounted() {
      this.getFlowsList()
    }

    getFlowsList() {
      new Vue.prototype.$http('BOOK').get('flow').then(res=>{
        if(res) {
          this.flows = res
        }
      })
    }

    getFlowNodeList(flow_no) {
      new Vue.prototype.$http('BOOK', {}, '?flow_no=' + flow_no).get('flowNode').then(res=>{
        if(res) {
          this.flowNodes = res
          console.log(res, 10086)
        }
      })
    }

    handleFlowNode(flow_no) {
      console.log(flow_no,'11s')
      this.getFlowNodeList(flow_no)
    }

    handleReset (name) {
      this.$refs[name].resetFields();
    }

    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log(this.formValidateFlow, 10086)
          new Vue.prototype.$http('BOOK', this.formValidateFlow).post('flowNode').then(res=>{
            if(res) {
              this.handleReset('formValidateFlow')
            }
          })
        } else {
          console.log('faile')
        }
      })
    }
  }
</script>
