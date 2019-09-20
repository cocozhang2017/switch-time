//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    show: "",
    hiddenmodalput: true,
    carts: [], // 列表
    hasList: false, // 列表是否有数据
    selectAllStatus: false, // 全选状态，默认全选
    prodId: '',
    prodName: ''

  },
  onShow() {
    this.setData({
      hasList: true, // 既然有数据了，那设为true吧
      carts: [{ deviceId: 529309405, apiKey: 'abcdef', command: '../images/switchO.png' }]
    });
  },
  // 选择事件
  selectList(e) {
    let selectAllStatus = this.data.selectAllStatus;
    const index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    let carts = this.data.carts; // 获取列表
    const selected = carts[index].selected; // 获取当前商品的选中状态
    carts[index].selected = !selected; // 改变状态
    var flag = 0; //选中的个数
    for (var i = 0; i < carts.length; i++) {
      flag += carts[i].selected;
    }
    if (carts.length === flag) {
      selectAllStatus = true;
    } else {
      selectAllStatus = false;
    }
    this.setData({
      carts: carts,
      selectAllStatus: selectAllStatus
    });
  },

  // 全选
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus; // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;
    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus; // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 手动添加
  prodId: function (e) {
    this.setData({
      prodId: e.detail.value
    })
  },
  prodName: function (e) {
    this.setData({
      prodName: e.detail.value
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // 扫码
  qrcode: function () {
    var that = this;
    wx.scanCode({ //扫描API
      success(res) { //扫描成功
        console.log(res) //输出回调信息
        that.setData({
          show: res.result
        });
        wx.showToast({
          title: '成功',
          duration: 1000
        })
      }
    })
  },
  // 批量开
  switchO: function () {
    wx.request({
      url: 'https://onenet.switch.tablemedia.net/api/device/command/sync/toggle_switch',
      data: {
        "deviceId": "900256", //必填，设备ID
        "apiKey": "CorrectApiKey", //必填，设备APIKEY
        "command": [0, 1, 2, 2], //必填，开关操作类型，0代表不连通，1代表连通，2代表不进行任何操作
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          wx.switchTab({
            url: '/pages/home/home'
          })
        }
        else {
          //something to do
        }
      },
      fail: function (res) {
        console.log(res);
      }

    })

  },
  // 批量关
  switchC: function () {
    wx.request({
      url: 'https://onenet.switch.tablemedia.net/api/device/command/sync/toggle_switch',
      data: {
        "deviceId": "900256", //必填，设备ID
        "apiKey": "CorrectApiKey", //必填，设备APIKEY
        "command": 0, //必填，开关操作类型，0代表不连通，1代表连通，2代表不进行任何操作
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        if (res.data.ret == 200) {
          wx.switchTab({
            url: '/pages/share/share'
          })
        }
        else {
          //something to do
        }
      },
      fail: function (res) {
        console.log(res);
      }

    })

  },
  addClick: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮 
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认 
  confirm: function (e) {
    let carts = this.data.carts;
    let addObject = {
      id: '',
      key: ''
    };
    addObject.key = this.data.prodName;
    addObject.id = this.data.prodId;
    carts.push(addObject);
    this.setData({
      hiddenmodalput: true,
      carts: carts

    })
  }
})