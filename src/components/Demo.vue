<script lang="tsx">
    import Vue, { CreateElement } from 'vue'
    import { Getter, Action } from 'vuex-class'
    import { Component } from 'vue-property-decorator'
    import { AfterPassWord } from '@/tools/index'
    import Base64 from 'js-base64'
    import sha1 from 'js-sha1'
    import FormValidateMixin from '@/components/FormValidateMixini'
    @Component({
        mixins: [FormValidateMixin]
    })
    export default class Demo extends Vue {
        @Getter info
        @Getter userInfo
        @Action Login
       created(){
            let pwd = '123456'
            AfterPassWord(pwd)
            console.log(AfterPassWord(pwd))
            console.log(_.chunk(['a', 'b', 'c', 'd'], 2))
            this.handleReset('shining')
            this.Login();
       }
        render(h: CreateElement) {
            return (
                <div>
                    <h1> { this.userInfo.name } </h1>
                    <div> hello {this.info.data}</div>
                </div>
            )
        }
    }
</script>