<script lang="tsx">
    import Vue, { CreateElement } from 'vue'
    import { Getter, Action } from 'vuex-class'
    import { Component } from 'vue-property-decorator'
    import { AfterPassWord } from '@/tools/index'
    import { Dropdown, Icon, DropdownMenu, DropdownItem, Avatar } from 'iview'
    @Component({
    })
    export default class Demo extends Vue {

        @Getter storeUserInfo

        @Action ActionLoginOut

        handleLogout() {
            this.ActionLoginOut().then(()=>{
                this.$router.push({path:'/'})
            })
        }

        handlePerson() {
            this.$router.push({path: '/index/person'})
        }

        render(h: CreateElement) {
            return (
                <div>
                    <Dropdown>
                        <a href="javascript:void(0)">
                    { this.storeUserInfo ? this.storeUserInfo.name : '暂无用户登录，仅开发测试' }
                        <Icon type="arrow-down-b"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem nativeOnClick={this.handlePerson}>个人中心</DropdownItem>
                            <DropdownItem nativeOnClick={this.handleLogout}>退出</DropdownItem>
                        </DropdownMenu>
                  </Dropdown>
                &emsp;
                    <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                </div>
        )
        }
    }
</script>