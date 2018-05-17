//获取应用实例
var app = getApp()
Page({
  data: {
    page: 1,
    VideosData: [],
    array: [],
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.config.videocountUrl,
      data: {
        userid: app.globalData.login.Userid,
        key: app.globalData.login.Key,
        topicid: 0,
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

    wx.request({
      url: app.config.videoUrl,
      data: {
        userid: app.globalData.login.Userid,
        key: app.globalData.login.Key,
        topicid: 0,
        start: 0,
        count: 6,
      },
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      success: (res) => {
        console.log("admin获取用户，返回：", res)
        var all = new Array()
        if (res.data.Code == 200) {
          this.setData({
            VideosData: res.data.data
          })
          console.log(res.data.data)
        } else {
          console.log('admin request user error')
        }
      },
      fail: function (fail) {
        console.log(fail)
      },
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
  },
  bindPickerChange: function (e) {
    var that = this
    console.log("bindPickerChange:", e)
    if (e.detail.value == 0) {
      return
    }

    var page = Number(e.detail.value) + 1
    wx.request({
      url: app.config.videoUrl,
      data: {
        userid: app.globalData.login.Userid,
        key: app.globalData.login.Key,
        start: 6 * (page - 1),
        count: 6,
      },
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      success: (res) => {
        console.log("admin获取视频，返回：", res)
        var all = new Array()
        if (res.data.Code == 200) {
          this.setData({
            VideosData: res.data.data
          })
          console.log(res.data.data)
        } else {
          console.log('admin request user error')
        }
      },
      fail: function (fail) {
        console.log(fail)
      },
    })
  },
})