var app = getApp()
var url = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history_list:[
      // { summary: '111111', update_time:'2019-01-55 22:55:42'},
      // { summary: '555555', update_time: '2019-10-55 22:55:42'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this

    wx.request({
      url: url + 'track-record/list?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: { paging: false },
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        //console.log(res)
        if (res.data.results.length < 1 ){
          wx.showToast({
            title: '暂无数据',
            icon: 'none',
            duration: 2000
          })
          setTimeout(()=>{
            wx.navigateBack()
          },2000)
        }else{
          that.setData({
            history_list: res.data.results
          })
        }
        
      }
    })

    wx.request({
      url: url + 'track-report/list?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: { paging: false },
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        //console.log(res)
        // if (res.data.results.length < 1) {
        //   wx.showToast({
        //     title: '暂无数据',
        //     icon: 'none',
        //     duration: 2000
        //   })
        //   setTimeout(() => {
        //     wx.navigateBack()
        //   }, 2000)
        // } else {
        //   that.setData({
        //     history_list: res.data.results
        //   })
        // }

      }
    })
  },

  gotoItem: function(e){
    let id = e.currentTarget.dataset.id
    let summary = e.currentTarget.dataset.summary
    //console.log(id)
    wx.navigateTo({
      url: "/pages/clockInItemDay/clockInItemDay?id=" + id,
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