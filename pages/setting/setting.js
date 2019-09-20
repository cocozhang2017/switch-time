// /页面的初始数据   */
const app = getApp()
Page({
  data: {
    select: false,
    ids: null,
    id:'',
    index:0,
    array: ['开', '关'],
    status:'开'
  },
  onLoad: function (options) {
    var that=this;
    var id= app.globalData.id;
    console.log(id);
    var ids = id.deviceId.toString();
    wx.showModal({
      title: '提示',
      content: ids,
      success: function (res) {
        if (res.confirm) {
          that.data.ids = ids;
          console.log(that.data.ids);
        } else {
          console.log('弹框后点取消')
        }
      }
    });
    this.setData({
      ids: ids,
      id:id
    });

  },
  // 上电
  bindPickerChange: function (e) {
    var status=this.data.status;
    var id=this.data.id;
    console.log(id);
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];  //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去  
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if(e.detail.value==1){
       id.command =1;
    }else {
       id.command = 0;
    }
    this.setData({
      index: e.detail.value,
      id:id
    });
    console.log(id);
    prevPage.setData({
       id: id //当前选择的好友名字赋值给编辑款项中的姓名临时变量
    });
  
  },
 
})