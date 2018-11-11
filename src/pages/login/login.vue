<template>
  <div class="container-login">
    <div class="top-banner">
      <img mode="aspectFill"
           src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1609547639,3777634857&fm=26&gp=0.jpg" />
    </div>

    <div class="sign-warn">* 我们需要获得您的授权，以关联您的个人账号</div>
    <div class="sign-buttons">
      <van-button type="default"
                  class="two-button"
                  @click="onRefuse"
                  block>容朕想想</van-button>
      <van-button type="primary"
                  class="two-button"
                  block
                  open-type="getUserInfo"
                  @getuserinfo="bindGetUserInfo">接受</van-button>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Toast from "@/../static/vant/toast/toast";
import tools from "@/utils/tools";
import weRequest from "@/utils/request";

export default {
  mpType: "page",
  data() {
    return {};
  },
  onLoad() {
    wx.getStorage({
      key: "session_key",
      success: res => {},
      fail: () => {
        // 登录 获取session
        weRequest.login();
      }
    });
    // 设置bar颜色
    wx.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: this.barBgColor
    });
  },
  computed: {
    ...mapState(["appInfo", "barBgColor"])
  },
  methods: {
    ...mapActions(["update", "getEncryptData", "getUserList"]),
    onRefuse() {
      Toast("需要授权才能继续使用服务");
    },
    saveStorage(key, value, success) {
      console.log(key)
      this.update({ [key]: value });
      wx.setStorage({
        key: key,
        data: value,
        success: () => {
          success && success();
        }
      });
    },
    isSign(appInfo) {
      this.getUserList(appInfo.openId).then(res => {
        // 已经签到
        if (!!res.items.length) {
          appInfo.isSign = true;

          this.saveStorage("appInfo", appInfo, () => {
            wx.navigateTo({
              url: "../chat/main"
            });
          });
        } else {
          this.saveStorage("appInfo", appInfo, () => {
            wx.reLaunch({
              url: "../home/main"
            });
          });
        }
      });
    },
    bindGetUserInfo(e) {
      let detail = e.mp.detail;
      let appInfo = detail.userInfo;

      // 获取加密数据
      this.getEncryptData(detail).then(res => {
        appInfo.openId = res.openId;

        this.isSign(appInfo);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container-login {
  padding: 50rpx 30rpx 0;
  .top-banner {
    img {
      width: 100%;
      height: 300rpx;
    }
  }
  // 授权提示
  .sign-warn {
    font-size: 24rpx;
    color: rgba(0, 0, 0, 0.26);
    margin: 20rpx 0 20rpx;
  }
  .sign-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .two-button {
      width: 48%;
      .van-button {
        height: 80rpx;
        line-height: 80rpx;
      }
    }
  }
}
</style>

