// pages/home/home.js
const app = getApp()
const url = app.globalData.url
Page({

  data: {
    imgUrls: [
      {
        link: '/pages/index/index',
        url: 'https://api.anlanxinyi.com/static/img/home_top4.jpg'
      }, {
        link: '/pages/mine/mine',
        url: 'https://api.anlanxinyi.com/static/img/home_top1.jpg'
      }, {
        link: '/pages/mine/mine',
        url: 'https://api.anlanxinyi.com/static/img/home_top2.jpg'
      }, {
        link: '/pages/mine/mine',
        url: 'https://api.anlanxinyi.com/static/img/home_top3.jpg'
      }
    ],
    indicatorDots: true, //小点
    indicatorColor: "white",//指示点颜色
    activeColor: "#facc3e",//当前选中的指示点颜色
    autoplay: true, //是否自动轮播
    interval: 3000, //间隔时间
    duration: 500, //滑动时间
    circular: true, //衔接
    imgwidth: 750,
    imgheights: [],
    current: 0
  },

  imageLoad: function (e) {//获取图片真实宽度  

    let that = this
    wx.getSystemInfo({
      success(res) {
        //console.log('设备像素比:', res.pixelRatio)
        //console.log('屏幕宽度:', res.windowWidth)
        that.setData({
          imgwidth: res.windowWidth
        })
        var imgwidth = that.data.imgwidth //var imgwidth = e.detail.width
        var img_height = e.detail.height
        //宽高比  
        var ratio = imgwidth / img_height;
        //console.log(imgwidth, img_height)
        //计算的高度值  
        var viewHeight = imgwidth / ratio;
        var imgheight = viewHeight;
        var imgheights = that.data.imgheights;
        //把每一张图片的对应的高度记录到数组里  
        imgheights[e.target.dataset.id] = imgheight;
        that.setData({
          imgheights: imgheights
        })
        //console.log(imgheight)
      }
    })
    
    
  },
  bindchange: function (e) {
    //console.log(e.detail.current)
    this.setData({ current: e.detail.current })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
  },

  gotoPage: function (event) {
    let that = this
    let url_go = event.currentTarget.dataset.url
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
        } else {
          wx.navigateTo({
            url: url_go,
          })
          
        }

      }
    })



  },
  gotoPageTab: function (event) {
    let that = this
    let url_go = event.currentTarget.dataset.url
    wx.switchTab({
      url: url_go,
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