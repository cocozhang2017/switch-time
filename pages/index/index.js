//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    checked: true,
    show: "",
    hiddenmodalput: true,
    carts: [], // 列表
    result: '', //二维码数据
    id: {},
    hasList: false, // 列表是否有数据
    selectAllStatus: false, // 全选状态，默认全选
    prodId: '',
    prodName: ''

  },
  onLoad: function() {
    var jsonData = require('./data.js');
    const data = jsonData.dataList.devices;
    console.log(data);
    wx.request({
      url: 'https://onenet.switch.tablemedia.net/api/device/status',
      data: data,
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function(res) {
        console.log(res);

        if (res.statusCode == 200) {

        } else {
          //something to do
        }
      },
      fail: function(res) {
        console.log(res);
      }

    })
    this.setData({
      hasList: true, // 既然有数据了，那设为true吧
      carts: data
    });
  },
  // 选择事件
  selectList(e) {
    let selectAllStatus = this.data.selectAllStatus;
    const index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    let carts = this.data.carts; // 获取列表
    console.log(carts);
    const selected = carts[index].selected; // 获取当前商品的选中状态
    console.log(index);
    carts[index].selected = !selected; // 改变状态
    var flag = 0; //选中的个数
    for (var i = 0; i < carts.length; i++) {
      flag += carts[i].selected;
    }
    console.log(flag);
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
  // 手动添加
  prodId: function(e) {
    this.setData({
      prodId: e.detail.value
    })
  },
  prodName: function(e) {
    this.setData({
      prodName: e.detail.value
    })
  },

  // 扫码
  qrcode: function() {
    var _this = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        var result = res.result; //所扫码的内容
        var carts = _this.data.carts;
         for(var i=0;i<carts.length;i++){
          console.log(carts);
           if (result == carts[i].key) {
            console.log(carts[i].key==result);
            _this.setData({
              carts: carts
            }) 
            return; 
          } else if (carts[i].key != result && carts.indexOf(carts[i]) == -1) {
            let cart = {
              key: '860344046442142',
              deviceId: '529309404',
              apiKey: 'obtX43VAkFWsBcpUdGiDqFHultc=',
              checked: true,
              status: '在线',
              rssi: '31',
            };
            carts.push(cart);
            _this.setData({
              carts: carts
            })
            return; 
          } 
         
        }
      }
    });
  },
  // 点击开关on
  open: function(e) {
    var that = this;
    var Index = e.currentTarget.dataset.index;
    let carts = that.data.carts; // 获取列表
    let datav = { "deviceId": "", "apiKey": "", "command": "" };
    for (let i in carts) {
      //遍历列表数据      
      if (i == Index) {
        //根据下标找到目标,改变状态  
        if (carts[i].checked == true) {
          carts[i].command =[1];
          carts[i].status = "关闭";
          carts[i].checked=false;
          datav.command = carts[i].command;
          datav.deviceId = carts[i].deviceId;
          datav.apiKey = carts[i].apiKey
          console.log(datav);
        }
      }
    }
    var id = that.data.id;
    console.log(id);
    that.setData({
      carts: carts
    });
    console.log(carts);
        wx.request({
          url: 'https://onenet.switch.tablemedia.net/api/device/command/sync/toggle_switch',
          data: datav,
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          success: function(res) {
            var resd = res.data
            console.log(resd);
            var com = resd.Ctrl2;
            // id.command = com;
            app.globalData.id = datav;
            // if (id.command == com) {
              that.setData({
                checked: false
              })
            // }
            if (res.statusCode == 200) {
              wx.navigateTo({
                url: '/pages/home/home'
              })
            } else {
              //something to do
            }
          },
          fail: function(res) {
            console.log(res);
          }

        })

    //   }
    // }

  },
  // 点击单个关
  close: function(e) {
    var that = this;
    var Index = e.currentTarget.dataset.index;
    console.log(Index);
    let carts = that.data.carts; // 获取列表
    let datav = { "deviceId": "", "apiKey": "", "command": "" };
    for (let i in carts) {
      //遍历列表数据      
      if (i == Index) {
        //根据下标找到目标,改变状态  
        if (carts[i].checked == false ) {
          carts[i].command = [0];
          carts[i].checked = true; 
          carts[i].status = "在线";
          datav.command = carts[i].command;
          datav.deviceId = carts[i].deviceId;
          datav.apiKey = carts[i].apiKey
          console.log(datav);
        }
      }
    }
    var id = that.data.id;
    that.setData({
      carts: carts
    });
    console.log(carts);
    wx.request({
      url: 'https://onenet.switch.tablemedia.net/api/device/command/sync/toggle_switch',
      data: datav,
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        var resd = res.data
        console.log(resd);
        var com = resd.Ctrl2;
        id.command = com;
        app.globalData.id = datav;
        // if (id.command == com) {
          that.setData({
            checked: false
          })
        // }
        if (res.statusCode == 200) {
          wx.navigateTo({
            url: '/pages/home/home'
          })
        } else {
          //something to do
        }
      },
      fail: function (res) {
        console.log(res);
      }

    })
  },
  // 批量开
  switchO: function(e) {
    let carts = this.data.carts; // 获取列表
    var Popen=[];
    var id = this.data.id;
    for (var i = 0; i < carts.length; i++) {
      id = carts[i];
      if(id&&carts[i].selected){
        carts[i].command=[1];
        Popen.push(carts[i]);
        console.log(Popen);
        let PPO=[];
        PPO = Popen.map(item=>({
          deviceId: item.deviceId,
          apiKey: item.apiKey,
          command:item.command
        }))
        console.log(PPO[0]);     
        wx.request({
          url: 'https://onenet.switch.tablemedia.net/api/device/command/sync/toggle_switch',
          data: PPO[0] ,
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          success: function (res) {
            console.log(res);
            id.command = 1;
            app.globalData.id = PPO[0];
            console.log(app.globalData.id);
            if (res.statusCode == 200) {
              wx.navigateTo({
                url: '/pages/home/home'
              })
            } else {
              //something to do
            }
          },
          fail: function (res) {
            console.log(res);
          }

        })
      }
    }
  
  
    // 获取选择框的内容

  },
  // 批量关
  switchC: function() {
    let carts = this.data.carts; // 获取列表
    var Popen = [];
    var id = this.data.id;
    for (var i = 0; i < carts.length; i++) {
      id = carts[i];
      if (id && carts[i].selected) {
        carts[i].command = [0];
        Popen.push(carts[i]);
        console.log(Popen);
        let PPO = [];
        PPO = Popen.map(item => ({
          deviceId: item.deviceId,
          apiKey: item.apiKey,
          command: item.command
        }))
        console.log(PPO[0]);
        wx.request({
          url: 'https://onenet.switch.tablemedia.net/api/device/command/sync/toggle_switch',
          data: PPO[0],
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          success: function (res) {
            console.log(res);
            id.command = 1;
            app.globalData.id = PPO[0];
            console.log(app.globalData.id);
            if (res.statusCode == 200) {
              wx.navigateTo({
                url: '/pages/home/home'
              })
            } else {
              //something to do
            }
          },
          fail: function (res) {
            console.log(res);
          }

        })
      }
    }



  },
  addClick: function() {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮 
  cancel: function() {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认 
  confirm: function(e) {
    let carts = this.data.carts;
    let addObject = {
      deviceId: '',
      apiKey: ''
    };
    addObject.apiKey = this.data.prodName;
    addObject.deviceId = this.data.prodId;
    carts.push(addObject);
    console.log(carts);
    this.setData({
      hiddenmodalput: true,
      carts: carts

    })
  },
  ai:function(){
    wx.navigateTo({
      url: '/pages/home/home'
    })
  }
})