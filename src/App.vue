
<script>
export default {
  created() {
    console.log('app1')
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    console.log('app created and cache logs by setStorageSync');
  }
}
</script>

<style>
@import '../static/style/weui.wxss';
page {
  height: 100%;
}
</style>
