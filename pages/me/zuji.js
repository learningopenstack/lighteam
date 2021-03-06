//获取应用实例
var app = getApp()
Page({
  data: {
    zujiData:[],
  },
  onLoad: function (options) {
    var that = this;
    var url = app.config.gethistoryUrl;
    var params = { userid: app.globalData.login.Userid, key: app.globalData.login.Key };
    app.wxRequest.getRequest(url, params).
      then(res => {
        console.log("history videos: ", res.data.data)
        that.setData({
          zujiData: res.data.data,
        })
      })
      .catch(res => {
        console.log('错误信息', res)
      })
      .finally(function (res) {
        console.log('finally~')
        wx.hideLoading();
      })
  },

  openVideo: function(e){
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