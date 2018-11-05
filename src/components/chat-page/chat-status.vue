<template>
  <div :style="{'background-color': chatStatue==='open'?'#40c9ff':'#888888'}" class="chat-page-status">{{chatStatusContent}}</div>
</template>
<script>
export default {
  props: {
    chatStatusContent: String,
    chatStatue: String,
  }
}

</script>
<style lang="scss" scoped>
.chat-page-status {
  width: 100%;
  height: 54rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26rpx;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
}

</style>
