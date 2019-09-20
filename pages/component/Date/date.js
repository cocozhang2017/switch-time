const date = new Date();
var year=date.getFullYear();
var thisMon = date.getMonth()+1;
var thisDay = date.getDate();
var thisHours = date.getHours();
var thisMinutes = date.getMinutes();
var seconds = date.getSeconds();
var dates = year + "-" + thisMon + "-" + thisDay + "-" + thisHours + ":" + thisMinutes+":"+seconds;
Page({
  data: {
    date:dates,
    index: 0,
    hour:'0',
    dateT:'30',
    time: '00:30',
    checked:'ON',
    items: [
      {
        name: 'ON',
        checked: true
      },
      {
        name: 'OFF',
        checked: false
      },
    ]
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      checked: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    const hour = e.detail.value.substring(1, 2);
    const dateT = e.detail.value.substring(3,5);
    this.setData({
      time: e.detail.value,
      dateT: dateT,
      hour:hour

    })
  },// 点击提交信息到后台
  open: function () { //提交信息到后台
    // 延时时间
    var checkTime = this.data.time;
    console.log(checkTime)
    // on或者off
    var action = this.data.checked;
    console.log(action);
    var data = checkTime +  action;
    wx.showToast({
      title: '提交内容成功',
      content: data,
      duration: 2000
    })

  },
  cancel: function () { //提交信息到后台
    // 延时时间
    var checkTime = this.data.time;
    var checkTime='';
    console.log(checkTime)
    // on或者off
    var action = this.data.checked;
    var action='';
    console.log(action);
    var data = checkTime + action;
    wx.showToast({
      title: '取消内容成功',
      content: data,
      duration: 2000
    })

  }
})