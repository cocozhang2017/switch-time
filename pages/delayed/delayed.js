const app = getApp();
Page({
  data: {
    hiddenmodalput: true,
    floorstatus:true,
    hiddenName: true,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  addTime: function() {
     wx.navigateTo({
      url: '../component/Date/date'
    })
  },
  onLoad: function () {
  },
  bindChange: function () {
   
  }

})