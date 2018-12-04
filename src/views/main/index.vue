<template>
  <div class="layout">
    <Layout :style="{minHeight: '100vh'}">

      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" v-show="vifChange" class="small">
        <Menu
          active-name="'-8'" theme="dark" width="auto" :class="menuitemClasses" accordion class='menu-diy'>
          <MenuItem :name="'-' + item.id" v-if='item.children.length && !(storeMenu.indexOf(Number(item.id))===-1)' v-for='(item, key) in storeMenuList'
                    @click.native="handleShow(key)"
                    :class="{ 'ivu-menu-item-active' :  Number(('-' + key)) === Number(stateOpenId) }">
            <div class="z_menu">

              <Icon :type="item.icon"></Icon>
              <Card :bordered="false" class="z_card">
                <MenuItem :class="{ 'z_menu_active': Number(itemitem.id) === Number(stateNowIndex) }"
                          v-if="!(storeMenu.indexOf(Number(itemitem.id))===-1)"
                          v-for='(itemitem, keykey) in item.children' :name="'-' + itemitem.id" @click.native="handleRoute(itemitem)">
                  <Icon :type="itemitem.icon" size='14'></Icon>
                  {{ itemitem.resource_name }}</MenuItem>
              </Card>
            </div>
          </MenuItem>

          <MenuItem
            :class="{ 'ivu-menu-item-active' :  Number(('-' + key)) === Number(stateOpenId)  }"
            :name="'-' + item.id" v-for='(item, key) in storeMenuList' v-if='!item.children.length && !(storeMenu.indexOf(Number(item.id))===-1)' @click.native="handleRoute(item)">
            <Icon :type="item.icon"></Icon>
          </MenuItem>
        </Menu>
      </Sider>

      <!-- 菜单 -->
      <Sider  hide-trigger collapsible :collapsed-width="78"  v-show="!vifChange">
        <m-clock></m-clock>
        <Menu :active-name="'-' + stateNowIndex" theme="dark" width="auto" :open-names="stateOpenId" ref='side_menu' accordion class="menu-diy">
          <Submenu :name="'-' + key" v-for='(item, key) in storeMenuList' v-if='item.children.length && !(storeMenu.indexOf(Number(item.id))===-1)'  @click.native="handleShow(key)">
            <template slot="title">
              <Icon :type="item.icon"></Icon>
              {{ item.resource_name }}
            </template>
            <div v-for='(itemitem, keykey) in item.children'>
              <MenuItem :name="'-' + itemitem.id" @click.native="handleRoute(itemitem)" v-if="!(storeMenu.indexOf(Number(itemitem.id))===-1)" ><Icon :type="itemitem.icon"></Icon>{{ itemitem.resource_name }}</MenuItem>
            </div>
          </Submenu>

          <MenuItem :name="'-' + item.id" v-for='(item, key) in storeMenuList' v-if='!item.children.length && !(storeMenu.indexOf(Number(item.id))===-1)'  @click.native="handleRoute(item)">
            <Icon :type="item.icon"></Icon>
            <span>{{item.resource_name}}</span>
          </MenuItem>
        </Menu>
      </Sider>


      <Layout>
        <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
          <span style="float: left"><Icon @click.native="collapsedSider" :class="{ 'rotate-icon' : vifChange }" :style="{margin: '15px 10px 0'}" type="navicon-round" size="24"></Icon></span>

          <span class="logo-name">
                      <diy-bread />
                  </span>

          <div style="float:right">
            <ul class="right-info">
              <li class="right-info-child">
                <Tooltip content="锁屏" placement="bottom">
                                    <span class="right-info-box">
                                        <Icon type="ios-locked" size="14" @click.native="handleLocked"></Icon>
                                    </span>
                </Tooltip>
              </li>
              <li class="right-info-child right-info-child-last">
                <Tooltip content="全屏" placement="bottom">
                                     <span class="right-info-box">
                                         <Icon type="arrow-expand" @click.native="handleBig" size="14"></Icon>
                                     </span>
                </Tooltip>
              </li>
              <li>
                <diy-user />
              </li>
            </ul>
          </div>
        </Header>
        <Content :style="{padding: '0 16px 16px'}">
          <Row>
            <Col span="24">
            <diy-info></diy-info>
            </Col>


          </Row>
          <Card>
            <div id="content" >
              <router-view/>
            </div>
          </Card>
          <p class="z_footer">代码如诗，唯键作伴</p>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import DiyUser from '@/components/main/DiyUser.vue'
  import DiyBread from '@/components/main/DiyBread.vue'
  import DiyInfo from '@/components/main/DiyInfo.vue'
  import { Getter, Action } from 'vuex-class'

  import mClock from '@/views/clock/index.vue'


  import '@/views/main/index.css'
  import store from '../../store';
  import { setTimeout, clearTimeout, clearInterval } from 'timers';

  @Component({
    components: { DiyUser, DiyBread, DiyInfo, mClock },
    computed: {
      menuitemClasses: function () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      },
    },
    watch: {
      $route() {
        this.activeName = this.$route.path
        this.$nextTick(()=>{
          this.$refs.side_menu.updateActiveName()
          this.$refs.side_menu.updateOpened()
        })
      }
    }
  })
  export default class App extends Vue {
    $refs: {
      checkboxElement: HTMLFormElement
    }


    @Action
    ActionMenuList

    @Action
    ActionSetBread

    @Action
    ActionSetOpenId

    @Action
    ActionLoginOut

    @Getter storeMenuList

    @Getter stateNowIndex

    @Getter stateOpenId

    @Getter storeMenu

    @Getter storeUserInfo

    num = 0

    locked = null

    // 初始化数据
    isCollapsed = true
    vifChange = false

    oldUrl = true

    beforeRouteEnter (to, from, next){
      next(vm => {
        // 通过 `vm` 访问组件实例,将值传入oldUrl
        vm.oldUrl = from.path
      })
    }


    mounted() {
      Vue.prototype.$socket.on('test-channel:UserSignedUp', message => {
        let localToken = JSON.parse(window.localStorage.getItem('user_token'))
        console.log(message, '2222222222222222')
        if(this.storeUserInfo.name === message.username.name) {
          if(this.oldUrl) {
            this.oldUrl = false
            Vue.prototype.$Message.warning('用户已在异地登录，请重新登录！')
            this.$router.push({path:'/'})
          }
        }else {
          console.log('登录成功')
        }
      });


      /**
       * 锁屏
       */
      // this.locked = setInterval(()=>{
      //     this.num ++
      //     if(this.num > 10) {
      //         window.clearInterval(this.locked)
      //         this.$router.push('/locked')
      //     }

      // }, 10000)


      // document.onclick = ()=>{
      //     this.num = 0
      // }

      // document.onkeydown = ()=>{
      //     this.num = 0
      // }

      // document.onmousemove = ()=>{
      //     this.num = 0
      // }

      // document.onmousewheel = ()=>{
      //     this.num = 0
      // }


    }

    /**
     * 全屏
     */
    fullScreen(el) {
      el.webkitRequestFullScreen();
    }

    created() {

      this.ActionMenuList().then(res=>{
        this.$nextTick(()=>{
          this.$refs['side_menu'].updateActiveName()
          this.$refs['side_menu'].updateOpened()
        })
      })
    }

    /**
     * 路由跳转 维护面包绡
     * @param path
     */
    jumpRouter(path) {
      // this.$router.push(path['menu_url'])
      // this.setBread(path);
    }

    handleRoute(path) {
      this.$router.push(path['resource_url']);
      this.ActionSetBread(path);
    }

    handleShow(key) {
      this.ActionSetOpenId(key)
    }

    /**
     * 调用全屏方法
     */
    handleBig() {
      var content = document.getElementById('content');
      this.fullScreen(content)
    }

    /**
     * 锁屏
     */
    handleLocked() {
      this.$router.push('/locked')
    }

    collapsedSider() {
      this.vifChange = !this.vifChange
      this.ActionSetOpenId(Number(sessionStorage.getItem('open_index')))
      this.$nextTick(()=>{
        this.$refs['side_menu'].updateActiveName()
        this.$refs['side_menu'].updateOpened()
      })
    }
  }
</script>

<style scoped>
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
  .rotate-icon{
    transform: rotate(-90deg);
  }
  #content {
    position: relative;
    overflow: auto;
    width: 100%;
    height: calc(100vh - 115px);
    /* padding: 10px; */
  }

  .logo-name {
    font-size: 18px !important;
    letter-spacing: 2px;
    display: flex;
    float: left;
  }

  .z_menu {
    position: relative;
  }
  .z_card {
    position: absolute;
    background: #495060;
    width: 200px;
    left: 54px;
    top: -10px;
    display: none;
  }

  .z_menu_active {
    background: #2D8CF0 !important;
    color: #fff !important;
  }

  .z_menu_active {

  }

  .z_footer {
    text-align: center;
    line-height: 30px
  }
</style>
