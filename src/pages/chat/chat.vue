<template>
  <div class="container-chat">
    <scroll-view class="scroll-view" :style="{'height':pageHeight+'px'}" scroll-y="true" scroll-top="scrollTopVal" bindtap="resetInputStatus">
      <!-- <div v-for="item in chatItems" :key="index"> -->
      <chat-item v-for="(item, index) in chatItems" :item="item" :length="chatItems.length" :index="index" :key="index"></chat-item>
      <!-- </div> -->
    </scroll-view>
  </div>
</template>
<script>
import vue from 'vue'
import { mapState, mapActions } from "vuex";
import Toast from '@/../static/vant/toast/toast'
import config from '../../config/config';
import { inputPlaceHolder } from '../../config/constant'
import tools from '../../utils/tools'
import weRequest from '../../utils/request';
import IMOperator from "./im-operator";
import UI from "./ui";
import MsgManager from "./msg-manager";
const app = getApp();
import * as chatInput from "@/components/chat-input/chat-input";

import ChatItem from '@/components/chat-page/chat-item'
export default {
  mpType: 'page',
  data() {
    return {
      textMessage: '',
      chatItems: [],
      latestPlayVoicePath: '',
      isAndroid: true,
      chatStatue: 'open',
      pageHeight: 0,
      inputPlaceHolder: inputPlaceHolder[tools.getRandomNum(1, inputPlaceHolder.length - 1)],
    }
  },
  components: {
    ChatItem
  },
  computed: {
    ...mapState(["appInfo", "appIMDelegate"])
  },
  onLoad(options) {
    console.log('app')
    console.log(app)
    console.log('this')
    console.log(this)
    console.log(this.appIMDelegate)
    console.log(options)
    options.appInfo = this.appInfo;
    this.appIMDelegate.onShow(options);

    this.initData();
    this.imOperator = new IMOperator(this, {
      timeStr: "",
      timestamp: null,
      type: "text",
      appIMDelegate: this.appIMDelegate,
    });
    this.UI = new UI(this);
    this.msgManager = new MsgManager(this);

    this.imOperator.onSimulateReceiveMsg((msg) => {
      console.warn('msg')
      console.warn(msg)
      console.log(this.msgManager)
      this.msgManager.showMsg({ msg })
    });


    this.UI.updateChatStatus('正在聊天中...');
  },
  methods: {
    initData() {
      let self = this;
      let systemInfo = wx.getSystemInfoSync();
      console.log('init--data')
      console.log(this)
      chatInput.init(this, {
        systemInfo: systemInfo,
        minVoiceTime: 1,
        maxVoiceTime: 60,
        startTimeDown: 56,
        format: 'mp3', //aac/mp3
        sendButtonBgColor: 'mediumseagreen',
        sendButtonTextColor: 'white',
        extraArr: [{
          picName: 'choose_picture',
          description: '照片'
        }, {
          picName: 'take_photos',
          description: '拍摄'
        }, {
          picName: 'close_chat',
          description: '自定义功能'
        }],
        // tabbarHeigth: 48
      });
      self.pageHeight = systemInfo.windowHeight
      console.log(self.pageHeight)
      self.isAndroid = systemInfo.system.indexOf("Android") !== -1
      self.textButton();
      self.extraButton();
      self.voiceButton();
    },
    textButton() {
      chatInput.setTextMessageListener((e) => {
        let content = e.detail.value;
        this.msgManager.sendMsg({ type: IMOperator.TextType, content });
      });
    },
    voiceButton() {
      chatInput.recordVoiceListener((res, duration) => {
        let tempFilePath = res.tempFilePath;
        this.msgManager.sendMsg({ type: IMOperator.VoiceType, content: tempFilePath, duration });
      });
      chatInput.setVoiceRecordStatusListener((status) => {
        this.msgManager.stopAllVoice();
      })
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
      chatInput.clickExtraListener((e) => {
        let chooseIndex = parseInt(e.currentTarget.dataset.index);
        if (chooseIndex === 2) {
          self.myFun();
          return;
        }
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['compressed'],
          sourceType: chooseIndex === 0 ? ['album'] : ['camera'],
          success: (res) => {
            this.msgManager.sendMsg({ type: IMOperator.ImageType, content: res.tempFilePaths[0] })
          }
        });

      });
    },
    /**
     * 自定义事件
     */
    myFun() {
      wx.showModal({
        title: '小贴士',
        content: '演示更新会话状态',
        confirmText: '确认',
        showCancel: true,
        success: (res) => {
          if (res.confirm) {
            this.msgManager.sendMsg({ type: IMOperator.CustomType })
          }
        }
      })
    },

    resetInputStatus() {
      chatInput.closeExtraView();
    },

    sendMsg({ content, itemIndex, success }) {
      // 发送消息后修改placeholder
      this.setData({
        inputPlaceHolder: inputPlaceHolder[tools.getRandomNum(1, inputPlaceHolder.length - 1)],
      })
      console.log(content)
      this.imOperator.onSimulateSendMsg({
        content,
        success: (msg) => {
          console.log(msg)
          this.UI.updateViewWhenSendSuccess(msg, itemIndex);
          success && success(msg);
        },
        fail: () => {
          this.UI.updateViewWhenSendFailed(itemIndex);
        }
      })
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
    },
  }
}

</script>
<style lang="scss" scoped>
.container-chat {
  background-color: #EFEFEF;

  .scroll-view {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 54rpx;
  }
}

</style>
