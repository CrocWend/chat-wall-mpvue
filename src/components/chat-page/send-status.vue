<template>
  <div class="send-status"
       v-if="sendStatus!=='success'">
    <send-loading></send-loading>
    <img v-if="sendStatus==='failed'"
         class="chat-loading-common"
         @click="resendMsgEvent"
         src="/static/image/chat/send_fail.png"
         data-resend-index="index" />
  </div>
</template>
<script>
import SendLoading from "../loading/common";
export default {
  components: {
    SendLoading
  }
};
</script>
<style lang="scss" scoped>
.send-status {
  height: 100%;
  display: flex;
  align-self: center;
}

.chat-loading-common {
  width: 40rpx;
  height: 40rpx;
}
</style>
