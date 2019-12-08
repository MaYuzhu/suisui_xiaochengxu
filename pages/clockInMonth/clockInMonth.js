// pages/clockInMonth/clockInMonth.js
import F2 from '@antv/wx-f2'; // 注：也可以不引入， initChart 方法已经将 F2 传入，如果需要引入，注意需要安装 

let chart = null;
var name_list = [];

//写一个测试数组 6*31
let arr1 = []
let arr2 = []
let arr3 = []
let arr4 = []
let arr5 = []
let arr6 = []
for(let i=0;i<31;i++){
  arr1.push({
    name: i+1,
    type: '1',
    sales: random(0, 8),
    sort: i
  })
  arr2.push({
    name: i + 1,
    type: '2',
    sales: random(0, 8),
    sort: i
  })
  arr3.push({
    name: i + 1,
    type: '3',
    sales: random(0, 8),
    sort: i
  })
  arr4.push({
    name: i + 1,
    type: '4',
    sales: random(0, 8),
    sort: i
  })
  arr5.push({
    name: i + 1,
    type: '5',
    sales: random(0, 8),
    sort: i
  })
  arr6.push({
    name: i + 1,
    type: '6',
    sales: random(0, 8),
    sort: i
  })
}
//console.log(arr1)
var sumData = [];
sumData = sumData.concat(arr1).concat(arr2).concat(arr3).concat(arr4).concat(arr5).concat(arr6);
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function initChart(canvas, width, height, F2) {
  const data1 = [
    {
      name: "张三",
      type: '1',
      sales: "45",
      sort: 0
    },
    {
      name: "小夏",
      sales: "55",
      type: '1',
      sort: 1
    },
    {
      name: "小黄",
      sales: "65", type: '1',
      sort: 2
    },
    {
      name: "小兰",
      sales: "55", type: '1',
      sort: 3
    },
    {
      name: "小资",
      sales: "50", type: '1',
      sort: 4
    },
    {
      name: "王二",
      sales: "70", type: '1',
      sort: 5
    },
    {
      name: "王2二",
      sales: "70", type: '1',
      sort: 6
    },
    {
      name: "王a2二", type: '1',
      sales: "70",
      sort: 7
    },
      {
        name: "张三",
        sales: "55", type: '2',
        sort: 0
      },
      {
        name: "小夏", type: '2',
        sales: "58",
        sort: 1
      },
      {
        name: "小黄",
        sales: "45", type: '2',
        sort: 2
      },
      {
        name: "小兰",
        sales: "57", type: '2',
        sort: 3
      },
      {
        name: "小资",
        sales: "20", type: '2',
        sort: 4
      },
      {
        name: "王二",
        sales: "78", type: '2',
        sort: 5
      },
      {
        name: "王2二",
        sales: "60", type: '2',
        sort: 6
      },
      {
        name: "王a2二", type: '2',
        sales: "55",
        sort: 7
      },
  ]
  let data = sumData

  data.map(function (item) {
    name_list.push(item.name)
  })
  var chart = new F2.Chart({
    el: canvas,
    width,
    height,
    animate: true
  })
  chart.source(data, {
    sort: {
      type: "linear",
      // 滚动条包含几个
      min: 0,
      max: 8,
      // 传入不同的sort转换对应的名字
      formatter: function (val) {
        return name_list[val]
      }
    }

  });

  // chart.legend(true);

  chart.tooltip({
    showCrosshairs: true,
    showItemMarker: false,
  });

  chart.point().position("sort*sales").color("type")
  chart.line().position("sort*sales").shape('smooth').color("type");
  // 按照x轴滑动
  chart.interaction('pan');
  // 定义进度条
  chart.scrollBar({
    mode: 'x',
    xStyle: {
      offsetY: -5
    }
  });
  chart.render()
  return chart
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    opts: {
      onInit: initChart
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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