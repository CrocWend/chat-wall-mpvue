<template>
  <div class="chat-input">
    <div class="input-text-voice-super">
      <block v-if="showVoicePart">
        <img class="extra-btn-style"
             @click="this.$parent.changeInputWayEvent"
             :src="keyboardOrVoicePic" />
        <chat-voice v-if="inputObj.inputStatus==='voice'"
                    :voiceObj="inputObj.voiceObj"
                    :canUsePress="inputObj.canUsePress"></chat-voice>
      </block>

      <input v-if="inputObj.inputStatus==='text'"
             class="chat-input-style"
             :style="{'margin-left':showVoicePart?0:'16rpx'}"
             :placeholder="inputPlaceHolder"
             :value="textMessage"
             @confirm="this.$parent.chatInputSendTextMessage"
             @focus="this.$parent.chatInputBindFocusEvent"
             @blur="this.$parent.chatInputBindBlurEvent"
             @input="this.$parent.chatInputGetValueEvent"
             confirm-hold
             maxlength="500"
             confirm-type="send"
             placeholder-class="input-placeholder-class" />
      <!-- 右侧按钮 -->
      <view @click="this.$parent.chatInputExtraClickEvent">
        <img class="extra-btn-style"
             src="/static/image/chat/extra.png" />
      </view>
    </div>
    <!-- 扩展 -->
    <view v-if="inputObj.extraObj.chatInputShowExtra"
          class="list-divide-line">235235</view>
    <extra-part @extraButtonClick="this.$parent.chatInputExtraItemClickEvent"
                v-if="inputObj.extraObj.chatInputShowExtra"
                :chatInputExtraArr="inputObj.extraObj.chatInputExtraArr"></extra-part>
  </div>
</template>
<script>
import * as chatInputTools from "@/components/chat-input/chat-input-tools";

import tools from "@/utils/tools";
import IMOperator from "@/pages/chat/im-operator";

import ExtraPart from "@/components/chat-input/extra-part";
import ChatVoice from "@/components/chat-input/chat-voice";

export default {
  props: {
    inputPlaceHolder: String,
    inputObj: Object,
    textMessage: String,
    showVoicePart: Boolean,
  },
  components: {
    ExtraPart,
    ChatVoice
  },
  onLoad() {},
  computed: {
    keyboardOrVoicePic() {
      return `/static/image/chat/voice/${
        this.inputObj.inputStatus === "voice" ? "keyboard" : "voice"
      }.png`;
    }
  },
  methods: {
    test() {
      console.log(this)
    }
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
  background-color: white;
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
