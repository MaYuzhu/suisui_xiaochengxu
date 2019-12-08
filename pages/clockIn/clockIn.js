
var app = getApp()
var url = app.globalData.url
Page({

  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    evaluate_contant: ['维度一', '维度二', '维度三', '维度四', '维度五', '维度六liuliu'],
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../images/no-star.png',
    selectedSrc: '../../images/full-star.png',
    halfSrc: '../../images/half-star.png',
    score: 0,
    scores: [-1],
    option_id_arr:[],
    //details:[],
    isHave:'',
    scale_id:'',
    max: 1000,
    summary: '',
    details_submit:[],
    is_show_button:false,
    uesrname: '',
    avatar: '',
  },
  onLoad: function (options) {
    var that = this
    
    /* wx.request({
      url: url + 'track/get?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: {},
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        console.log(res)
        if (res.statusCode == 401) {
          console.log('没有登录')
          app.noUser()
          return
        }
        let have = res.data.details.length
        let num_star = res.data.details[0].max_level
        let arr_atar = []
        let arr_op_id = []
        for (let i = 0; i < num_star; i++) {
          arr_atar.push(i)
        }
        for (let j = 0; j < res.data.details.length; j++) {
          arr_op_id.push(res.data.details[j].option_id)
        }

        if (have > 0) {
          that.setData({
            isHave: true,
            evaluate_contant: res.data.details,
            stars: arr_atar,
            scale_id: res.data.scale_id,
            option_id_arr: arr_op_id,
          })
        }
        //判断当日是否打过
        if (res.data.summary) {
          wx.showModal({

            title: '',
            content: '您当日已经打卡成功...',
            showCancel: true,
            cancelText: "返回上页",
            cancelColor: '#c2c212',
            confirmText: "更新打卡",
            confirmColor: '#c2c212',
            success: function (res) {
              if (res.confirm) {
                that.updataClockIn()
              } else {
                wx.navigateBack()
              }

            }

          })
        }
      }
    }) */
    
    
  },
  onShow: function(){
    let that = this
    wx.request({
      url: url + 'track/get?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: {},
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        console.log(res)
        if (res.statusCode == 401) {
          console.log('没有登录')
          app.noUser()
          return
        }
        if (res.data.details.length<1) {
          return
        }
        let have = res.data.details.length
        let num_star = res.data.details[0].max_level
        let arr_atar = []
        let arr_op_id = []
        for (let i = 0; i < num_star; i++) {
          arr_atar.push(i)
        }
        for (let j = 0; j < res.data.details.length; j++) {
          arr_op_id.push(res.data.details[j].option_id)
        }

        if (have > 0) {
          that.setData({
            isHave: true,
            evaluate_contant: res.data.details,
            stars: arr_atar,
            scale_id: res.data.scale_id,
            option_id_arr: arr_op_id,
          })
        }
        //判断当日是否打过
        if (res.data.summary) {
          /* wx.showModal({

            title: '',
            content: '您当日已经打卡成功...',
            showCancel: true,
            cancelText: "返回上页",
            cancelColor: '#c2c212',
            confirmText: "更新打卡",
            confirmColor: '#c2c212',
            success: function (res) {
              if (res.confirm) {
                that.updataClockIn()
              } else {
                wx.navigateBack()
              }

            }

          }) */
          wx.showToast({
            title: '您今天已经打过卡了~',
            icon: 'none',
            duration: 2000
          })
          that.updataClockIn()
        }
      }
    })
    that.getAvatar()
  },

  goback() {
    wx.navigateBack({ delata: 1 })
  },

  getAvatar(){
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
        that.setData({
          uesrname: res.data.nickname,
          avatar: res.data.portrait,
        })
        
      }
    })
  },  
  
  //回显更新打卡
  updataClockIn: function(){
    var that = this
    wx.request({
      url: url + 'track/get?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: {},
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        //console.log(res)
        let show_star = []
        let show_details_submit = []
        for (let i = 0; i < res.data.details.length;i++){
          show_star[i]=res.data.details[i].my_level
          show_details_submit.push({ 
            option_id: res.data.details[i].option_id, 
            my_level: res.data.details[i].my_level
          })
        }
        
        that.setData({
          summary: res.data.summary,
          scores: show_star,
          details_submit: show_details_submit
          
        })
      }
    })
  },

  // 提交事件
  submit_evaluate: function () {
    let that = this
    
    //console.log(that.data.details_submit)
    //console.log(that.data.summary)

    wx.request({
      url: url + 'track/save?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: { 
        scale_id: that.data.scale_id,
        summary: that.data.summary,
        details: that.data.details_submit,
      },
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        //console.log(res)
        wx.showToast({
          title: '打卡成功',
          icon: 'success',
          duration: 800,
          mask: true
        })
        setTimeout(() => wx.navigateBack(),800)
      }
    })

  },
  

  //点击左边,半颗星
  /* selectLeft: function (e) {
    var score = e.currentTarget.dataset.score
    if (this.data.score == 0.5 && e.currentTarget.dataset.score == 0.5) {
      score = 0;
    }

    this.data.scores[e.currentTarget.dataset.idx] = score,
      this.setData({
        scores: this.data.scores,
        score: score
      })

  }, */

  //点击右边,整颗星
  selectRight: function (e) {
    var score = e.currentTarget.dataset.score
    
    var option_id = e.currentTarget.dataset.optionid
    this.data.scores[e.currentTarget.dataset.idx] = score
    this.data.details_submit[e.currentTarget.dataset.idx] = {
        option_id: option_id,
        my_level: score
    },
    this.setData({
        scores: this.data.scores,
        score: score
    })
    //console.log(option_id)
    let is_scores = false
    let have_empty = []
    for (let i = 0; i < this.data.scores.length;i++){
      if (this.data.scores[i]!=undefined){
        have_empty.push(this.data.scores[i])
      }
    }
    
    if (have_empty.length == this.data.evaluate_contant.length && this.data.scores.indexOf(0) == -1 && this.data.scores.length == this.data.evaluate_contant.length) {
      is_scores = true
    
    }
    if (this.data.summary != '' && is_scores) {
      this.setData({
        is_show_button: true
      })
      
    } else {
      this.setData({
        is_show_button: false
      })
      
    }
  },

  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    
    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数  
    });
    this.setData({
      summary: e.detail.value
    })
    
    let is_scores 
    let have_empty = []
    for (let i = 0; i < this.data.scores.length; i++) {
      if (this.data.scores[i] != undefined) {
        have_empty.push(this.data.scores[i])
      }
    }
    if (have_empty.length == this.data.evaluate_contant.length && this.data.scores.indexOf(0) == -1 && this.data.scores.length == this.data.evaluate_contant.length){
      is_scores = true
    }
    if (this.data.summary != '' && is_scores){
      this.setData({
        is_show_button: true
      })
    }else{
      this.setData({
        is_show_button: false
      })
    }
  },

  

  history_search: function(){
    wx.navigateTo({
      url: "/pages/clockInHistory/clockInHistory",
    })
  },

  
  

})
