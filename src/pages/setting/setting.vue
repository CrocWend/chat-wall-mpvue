<template>
  <div class="container-setting">
    <!-- 检查更新 -->
    <div class="setting-item">
      <div class="title"
           :style="{'color': barBgColor}">检查更新</div>
      <div class="content">
        <div class="item">
          <div class="left">
            <div class="text">打开首页更新提醒</div>
            <div class='tip'
                 catchtap='updateInstruc'>
              <img class="img"
                   src='/static/image/bg/question.png' />
              <text v-if='enableUpdate'>在首页检测到新版本，会提示更新</text>
              <text v-else
                    style='flex:1;'>基础库版本需高于 1.9.90，当前基础库版本为 {{SDKVersion}}</text>
            </div>
          </div>
          <div class="right">
            <van-switch size="20px"
                        :backgroundColor="barBgColor"
                        checked="checked"
                        bind:change="onChange" />
          </div>
        </div>
      </div>
    </div>

    <!-- 小工具 -->
    <div class="setting-item">
      <div class="title"
           :style="{'color': barBgColor}">小工具</div>

      <div class="content sub">
        <div class='sub-title'
             :style="{'color': barBgColor}">NFC</div>
        <div class='item'
             catchtap='getHCEState'>
          <div>检测是否支持NFC</div>
          <img class='more'
               src='/static/image/bg/arrow.png' />
        </div>
      </div>

      <div class="content sub">
        <div class='sub-title'
             :style="{'color': barBgColor}">屏幕亮度</div>
        <div class='item'>
          <div class="left">
            <div class="text">当前屏幕亮度</div>
            <div class='tip'>范围0~100，0 最暗，100 最亮</div>
          </div>
          <div class="right">{{screenBrightness}}</div>
        </div>

        <div class='item'
             @click.stop="setScreenBrightness">
          <div class="left"
               style='width:100%'>
            <div class="text">设置屏幕亮度</div>
            <slider value='screenBrightness'
                    min='0'
                    max='100'
                    step='1'
                    block-size='12'
                    :block-color="barBgColor"
                    :activeColor="barBgColor"
                    show-value='true'
                    bindchange='screenBrightnessChanging'
                    bindchanging='screenBrightnessChanging'></slider>
          </div>
        </div>

        <div class='item'>
          <div class="left">
            <div>保持常亮</div>
            <div class='tip'>仅在当前小程序、当次生效，离开小程序后设置失效</div>
          </div>
          <div class="right">
            <van-switch size="20px"
                        checked="checked"
                        :backgroundColor="barBgColor"
                        bind:change="onChange" />
          </div>
        </div>

        <div class="content sub">
          <div class='sub-title'
               :style="{'color': barBgColor}">系统信息</div>
          <div class='item'>
            <div class="left">
              <div class="text">查看系统信息</div>
            </div>
            <div class="right">{{screenBrightness}}</div>
          </div>

        </div>

      </div>

    </div>

    <!-- 清除数据 -->
    <div class="setting-item">
      <div class="title"
           :style="{'color': barBgColor}">清除数据</div>
      <div class="content">
        <div class="item">
          <div class="left">
            <div class="text">恢复初始化设置</div>
            <div class='tip'
                 catchtap='updateInstruc'>
              <img class="img"
                   src='/static/image/bg/danger.png' />
              <text>所有设置信息都将被清除</text>
            </div>
          </div>
          <div class="right">
            <img class='more'
                 src='/static/image/bg/arrow.png' />
          </div>
        </div>

        <div class="item">
          <div class="left">
            <div class="text">清除所有本地数据</div>
            <div class='tip'
                 catchtap='updateInstruc'>
              <img class="img"
                   src='/static/image/bg/danger.png' />
              <text>所有本地数据都将被清除</text>
            </div>
          </div>
          <div class="right">
            <img class='more'
                 src='/static/image/bg/arrow.png' />
          </div>
        </div>
      </div>
    </div>

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
    }
  }
};
</script>
<style lang="scss" scoped>
.container-setting {
  font-size: 28rpx;
  color: #666;
  .setting-item {
    overflow: hidden;
    padding: 0 40rpx;
    background: #fff;
    margin-bottom: 20rpx;
    .title {
      font-size: 32rpx;
      margin: 26rpx 0;
    }
    .sub-title {
      font-size: 28rpx;
    }
    .content {
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100rpx;
        &.sub {
          padding-left: 20rpx;
        }
        slider {
          width: 100%;
          margin: 0;
        }
      }
      .left {
        .text {
          margin-bottom: 10rpx;
        }
        .tip {
          font-size: 22rpx;
          color: #999;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .img {
            width: 24rpx;
            height: 24rpx;
            margin-right: 10rpx;
          }
        }
      }
      .right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .setting-switch {
        }
      }
      .more {
        width: 32rpx;
        height: 32rpx;
      }
    }
  }
}
</style>

