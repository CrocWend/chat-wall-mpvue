<template>

  <div v-if="userInfo.nickName" class="container-home" @click="clickHandle('test click', $event)">
    <div class="navigator" >
    </div>

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>
  </div>
  <div v-else class="container-auth">
    <div v-if="canIUse">
      <div class='content'>
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540358325558&di=91230b294c2d214557c552c438cca869&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fa686c9177f3e6709bd004ed630c79f3df8dc5592.jpg"/>
          <div>申请获取以下权限</div>
          <div>获得你的公开信息(昵称，头像等)</div>
      </div>
      <button class="weui-btn" type="primary" v-if="canIUse" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">授权登录</button>

    </div>
    <div v-else>请升级微信版本</div>
  </div>

</template>

<script>
import card from '@/components/card';

export default {
  config: {
    "enablePullDownRefresh": true,
  },
  data() {
    return {
      motto: 'Hello World',
      userInfo: {},
      canIUse: wx.canIUse('button.open-type.getUserInfo')
    };
  },

  components: {
    card,
  },

  methods: {
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

    clickHandle(msg, ev) {
      console.log('clickHandle:', msg, ev);
    },
  },

  created() {
    console.log('index')
    console.log(this.userInfo)
    // 调用应用实例的方法获取全局数据
    
  },
  mounted() {
    console.log('mounted', this)
    console.log(this.userInfo)
    this.getUserInfo();
  },
}
</script>

<style scoped lang="scss">
.container-auth {
  padding: 400rpx 30rpx;
  img {
    display: block;
    width: 300rpx;
    height: 300rpx;
    border-radius: 50%;
    margin: 0 auto;
  }
}
.container-home {
  background: pink;
}

.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
