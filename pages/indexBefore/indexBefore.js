var App = getApp();
Page({
  data: {
  },
  onLoad() {
    this.bindload();
  },
  bindload() {
    setTimeout(this.goIndex,3000)
  },
  goIndex() {
    wx.switchTab({
      url: '/pages/home/home'
    })
  }
})