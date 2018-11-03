<template>
  <div class="chat-word">
    <img src="headUrl"/>
    <image v-if="type==='text'||type==='voice'" class="chat-list-arrow-style" src="./../../image/chat/popu_{isMy?'blue':'white'}.png" />
    <div v-if="type==='text'">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: String
  }
}

</script>
<style lang="scss" scoped>
.chat-word {
  width: 100%;
  display: flex;
  margin-top: 20rpx;
}

.isMyWordStyle {
  background-color: #8fcbf7;
  color: #213d52;
  margin-right: -1rpx;
  margin-left: 14rpx;
  word-wrap: break-word;
}

.isOtherWordStyle {
  background-color: white;
  color: #333333;
  margin-right: 14rpx;
  margin-left: -1rpx;
  word-wrap: break-word;
}

.chat-list-pic-style {
  border-radius: 10rpx;
  margin-left: 5rpx;
  width: 150rpx;
  height: 280rpx;
}

.voice-duration-style {
  color: #666666;
  font-size: 26rpx;
  align-self: center;
  margin-top: 3rpx;
  margin-left: 5rpx;
}

.chat-list-arrow-style {
  width: 11rpx;
  height: 20rpx;
  margin-top: 25rpx
}

</style>
