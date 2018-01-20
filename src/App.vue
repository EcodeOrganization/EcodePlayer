<template>
  <div id="app" @touchmove.prevent>
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import Player from 'components/player/player'
  import Tab from 'components/tab/tab'
  import storage from 'good-storage'
  import {mapActions} from 'vuex'

  export default {
    components: {
      MHeader,
      Tab,
      Player
    },
    created() {
      let user = storage.get('user', '')
      this.getUserInfo(user)
    },
    methods: {
      ...mapActions([
        'getUserInfo'
      ])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>