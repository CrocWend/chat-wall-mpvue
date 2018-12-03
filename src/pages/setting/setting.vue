<template>
  <div class="container-setting">

    <!-- 清除数据 -->
    <div class="setting-item">
      <div class="title"
           :style="{'color': barBgColor}">清除数据</div>
      <div class="content">
        <van-cell-group>
          
          <van-cell title="清除所有本地数据"
          @click.stop='removeStorage'
          data-type='all'
                    is-link />
        </van-cell-group>
      </div>
    </div>

  </div>

</template>
<script>
import { mapState, mapActions } from "vuex";
import Toast from "@/../static/vant/toast/toast";
import tools from "@/utils/tools";
export default {
  mpType: "page",
  data() {
    return {};
  },
  onShow() {},
  onLoad() {
    // 设置bar颜色
    wx.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: this.barBgColor
    });
  },
  computed: {
    ...mapState(["barBgColor"])
  },
  methods: {
    ...mapActions(["update"]),
    removeStorage(e) {
      let self = this;
      let datatype = e.currentTarget.dataset.type;
      if (datatype === "all") {
        wx.showModal({
          title: "提示",
          content: "确认要删除",
          cancelText: "容朕想想",
          confirmColor: this.barBgColor,
          success(res) {
            if (res.confirm) {
              wx.clearStorage({
                success: res => {
                  wx.showToast({
                    title: "数据已清除"
                  });
                  self.setting = {};
                  self.update({ setting: {} });
                  // 清理后跳转登录
                  wx.reLaunch({
                    url: "../login/main"
                  });
                }
              });
            }
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.container-setting {
  .setting-item {
    overflow: hidden;
    background: #fff;
    margin-bottom: 20rpx;
    .title {
      font-size: 32rpx;
      margin: 26rpx 0;
      padding: 0 30rpx;
    }
    .content {
    }
  }
}
</style>

