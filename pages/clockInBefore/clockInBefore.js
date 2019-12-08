// pages/clockInBefore/clockInBefore.js
var app = getApp()
var url = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrolls: [

      {
        title: '立即打卡',
        id: 1
      },
      {
        title: '我的打卡',
        id: 2
      },
      {
        title: '打卡分析',
        id: 3
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  gotoPage: function (event) {
    let that = this
    let id = event.currentTarget.id
    wx.request({
      url: url + 'track/get?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: {},
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        //console.log(res)
        if (res.statusCode == 401) {
          //console.log('没有登录')
          app.noUser()
          return
        }else{
          if (id == 1) {
            wx.navigateTo({
              url: "/pages/clockIn/clockIn",
            })
          } else if (id == 2) {
            wx.navigateTo({
              url: "/pages/clockInHistory/clockInHistory",
            })
          } else if (id == 3){
            // wx.navigateTo({
            //   url: "/pages/clockInMonth/clockInMonth",
            // })
          }
        }
        
      }
    })

    
    
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