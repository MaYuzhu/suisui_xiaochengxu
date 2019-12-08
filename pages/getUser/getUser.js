// pages/getUser/getUser.js
var app = getApp()
var url = app.globalData.url

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tongyixieyi:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  bindGetUserInfo: function (e) {
    let that = this
    if (e.detail.userInfo) {
      //用户按了允许授权按钮

      // 获取到用户的信息了，打印到控制台上
      //console.log("用户的信息如下：");
      //console.log(e.detail.userInfo);
      wx.setStorageSync('user', e.detail.userInfo.nickName)
      wx.setStorageSync('avatar', e.detail.userInfo.avatarUrl)

      //点击授权同时登录
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {

                wx.login({
                  success: res => {
                    //console.log("用户的code:" + res.code);

                    wx.request({
                      method: "POST",
                      url: url + 'oauth/wechat/login?code=' + res.code,
                      //url: url + 'account/wechat/login?code=1',
                      /* data: {
                        code: res.code
                      }, */
                      header: {
                        "Content-Type": "application/json;charset=UTF-8"
                      },
                      success: (res) => {
                        //console.log(res)
                        wx.setStorageSync('session_id', res.data.session_id)
                        
                        //如果首次保存用户信息
                        if (!res.data.user_info_init){
                          //console.log(e.detail.userInfo.nickName)
                          wx.request({
                            url: url + 'member/save?session_id=' + wx.getStorageSync('session_id'),
                            method: "POST",
                            data: {
                              nickname: e.detail.userInfo.nickName,
                              portrait: e.detail.userInfo.avatarUrl,
                            },
                            header: {
                              "Content-Type": "application/json;charset=UTF-8"
                            },
                            success: (res) => {
                              //console.log(res)
                            }
                          })
                        }
                        


                        // const pages = getCurrentPages()
                        // const perpage = pages[pages.length - 1]
                        // perpage.onLoad()
                        var pages = getCurrentPages() 
                        var beforePage = pages[pages.length - 2];
                        beforePage.onShow() 
                        wx.navigateBack({
                          delta: 1,
                        })
                      }
                    })
                  }
                });
              }
            });

          } else {
            // 用户没有授权
            console.log('没有授权')
          }
        }
      });

    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  
  //同意用户协议
  checkboxChange: function(event){
    if (event.detail.value=='1'){
      //console.log(event.detail.value)
      this.setData({
        tongyixieyi: false
      })
    }else{
      this.setData({
        tongyixieyi: true
      })
    }
    
  },
  gotoXieyi: function () {
    wx.navigateTo({
      url: "/pages/xieyi/xieyi",
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