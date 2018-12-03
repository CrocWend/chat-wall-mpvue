<template>
  <!-- 悬浮菜单 -->
  <div class='menus'>
    <img src="/static/image/bg/menu_info.png"
         :animation="animationTwo"
         class="menu"
         @click.stop="menuToLottery" />
    <img src="/static/image/bg/menu_setting.png"
         :animation="animationThree"
         class="menu"
         @click.stop="menuToSetting">
    <img src="/static/image/bg/menu.png"
         :animation="animationMain"
         class="menu main"
         @click.stop="menuMain">
    <!-- 菜单遮罩层 -->
    <div class="menu-layer"
         v-if="hasPopped"></div>
  </div>
</template>
<script>
import Toast from "@/../static/vant/toast/toast";
export default {
  data() {
    return {
      // 是否已经弹出
      hasPopped: false,
      animationMain: {},
      animationOne: {},
      animationTwo: {},
      animationThree: {}
    };
  },
  methods: {
    getCurrentPage() {
      let pages = getCurrentPages(); //获取加载的页面

      let currentPage = pages[pages.length - 1]; //获取当前页面的对象

      let url = currentPage.route; //当前页面url
      return url;
    },
    menuToSetting() {
      this.menuMain();
      wx.navigateTo({
        url: "../setting/main"
      });
    },
    menuToLottery() {
      this.menuMain();
      wx.navigateTo({
        url: "../lottery/main"
      });
    },
    menuHide() {
      if (this.hasPopped) {
        this.takeback();
        this.hasPopped = false;
      }
    },
    menuMain() {
      if (!this.hasPopped) {
        this.popp();

        this.hasPopped = true;
      } else {
        this.takeback();
        this.hasPopped = false;
      }
    },
    popp() {
      let animationMain = wx.createAnimation({
        duration: 200,
        timingFunction: "ease-out"
      });
      let animationOne = wx.createAnimation({
        duration: 200,
        timingFunction: "ease-out"
      });
      let animationTwo = wx.createAnimation({
        duration: 200,
        timingFunction: "ease-out"
      });
      let animationThree = wx.createAnimation({
        duration: 200,
        timingFunction: "ease-out"
      });
      animationMain.rotateZ(180).step();
      animationOne
        .translate(0, -60)
        .rotateZ(360)
        .opacity(1)
        .step();
      animationTwo
        .translate(-Math.sqrt(3600 - 400), -30)
        .rotateZ(360)
        .opacity(1)
        .step();
      animationThree
        .translate(-Math.sqrt(3600 - 400), 30)
        .rotateZ(360)
        .opacity(1)
        .step();

      this.animationMain = animationMain.export();
      this.animationOne = animationOne.export();
      this.animationTwo = animationTwo.export();
      this.animationThree = animationThree.export();
    },
    takeback() {
      let animationMain = wx.createAnimation({
        duration: 200,
        timingFunction: "ease-out"
      });
      let animationOne = wx.createAnimation({
        duration: 200,
        timingFunction: "ease-out"
      });
      let animationTwo = wx.createAnimation({
        duration: 200,
        timingFunction: "ease-out"
      });
      let animationThree = wx.createAnimation({
        duration: 200,
        timingFunction: "ease-out"
      });
      animationMain.rotateZ(0).step();
      animationOne
        .translate(0, 0)
        .rotateZ(0)
        .opacity(0)
        .step();
      animationTwo
        .translate(0, 0)
        .rotateZ(0)
        .opacity(0)
        .step();
      animationThree
        .translate(0, 0)
        .rotateZ(0)
        .opacity(0)
        .step();

      this.animationMain = animationMain.export();
      this.animationOne = animationOne.export();
      this.animationTwo = animationTwo.export();
      this.animationThree = animationThree.export();
    }
  }
};
</script>
<style lang="scss" scoped>
.menus .menu,
.menus .share {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  position: fixed;
  z-index: 100;
  top: 60%;
  right: 70rpx;
  opacity: 0;
}
.menus .share {
  background: rgba(0, 0, 0, 0);
}
.menus .main {
  opacity: 1;
}
.menu-layer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.26);
}
</style>



