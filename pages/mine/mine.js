// pages/mine/mine.js
const app = getApp()
const url = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uesrname:'点击授权登录',
    avatar:'',
    isAvatar: false,
    available:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  getUserContent: function(){
    let that = this
    wx.request({
      url: url + 'member/get?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: {},
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        //console.log(res)
        if (res.statusCode == 401) {
          
          that.setData({
            uesrname: '点击授权登录',
            avatar: '',
            isAvatar: false
          })
          return false
        } else {
          wx.hideToast()
          
          that.setData({
            //uesrname: wx.getStorageSync('user'), 
            //avatar: wx.getStorageSync('avatar'),
            uesrname: res.data.nickname,
            avatar: res.data.portrait,
            isAvatar: true
          })
        }
        
      }
    })
  },


  gotoUserInfo: function(){
    let that = this
    wx.request({
      url: url + 'member/get?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: {},
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        if (res.statusCode == 401) {
          app.noUser()
        } else {
          wx.navigateTo({
            url: "/pages/userinfo/userinfo",
          })
        }
      }
    })
    
    
  },
  warrant: function(){
    let that = this
    if(that.data.uesrname == '点击授权登录'){
      app.noUser()
    }else{
      return false
    }
  },
  //分组
  gotoGroup: function(){
    let that = this
    wx.request({
      url: url + 'member-group/get?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: {},
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        if (res.statusCode == 401) {
          app.noUser()
        } else {
          wx.navigateTo({
            url: "/pages/memberGroup/memberGroup",
          })
        }
      }
    })
  },
  //评估历史
  gotoGaugeHistory: function(){
    let that = this
    wx.request({
      url: url + 'record/search?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: {
        //theme_id: that.data.number,
        with_scale: true,
        paging: false
      },
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        if (res.statusCode == 401) {
          app.noUser()
        } else {
          wx.navigateTo({
            url: "/pages/gaugeHistory/gaugeHistory",
          })
        }
      }
    })
  },
  //评估
  gotoIndex:function(){
    wx.switchTab({
      url: "/pages/index/index",
    })
  },

  //客服
  gotoKefu: function(){
    wx.switchTab({
      url: '/pages/kefu/kefu',
    })
  },

  gotoXieyi: function() {
    wx.navigateTo({
      url: "/pages/xieyi/xieyi",
    })
  },
  gotoInstructions: function() {
    wx.navigateTo({
      url: "/pages/instructions/instructions",
    })
  },
  /* gotoClockIn: function(){
    wx.navigateTo({
      url: "/pages/clockIn/clockIn",
    })
  }, */

  //获取剩余课时数
  getAccount:function(){
    let that = this
    wx.request({
      url: url + 'member-account/get?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: {
        
      },
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        //console.log(res)
        if (res.statusCode == 401) {
          that.setData({
            available: 0
          })
          return false
        } else {
          that.setData({
            available: res.data.available
          })
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
    let that = this
    
    that.getUserContent()
    that.getAccount()
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