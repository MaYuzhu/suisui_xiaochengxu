// pages/userinfo/userinfo.js
const app = getApp()
const url = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uesrname: '小程序用户',
    fullname: '',
    nickname:'',
    avatar: '',
    isAvatar: false,
    phone: '',
    email: '',
    sex:['男','女'],
    sex_value:'请选择',
    sex_num:0,
    age:'',
    degree:'',
    occupation:'',
    other:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        wx.hideToast()
        let sex_v = ''
        if (res.data.sex==0){
          sex_v = '请选择'
        }else{
          sex_v = that.data.sex[res.data.sex-1] 
        }

        
        that.setData({
          uesrname: res.data.nickname,
          avatar: res.data.portrait,
          fullname: res.data.full_name,
          phone: res.data.phone,
          email: res.data.email,
          isAvatar: true,
          sex_value: sex_v,
          sex_num: res.data.sex,
          age: res.data.age,
          degree: res.data.degree == 0 ? '' : res.data.degree,
          occupation: res.data.occupation,
          other: res.data.other,
        })
        //that.setUser()
      }
    })
    
  },

  blurPhone: function(e){
    if (!(/^[1][3,4,5,7,8,9][0-9]{9}$/.test(e.detail.value))) {
      wx.showToast({
        title: '请填写正确的号码',
        icon: 'none',
        duration: 2000
      })
      return false;
    } 
    this.setData({
      phone: e.detail.value
    })
    this.setUser()
  },
  blurEmail: function (e) {
    this.setData({
      email: e.detail.value
    })
    this.setUser()
  },
  blurName: function (e) {
    this.setData({
      fullname: e.detail.value
    })
    this.setUser()
  },
  bindPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value);//index为数组点击确定后选择的item索引
    this.setData({
      sex_value: this.data.sex[e.detail.value],
      sex_num: e.detail.value*1 + 1
    })
    this.setUser()
  },
  blurAge: function (e) {
    this.setData({
      age: e.detail.value
    })
    this.setUser()
  },
  blurDegree: function (e) {
    this.setData({
      degree: e.detail.value
    })
    this.setUser()
  },
  blurOccupation: function (e) {
    this.setData({
      occupation: e.detail.value
    })
    this.setUser()
  },
  blurOther: function (e) {
    this.setData({
      other: e.detail.value
    })
    this.setUser()
  },
  

  //设置用户信息
  setUser: function () {
    let that = this
    
    wx.request({
      url: url + 'member/save?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: {
        full_name: that.data.fullname,
        phone: that.data.phone,
        email: that.data.email,
        nickname:that.data.uesrname,
        portrait:that.data.avatar,

        sex: that.data.sex_num,
        age: that.data.age,
        degree: that.data.degree,
        occupation: that.data.occupation,
        other: that.data.other,
      },
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        //console.log(res)
      }
    })
  },

  //退出
  logout: function(){
    wx.request({
      url: url + 'oauth/logout?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: {},
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        //console.log(res)
        wx.showToast({
          title: res.data.message,
          icon:'none',
          duration: 2000
        })
        wx.switchTab({
          url: "/pages/home/home",
        });  
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