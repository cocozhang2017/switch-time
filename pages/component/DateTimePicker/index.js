const date = new Date()
const years = []
const months = []
const days = []
const hours = []
const minutes = []
var thisMon = date.getMonth();
var thisDay = date.getDate();
var thisHours = date.getHours();
var thisMinutes = date.getMinutes();
for (let i = 2010; i <= date.getFullYear() + 5; i++) {
  years.push(i)
}

for (let i = date.getMonth(); i <= 11; i++) {
  var k = i;
  if (0 <= i && i < 9) {
    k = "0" + (i + 1);
  } else {
    k = (i + 1);
  }
  months.push(k)
}
if (0 <= thisMon && thisMon < 9) {
  thisMon = "0" + (thisMon + 1);
} else {
  thisMon = (thisMon + 1);
}
if (0 <= thisDay && thisDay < 10) {
  thisDay = "0" + thisDay;
}

var totalDay = mGetDate(date.getFullYear(), thisMon);
for (let i = 1; i <= 31; i++) {
  var k = i;
  if (0 <= i && i < 10) {
    k = "0" + i
  }
  days.push(k)
}

for (let i = 0; i <= 23; i++) {
  var k = i;
  if (0 <= i && i < 10) {
    k = "0" + i
  }
  hours.push(k)
}
for (let i = 0; i <= 59; i++) {
  var k = i;
  if (0 <= i && i < 10) {
    k = "0" + i
  }
  minutes.push(k)
}

function mGetDate(year, month) {
  var d = new Date(year, month, 0);
  return d.getDate();
}

var app = getApp();
var api = app.globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    checkTime: date.getFullYear() + "-" + thisMon + "-" + thisDay + " " + thisHours + ":" + thisMinutes,
    //---时间控件参数
    flag: true,
    years: years,
    year: date.getFullYear(),
    months: months,
    month: thisMon,
    days: days,
    day: thisDay,
    value: [1, thisMon - 1, thisDay - 1, 0, 0],
    hours: hours,
    hour: thisHours,
    minutes: minutes,
    minute: thisMinutes,
    array: ['仅此一次', '重复'],
    index: 0,
    date: date,
    checked: 'ON',
    items: [{
        name: 'ON',
        checked: true
      },
      {
        name: 'OFF',
        checked: false
      },
    ],
    startTime: null,
    endTime: null,
    selected: { "monday": false, "tuesday": false, "friday": false, "wednesday": false, "thursday": false, "sunday": false, "saturday": false },
  },
  addTime: function() {
    this.setData({
      flag: false
    });
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      checked: e.detail.value
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  showModel: function(e) {
    this.setData({
      flag: false
    });
  },
  getTime: function(e) {
    var times = this.data.year + "-" + this.data.month + "-" + this.data.day + " " + this.data.hour + ":" + this.data.minute
    this.setData({
      flag: true,
      checkTime: times
    });
  },
  bindChange: function(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      hour: this.data.hours[val[3]],
      minute: this.data.minutes[val[4]],
      flag: false
    })
    var totalDay = mGetDate(this.data.year, this.data.month);
    var changeDate = [];
    for (let i = 1; i <= totalDay; i++) {
      var k = i;
      if (0 <= i && i < 10) {
        k = "0" + i
      }
      changeDate.push(k)
    }
    this.setData({
      days: changeDate
    })
  },
  // 点击提交信息到后台
  open: function() { //提交信息到后台
    // 当前选择时间
    var checkTime = this.data.checkTime;
    console.log(checkTime)
    // 0表示仅此一次,1表示重复
    var arrays = this.data.index;
    console.log(arrays)
    // on或者off
    var action = this.data.checked;
    console.log(action);
  //  alert('checkTime');
    var data = checkTime + arrays + action
    wx.showToast({
      title: '提交内容成功',
      content: data ,
      duration: 2000
    })

  },
  cancel: function () { //提交信息到后台
    // 当前选择时间
    var checkTime = this.data.checkTime;
    var checkTime ='';
    console.log(checkTime)
    // 0表示仅此一次,1表示重复
    var arrays = this.data.index;
    var arrays = '';
    console.log(arrays)
    // on或者off
    var action = this.data.checked;
    var action = '';
    console.log(action);
    var data = checkTime + arrays + action
    wx.showToast({
      title: '取消内容成功',
      content: data,
      duration: 2000
    })

  },
  bindTimeChange: function (e) {
    if (e.currentTarget.id == "startTime") {
      this.setData({ startTime: e.detail.value });
    } else if (e.currentTarget.id == "endTime") {
      this.setData({ endTime: e.detail.value });
    }
  },
  checkboxChange: function (e) {
    var selectedList = e.detail.value;
    var date = ["monday", "tuesday", "friday", "wednesday", "thursday", "sunday", "saturday"];//包含所有日期的数组
    var selected = this.data.selected;//先获取data中的值，好用来赋值
    for (var i = 0; i < date.length; i++) {
      if (selectedList.indexOf(date[i]) != -1) { //判断所有的日期date在所选择的列表中是否存在，存在则给class
        selected[date[i]] = true;
      } else {
        selected[date[i]] = false;
      }
    }
    this.setData({ selected: selected });
  },
  formSubmit: function (e) {
    //提交后台
    console.log(e);
  },
});