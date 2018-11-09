<template>
    <div class="container-setting">
        <van-button block
                    size="large"
                    @click="clear"
                    type="primary">清理缓存</van-button>
        <van-toast id="van-toast" />
    </div>
</template>
<script>
import { mapState } from "vuex";
import Toast from "@/../static/vant/toast/toast";
import tools from "@/utils/tools";
export default {
  mpType: "page",
  data() {
    return {};
  },
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
    clear() {
      Toast("清理成功");
      // 清理后跳转登录
      wx.reLaunch({
        url: "../login/main"
      });
      //   try {
      //     wx.clearStorage({
      //       success: res => {
      //         Toast("清理成功");
      //         // 清理后跳转登录
      //         wx.reLaunch({
      //           url: "../login/main"
      //         });
      //       }
      //     });
      //   } catch (e) {
      //     // Do something when catch error
      //   }
    }
  }
};
</script>
<style lang="scss" scoped>
.container-setting {
  padding: 50rpx 30rpx 0;
}
</style>

