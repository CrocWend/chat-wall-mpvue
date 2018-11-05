<template>
  <div class="container-home">
    <!-- 签到模块 已签到不显示 -->
    <div v-if="!isSign">
      <div class="">留言会随机展示在大屏幕上哦</div>
      <van-cell-group>
        <van-transition name="fade-up" show="signWithPhoneNo" custom-class="block">
          <van-field :value="signPhone" required clearable label="手机号" type="number" icon="question" maxlength="11" title-width="70px" placeholder="请输入手机号" @clickIcon="onClickIcon" @input="bindPhoneInput" />
        </van-transition>
        <van-field :value="signMessage" required label="留言" type="text" title-width="70px" placeholder="留言啊啊" border="false" @input="bindContentInput" />
      </van-cell-group>
      <!-- 输入手机号模式 不再调用授权 -->
      <div v-if="signWithPhoneNo">
        <van-button class="button" custom-class="button" size="large" type="primary" @click="sign()">手机号签到</van-button>
      </div>
      <!-- 授权获取手机号 没留言 不可点击 -->
      <div v-else-if="!signMessage">
        <van-button disabled="true" class="button" custom-class="button" size="large" type="primary">先签到</van-button>
      </div>
      <div v-else>
        <van-button class="button" custom-class="button" size="large" type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">先签到</van-button>
      </div>
    </div>
    <!-- 加入群聊按钮 已签到显示 -->
    <div v-else>
      <van-button class="button" block size="large" type="primary" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">加入群聊</van-button>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

var app = getApp();
import Toast from '@/../static/vant/toast/toast'
import config from '../../config/config';
import { msgPlaceholder } from '../../config/constant'
import tools from '../../utils/tools'
import weRequest from '../../utils/request';
import AppIMDelegate from "@/delegate/app-im-delegate";

export default {
  mpType: 'page',
  data() {
    return {
      signWithPhoneNo: true, // 默认不输入手机号
      signPhone: '', // 输入的签到手机号
      signMessage: '', // 留言
      isSign: false, // 是否签到
      // 留言占位信息
      msgPlaceholder: msgPlaceholder[tools.getRandomNum(1, msgPlaceholder.length - 1)],
    }
  },
  computed: {
    ...mapState(["appInfo", "appIMDelegate"])
  },
  methods: {
    ...mapActions(["update"]),
    onClickIcon() {
      console.log(this.bindGetUserInfo)
      Toast('输入的手机号和员工信息保持一致');
    },
    bindPhoneInput: function(e) {
      this.signPhone = e.mp.detail
    },
    bindContentInput: function(e) {
      this.signMessage = e.mp.detail
    },
    bindGetUserInfo(e) {
      console.log(e)
      this.joinRoom(this.appInfo.phone, e.mp.detail.userInfo)
    },
    /**
     * 获取用户手机号
     * 成功后 调用签到
     */
    getPhoneNumber(e) {
      var self = this;
      // 获取手机号出错 用户输入
      if (!e.mp.detail.encryptedData) {
        Toast('请先授权获取手机号')
        return;
      }

      // 调用解密接口 拿到手机号签到
      this.getEncryptData(e.detail, (phoneNumber) => {
        this.sign(phoneNumber)
      })
    },
    /**
     * 解密手机号信息
     * 使用保存的session
     */
    getEncryptData(detail, callback) {
      var session_key = wx.getStorageSync('session')
      wx.request({
        url: config.apiUrl + '/nh/encryptPhoneData',
        data: {
          encryptedData: detail.encryptedData,
          iv: detail.iv,
          session_key: session_key,
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          var data = res.data;
          callback(data.phoneNumber);
        }
      })
    },
    /**
     * 加入群聊
     */
    joinRoom(phone, userInfo) {
      let self = this
      wx.request({
        url: config.apiUrl + '/nh/joinRoom',
        data: {
          phone: phone,
          nickName: userInfo.nickName,
          gender: userInfo.gender,
          avatarUrl: userInfo.avatarUrl,
        },
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data)
          // 登录成功跳转聊天页面
          if (res.data.result) {
            console.log('设置头像等信息')
            var appInfo = Object.assign(self.appInfo, userInfo);

            self.update({ appInfo })

            try {
              var value = wx.getStorageSync('appInfo')
              if (value) {
                // 本地存储
                try {
                  wx.setStorageSync('appInfo', Object.assign(value, appInfo))
                } catch (e) {}
              }
            } catch (e) {
              // Do something when catch error
            }

            wx.navigateTo({
              url: '../chat/main'
            })
          }
        }
      })
    },
    /**
     * 优先使用验证手机号签到
     * 签到失败 使用用户输入手机号
     */
    sign(phone) {
      var self = this;
      var signPhone = self.signPhone;
      var signMessage = self.signMessage;
      // 手动输入模式
      if (self.signWithPhoneNo) {
        phone = signPhone;
      }
      console.log(this)

      if (phone.length !== 11) {
        Toast('手机号错误');
        return;
      }
      if (!signMessage) {
        Toast('留言啊啊啊');
        return;
      }
      wx.request({
        url: config.apiUrl + '/nh/sign',
        data: {
          phone: phone, // 签到手机号
          message: signMessage, // 留言内容
        },
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data)
          let data = res.data;
          if (data.result) {
            Toast.success('签到成功啦');
            self.isSign = true;

            // 设置全局属性
            let appInfo = {
              phone,
              userId: data.items[0].employeeid,
              isSign: true,
            }
            self.update({ appInfo })
            // 设置本地存储
            try {
              wx.setStorageSync('appInfo', appInfo)
            } catch (e) {}

          } else {
            // 签到失败 可能是手机号不匹配 用户自己输入
            self.signWithPhoneNo = true;
            Toast('签到失败啦 请手动输入手机号');
            return;
          }
        }
      })
    },
  },
  onLoad() {
    console.log('onLoad')
    console.log(this)
    // 登录 获取session 存储到storage 用于解密数据
    weRequest.login(() => {
      // 登录之后的回调
    })

    // 进入页面从本地获取是否签到 已签到 isSign true 不显示签到模块
    try {
      var value = wx.getStorageSync('appInfo')
      if (value) {
        // Do something with return value
        app.globalData.appInfo = value
        this.isSign = value.isSign;
      }
    } catch (e) {
      // Do something when catch error
    }
  },
}

</script>
<style scoped>
.container-home {
  padding: 50rpx 30rpx 0;
}

.button {
  margin: 30rpx 0;
}

</style>
