//index.js
//获取应用实例
const app = getApp()
const url = app.globalData.url

Page({
  data: {
    //滚动的数组
    scrolls: [
      
      /* {
        name: '儿童行为主题',
        tag: 'green',
      },
      {
        name: '成人行为主题',
        tag: 'red',
      },
      {
        name: '家庭关系主题',
        tag: 'green',
      },
      {
        name: '中学生心理主题',
        tag: 'red',
      }, */
      
    ],
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    /* if (wx.getStorageSync('session_id')) {
        wx.request({
            url: url + 'theme/search?session_id=' + wx.getStorageSync('session_id'),
            method: "POST",
            data: { paging : false},
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: (res) => {
                //console.log(res)
              let arr_zhuti = res.data.results
              that.setData({
                scrolls: arr_zhuti.reverse()
              })
            }
        })
    } else {
      
      wx.redirectTo({
        url: '/pages/mime/mine'
      })
    } */
    wx.showToast({ title: '加载中', icon: 'loading'})
    that.getData() 
    
  },
  bindGetUserInfo: function (e) {
    let that = this
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      
      // 获取到用户的信息了，打印到控制台上看下
      //console.log("用户的信息如下：");
      //console.log(e.detail.userInfo);
      wx.setStorageSync('user', e.detail.userInfo.nickName)
      wx.setStorageSync('avatar', e.detail.userInfo.avatarUrl)
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      
      console.log('同意授权')
      
      

      //点击授权同时登录
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {

                wx.login({
                  success: res => {
                    console.log("用户的code:" + res.code);

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
                        console.log(res)
                        wx.setStorageSync('session_id', res.data.session_id)
                        
                        //that.onLoad()
                        const pages = getCurrentPages()
                        const perpage = pages[pages.length - 1]
                        perpage.onLoad() 
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
  getData:function(){
    let that = this
    //console.log('123')
    wx.request({
      url: url + 'theme/search',  //?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: { paging: false },
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        //console.log(res)
        wx.hideToast()
        let arr_zhuti = res.data.results
        that.setData({
          scrolls: arr_zhuti.reverse()
        })
      }
    })
  },
  gotoPage: function (event) {
    let number = event.currentTarget.id;//1或者2得到点击了按钮1或者按钮2 
    //console.log(number)
    
    wx.navigateTo({
      url: "/pages/gaugelist/gaugelist?number=" + number,
    })
    
    
  },
  
  
})
