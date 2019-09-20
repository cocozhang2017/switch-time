//获取应用实例
const app = getApp()

Page({
  data: {
    id: {},
    ids: '',
    status: '',
    checked: true,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onShow: function(options) {
    var id = app.globalData.id;
    console.log(id);
    var status = this.data.status;
    var checked = this.data.checked;
    if (id.command == 1) {
      status = "关闭",
        checked = false

    } else {
      status = "在线",
        checked = true
    }
    console.log(id);
    this.setData({
      id: id,
      status: status,
      checked: checked
    })

  },
  // 设备设置
  settingPage: function() {
    let id = this.data.id;
    let ids = this.data.ids;
    ids = id.command;
    // 下达开通的指令
    if (ids == 1) {
      wx.navigateTo({
        url: '../setting/setting?ids=' + ids
      })

      // 下达关闭指令
    } else if (idcommand == 0) {
      wx.navigateTo({
        url: '../setting/setting?ids=' + ids
      })
    }

  },
  // 设备开  ON
  open: function() {
    var id = this.data.id;
    console.log(id);
    if (id.command == 1) {
      wx.request({
        url: 'https://onenet.switch.tablemedia.net/api/device/command/sync/toggle_switch',
        data: {
          "deviceId": "529309405", //必填，设备ID
          "apiKey": "aLhj7X9ctPH4NGKbtZucbrXD0tc=", //必填，设备APIKEY
          "command": [0, 1, 2, 2], //必填，开关操作类型，0代表不连通，1代表连通，2代表不进行任何操作
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function(res) {
          console.log(res.data.data);
          var resd = res.data.data;
          if (res.statusCode == 200) {
            this.setData({
              checked: false,
              status: "关闭"
            });
          } else {
            //something to do
          }
        },
        fail: function(res) {
          console.log(res);
        }

      })
    }

  },

  //  设备关 OFF
  close: function() {
    var id = this.data.id;
    if (id.command == 0) {
      wx.request({
        url: 'https://onenet.switch.tablemedia.net/api/device/command/sync/toggle_switch',
        data: {
          "deviceId": "529309405", //必填，设备ID
          "apiKey": "aLhj7X9ctPH4NGKbtZucbrXD0tc=", //必填，设备APIKEY
          "command": [0, 1, 2, 2], //必填，开关操作类型，0代表不连通，1代表连通，2代表不进行任何操作
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function(res) {
          console.log(res.data.data);
          var resd = res.data.data;
          if (res.statusCode == 200) {
            this.setData({
              checked: true,
              status: "在线"
            });
          } else {
            //something to do
          }
        },
        fail: function(res) {
          console.log(res);
        }

      })

    }
  }

})