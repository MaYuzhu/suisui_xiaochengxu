var app = getApp()
var url = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr_items:[
      {
        option_id:1,
        my_level:3
      },
      {
        option_id: 2,
        my_level: 4
      },
      {
        option_id: 3,
        my_level: 7
      },
      {
        option_id: 4,
        my_level: 3
      },
      {
        option_id: 5,
        my_level: 4
      },
      {
        option_id: 6,
        my_level: 7
      },
    ],
    text:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    
    wx.request({
      url: url + 'track-record/get?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: { 
        record_id: options.id 
      },
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        //console.log(res)
        that.setData({
          text: res.data.summary,
          arr_items:res.data.details
        })
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