// pages/subjectbefore/subjectbefore.js
const app = getApp()
const url = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "正在答题中的试卷未提交前不允许中途退出，否则视为放弃，系统自动交卷。",
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    marquee_margin: 30,
    size: 14,
    interval: 20,// 时间间隔

    xuanxiang:[],
    number: '',
    title: '',
    countDownNum: 0, //问题时长
    roleId:'',  
    record_id:'',     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 })
    let that = this
    that.setData({
      number: options.number,
      title: options.title,
      countDownNum: options.answer_time,
    })
    //请求得到问题
    wx.request({
      url: url + 'person-role/list?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: {},
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        //console.log(res)
        wx.hideToast()
        that.setData({
          xuanxiang: res.data.results
        })
      }
    })
  },
  radioChange: function(e){
    let that = this
    let val_id = e.detail.value
    that.setData({
      roleId: val_id
    })
    

  },
  gotoPage: function (event) {
    let that = this
    let number = that.data.number
    let title = that.data.title
    let countDownNum = that.data.countDownNum
    let roleId = that.data.roleId
    if (!roleId){
      wx.showToast({
        title: '请选择家庭成员',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    wx.redirectTo({
      url: "/pages/subject/subject?number=" + number + "&title=" + title + "&countDownNum=" + countDownNum + "&roleId=" + roleId,
      
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
    var that = this;
    var length = that.data.text.length * that.data.size;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    //console.log(length,windowWidth);
    that.setData({
      length: length,
      windowWidth: windowWidth
    });
    that.scrolltxt();// 第一个字消失后立即从右边出现
  },
  scrolltxt: function () {
    var that = this;
    var length = that.data.length;//滚动文字的宽度
    var windowWidth = that.data.windowWidth;//屏幕宽度
    if (length > windowWidth) {
      var interval = setInterval(function () {
        var maxscrollwidth = length + that.data.marquee_margin;//滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可
        var crentleft = that.data.marqueeDistance;
        if (crentleft < maxscrollwidth) {//判断是否滚动到最大宽度
          that.setData({
            marqueeDistance: crentleft + that.data.marqueePace
          })
        }
        else {
          //console.log("替换");
          that.setData({
            marqueeDistance: 0 // 直接重新滚动
          });
          clearInterval(interval);
          that.scrolltxt();
        }
      }, that.data.interval);
    }
    else {
      that.setData({ marquee_margin: "1000" });//只显示一条不滚动右边间距加大，防止重复显示
    }
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