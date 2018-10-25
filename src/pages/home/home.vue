<template>
  <div class="container-home">
    <div class="userinfo">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">{{userInfo.nickName}}</div>
    </div>
    <button class="weui-btn" type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">签到</button>
    <button class="weui-btn" type="primary" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">群聊</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    console.log('userinfo')
    console.log(this.userInfo)
    this.getUserInfo();
  },
  methods: {
    ...mapMutations(["update", "getUserInfo"]),
    bindGetUserInfo (e) {
      console.log(e)
      this.update({userInfo: e.mp.detail.userInfo})
      this.toChat();
      // console.log(e.mp.detail.userInfo)
      console.log(this.userInfo)
    },
    getPhoneNumber (e) { 
      console.log(e)
    },
    toChat() {
      const url = '../chat/main';
      wx.navigateTo({ url });
    }
  },
};
</script>

<style lang="scss" scoped>
.container-home {
  padding: 300rpx 30rpx;
  box-sizing: border-box;
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    .userinfo-avatar {
      width: 128rpx;
      height: 128rpx;
      margin: 20rpx;
      border-radius: 50%;
    }
    .userinfo.nickname {
      color: #aaa;
    }
  }
}
</style>
