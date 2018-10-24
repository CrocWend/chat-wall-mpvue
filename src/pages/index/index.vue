<template>

  <!-- <div v-if="userInfo.nickName" class="container">
    <div class="navigator" >
    </div>
    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <!-- <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div> -->

    <!-- <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a> 
    <div>
      <ul class="container wish-list">
        <li v-for="(wish, index) in wishList" :class="{ red: aa }" :key="index" class="wish-item">
          <card :text="(index + 1) + ' . ' + wish"></card>
        </li>
      </ul>
    </div>
    

    <div class="footer weui-footer_fixed-bottom">
      <div class="footer-button">
        <button class="weui-btn mini-btn" size="mini" type="default" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">签到</button>
        <button class="weui-btn mini-btn" size="mini" type="default">发弹幕</button>
        <button class="weui-btn mini-btn" size="mini" type="default">按钮</button>
      </div>

      <div class="wish-box">
        <form>
          <div class="wish-form">
            <div class="input-left">
              <a href="javascript:;" class="btn-only-icon" id="btn-close-wish"><icon size="23" type="circle"></icon> </a>
            </div>
            <div class="input-box">
              <textarea class="weui_textarea" id="ipt-wish" placeholder="颜值高的和祝福多的都有机会中奖" rows="1"></textarea>
            </div>
            <div class="input-right">
              <button type="submit" class="btn-only-icon" id="btn-send-wish"><icon size="23" type="success"></icon></button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div v-else>加载中。。。</div> -->

  <view class="indexContainer">
    <chat></chat>
    <chatInput></chatInput>
  </view>

</template>

<script>

// 引入组件
import card from '@/components/card';
import chat from '@/components/chat'
import chatInput from '@/components/input'

import utils from '@/utils/index';
import api from '@/config/api'
import { mapState, mapMutations } from "vuex";

export default {
  config: {
    "enablePullDownRefresh": true,
    'navigationBarTitleText': 'ChatWall',
    'navigationBarTextStyle': 'white',
    'navigationBarBackgroundColor': '#372746'
  },
  data() {
    return {
      motto: 'Hello World',
      userInfo: {},
      wishList: [
        1,2,3,4,5
      ],
      chat: []
    };
  },

  components: {
    card,
    chat,
    chatInput,
  },

  methods: {
    ...mapMutations(["update"]),
    delItem: (key) => {
      let _this = this
      _this.ref.child(key).remove()
    },
    bindViewTap() {
      const url = '../logs/main';
      wx.navigateTo({ url });
    },
    getUserInfo() {
      // 查看是否授权
      let self = this;
      wx.getSetting({
        success (res){
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称 显示不同页面
            wx.getUserInfo({
              success: function(res) {
                console.log(res.userInfo)
                console.log('已经授权');
                // self.setData({
                //   userInfo: res.userInfo
                // })
                // 
                self.userInfo = res.userInfo
                console.log(self.userInfo)
              }
            })
          }else {
            // 未授权
            console.log('未授权')
            
          }
        }
      })
    },
    bindGetUserInfo (e) {
        console.log(e.mp.detail.userInfo)
        
        self.userInfo = e.mp.detail.userInfo
    },

    getPhoneNumber (e) { 
      console.log(e.detail.errMsg) 
      console.log(e.detail.iv) 
      console.log(e.detail.encryptedData) 
    },
    clickHandle(msg, ev) {
      console.log('clickHandle:', msg, ev);
    },
    getIndexData: function () {
      let that = this;
      utils.request(api.IndexUrl).then(function (res) {
        if (res.errno === 0) {
          console.log(res)
        }
      });
    },
  },

  created() {
    console.log('index')
    console.log(this.userInfo)
    console.log(utils)
    // 调用应用实例的方法获取全局数据
    
  },
  mounted() {
    console.log('mounted', this)
    console.log(this.userInfo)
    this.getUserInfo();
    // this.getIndexData();
  },
}
</script>

<style scoped lang="scss">
  page {
    height: 100%;
  }
  .indexContainer {
    height: 100%;
    width: 100%;
    background-color: #372746;
    background-repeat: no-repeat;
    background-image: url("http://static.wx.sunbar.cn/images/group/bg@2x.png");
    background-size: cover;
  }
</style>
