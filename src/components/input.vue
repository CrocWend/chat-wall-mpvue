<template>
  <div class="inputContainer">
    <div class="footerContent">
      <div class="addBtn">
        <img src="../images/ic_add.png" />
      </div>
      <div class="chatContent">
        <input cursor-spacing="10" type="text" v-model="inputValue" placeholder="请输入" >
      </div>
      <div class="faceBtn">
        <img src="../images/ic_face.png"/>
      </div>
      <div class="sendBtn">
        <button size="mini" @click="send">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from "vuex";
  export default {
    data() {
      return {
        inputValue: null,
        focusFlag: false,

        //
        createTime: null,
        message: '',
        messageType: 'TEXT',
        user: {}
      }
    },
    computed: {
      ...mapState(["chat"])
    },
    // 事件处理
    methods: {
      ...mapMutations(["update", "setChat"]),
      send () {
        // 判断输入框中是非有内容
        if (this.inputValue !== null) {
          // 创建时间
          let createTime = parseInt(new Date().getTime() / 1000)
  
          let avatarUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540390442124&di=5e2e99bac69c38e5a4a90af962af8334&imgtype=0&src=http%3A%2F%2Fpic14.nipic.com%2F20110605%2F1369025_165540642000_2.jpg'
          // _this.$emit('addChat', _this.sendVal)
          // this.update({chat: chatArr})
          this.setChat({
            createTime,
            message: this.inputValue,
            messageType: 'TEXT',
            user:{
              avatarUrl,
              nickName: '2323'
            }
          })
          // 清空输入框
          this.inputValue = null
          console.log(this.chat)
          // _this.$apply()
        } else {
          wx.showToast({
            title: '发送内容不能为空',
            icon: 'none',
            duration: 2000
          })
        }
      }
    },
    // onLoad
    mounted() {
      setTimeout(() => {
        console.log(this.cityName)
      }, 0);
      // let _this = this
      // _this.sendVal.user = _this.$root.$parent.globalData.userInfo
      // _this.$apply()
      // // 同步用户数据
      // let againFtech = setInterval(function() {
      //   if (!_this.sendVal.user) {
      //     _this.sendVal.user = _this.$root.$parent.globalData.userInfo
      //     _this.$apply()
      //   } else {
      //     clearInterval(againFtech)
      //   }
      // }, 500)
    }
  }
</script>


<style lang="scss">
  .inputContainer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    .footerContent {
      box-sizing:border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      background-color: #372746;
      padding: 20rpx;
    }
    .addBtn, .faceBtn {
      image {
        width: 54rpx;
        height: 54rpx;
        display:block;
        vertical-align: middle;
      }
    }
    .chatContent {
      input {
        box-sizing: border-box;
        height: 68rpx;
        color: #ffffff;
        background-color: rgba(255,255,255,0.06);
        border-radius: 8rpx;
      }
    }
    .sendBtn {
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: normal;
        color: #ffffff;
        height: 68rpx;
        background-image: linear-gradient(-151deg, #FF9473 0%, #F93058 79%);
        border-radius: 8rpx;
        &:active {
          background-image: linear-gradient(0deg, #d52044 0%, #da3b2e 100%);
        }
      }
    }
  }
</style>