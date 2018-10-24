
<template>
  <div class="chatItemContent">
    <div class="createTime">{{item.createTime}}</div>
    <div class="chatContentBox">
      <div class="userAvatar"><img :src="item.user.avatarUrl"/></div>
      <div class="chatContent">
        <div class="deleteBox">
          <div class="userName">{{item.user.nickName}}</div>
          <div class="delBtn" data-key="item.key" @tap="deleteItem">删除</div>
        </div>
        <div class="chatMsg">{{item.message}}</div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        sss: '2232'
      }
    },
    props: {
      // 动态传值
      item: {
        type: Object,
        // default: {}
      }
    },
    // 事件处理
    methods: {
      deleteItem (event) {
        let _this = this
        let key = event.target.dataset.key
        console.log(key)
        _this.$emit('delItem', key)
      }
    },
    // 页面的生命周期函数
    mounted () {
      console.log('item $$$$$$$$$$$')
      console.warn(this.item)
    }
  }
</script>

<style lang="scss">
  .chatItemContent {
    .createTime {
      font-size: 20rpx;
      text-align: center;
      padding: 20rpx;
      color: rgba(255,255,255,.8);
    }
    .chatContentBox {
      display: flex;
    }
    .userAvatar {
      padding: 0 20rpx;
      image {
        display: block;
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        border: 4rpx solid rgba(255,255,255,.2);
        vertical-align: middle;
      }
    }
    .chatContent {
      font-size: 24rpx;
      color: rgba(255,255,255,.8);
    }
    .deleteBox {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width:400rpx;
    }
    .userName {

    }
    .chatMsg {
      display: inline-block;
      color: #ffffff;
      font-size: 28rpx;
      padding: 20rpx;
      border-radius: 8rpx;
      margin-top: 10rpx;
      max-width: 400rpx;
      background-color: rgba(0,0,0,.3);
    }
  }
</style>