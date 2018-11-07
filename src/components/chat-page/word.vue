<template>
  <div class="chat-word"
       :style="{'flex-direction': item.isMy?'row-reverse':'row'}">
    <!-- 头像 -->
    <img class="head-url"
         :src="item.headUrl" />
    <div class="message"
         :style="{'align-items': item.isMy?'flex-end':'flex-start'}">
      <span class="nick-name">{{item.nickName}}</span>
      <!-- 消息的箭头icon -->
      <!-- <img v-if="item.type==='text'||item.type==='voice'"
          class="chat-list-arrow-style"
          :src="chatListArrowPic" /> -->
      <!-- 发送的文本 -->
      <div v-if="item.type==='text'"
           :class="item.isMy ? 'isMyWordStyle': 'isOtherWordStyle'"
           @click="chatTextItemClickEvent"
           data-index="item.index">{{item.content}}</div>
      <!-- 发送的图片 -->
      <img v-if="item.type==='image'"
           class="chat-list-pic-style"
           mode="aspectFill"
           :src="item.content"
           @click="imageClickEvent($event)"
           :data-url="item.largePic" />
      <!-- 语音 -->
      <block v-if="item.type==='voice'">
        <div :style="{'width': (item.voiceDuration-1)*0.6+10 +'%',
        'display': 'flex',
        'justify-content': item.isMy?'flex-end':'flex-start',
        'margin-bottom':(item.index===item.length-1?'150rpx':'20rpx')}"
             :class="item.isMy ? 'isMyWordStyle': 'isOtherWordStyle'"
             @click="chatVoiceItemClickEvent($event)"
             :data-voice-path="item.content"
             :data-voice-duration="item.voiceDuration"
             :data-is-my="item.isMy"
             :data-index="index">
          <voice-item :isMy="item.isMy"
                      :isPlaying="item.isPlaying"></voice-item>
        </div>
        <div class="voice-duration-style">{{item.voiceDuration}}</div>
      </block>

      <!-- 发送状态 -->
      <block v-if="isMy">
        <send-status></send-status>
      </block>
    </div>
  </div>
</template>
<script>
import VoiceItem from "./voice-item";
import SendStatus from "./send-status";
export default {
  props: {
    item: Object,
    length: Number,
    index: Number
  },
  components: {
    VoiceItem,
    SendStatus
  },
  computed: {
    chatListArrowPic() {
      return `/static/image/chat/popu_${this.isMy ? "blue" : "white"}.png`;
    }
  },
  methods: {
    chatVoiceItemClickEvent(e) {
      this.$parent.$parent.chatVoiceItemClickEvent(e);
    },
    imageClickEvent(e) {
      console.log(this.item);
      this.$parent.$parent.imageClickEvent(e);
    }
  }
};
</script>
<style lang="scss" scoped>
.chat-word {
  width: 100%;
  display: flex;
  margin-top: 20rpx;
  margin-bottom: 20rpx;

  .head-url {
    width: 80rpx;
    height: 80rpx;
    border-radius: 10%;
    margin-left: 15rpx;
    margin-right: 15rpx;
    display: flex;
    flex-shrink: 0;
  }
  .message {
    display: flex;
    flex-direction: column;
    .nick-name {
      font-size: 24rpx;
      color: #ccc;
      margin-bottom: 16rpx;
    }
  }
}

.isMyWordStyle,
.isOtherWordStyle {
  border-radius: 10rpx;
  padding: 20rpx;
  font-size: 30rpx;
  max-width: 80%;
  position: relative;
  &::after {
    content: ' ';
    position: absolute;
    top: 50%;
    right: 0;
    width: 10rpx;
    height: 10rpx;
    background: red;
  }
}

.isMyWordStyle {
  background-color: #8fcbf7;
  color: #213d52;
  // margin-right: -1rpx;
  // margin-left: 14rpx;
  word-wrap: break-word;
}

.isOtherWordStyle {
  background-color: white;
  color: #333333;
  // margin-right: 14rpx;
  // margin-left: -1rpx;
  word-wrap: break-word;
}

.chat-list-pic-style {
  border-radius: 10rpx;
  margin-left: 5rpx;
  width: 180rpx;
  height: 180rpx;
}

.voice-duration-style {
  color: #666666;
  font-size: 26rpx;
  align-self: center;
  margin-top: 3rpx;
  margin-left: 5rpx;
}

.chat-list-arrow-style {
  width: 11rpx;
  height: 20rpx;
  margin-top: 25rpx;
}
</style>
