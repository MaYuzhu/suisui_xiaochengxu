// pages/subject/subject.js
const app = getApp()
const url = app.globalData.url
Page({
  
  data: {
    showModalStatus: false,//左侧边栏
    xuanxiang:[
      //'从来没有','有时出现，但不是每周一次','至少每周一次'
    ],
    title:'--',
    tihao_index:[],
    number : 0,
    page: {
      number:1,
      size:1
    },
    question:'',
    question_id:'',
    number_curr:1,
    total_size:1,
    img_src:[
      "../../images/youjiantou.png",
      "../../images/youhui.png"
    ],
    isFirst:true,
    isLast:false,
    checked: false,
    arr_past:[],
    option_id:'',
    timer: '',
    countDownNum:'',
    time_m:'',
    time_s:'',
    time_show: false,
    scale_id: '',
    record_id:null,
    role_id: '',
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长
      timingFunction: "linear", //线性
      delay: 0 //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画：x轴不偏移；
    animation.translateX(0).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画：X轴偏移220px，停
      animation.translateX('100%').step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭抽屉
      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)

    // 显示抽屉
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.title)
    let that = this
    that.setData({
      number: options.number,
      title: options.title,
      countDownNum: options.countDownNum,
      role_id: options.roleId,
      scale_id: options.number,
    })
    that.getQuestion()
    that.getTihao()
    //获取record_id
    wx.request({
      url: url + 'record/save?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: {
        scale_id: options.number,
        role_id: options.roleId,
      },
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        //console.log(res)
        that.setData({
          record_id: res.data.record_id
        })
      }
    })

  },
  //翻页
  next_page:function(){
    let that = this
    let page_number = that.data.page.number+1
    //console.log(page_number)
    that.setData({
      page: {
        number: page_number,
        size: 1
      },
      isFirst: page_number == 1 ? true : false,
      isLast: page_number == that.data.total_size ? true : false,
    })
    that.getQuestion()
  },
  prev_page: function () {
    let that = this
    let page_number = that.data.page.number -1 
    that.setData({
      page: {
        number: page_number,
        size: 1
      },
      isFirst: page_number == 1 ? true : false,
      isLast: page_number == that.data.total_size ? true : false,
    })
    that.getQuestion()
  },
  getQuestion:function(){
    let that = this
    //请求得到问题
    that.setData({checked:false})
    wx.request({
      url: url + 'question/list?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: {
        scale_id: that.data.number,
        with_option: true,
        paging: true,
        page: that.data.page,
      },
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        //console.log(res)
        if (res.data.results.length<1){
          return false
        }
        that.setData({
          question: res.data.results[0].content,
          question_id: res.data.results[0].question_id,
          xuanxiang: res.data.results[0].options,
          total_size: res.data.total_size,
          
        })
        //如果答过，回显勾选
        let arr_question_id = that.data.arr_past.map(item =>{
          return item.question_num
        })
        
        if (arr_question_id.indexOf(res.data.results[0].question_id)>-1){
          let arr_option = that.data.arr_past.filter((item) => { return item.question_num == res.data.results[0].question_id})
          that.setData({option_id: arr_option[0].val_id})
          
        }
      }
    })
  },

  getTihao:function(){
    let that = this
    //请求得到问题
    wx.request({
      url: url + 'question/list?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: {
        scale_id: that.data.number,
        with_option: true,
        paging: true,
        page: that.data.page,
      },
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        //console.log(res)
        let arr_tihao = []
        for (let i = 1; i <= res.data.total_size;i++){
          arr_tihao.push({num:i,isChecked:false})
        }
        that.setData({
          tihao_index: arr_tihao
        })
      }
    })
  },

  radioChange:function(e){
    let that = this
    let val_id = e.detail.value 
    let question_num = that.data.question_id
    let isP = that.data.arr_past.filter((item) => {return item.question_num == question_num})
    
    if (isP.length>0){
      let indexOf = (that.data.arr_past || []).findIndex((item) => item.question_num == question_num)
      that.data.arr_past[indexOf] = { question_num: question_num, val_id: val_id}
      
    }else{
      that.data.arr_past.push({ question_num: question_num, val_id: val_id })
    }
    
    that.data.tihao_index[that.data.page.number-1].isChecked = true
    
    that.setData({
      tihao_index: that.data.tihao_index
    })
    //提交结果
    let details = [{
      question_id: question_num,
      option_id: val_id,
  
    }]
    
    wx.request({
      url: url + 'record/save?session_id=' + wx.getStorageSync('session_id'),
      method: "POST",
      data: {
        record_id: that.data.record_id,
        scale_id: that.data.number,
        role_id: that.data.role_id,
        details: details,
      },
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      success: (res) => {
        //that.setData({ record_id: res.data.record_id})
      }
    })

  },
  //跳到问题
  goto_question: function(e){
    let that = this
    let page_number = e.currentTarget.dataset.id
    that.setData({
      page: {
        number: page_number,
        size: 1
      },
      isFirst: page_number == 1 ? true : false,
      isLast: page_number == that.data.total_size ? true : false,
    })
    that.getQuestion()
    that.powerDrawer(e)
  },
  //倒计时
  count_down: function () {
    let that = this;
    let countDownNum = that.data.countDownNum * 60
    that.setData({
      timer: setInterval(function () {
      
        countDownNum--
        that.setData({
          countDownNum: countDownNum,
          time_m: parseInt(countDownNum / 60) < 10 ? '0' + parseInt(countDownNum / 60) : parseInt(countDownNum / 60),
          time_s: countDownNum % 60 < 10 ? '0' + countDownNum % 60 : countDownNum % 60
        })
        if (countDownNum == 0) {
          clearInterval(that.data.timer)
          that.setData({
            countDownNum:0,
            time_m: '',
            time_s: '',
            time_show: true,
          })
          wx.showModal({

            title: '',
            content: '时间到，请点击确定提交结果',
            showCancel: false,         //是否显示取消按钮
            cancelText: "",             //默认是“取消”
            cancelColor: '',         //取消文字的颜色
            confirmText: "确定",         //默认是“确定”
            confirmColor: '#999999',  //确定文字的颜色
            success: function (res) {

              if (res.confirm) {//这里是点击了确定以后

                wx.request({
                  url: url + 'record/save?session_id=' + wx.getStorageSync('session_id'),
                  method: "POST",
                  data: {
                    scale_id: that.data.scale_id,
                    role_id: that.data.role_id,
                    record_id: that.data.record_id,
                    complete: true
                  },
                  header: {
                    "Content-Type": "application/json;charset=UTF-8"
                  },
                  success: (res) => {
                    console.log(res)
                    wx.showToast({
                      title: '提交成功',
                      icon: 'success',
                      duration: 800,
                      mask: true
                    })
                    setTimeout(() => wx.navigateBack(), 800)
                  }
                })

              } else {

                

              }

            }

          })
        }
      }, 1000)
    })
  },
  //结束
  commit_over: function(){
    let that = this
    let num_not = this.data.tihao_index.length - this.data.arr_past.length
    let content_text
    if (num_not==0){
      content_text = '确定提交吗？'
    }else{
      content_text = '还有' + num_not + '个问题没有回答，确定提交？'
    }
    wx.showModal({

      title: '',
      content: content_text,
      showCancel: true,//是否显示取消按钮
      cancelText: "取消",//默认是“取消”
      cancelColor: '#aaa',//取消文字的颜色
      confirmText: "确定",//默认是“确定”
      confirmColor: '#c2c212',//确定文字的颜色
      success: function (res) {

        if (res.confirm) {//这里是点击了确定以后

          wx.request({
            url: url + 'record/save?session_id=' + wx.getStorageSync('session_id'),
            method: "POST",
            data: {
              scale_id: that.data.scale_id,
              role_id: that.data.role_id,
              record_id: that.data.record_id,
              complete: true
            },
            header: {
              "Content-Type": "application/json;charset=UTF-8"
            },
            success: (res) => {
              //console.log(res)
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 800,
                mask: true
              })
              setTimeout(() => wx.navigateBack(), 800)
            }
          })

          

        } else {//这里是点击了取消以后

          console.log('用户点击取消')

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
    this.count_down()
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
    let that = this
    clearInterval(that.data.timer)
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