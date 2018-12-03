<template>
  <div class="chat-input">
    <div class="input-text-voice-super">
      <!-- <block v-if="showVoicePart === 'true'">
        <img class="extra-btn-style"
             @click="this.$parent.changeInputWayEvent"
             :src="keyboardOrVoicePic" />
        <chat-voice v-if="inputObj.inputStatus==='voice'"
                    :voiceObj="inputObj.voiceObj"
                    :canUsePress="inputObj.canUsePress"></chat-voice>
      </block> -->

      <input v-if="inputObj.inputStatus==='text'"
             class="chat-input-style"
             :style="{'margin-left':inputObj.showVoicePart==='true'?0:'16rpx'}"
             :placeholder="inputPlaceHolder"
             v-model="inputObj.textMessage"
             @confirm="chatInputSendTextMessage"
             @focus="chatInputBindFocusEvent"
             @blur="chatInputBindBlurEvent"
             
             confirm-hold
             maxlength="500"
             confirm-type="send"
             placeholder-class="input-placeholder-class" />
      <!-- 右侧按钮 -->
      <div hover-class="press-style-opacity">
        <div v-if="inputObj.inputType==='text'"
             class="chat-input-send-button-style"
             :style="{'background-color': barBgColor, 'color': '#fff'}"
             @click="chatInputSendTextMessage">发送</div>
        <img v-else
             class="extra-btn-style"
             @click.stop="chatInputExtraClickEvent"
             src="/static/image/chat/extra.png" />
      </div>
    </div>
    <!-- 扩展 -->
    <block v-if="inputObj.chatInputShowExtra">
      <view class="list-divide-line"></view>
      <extra-part @extraButtonClick="chatInputExtraItemClickEvent"></extra-part>
    </block>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import tools from "@/utils/tools";
import IMOperator from "@/pages/chat/im-operator";

import ExtraPart from "@/components/chat-input/extra-part";
import ChatVoice from "@/components/chat-input/chat-voice";

export default {
  props: {
    inputPlaceHolder: String,
  },
  onLoad() {
    console.log("chat-input")
    console.log(this.inputObj)
  },
  components: {
    ExtraPart,
    ChatVoice
  },
  computed: {
    ...mapState(["barBgColor", "inputObj"]),
    keyboardOrVoicePic() {
      return `/static/image/chat/voice/${
        this.inputObj.inputStatus === "voice" ? "keyboard" : "voice"
      }.png`;
    }
  },
  methods: {
    ...mapActions(["updateInputObj"]),
    chatInputSendTextMessage() {
      console.log("chatInputSendTextMessage");
      console.warn(this)
      this.$emit("sendMsgSuper",{ type: IMOperator.TextType, content: this.inputObj.textMessage});
    },
    // 聚焦
    chatInputBindFocusEvent() {
      console.log("chatInputBindFocusEvent");
      this.updateInputObj({"inputType": "text"})

    },
    // 失去焦点
    chatInputBindBlurEvent() {
      console.log("chatInputBindBlurEvent");
      console.log(this.inputObj)
      if(this.inputObj.textMessage) {
        this.updateInputObj({
          "chatInputShowExtra": false,
          "textMessage": this.inputObj.textMessage
        })
      }else {
        this.updateInputObj({"inputType": "none"})
      }
    },
    chatInputExtraClickEvent() {
      this.updateInputObj({"chatInputShowExtra": !this.inputObj.chatInputShowExtra})
    },
  }
};
</script>
<style lang="scss" scoped>
.chat-input {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  bottom: 0;
}

input {
  padding-top: 10rpx;
  padding-bottom: 10rpx;
  width: 100%;
}

.extra-btn-style {
  width: 50rpx;
  height: 50rpx;
  padding: 25rpx 15rpx;
  display: flex;
  flex-shrink: 0;
}

.input-text-voice-super {
  display: flex;
  flex-direction: row;
  background-color: rgba(0, 0, 0, 0.54);
  width: 100%;
  align-items: center;
  height: 100rpx;
}

.list-divide-line {
  width: 100%;
  height: 1rpx;
  background-color: #dddddd;
}

.chat-input-style {
  border-radius: 10rpx;
  border: 1rpx solid gainsboro;
  margin-top: 14rpx;
  margin-bottom: 13rpx;
  padding: 10rpx;
  min-height: 51rpx;
  background-color: #efefef;
  font-size: 28rpx;
}

.input-placeholder-class {
  font-size: 28rpx;
}

.chat-input-send-button-style {
  width: 100rpx;
  padding: 15rpx 0;
  font-size: 28rpx;
  text-align: center;
  margin: 0 10rpx;
  border-radius: 10rpx;
}
</style>
