<template>
  <div class="extra-super">
    <div v-for="(item, index) in chatInputExtraArr"
         :key="index"
         class="flex-column"
         @click="test1($event)"
         :data-index="index">
      <img class="extra-image-size"
           :src="'/static/image/chat/extra/'+item.picName+'.png'" />
      <span class="extra-text-size">{{item.description}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chatInputExtraArr: [
        {
          picName: "choose_picture",
          description: "照片"
        },
        {
          picName: "take_photos",
          description: "拍摄"
        },
        {
          picName: "close_chat",
          description: "自定义功能"
        }
      ]
    };
  },
  methods: {
    test1(e) {
      console.log(e)
      // this.$emit("extraButtonClick", e);
    }
  }
};
</script>
<style lang="scss" scoped>
.press-style {
  background-color: rgba(0, 0, 0, 0.1);
}

.press-style-opacity {
  opacity: 0.5;
}

.extra-super {
  display: flex;
  padding-top: 25rpx;
  height: 234rpx;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.54);
}

.extra-image-size {
  width: 114rpx;
  height: 114rpx;
}

.extra-text-size {
  color: #fff;
  font-size: 24rpx;
  margin-top: 10rpx;
}

.flex-column {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flex-row {
  display: flex;
}
</style>
