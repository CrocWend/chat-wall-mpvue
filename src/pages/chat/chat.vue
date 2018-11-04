<template>
  <div class="container-chat">
    <scroll-view style="height:{pageHeight}px;width: 100%;display: flex;flex-direction: column;margin-top: 54rpx;" scroll-y="true" scroll-top="scrollTopVal" bindtap="resetInputStatus">
      <!-- <div v-for="item in chatItems" :key="index"> -->
      <chat-item v-for="(item, index) in chatItems" :item="item" :length="chatItems.length" :index="index" :key="index"></chat-item>
      <!-- </div> -->
    </scroll-view>
  </div>
</template>
<script>
import Toast from '@/../static/vant/toast/toast'
import config from '../../config/config';
import { inputPlaceHolder } from '../../config/constant'
import tools from '../../utils/tools'
import weRequest from '../../utils/request';

import ChatItem from '../../components/chat-page/chat-item'
export default {
  mpType: 'page',
  data() {
    return {
      textMessage: '',
      chatItems: [1, 2],
      latestPlayVoicePath: '',
      isAndroid: true,
      chatStatue: 'open',
      inputPlaceHolder: inputPlaceHolder[tools.getRandomNum(1, inputPlaceHolder.length - 1)],
    }
  },
  components: {
    ChatItem

  },
  onLoad() {
    console.log(this.chatItems)
  }
}

</script>
<style lang="scss" scoped>
.container-chat {
  background-color: #EFEFEF;
}

</style>
