<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import { getSongList } from 'api/recommend'
  import { ERR_OK } from 'api/config'
  import { mapGetters } from 'vuex'
  import { createSong, isValidMusic, _normalizeSql } from 'common/js/song'
  import { Base64 } from 'js-base64'

  export default {
    computed: {
      title() {
        return this.disc.dissname
      },
      bgImage() {
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getSongList()
    },
    methods: {
      _getSongList() {
        if (!this.disc.id) {
          this.$router.push('/recommend')
          return
        }
        this.$http.get(`${this.resource}/menuSong/findAll/${this.disc.id}`).then((res) => {
          console.log(res.data)
          this.songs = res.data.map((item) => {
            return _normalizeSql(item)
          })
          console.log(this.songs)
        })
        // this.songs = this._normalizeSongs([
        //     {
        //       "albumdesc": "",
        //       "albumid": 79964,
        //       "albummid": "002TkRlj01Ju9t",
        //       "albumname": "香港是个大商场",
        //       "alertid": 11,
        //       "belongCD": 1,
        //       "cdIdx": 0,
        //       "interval": 159,
        //       "isonly": 0,
        //       "label": "4611686018427387906",
        //       "msgid": 0,
        //       "pay": {
        //       "payalbum": 0,
        //       "payalbumprice": 0,
        //       "paydownload": 0,
        //       "payinfo": 0,
        //       "payplay": 0,
        //       "paytrackmouth": 0,
        //       "paytrackprice": 0,
        //       "timefree": 0
        //       },
        //       "preview": {
        //       "trybegin": 0,
        //       "tryend": 0,
        //       "trysize": 0
        //       },
        //       "rate": 0,
        //       "singer": [
        //       {
        //       "id": 5755,
        //       "mid": "000b2yw41NtZvd",
        //       "name": "My Little Airport"
        //       }
        //       ],
        //       "size128": 2554804,
        //       "size320": 6386654,
        //       "size5_1": 0,
        //       "sizeape": 0,
        //       "sizeflac": 0,
        //       "sizeogg": 3685208,
        //       "songid": 944841,
        //       "songmid": "004LzFZt2isMNH",
        //       "songname": "九龙公园游泳池",
        //       "songorig": "九龙公园游泳池",
        //       "songtype": 0,
        //       "strMediaMid": "001a7b1o3HuP8x",
        //       "stream": 4,
        //       "switch": 79671,
        //       "type": 0,
        //       "vid": "o00175nx1zo"
        //       },
        //       {
        //       "albumdesc": "",
        //       "albumid": 1476330,
        //       "albummid": "000AO6FP2oSrUp",
        //       "albumname": "J-POP",
        //       "alertid": 100002,
        //       "belongCD": 2,
        //       "cdIdx": 0,
        //       "interval": 202,
        //       "isonly": 1,
        //       "label": "4611686018427387906",
        //       "msgid": 14,
        //       "pay": {
        //       "payalbum": 0,
        //       "payalbumprice": 0,
        //       "paydownload": 1,
        //       "payinfo": 1,
        //       "payplay": 0,
        //       "paytrackmouth": 1,
        //       "paytrackprice": 200,
        //       "timefree": 0
        //       },
        //       "preview": {
        //       "trybegin": 73505,
        //       "tryend": 96655,
        //       "trysize": 371564
        //       },
        //       "rate": 0,
        //       "singer": [
        //       {
        //       "id": 118,
        //       "mid": "001uXFgt1kpLyI",
        //       "name": "容祖儿"
        //       },
        //       {
        //       "id": 4657,
        //       "mid": "003nUb253igrU0",
        //       "name": "林海峰"
        //       }
        //       ],
        //       "size128": 3233554,
        //       "size320": 8083552,
        //       "size5_1": 0,
        //       "sizeape": 23862359,
        //       "sizeflac": 23904267,
        //       "sizeogg": 4681720,
        //       "songid": 107325233,
        //       "songmid": "0018uRPm2cNmna",
        //       "songname": "黄昏点唱机",
        //       "songorig": "黄昏点唱机",
        //       "songtype": 0,
        //       "strMediaMid": "0018uRPm2cNmna",
        //       "stream": 10,
        //       "switch": 636675,
        //       "type": 0,
        //       "vid": "x00183as32d"
        //       }
        //     ])
            // console.log(this.songs)
        // getSongList(this.disc.id).then((res) => {
        //   if (res.code === ERR_OK) {
        //     // this.songs = this._normalizeSongs(res.cdlist[0].songlist)
        //     this.songs = this._normalizeSongs([
        //     {
        //       "albumdesc": "",
        //       "albumid": 79964,
        //       "albummid": "002TkRlj01Ju9t",
        //       "albumname": "香港是个大商场",
        //       "alertid": 11,
        //       "belongCD": 1,
        //       "cdIdx": 0,
        //       "interval": 159,
        //       "isonly": 0,
        //       "label": "4611686018427387906",
        //       "msgid": 0,
        //       "pay": {
        //       "payalbum": 0,
        //       "payalbumprice": 0,
        //       "paydownload": 0,
        //       "payinfo": 0,
        //       "payplay": 0,
        //       "paytrackmouth": 0,
        //       "paytrackprice": 0,
        //       "timefree": 0
        //       },
        //       "preview": {
        //       "trybegin": 0,
        //       "tryend": 0,
        //       "trysize": 0
        //       },
        //       "rate": 0,
        //       "singer": [
        //       {
        //       "id": 5755,
        //       "mid": "000b2yw41NtZvd",
        //       "name": "My Little Airport"
        //       }
        //       ],
        //       "size128": 2554804,
        //       "size320": 6386654,
        //       "size5_1": 0,
        //       "sizeape": 0,
        //       "sizeflac": 0,
        //       "sizeogg": 3685208,
        //       "songid": 944841,
        //       "songmid": "004LzFZt2isMNH",
        //       "songname": "九龙公园游泳池",
        //       "songorig": "九龙公园游泳池",
        //       "songtype": 0,
        //       "strMediaMid": "001a7b1o3HuP8x",
        //       "stream": 4,
        //       "switch": 79671,
        //       "type": 0,
        //       "vid": "o00175nx1zo"
        //       },
        //       {
        //       "albumdesc": "",
        //       "albumid": 1476330,
        //       "albummid": "000AO6FP2oSrUp",
        //       "albumname": "J-POP",
        //       "alertid": 100002,
        //       "belongCD": 2,
        //       "cdIdx": 0,
        //       "interval": 202,
        //       "isonly": 1,
        //       "label": "4611686018427387906",
        //       "msgid": 14,
        //       "pay": {
        //       "payalbum": 0,
        //       "payalbumprice": 0,
        //       "paydownload": 1,
        //       "payinfo": 1,
        //       "payplay": 0,
        //       "paytrackmouth": 1,
        //       "paytrackprice": 200,
        //       "timefree": 0
        //       },
        //       "preview": {
        //       "trybegin": 73505,
        //       "tryend": 96655,
        //       "trysize": 371564
        //       },
        //       "rate": 0,
        //       "singer": [
        //       {
        //       "id": 118,
        //       "mid": "001uXFgt1kpLyI",
        //       "name": "容祖儿"
        //       },
        //       {
        //       "id": 4657,
        //       "mid": "003nUb253igrU0",
        //       "name": "林海峰"
        //       }
        //       ],
        //       "size128": 3233554,
        //       "size320": 8083552,
        //       "size5_1": 0,
        //       "sizeape": 23862359,
        //       "sizeflac": 23904267,
        //       "sizeogg": 4681720,
        //       "songid": 107325233,
        //       "songmid": "0018uRPm2cNmna",
        //       "songname": "黄昏点唱机",
        //       "songorig": "黄昏点唱机",
        //       "songtype": 0,
        //       "strMediaMid": "0018uRPm2cNmna",
        //       "stream": 10,
        //       "switch": 636675,
        //       "type": 0,
        //       "vid": "x00183as32d"
        //       }
        //     ])
        //     console.log(this.songs)
        //   }
        // })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (isValidMusic(musicData)) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>