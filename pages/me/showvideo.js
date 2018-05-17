//获取应用实例
var app = getApp()
Page({
  data: {
    Data: [],
    array: [],
    all: 0,
    page: 1,
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.config.videocountUrl,
      data: {
        userid: app.globalData.login.Userid,
        key: app.globalData.login.Key,
        uid: options.uid
      },
      mothod: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: (res) => {
        console.log("admin获取视频总数，返回：", res)
        var arr = new Array()
        if (res.data.Code == 200) {
          arr = new Array()
          var max = 0
          for (var i = 0; i < res.data.data / 6; i++) {
            arr.push(i + 1)
            max = i
          }
          this.setData({
            array: arr,
            page: max,
            all: res.data.data
          })
          console.log("arr:", arr, "page:", max)
        } else {
          console.log('admin request user error')
        }
      },
      fail: function (fail) {
        console.log(fail)
      },
    })

    var url = app.config.videoUrl;
    var params = { userid: app.globalData.login.Userid, key: app.globalData.login.Key };
    params["uid"] = options.uid
    params["start"] = that.data.page - 1,
    params["count"] = 6,
    app.wxRequest.getRequest(url, params).
      then(res => {
        console.log("admin get videos: ", res.data.data)
        that.setData({
          Data: res.data.data,
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