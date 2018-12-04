<template>
  <div class="layout padding">
    <Form ref="formValidateFlow" :model="formValidateFlow" :rules="ruleValidateFlow" :label-width="80">
      <FormItem label="流程名称" prop="flow_name">
        <Input v-model="formValidateFlow.flow_name" placeholder="Enter your 流程名称"></Input>
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
      flow_name: '',
      remark: '',
    }
    ruleValidateFlow = {
      flow_name: [
        { required: true, message: 'The 流程名称 cannot be empty', trigger: 'blur' }
        ],
    }

    handleReset (name) {
      this.$refs[name].resetFields();
    }

    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          new Vue.prototype.$http('BOOK', this.formValidateFlow).post('flow').then(res=>{
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
