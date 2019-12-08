// pages/indexBefore/indexBefore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrolls: [

      {
        title: '每日打卡',
        id: 1
      },
      {
        title: '评估评测',
        id: 2
      },
      {
        title: '我的信息',
        id: 3
      },
      

    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  gotoPage: function (event){
    let id = event.currentTarget.id;
    if(id == 1){
      //console.log(id)
      wx.switchTab({
        url: "/pages/clockInBefore/clockInBefore",
      })
    } else if (id == 2){
      wx.switchTab({
        url: "/pages/index/index",
      })
    } else if (id == 3){
      wx.switchTab({
        url: "/pages/mine/mine",
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})