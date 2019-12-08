var app = getApp()
var url = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    members:[],
    data_null:false,
    sousuo_phone_number:'', //input框
    sousuo_avatar:'',
    sousuo_nickname:'',
    sousuo_member_id:'',
    sousuo_phone:'',         //找到的
    arr_member_ids: [],
    popup_show: true,
    checkbox_ids:[],
    ischeck:false,
    no_avatar:'../../images/no_avatar.png',
    sousuo_avatar_have:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url: url + 'member-group/get?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: {},
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        //console.log(res)
        if (res.data.members==null){
          that.setData({
            data_null: false
          })
        }else{
          that.setData({
            data_null:true,
            ischeck: false,
            members: res.data.members,
            checkbox_ids:[]
          })
        }
      }
    })
  },

  //input手机号
  sousuo_phone: function(e){
    //console.log(e.detail.value)
    this.setData({
      sousuo_phone_number: e.detail.value
    })
  },

  //添加成员
  add_member: function(){
    let that = this
    that.setData({
      popup_show:false,
      sousuo_avatar: '',
      sousuo_nickname: '',
      sousuo_member_id: '',
      sousuo_phone_number: '',
      sousuo_avatar_have: false,
      sousuo_phone: '',
    })
  },
  //确定添加
  add_member_id:function(){
    let that = this
    that.data.arr_member_ids[0] = that.data.sousuo_member_id
    //console.log(that.data.arr_member_ids)
    if (that.data.arr_member_ids[0]==''){
      return false
    }
    wx.request({
      url: url + 'member-group/save?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: that.data.arr_member_ids,
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        //console.log(res)
        if (!res.data.errors) {
          wx.showToast({
            title: '添加成功',
            icon: 'none',
            duration: 2000
          })
          that.cancel()
          that.onLoad()
        } else {
          wx.showToast({
            title: '添加失败，请稍后再试',
            icon: 'none',
            duration: 2000
          })
          that.cancel()
        }
      }
    })
  },
  //取消
  cancel:function(){
    let that = this
    that.setData({
      popup_show: true,
      sousuo_avatar: '',
      sousuo_nickname: '',
      sousuo_member_id: '',
      sousuo_phone_number:'',
    })
  },
  //搜索
  sousuo: function(){
    let that = this
    if (that.data.sousuo_phone_number==''){
      return false
    }
    wx.request({
      url: url + 'member/search?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: { 
        phone:that.data.sousuo_phone_number
      },
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        //console.log(res)
        if (res.data.results.length<1){
          that.setData({
            sousuo_nickname: '对不起，没有找到用户...',
          })
        }else{
          that.setData({
            sousuo_avatar: res.data.results[0].portrait,
            sousuo_nickname: res.data.results[0].nickname,
            sousuo_member_id: res.data.results[0].member_id,
            sousuo_phone: res.data.results[0].phone,
            sousuo_avatar_have: true,
          })
        }
      }
    })
  },

  //复选框
  checkboxChange: function (e) {
    //console.log(e.detail.value)
    this.setData({
      checkbox_ids: e.detail.value
    })
  },
  //删除成员
  del_member:function(){
    let that = this
    if (that.data.checkbox_ids.length<1){
      wx.showToast({
        title: '请选择要删除的成员',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.showModal({
        title: '',
        content: '确定删除吗？',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: url + 'member-group/remove?session_id=' + wx.getStorageSync('session_id'),
              method: "POST",
              data: that.data.checkbox_ids,
              header: {
                "Content-Type": "application/json;charset=UTF-8"
              },
              success: (res) => {
                //console.log(res)
                if (!res.data.errors) {
                  wx.showToast({
                    title: '删除成功',
                    icon: 'none',
                    duration: 2000
                  })
                  setTimeout(() => { that.onLoad() }, 2000)
                } else {
                  wx.showToast({
                    title: '删除失败，请稍后再试',
                    icon: 'none',
                    duration: 2000
                  })
                }
              }
            })
          } else if (res.cancel) {
            //console.log('用户点击取消')
          }
        }
      })
      
      
    }
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