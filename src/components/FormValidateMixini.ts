import { Vue, Component } from 'vue-property-decorator'

declare module 'vue/types/vue' {
    interface Vue {
      form: Object
      handleReset (name: any): void
    }
}

@Component
export default class FormValidateMixini extends Vue {
  form: Object = {}
  handleReset (name: any): void {
    console.log('90', name)
  }
}
