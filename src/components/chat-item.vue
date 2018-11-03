<template>
  <div class="chat-item">
    <time v-if="item.type ==='custom'" :data="item.content"></time>
    <time v-else-if="item.type==='LOGIN' || item.type==='LOGOUT'" :data="item.content"></time>
    <div v-else>
      <chat-time v-if="item.showTime" :data="item.time"></chat-time>
      <chat-word></chat-word>
    </div>
  </div>
</template>
<script>
import ChatTime from './time'
import ChatWord from './word'
export default {
  props: {
    item: Object,
    length: Number,
    index: Number
  },
  components: {
    ChatWord: ChatWord,
    ChatTime: ChatTime
  },
  onLoad() {
    console.log(this)
  }
}

</script>
<style lang="scss" scoped>
.chat-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;


}

</style>
