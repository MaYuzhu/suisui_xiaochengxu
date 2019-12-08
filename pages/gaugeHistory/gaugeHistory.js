const app = getApp()
const url = app.globalData.url

Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: 0,
    pastList: [],
    havePastList: false,
    page_num:1,
    total_page:0,
    is_all:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url: url + 'record/search?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: {
        //theme_id: that.data.number,
        with_scale: true,
        paging: true,
        page:{
          number:that.data.page_num,
          size:10
        }
      },
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        //console.log(res)
        if (res.statusCode == 401) {
          //console.log('没有登录')
          app.noUser()
          return
        }
        if (res.data.results.length > 0) {
          that.setData({
            pastList: res.data.results,
            havePastList: true,
            total_page: res.data.total_page,
          })
        }

      },
      fail: function () {
        console.log('This is fail function')
      }
    })
  },

  gotoPagePast: function (event) {
    const record_id = event.currentTarget.id  //1或者2得到点击了按钮1或者按钮2 
    let title = event.currentTarget.dataset.title
    wx.navigateTo({
      url: "/pages/pastItem/pastItem?record_id=" + record_id + "&title=" + title,

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
    var that = this;
    // 显示加载图标  wx.hideLoading();
    wx.showLoading({
      title: '加载中...',
    })
    
    // 页数+1
    that.setData({
      page_num: that.data.page_num + 1
    })
    if (that.data.page_num>that.data.total_page) {
      that.setData({
        is_all: false
      })
      wx.hideLoading()
      return
    }
    wx.request({
      url: url + 'record/search?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: {
        //theme_id: that.data.number,
        with_scale: true,
        paging: true,
        page: {
          number: that.data.page_num,
          size: 10
        }
      },
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        //console.log(res)
        if (res.statusCode == 401) {
          //console.log('没有登录')
          app.noUser()
          return
        }
        if (res.data.results.length > 0) {
          that.setData({
            pastList: that.data.pastList.concat(res.data.results),
            havePastList: true,
          })
          wx.hideLoading()
        }

      },
      fail: function () {
        console.log('This is fail function')
      }
    })
    
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})