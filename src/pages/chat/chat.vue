<template>
  <div class="container-chat">
    <chat-status :chatStatue="chatStatue"
                 :chatStatusContent="chatStatusContent"></chat-status>
    <scroll-view class="scroll-view"
                 :style="{'height':pageHeight+'px'}"
                 scroll-y="true"
                 scroll-top="scrollTopVal"
                 @click="resetInputStatus">
      <!-- <div v-for="item in chatItems" :key="index"> -->
      <chat-item v-for="(item, index) in chatItems"
                 :item="item"
                 :length="chatItems.length"
                 :index="index"
                 :key="index"></chat-item>
      <!-- </div> -->
    </scroll-view>
    <chat-input :inputPlaceHolder="inputPlaceHolder"
                :inputObj="inputObj"
                :textMessage="textMessage"
                :showVoicePart="true"></chat-input>
  </div>
</template>
<script>
import vue from "vue";
import { mapState, mapActions } from "vuex";
import Toast from "@/../static/vant/toast/toast";
import config from "../../config/config";
import tools from "../../utils/tools";
import weRequest from "../../utils/request";
import IMOperator from "./im-operator";
import UI from "./ui";
import MsgManager from "./msg-manager";
import { inputPlaceHolder } from "@/config/constant";
import * as chatInputTools from "@/components/chat-input/chat-input-tools";

import ChatStatus from "@/components/chat-page/chat-status";
import ChatItem from "@/components/chat-page/chat-item";
import ChatInput from "@/components/chat-input/chat-input";
export default {
  mpType: "page",
  data() {
    return {
      textMessage: "",
      chatItems: [],
      latestPlayVoicePath: "",
      isAndroid: true,
      chatStatue: "open",
      pageHeight: 0,
      inputObj: {},
      inputPlaceHolder:
        inputPlaceHolder[tools.getRandomNum(1, inputPlaceHolder.length - 1)]
    };
  },
  components: {
    ChatItem,
    ChatStatus,
    ChatInput
  },
  computed: {
    ...mapState(["appInfo", "appIMDelegate"])
  },
  onLoad(options) {
    options.appInfo = this.appInfo;
    this.appIMDelegate.onShow(options);

    this.initData();
    this.imOperator = new IMOperator(this, {
      timeStr: "",
      timestamp: null,
      type: "text",
      appIMDelegate: this.appIMDelegate
    });
    this.UI = new UI(this);
    this.msgManager = new MsgManager(this);

    this.imOperator.onSimulateReceiveMsg(msg => {
      this.msgManager.showMsg({ msg });
    });

    this.UI.updateChatStatus("正在聊天中...");
    console.log("chat -this");
    console.log(this);
  },
  methods: {
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

      this.pageHeight = systemInfo.windowHeight;
      this.isAndroid = systemInfo.system.indexOf("Android") !== -1;

      self.textButton();
      self.extraButton();
      self.voiceButton();
    },
    textButton() {
      chatInputTools.setTextMessageListener(e => {
        let content = e.mp.detail.value;
        this.msgManager.sendMsg({ type: IMOperator.TextType, content });
      });
    },
    voiceButton() {
      chatInputTools.recordVoiceListener((res, duration) => {
        let tempFilePath = res.tempFilePath;
        this.msgManager.sendMsg({
          type: IMOperator.VoiceType,
          content: tempFilePath,
          duration
        });
      });
      chatInputTools.setVoiceRecordStatusListener(status => {
        this.msgManager.stopAllVoice();
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
            this.msgManager.sendMsg({
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
            this.msgManager.sendMsg({ type: IMOperator.CustomType });
          }
        }
      });
    },
    resetInputStatus() {
      chatInputTools.closeExtraView();
    },
    sendMsg({ content, itemIndex, success }) {
      // 发送消息后修改placeholder
      content &&
        content.type !== "voice" &&
        (this.inputPlaceHolder =
          inputPlaceHolder[tools.getRandomNum(1, inputPlaceHolder.length - 1)]),
        this.imOperator.onSimulateSendMsg({
          content,
          success: msg => {
            this.UI.updateViewWhenSendSuccess(msg, itemIndex);
            success && success(msg);
          },
          fail: () => {
            this.UI.updateViewWhenSendFailed(itemIndex);
          }
        });
    },
    /**
     * 重发消息
     * @param e
     */
    resendMsgEvent(e) {
      const itemIndex = parseInt(e.currentTarget.dataset.resendIndex);
      const item = this.data.chatItems[itemIndex];
      this.UI.updateDataWhenStartSending(item, false, false);
      this.msgManager.resend({ ...item, itemIndex });
    }
  }
};
</script>
<style lang="scss" scoped>
.container-chat {
  background-color: #efefef;

  .scroll-view {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 54rpx;
  }
}
</style>
