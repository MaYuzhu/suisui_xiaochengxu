// pages/pastItem/pastItem.js
const app = getApp()
const url = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theme:'关于测试',
    theme_description:'',
    record_id:'',
    role_title:'',
    total_score:'', //得分
    answer_time: '', //答题时间
    questions:[],
    xuanxiang:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.showToast({ title: '加载中', icon: 'loading'})
    let that = this
    that.setData({
      theme: options.title,
      record_id: options.record_id
    })
    //请求测试结果
    wx.request({
      url: url + 'record/get?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: { record_id: that.data.record_id },
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        //console.log(res)
        wx.hideToast()
        that.setData({
          theme_description: res.data.scale.title,
          role_title: res.data.role.title,
          questions: res.data.details,
          total_score: res.data.total_score,
          answer_time: res.data.scale.answer_time
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