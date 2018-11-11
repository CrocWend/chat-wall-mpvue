<template>
  <!-- 签到 -->
  <div class="container-home">

    <img class="bcg"
         v-if="bcgImg"
         :src="bcgImg"
         mode='aspectFill' />
    <!-- 签到模块 已签到不显示 -->
    <div class="">留言会随机展示在大屏幕上哦</div>
    <van-cell-group>
      <div v-if="signWithPhoneNo">
        <van-transition name="fade-up"
                        show="signWithPhoneNo"
                        custom-class="block">
          <van-field :value="signPhone"
                     required
                     clearable
                     label="手机号"
                     type="number"
                     icon="question"
                     maxlength="11"
                     title-width="70px"
                     placeholder="请输入手机号"
                     @clickIcon="onClickIcon"
                     @input="bindPhoneInput" />
        </van-transition>
      </div>
      <van-field :value="signMessage"
                 required
                 label="留言"
                 type="text"
                 title-width="70px"
                 placeholder="说点什么吧。。。"
                 border="false"
                 @input="bindContentInput" />
    </van-cell-group>
    <!-- 输入手机号模式 不再调用授权 -->
    <div v-if="signWithPhoneNo">
      <van-button class="button"
                  custom-class="button"
                  size="large"
                  type="primary"
                  @click="sign()">手机号签到</van-button>
    </div>
    <!-- 授权获取手机号 没留言 不可点击 -->
    <div v-else-if="!signMessage">
      <van-button disabled="true"
                  class="button"
                  custom-class="button"
                  size="large"
                  :backgroundColor="barBgColor"
                  type="primary">签到</van-button>
    </div>
    <div v-else>
      <van-button class="button"
                  custom-class="button"
                  size="large"
                  type="primary"
                  :backgroundColor="barBgColor"
                  open-type="getPhoneNumber"
                  @getphonenumber="getPhoneNumber">签到</van-button>
    </div>

    <van-toast id="van-toast" />
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

import Toast from "@/../static/vant/toast/toast";
import config from "@/config/config";
import { msgPlaceholder } from "@/config/constant";
import tools from "@/utils/tools";
import AppIMDelegate from "@/delegate/app-im-delegate";

export default {
  mpType: "page",
  data() {
    return {
      signWithPhoneNo: false, // 默认不输入手机号
      signPhone: "", // 输入的签到手机号
      signMessage: "", // 留言
      isSign: false, // 是否签到
      // 留言占位信息
      msgPlaceholder:
        msgPlaceholder[tools.getRandomNum(1, msgPlaceholder.length - 1)]
    };
  },
  computed: {
    ...mapState(["appInfo", "appIMDelegate", "barBgColor", "bcgImg"])
  },
  onLoad() {
    console.warn('this.appInfo')
    console.warn(this.appInfo)
    wx.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: this.barBgColor
    });
    

    // 进入页面从本地获取appInfo
    wx.getStorage({
      key: "appInfo",
      success: res => {
        // 已签到 更新到store
        if (res.data.isSign) {
          wx.reLaunch({
            url: "../chat/main"
          });
          this.update({ appInfo: res.data });
          this.isSign = true;
        }
      },
      fail: res => {
        // 未签到跳转到登录页
        wx.reLaunch({
          url: "../login/main"
        });
      }
    });
  },
  methods: {
    ...mapActions(["update", "getEncryptData"]),
    onClickIcon() {
      Toast("输入的手机号和员工信息保持一致");
    },
    bindPhoneInput: function(e) {
      this.signPhone = e.mp.detail;
    },
    bindContentInput: function(e) {
      this.signMessage = e.mp.detail;
    },
    /**
     * 获取用户手机号
     * 成功后 调用签到
     */
    getPhoneNumber(e) {
      var self = this;
      // 获取手机号出错 用户输入
      console.log(e);
      if (!e.mp.detail.encryptedData) {
        Toast("请先授权获取手机号");
        return;
      }

      // 调用解密接口 拿到手机号签到
      this.getEncryptData(e.mp.detail).then(res => {
        this.sign(res.phoneNumber);
      });
    },

    /**
     * 优先使用验证手机号签到
     * 签到失败 使用用户输入手机号
     */
    sign(phone) {
      let self = this;
      let signPhone = self.signPhone;
      let signMessage = self.signMessage;
      let appInfo = self.appInfo;
      console.log(appInfo)
      // 手动输入模式
      if (self.signWithPhoneNo) {
        phone = signPhone;
      }

      if (phone.length !== 11) {
        Toast("手机号错误");
        return;
      }
      if (!signMessage) {
        Toast("留言啊啊啊");
        return;
      }
      wx.request({
        url: config.apiUrl + "/sign",
        data: {
          phone: phone, // 签到手机号
          signMessage: encodeURIComponent(signMessage), // 留言内容
          nickName: encodeURIComponent(appInfo.nickName),
          gender: appInfo.gender,
          avatarUrl: appInfo.avatarUrl,
          openId: appInfo.openId
        },
        method: "POST",
        header: {
          "content-type": "application/json" // 默认值
        },
        success(res) {
          let data = res.data;
          if (data.result) {
            Toast.success("签到成功啦");
            self.isSign = true;

            // 设置全局属性
            let signObj = {
              phone,
              userId: data.items[0].employeeid,
              isSign: true
            };
            console.error(appInfo)
            let newAppInfo = Object.assign(appInfo, signObj);
            console.error('newAppInfo')
            console.error(newAppInfo)
            self.update({ appInfo: newAppInfo });
            // 设置本地存储
            try {
              wx.setStorageSync("appInfo", newAppInfo);
            } catch (e) {}
            wx.redirectTo({
              url: "../chat/main"
            });
          } else {
            // 签到失败 可能是手机号不匹配 用户自己输入
            self.signWithPhoneNo = true;
            Toast("签到失败啦 请手动输入手机号");
            return;
          }
        }
      });
    }
  }
};
</script>
<style lang="scss">
page {
  height: 100%;
  -webkit-font-smoothing: antialiased;
  font-family: "PingHei", "Helvetica Neue", "Helvetica", "Arial", "Verdana",
    "sans-serif";
}
// 签到样式
.container-home {
  padding: 50rpx 30rpx 0;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;

  .bcg {
    position: fixed;
    // z-index: 2;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    /* background: #40a7e7; */
    /* background: linear-gradient(to bottom, #73C6F1, #50B5EC); */
  }

  .button {
    margin: 30rpx 0;
    border: 0;
  }
}
</style>
