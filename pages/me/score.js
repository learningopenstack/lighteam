//获取应用实例
var app = getApp()
Page({
  data: {
    score: 0
  },
  onLoad: function (options) {
    /*
    var that = this;
    var url = app.config.getnoticeUrl;
    // var params = { userid: app.globalData.login.Userid, key: app.globalData.login.Key };
    var params='';
    app.wxRequest.getRequest(url, params).
      then(res => {
        console.log('noticedata', res.data.data)
        that.setData({
          score: res.data.data,
        })
      })
      .catch(res => {
        console.log('错误信息', res)
      })
      .finally(function (res) {
        console.log('finally~')
        wx.hideLoading();
      })
      */
  },
})