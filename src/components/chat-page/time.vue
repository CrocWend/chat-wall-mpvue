<template>
  <div class="chat-list-time-style">{{data}}</div>
</template>
<script>
export default {
  props: {
    data: String
  }
};
</script>
<style lang="scss" scoped>
.chat-list-time-style {
  margin-top: 30rpx;
  background-color: rgba(0,0,0,.26);
  color: white;
  padding: 8rpx 10rpx 6rpx 10rpx;
  border-radius: 6rpx;
  width: auto;
  font-size: 22rpx;
  line-height: 22rpx;
  text-align: center;
}
</style>
