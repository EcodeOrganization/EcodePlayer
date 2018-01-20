<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
      </div>
      <div class="avatar">
        <img style="height: 150px; width: 150px;" :src="avatar" v-if="!user">
      </div>
      <div v-show="currentIndex === 0">
        <div class="uoload-avatar" v-if="isEdit">
          <form enctype="multipart/form-data" id="formExcel">
            <a href="javascript:;" class="file">
              <span>更换头像</span>
              <input type="file" name="image" id="image" accept="image/*"/>
            </a>
          </form>
        </div>
        <div style="clear: both;"></div>
        <div v-if="!user" class="empty-info">你还没有登录哦，快去登录吧</div>
        <div v-if="user">
          <div class="btn-edit" @click="edit">{{isEdit? '取消' : '编辑'}}</div>
          <div class="avatar">
            <img style="height: 150px; width: 150px;" :src="user.avatar" alt="" v-show="!isEdit">
            <img style="height: 150px; width: 150px;" :src="info.avatar" alt="" v-show="isEdit">
          </div>
          <div class="user-info">
            <label class="info-left">昵称</label>
            <div class="info-right">
              <span v-if="!isEdit">{{user.name}}</span>
              <input type="text" placeholder="请输入昵称" v-model="info.name" v-if="isEdit">
            </div>
          </div>
          <div class="split" v-if="isEdit"></div>
          <div class="user-info" v-if="isEdit">
            <label class="info-left">密码</label>
            <div class="info-right">
              <input type="text" placeholder="请输入昵称" v-model="info.password">
            </div>
          </div>
          <div class="split"></div>
          <div class="user-info">
            <label class="sign-top">个性签</label>
            <div class="sign-content">
              <span v-if="!isEdit">{{user.sign}}</span>
              <textarea v-model="info.sign" placeholder="请输入你的个性签名" rows="2" v-if="isEdit"></textarea>
            </div>
          </div>
          <div class="btn-div" v-show="!isEdit">
            <div class="btn-logout" @click="logoutInfo">退 出</div>
          </div>
          <div class="btn-div" v-show="isEdit">
            <div class="btn-logout" @click="sureEdit">保 存</div>
          </div>
        </div>
      </div>
      <div v-show="currentIndex === 1">
        <div class="input-div">
          <input type="text" v-model="login.name" placeholder="请输入昵称">
        </div>
        <div class="input-div">
          <input type="text" v-model="login.password" placeholder="请输入密码">
        </div>
        <div class="btn-div">
          <div class="btn-primary" @click="send">登 录</div>
        </div>
        <div class="info-div">
          还没有账号？<span @click="jump">点我注册</span>
        </div>
      </div>
      <div v-if="currentIndex === 2">
        <div class="input-div">
          <input type="text" v-model="form.name" placeholder="请输入昵称">
        </div>
        <div class="input-div">
          <input type="text" v-model="form.password" placeholder="请输入密码">
        </div>
        <div class="btn-div">
          <div class="btn-primary" @click="add">确 定</div>
        </div>
        <div class="btn-div">
          <div class="btn-warning" @click="cancel">取 消</div>
        </div>
      </div>
      <top-tip ref="topTip">
        <div class="tip-title">
          <i class="icon-ok" v-if="isOk"></i>
          <i class="icon-delete" v-else></i>
          <span class="text">{{message}}</span>
        </div>
      </top-tip>
      <confirm ref="confirm" @confirm="confirmClear" text="此操作将退出当前账号，是否继续？" confirmBtnText="确定"></confirm>
      <!--<div ref="playBtn" class="play-btn" @click="random">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <scroll ref="favoriteList" class="list-scroll" v-if="currentIndex===0" :data="favoriteList">
          <div class="list-inner">
            <song-list :songs="favoriteList" @select="selectSong"></song-list>
          </div>
        </scroll>
        <scroll ref="playList" class="list-scroll" v-if="currentIndex===1" :data="playHistory">
          <div class="list-inner">
            <song-list :songs="playHistory" @select="selectSong"></song-list>
          </div>
        </scroll>
      </div>
      <div class="no-result-wrapper" v-show="noResult">
        <no-result :title="noResultDesc"></no-result>
      </div>-->
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Switches from 'base/switches/switches'
  import Scroll from 'base/scroll/scroll'
  // import SongList from 'base/song-list/song-list'
  // import NoResult from 'base/no-result/no-result'
  import {mapGetters, mapActions} from 'vuex'
  // import {playlistMixin} from 'common/js/mixin'
  import TopTip from 'base/top-tip/top-tip'
  import Confirm from 'base/confirm/confirm'
  import storage from 'good-storage'

  export default {
    // mixins: [playlistMixin],
    data() {
      return {
        currentIndex: 0,
        switches: [
          {
            name: '个人中心'
          },
          {
            name: '登录'
          }
        ],
        avatar: 'static/img/avatar.png',
        login: {
          name: null,
          password: null
        },
        form: {
          name: null,
          password: null
        },
        message: null,
        isOk: true,
        isEdit: false,
        info: {},
      }
    },
    computed: {
      isChange() {
        if (this.user) {
          return true
        } else {
          return false
        }
      },
      ...mapGetters([
        'user'
      ])
    },
    watch: {
      isChange(value) {
        if (value) {
          this.switches = [{name: '个人中心'}]
          this.currentIndex = 0
        } else {
          this.switches = [{name: '个人中心'}, {name: '登录'}]
        }
      }
    },
    // computed: {
    //   noResult() {
    //     if (this.currentIndex === 0) {
    //       return !this.favoriteList.length
    //     } else {
    //       return !this.playHistory.length
    //     }
    //   },
    //   noResultDesc() {
    //     if (this.currentIndex === 0) {
    //       return '暂无收藏歌曲'
    //     } else {
    //       return '你还没有听过歌曲'
    //     }
    //   },
      // ...mapGetters([
      //   'favoriteList',
      //   'playHistory'
      // ])
    // },
    created () {
      setTimeout(() => {
        console.log('user:')
        console.log(this.user)
        if (this.user) {
          this.switches = [{name: '个人中心'}]
          this.currentIndex = 0
        } else {
          this.switches = [{name: '个人中心'}, {name: '登录'}]
        }
      }, 200)
    },
    methods: {
      // 编辑
      edit() {
        this.isEdit = !this.isEdit
        if (this.isEdit) {
          this.info = storage.get('user')
        }
        setTimeout(() => {
          document.getElementById('image').onchange = () => {
            // console.log('change')
            let formData = new FormData(document.getElementById('formExcel'))
            this.$http.post(this.resource + '/img/menucover', formData).then((response) => {
              // console.log(response.data.filename)
              this.info.avatar = 'static/avatar/' + response.data.filename
            },(response) => {
              this.$toast('上传失败，请检查')
            })
          }
        }, 500)
      },
      // 确认修改
      sureEdit() {
        if (!this.info.name) {
          this.message = '昵称不能为空哦'
          this.isOk = false
          this.$refs.topTip.show()
        } else if (!this.info.password) {
          this.message = '密码不能为空哦'
          this.isOk = false
          this.$refs.topTip.show()
        } else {
          this.$http.put(`${this.resource}/user/edit`, this.info).then((res) => {
            this.isOk = true
            this.message = '保存成功'
            this.$refs.topTip.show()
            this.isEdit = false
            let user = {
              id: this.user.id,
              name: this.info.name,
              role: this.user.role,
              password: this.info.password,
              sign: this.info.sign,
              avatar: this.info.avatar
            }
            this.getUserInfo(user)
            storage.set('user', user)
          }).catch((err) => {
            this.isOk = false
            this.message = '服务端错误'
            this.$refs.topTip.show()
          })
        }
      },
      // 登录
      send() {
        if (!this.login.name) {
          this.message = '昵称不能为空哦'
          this.isOk = false
          this.$refs.topTip.show()
        } else if (!this.login.password) {
          this.message = '密码不能为空哦'
          this.isOk = false
          this.$refs.topTip.show()
        } else {
          this.$http.get(`${this.resource}/user/findOne`, {params: {name: this.login.name, password: this.login.password}}).then((res) => {
            if (res.data) {
              this.isOk = true
              this.message = '恭喜你，登录成功'
              this.$refs.topTip.show()
              this.getUserInfo(res.data)
              storage.set('user', res.data)
            } else {
              this.isOk = false
              this.message = '用户名或密码错误，请重新输入'
              this.$refs.topTip.show()
            }
          }).catch((err) => {
            this.isOk = false
            this.message = '服务端错误'
            this.$refs.topTip.show()
          })
        }
      },
      // 退出
      logoutInfo() {
        this.$refs.confirm.show()
      },
      confirmClear() {
        this.getUserInfo('')
        this.isOk = true
        this.message = '已退出当前账号'
        this.$refs.topTip.show()
        storage.clear()
      },
      // 跳转到注册页面
      jump() {
        this.currentIndex = 2
        this.switches = [
          {
            name: '注册中心'
          }
        ]
      },
      // 注册
      add() {
        if (!this.form.name) {
          this.message = '昵称不能为空哦'
          this.isOk = false
          this.$refs.topTip.show()
        } else if (!this.form.password) {
          this.message = '密码不能为空哦'
          this.isOk = false
          this.$refs.topTip.show()
        } else {
          this.$http.post(`${this.resource}/user/add`, this.form).then((res) => {
            this.isOk = true
            this.message = '恭喜你，注册成功，2秒后跳转到登录页面'
            this.$refs.topTip.show()
            setTimeout(() => {
              this.switches = [{name: '个人中心'},{name: '登录'}]
              this.currentIndex = 1
            }, 2000)
          }).catch((err) => {
            this.isOk = false
            this.message = err.response.data.errMsg
            this.$refs.topTip.show()
          })
        }
      },
      // 取消注册
      cancel() {
        this.currentIndex = 1
        this.switches = [
          {
            name: '个人中心'
          },
          {
            name: '登录'
          }
        ]
      },
      // handlePlaylist(playlist) {
      //   const bottom = playlist.length > 0 ? '60px' : ''
      //   this.$refs.listWrapper.style.bottom = bottom
      //   this.$refs.favoriteList && this.$refs.favoriteList.refresh()
      //   this.$refs.playList && this.$refs.playList.refresh()
      // },
      switchItem(index) {
        this.currentIndex = index
      },
      // selectSong(song) {
      //   this.insertSong(song)
      // },
      back() {
        this.$router.back()
      },
      // random() {
      //   let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
      //   if (list.length === 0) {
      //     return
      //   }
      //   this.randomPlay({
      //     list
      //   })
      // },
      // ...mapActions([
      //   'insertSong',
      //   'randomPlay'
      // ])
      ...mapActions([
        'getUserInfo'
      ])
    },
    components: {
      Switches,
      Scroll,
      TopTip,
      Confirm,
      // SongList,
      // NoResult
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  
  .input-div
    input
      width: 100%
      height: 45px
      outline: 0
      background: #eee
      padding-left: 10px
    &:first-child
      input
        border-bottom: 1px solid #ffcd32
   .btn-div
     margin: 15px 15px
     .btn-primary
       height: 45px
       line-height: 45px
       text-align: center
       background: #99A9BF
       border-radius: 4px
    .btn-warning
      height: 45px
      line-height: 45px
      text-align: center
      border-radius: 4px
      background: #F7BA2A
    .btn-logout
      height: 45px
      line-height: 45px
      text-align: center
      border-radius: 4px
      background: #FF4949
    .info-div
      text-align: right
      padding-right: 15px
      span
        color: #58B7FF
    .btn-edit
      float: right
      text-align: center
      border-radius: 4px
      background: #FF4949
      padding: 10px 20px
      margin-right: 15px
    .avatar
      margin: auto 
      margin-bottom: 10px
      heigh: 150px
      width: 150px   
      img
        width: 150px
        heigh: 150px
        border-radius: 50%
    .tip-title
      text-align: center
      padding: 18px 0
      font-size: 0
      .icon-ok, .icon-delete
        font-size: $font-size-medium
        color: $color-theme
        margin-right: 4px
      .text
        font-size: $font-size-medium
        color: $color-text
    .user-info
      overflow: hidden
      line-height: 45px
      background: #99A9BF
      .info-left
        float: left
        padding-left: 10px
        font-size: 20px
      .info-right
        float: right
        color: #F7BA2A
        padding-right: 20px
        input
          height: 45px
          padding-left: 10px
          outline: 0
      .sign-top
        padding-left: 10px
        width: 100%
        display: block
        font-size: 20px
        border-bottom: 1px solid #eee
      .sign-content
        padding: 0 25px
        color: #F7BA2A
        textarea
          margin-top: 20px
          width: 100%
          border-radius: 4px
          outline: 0
          padding-top: 10px
    .split
      padding: 5px
    .empty-info
      text-align: center
      margin-top: 30px
    .uoload-avatar
      position: absolute;
      top: 130px
      left: 10px
      .file 
        position: relative
        padding: 7px 9px
        font-size: 12px
        border-radius: 4px
        display: inline-block
        line-height: 1
        white-space: nowrap
        background: #fff
        border: 1px solid #c4c4c4
        color: #1f2d3d
        margin: 0
        input
          position: absolute
          font-size: 100px
          right: 0
          top: 0
          opacity: 0
        
  .user-center
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .switches-wrapper
      margin: 10px 0 30px 0
    .play-btn
      box-sizing: border-box
      width: 135px
      padding: 7px 0
      margin: 0 auto
      text-align: center
      border: 1px solid  $color-text-l
      color: $color-text-l
      border-radius: 100px
      font-size: 0
      .icon-play
        display: inline-block
        vertical-align: middle
        margin-right: 6px
        font-size: $font-size-medium-x
      .text
        display: inline-block
        vertical-align: middle
        font-size: $font-size-small
    .list-wrapper
      position: absolute
      top: 110px
      bottom: 0
      width: 100%
      .list-scroll
        height: 100%
        overflow: hidden
        .list-inner
          padding: 20px 30px
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>