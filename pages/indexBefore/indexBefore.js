var App = getApp();
Page({
  data: {
  },
  onLoad() {
    this.bindload();
  },
  bindload() {
    setTimeout(this.goIndex,3500)
    //setTimeout(this.goIndex, 0)
  },
  goIndex() {
    wx.switchTab({
      url: '/pages/home/home'
    })
  }
})