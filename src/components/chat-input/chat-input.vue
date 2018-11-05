<template>
  <div class="chat-input">
    <div class="input-text-voice-super">
      <img v-if="showVoicePart"
           class="extra-btn-style"
           @click="test"
           :src="keyboardOrVoicePic" />
      <chat-voice v-if="inputStatus==='voice'"
                  :voiceObj="inputObj.voiceObj"
                  :canUsePress="inputObj.canUsePress"
                  @longClickVoiceBtn="long$click$voice$btn"
                  @sendVoiceMoveEvent="send$voice$move$event"
                  @sendVoiceMoveEndEvent="send$voice$move$end$event"></chat-voice>
      <input v-if="inputStatus==='text'"
             class="chat-input-style"
             :style="{'margin-left':showVoicePart?0:'16rpx'}"
             maxlength="500"
             confirm-type="send"
             :value="textMessage"
             confirm-hold
             :placeholder="inputPlaceHolder"
             placeholder-class="input-placeholder-class" />
      <!-- 右侧按钮 -->
      <view @click="chatInputExtraClickEvent">
        <img class="extra-btn-style"
             src="../../../static/image/chat/extra.png" />
      </view>
    </div>
    <!-- 扩展 -->
    <view v-if="showExtraPart"
          class="list-divide-line">235235</view>
    <extra-part @extraButtonClick="chatInputExtraItemClickEvent"
                v-if="showExtraPart"
                :chatInputExtraArr="inputObj.extraObj.chatInputExtraArr"></extra-part>
  </div>
</template>
<script>
import * as chatInputTools from "@/components/chat-input/chat-input-tools";
import { inputPlaceHolder } from "@/config/constant";
import tools from "@/utils/tools";
import IMOperator from "@/pages/chat/im-operator";

import ExtraPart from "@/components/chat-input/extra-part";
import ChatVoice from "@/components/chat-input/chat-voice";

export default {
  data() {
    return {
      textMessage: "",
      chatItems: [],
      showVoicePart: true,
      showExtraPart: false,
      inputStatus: "text",
      inputObj: {},
      inputPlaceHolder:
        inputPlaceHolder[tools.getRandomNum(1, inputPlaceHolder.length - 1)]
    };
  },
  components: {
    ExtraPart,
    ChatVoice
  },
  onLoad() {
    this.initData();
  },
  computed: {
    keyboardOrVoicePic() {
      return `../../../static/image/chat/voice/${
        this.inputObj.inputStatus === "voice" ? "keyboard" : "voice"
      }.png`;
    }
  },
  methods: {
    test() {},
    initData() {
      let self = this;
      let systemInfo = wx.getSystemInfoSync();
      chatInputTools.init(this, {
        systemInfo: systemInfo,
        minVoiceTime: 1,
        maxVoiceTime: 60,
        startTimeDown: 56,
        format: "mp3", //aac/mp3
        sendButtonBgColor: "mediumseagreen",
        sendButtonTextColor: "white",
        extraArr: [
          {
            picName: "choose_picture",
            description: "照片"
          },
          {
            picName: "take_photos",
            description: "拍摄"
          },
          {
            picName: "close_chat",
            description: "自定义功能"
          }
        ]
        // tabbarHeigth: 48
      });

      self.textButton();
      self.extraButton();
      self.voiceButton();
    },
    textButton() {
      chatInputTools.setTextMessageListener(e => {
        let content = e.detail.value;
        this.$emit("sendMsg", { type: IMOperator.TextType, content });
      });
    },
    voiceButton() {
      chatInputTools.recordVoiceListener((res, duration) => {
        let tempFilePath = res.tempFilePath;
        this.$emit("sendMsg", {
          type: IMOperator.VoiceType,
          content: tempFilePath,
          duration
        });
      });
      chatInputTools.setVoiceRecordStatusListener(status => {
        this.$emit("stopAllVoice");
      });
    },

    //模拟上传文件，注意这里的cbOk回调函数传入的参数应该是上传文件成功时返回的文件url，这里因为模拟，我直接用的savedFilePath
    simulateUploadFile({ savedFilePath, duration, itemIndex, success, fail }) {
      setTimeout(() => {
        let urlFromServerWhenUploadSuccess = savedFilePath;
        success && success(urlFromServerWhenUploadSuccess);
      }, 1000);
    },
    extraButton() {
      let self = this;
      chatInputTools.clickExtraListener(e => {
        let chooseIndex = parseInt(e.currentTarget.dataset.index);
        if (chooseIndex === 2) {
          self.myFun();
          return;
        }
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ["compressed"],
          sourceType: chooseIndex === 0 ? ["album"] : ["camera"],
          success: res => {
            this.$emit("sendMsg", {
              type: IMOperator.ImageType,
              content: res.tempFilePaths[0]
            });
          }
        });
      });
      chatInputTools.setExtraButtonClickListener(dismiss => {
        console.log("Extra弹窗是否消失", dismiss);
        this.showExtraPart = dismiss;
      });
    },
    /**
     * 自定义事件
     */
    myFun() {
      wx.showModal({
        title: "小贴士",
        content: "演示更新会话状态",
        confirmText: "确认",
        showCancel: true,
        success: res => {
          if (res.confirm) {
            this.$emit("sendMsg", { type: IMOperator.CustomType });
          }
        }
      });
    },

    resetInputStatus() {
      chatInputTools.closeExtraView();
    },

    sendMsg({ content, itemIndex, success }) {
      // 发送消息后修改placeholder
      (this.inputPlaceHolder =
        inputPlaceHolder[tools.getRandomNum(1, inputPlaceHolder.length - 1)]),
        this.$emit("onSimulateSendMsg", {
          content,
          success: msg => {
            this.UI.updateViewWhenSendSuccess(msg, itemIndex);
            success && success(msg);
          },
          fail: () => {
            this.UI.updateViewWhenSendFailed(itemIndex);
          }
        });
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
