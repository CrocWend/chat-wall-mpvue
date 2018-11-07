<template>
  <div :class="index===length-1? 'chat-item last-child': 'chat-item'">
    <chat-time v-if="item.type ==='custom'"
               :data="item.content"></chat-time>
    <chat-time v-else-if="item.type==='LOGIN' || item.type==='LOGOUT'"
               :data="item.content"></chat-time>
    <block v-else>
      <chat-time v-if="item.showTime"
                 :data="item.time"></chat-time>
      <chat-word :length="length"
                 :index="index"
                 :item="item"></chat-word>
    </block>
  </div>
</template>
<script>
import ChatTime from "./time";
import ChatWord from "./word";

export default {
  props: {
    item: Object,
    length: Number,
    index: Number
  },
  components: {
    ChatWord,
    ChatTime
  },
  onLoad() {
  }
};
</script>
<style lang="scss" scoped>
.chat-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  &.last-child {
    margin-bottom: 200rpx;
  }
}
</style>
