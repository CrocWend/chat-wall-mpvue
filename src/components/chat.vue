
<template>
  <scroll-view scroll-y="true" lower-threshold="400" scroll-with-animation="true" :scroll-top="scrollTop" class="chatContainer">
    <li v-for="(item, index) in chat" :key="index" :id="'id'+index">
      <chatItem :item="item" :index="index"></chatItem>
    </li>
  </scroll-view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
  import chatItem from './chatItem'
  // import { URLS, HTTP } from '@/common'

  export default {
    // 模板初始绑定数据
    data() {
      return {
        scrollTop: 0,
        toView: ''
      }
    },
    computed: {
      ...mapState(["chat"])
    },
    // 监听，消息
    watch: {
      // ...mapMutations(["update"]),
      chat () {
        const _this = this
        _this.pageScrollToBottom()
      }
    },
    // 声明页面中将要使用到的组件
    components: {
      chatItem,
    },
    // 事件处理
    methods: {
      // 获取容器内每个 Item 高度，后设置 scroll-top 使页面滚动到容器底部
      pageScrollToBottom () {
        const _this = this
        wx.createSelectorQuery().selectAll('.chatItemContent').boundingClientRect(function(rects) {
          rects.forEach(function(rect) {
            _this.scrollTop += rect.height
          })
        }).exec()
      },
      // 请求数据
      request (options) {
        let _this = this
        let url = URLS.chats

        // HTTP.get(url).then((data) => {
        //   let chatArr = []
        //   // 处理数据
        //   for (let item in data) {
        //     data[item].id = item
        //     chatArr.push(data[item])
        //   }
        //   _this.chat = chatArr
        //   _this.$apply()
        // })
      }
    },
    
    mounted() {
      // let _this = this
      // _this.request()
      // console.log(URLS)
      console.log('23232233')
      console.log(this.chat)
    }
  }
</script>

<style lang="scss">
  .chatContainer {
    box-sizing: border-box;
    padding-bottom: 150rpx;
    width: 100%;
    height: 100%;
  }
</style>