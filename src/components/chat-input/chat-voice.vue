<template>
  <div class="voice">
    <button v-if="voiceObj.canUsePress"
            @longpress="longClickVoiceBtn($event)"
            @touchmove.stop="sendVoiceMoveEvent($event)"
            @touchend.stop="sendVoiceMoveEndEvent($event)"
            id="send$voice$btn"
            hover-class="btn-voice-press">{{voiceObj.startStatus?'松开 结束':'按住 说话'}}
    </button>
    <!-- this.$parent.$parent.long$click$voice$btn($event) -->
    <button v-else
            @longpress="longClickVoiceBtn($event)"
            @touchmove.stop="sendVoiceMoveEvent($event)"
            @touchend.stop="sendVoiceMoveEndEvent($event)"
            id="send$voice$btn"
            hover-class="btn-voice-press">{{voiceObj.startStatus?'松开 结束':'按住 说话'}}
    </button>
    
    <div v-if="voiceObj.showCancelSendVoicePart"
         class="send-voice-part"
         :style="{'width': voiceObj.voicePartWidth+'px','height': voiceObj.voicePartWidth +'px','left': voiceObj.voicePartPositionToLeft +'px','bottom': voiceObj.voicePartPositionToBottom +'px'}">
      <div class="bg"
           :style="{'opacity':voiceObj.status==='timeDown'?0.6:0}"></div>
      <image class="voiceIcon"
             :src="'/static/image/chat/voice/'+(voiceObj.status==='start'?(voiceObj.moveToCancel?'recall':'speak'):'attention')+'.png'"
             v-if="voiceObj.status!=='timeDown'" />
      <span class="timeDownNum"
            v-if="voiceObj.status==='timeDown'">{{voiceObj.timeDownNum}}</span>
      <div class="voice-record-git-status-style"
           v-if="!voiceObj.moveToCancel&&voiceObj.status!=='short'">
        <image src="data:image/gif;base64,R0lGODlhOgAKAKIFAERERIWFhWVlZdbW1qampv///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFFAAFACwAAAAAOgAKAAADazi6XEUwSheqvU7ozR34YMiMgyOdBHWtGed6YUw2Dxqpq9W6GxyDs4XJBsHlAjuewPcDBBVDojGX5DF/z1JNWjjqCspeoQl8Rm1TFji8HJOd5i2660Wuw1dZnFike6svbmRZZyhpGHdKeSEJACH5BAUUAAUALAAAAAA6AAoAAANrCLpcNTBKR6q9LujNnfhgyIyAI50Dda0Z53phTDYPGqmr1bobHIOzhckGweUIO17A9xMEFUOiMZfkMX/PUk1aOOoKyl6hCXxGbVMWOLwck53mLbrrRa7DV1mcWKR7qy9uZFlnKGkYd0p5IQkAIfkEBRQABQAsAAAAADoACgAAA2soulwFMEo3qr2O6M1d+GDIjIIjnQB1rRnnemFMNg8aqavVuhscg7OFyQbB5QY7HsH3CwQVQ6Ixl+Qxf89STVo46grKXqEJfEZtUxY4vByTneYtuutFrsNXWZxYpHurL25kWWcoaRh3SnkhCQAh+QQFFAAFACwAAAAAOgAKAAADaxi6XCUwSgeqvW7ozR35YMiMgSOdAnWtGed6YUw2Dxqpq9W6GxyDs4XJBsHlADvewPcjBBVDojGX5DF/z1JNWjjqCspeoQl8Rm1TFji8HJOd5i2660Wuw1dZnFike6svbmRZZyhpGHdKeSEJACH5BAUUAAUALAAAAAA6AAoAAANrSLpcFTBKJ6q9DujN3fhgyIyEI50Bda0Z53phTDYPGqmr1bobHIOzhckGweUEOx7A9xsEFUOiMZfkMX/PUk1aOOoKyl6hCXxGbVMWOLwck53mLbrrRa7DV1mcWKR7qy9uZFlnKGkYd0p5IQkAOw=="
               class="voice-record-git-size-style" />
      </div>
      <span class="voice-status-style"
            :style="{'background-color': voiceObj.moveToCancel?'#ab1900':'transparent'}">{{voiceObj.status==='start'||voiceObj.status==='timeDown'?(voiceObj.moveToCancel?'松开手指，取消发送':'手指上滑，取消发送'):(voiceObj.status==='short'?'说话时间太短':'说话时间超时')}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    voiceObj: Object,
  },
  computed: {},
  methods: {
    longClickVoiceBtn(e) {
      this.$parent.$parent.long$click$voice$btn(e)
    },
    sendVoiceMoveEvent(e) {
      this.$parent.$parent.send$voice$move$event(e)
    },
    sendVoiceMoveEndEvent(e) {
      this.$parent.$parent.send$voice$move$end$event(e)
    }
  }
};
</script>
<style lang="scss" scoped>
.voice {
  width: 100%;

  .send-voice-part {
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    border-radius: 20rpx;

    .bg {
      background-color: black;
      width: 100%;
      height: 100%;
      border-radius: 20rpx;
      position: absolute;
    }

    .voiceIcon {
      width: 100%;
      height: 100%;
      border-radius: 20rpx;
    }

    .timeDownNum {
      margin-bottom: 30rpx;
      font-size: 150rpx;
      text-align: center;
      color: white;
      position: relative;
    }
  }
}

.btn-voice-press {
  background-color: gainsboro;
}

button {
  font-size: 32rpx;
  width: 100%;
  line-height: 74rpx;
  margin-top: 15rpx;
  margin-bottom: 15rpx;
}

.voice-status-style {
  position: absolute;
  left: 0;
  bottom: 22rpx;
  width: 80%;
  text-align: center;
  font-size: 24rpx;
  color: white;
  padding-top: 5rpx;
  padding-bottom: 5rpx;
  margin-left: 10%;
  border-radius: 10rpx;
}

.voice-record-git-status-style {
  position: absolute;
  left: 0;
  bottom: 75rpx;
  width: 100%;
  display: flex;
  justify-content: center;
}

.voice-record-git-size-style {
  width: 58rpx;
  height: 10rpx;
}
</style>
