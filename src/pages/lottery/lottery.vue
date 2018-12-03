<template>
  <div class="container-lottery">
    <scroll-view class="scroll-view"
                 :style="{'height':systemInfo.windowHeight+'px'}"
                 scroll-y="true"
                 scroll-with-animation="true"
                 @scroll="onScroll"
                 @scrolltoupper="onScrollToUpper"
                 @scrolltolower="onScrollToLower"
                 @click="resetInputStatus">
      <block v-for="(item, index) in lotteryData"
             :key="index">
        <van-cell-group>
          <div class="lottery-sort">{{item.sort}}</div>
          <block v-for="(name, i) in item.data"
                 :key="i">
            <van-cell :title="name"
                      icon="gift"
                      :border="false" />
          </block>
        </van-cell-group>
      </block>

    </scroll-view>
  </div>

</template>
<script>
import { mapState, mapActions } from "vuex";
import Toast from "@/../static/vant/toast/toast";
import tools from "@/utils/tools";
export default {
  mpType: "page",
  data() {
    return {
      lotteryData: [
        {
          sort: "一等奖",
          data: ["张三", "张三", "张三"]
        },
        {
          sort: "二等奖",
          data: ["张三", "李四"]
        }
      ]
    };
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
    ...mapState(["barBgColor", "systemInfo"])
  }
};
</script>
<style lang="scss" scoped>
.container-lottery {
  background: #fff;
  .scroll-view {
    .lottery-sort {
      padding: 30rpx 0;
      text-align: center;
      color: rgba(0, 0, 0, 0.54);
    }
  }
}
</style>

