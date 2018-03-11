//获取应用实例
var app = getApp()
Page({
  data: {
    showData: [],
    size : 0,
  },
  onLoad: function (options) {
    var that = this;
    if(app.globalData.mysearchvideos==null){
      that.setData({
        size: 0
      })
    }else{
      that.setData({
        size: app.globalData.mysearchvideos.length
      })
    }
    that.setData({
      showData: app.globalData.mysearchvideos
    })
  },

  openVideo: function (e) {
    console.log('openvideo;')
    console.log(e)
    console.log("end")
    var item = e.currentTarget.dataset.name;
    console.log(item)

    wx.navigateTo({
      url: '../video/video?id=' + item.Id + '&name=' + item.Name + '&title=' + item.Title + '&view=' + item.View + '&zan=' + item.Zan,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }

})