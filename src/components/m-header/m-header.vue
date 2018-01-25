<template>
  <div class="m-header">
    <!--<div class="icon" v-if="!user"></div>-->
    <img v-if="!user" src="static/img/avatar.png" alt="" style="width: 30px; height: 32px; border-radius: 50%; margin-top: 6px; margin-right: 9px;">
    <h1 class="text" v-if="!user">Ecode易小林</h1>
    <div v-if="user" class="avatar">
      <img :src="user.avatar">
    </div>
    <h1 class="text" v-if="user">{{user.name}}</h1>
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'user'
      ])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    font-size: 0
    .avatar
      display: inline-block
      vertical-align: top
      margin-top: 6px
      width: 30px
      height: 32px
      margin-right: 9px
      background-size: 30px 32px
      img
        border-radius: 50%
        max-width: 100%
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 6px
      width: 30px
      height: 32px
      margin-right: 9px
      bg-image('avatar')
      background-size: 30px 32px
      border-radius: 50%
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
</style>