<template>
  <div class="container-chat">
    <chat-status :chatStatue="chatStatue"
                 :chatStatusContent="chatStatusContent"></chat-status>
    <scroll-view class="scroll-view"
                 :style="{'height':pageHeight+'px'}"
                 scroll-y="true"
                 scroll-top="scrollTopVal"
                 bindtap="resetInputStatus">
      <!-- <div v-for="item in chatItems" :key="index"> -->
      <chat-item v-for="(item, index) in chatItems"
                 :item="item"
                 :length="chatItems.length"
                 :index="index"
                 :key="index"></chat-item>
      <!-- </div> -->
    </scroll-view>
    <chat-input @sendMsg="sendMsgSuper"
                @stopAllVoice="stopAllVoiceSuper"
                @onSimulateSendMsg="onSimulateSendMsgSuper"></chat-input>
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
const app = getApp();
// import * as chatInput from "@/components/chat-input/chat-input";

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
      pageHeight: 0
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

    let systemInfo = wx.getSystemInfoSync();
    this.pageHeight = systemInfo.windowHeight;
    this.isAndroid = systemInfo.system.indexOf("Android") !== -1;

    // this.initData();
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
  },
  methods: {
    sendMsgSuper(options) {
      this.msgManager.sendMsg(options);
    },
    stopAllVoiceSuper() {
      this.msgManager.stopAllVoice();
    },
    onSimulateSendMsgSuper(options) {
      this.imOperator.onSimulateSendMsg(options);
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
