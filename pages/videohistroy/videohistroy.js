//获取应用实例
var app = getApp()
Page({
  data: {
    page: 1,
    VideosData: [],
    array: [],
    have: false,
  },
  onLoad: function (options) {
    var that = this;
    var have = 0;
    wx.request({
      url: app.config.myvideocountUrl,
      data: {
        userid: app.globalData.login.Userid,
        key: app.globalData.login.Key,
      },
      mothod: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log("我的上传获取视频总数，返回：", res)
        var arr = new Array()
        if (res.data.Code == 200) {
          arr = new Array()
          var max = 0
          have = res.data.data
          for (var i = 0; i < res.data.data / 6; i++) {
            arr.push(i + 1)
            max = i
          }
          that.setData({
            array: arr,
            page: max,
            have:  res.data.data,
          })
          console.log("arr:", arr, "page:", max)
          console.log("have:", have, "data.have:", that.data.have)
          if (have > 0) {
            wx.request({
              url: app.config.myvideo,
              data: {
                userid: app.globalData.login.Userid,
                key: app.globalData.login.Key,
                start: 0,
                count: 6,
              },
              method: 'GET',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },

              success: function (res) {
                console.log("我的上传视频记录，返回：", res)
                var all = new Array()
                if (res.data.Code == 200) {
                  that.setData({
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
          }
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