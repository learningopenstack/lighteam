//获取应用实例
var app = getApp()
Page({
  data: {
    UserData: [],
    hiddenToast: true,
    total: 0,
    array: [],
    page: 1,
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.config.usercount,
      data: {
        userid: app.globalData.login.Userid,
        key: app.globalData.login.Key,
      },
      mothod: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: (res) => {
        console.log("admin获取用户总数，返回：", res)
        var arr = new Array()
        if (res.data.Code == 200) {
          arr = new Array()
          var max = 0
          for (var i=0; i<res.data.data/10; i++){
            arr.push(i+1) 
            max  = i
          }
          this.setData({
            array: arr,
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
      url: app.config.userlist,
      data: {
        userid: app.globalData.login.Userid, 
        key: app.globalData.login.Key,
        start: 10 * (that.data.page - 1),
        count: 10,
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
            UserData : res.data.data
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

  bindPickerChange: function (e) {
  var that = this
      console.log("bindPickerChange:", e)
      if(e.detail.value == 0) {
    return
  }

      var page = Number(e.detail.value) + 1
      wx.request({
        url: app.config.userlist,
        data: {
          userid: app.globalData.login.Userid,
          key: app.globalData.login.Key,
          start: 10 * (page - 1),
          count: 10,
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
              UserData: res.data.data
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
  setUser: function(e){
    console.log("setUser:", e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../me/showvideo?uid=' + id,
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

  setadmin: function(e){
    var that = this
    console.log("unsetadmin: ", e)
    var id = e.currentTarget.dataset.id
    wx.request({
      url: app.config.userAdmin,
      data: {
        userid: app.globalData.login.Userid,
        key: app.globalData.login.Key,
        uid: id,
        role: 1,
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      success: (res) => {
        console.log("admin获取用户，返回：", res)
        var all = new Array()
        if (res.data.Code == 200) {
          var info = that.data.UserData
          for (var i = 0; i < info.length; i++){
            if(info[i].Id==id){
              info[i].Role = 1
            }
          }
          that.setData({
            UserData: info,
            hiddenToast: false
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

  unsetadmin: function(e){
    var that = this
    console.log("unsetadmin: ", e)
    var id = e.currentTarget.dataset.id
    wx.request({
      url: app.config.userAdmin,
      data: {
        userid: app.globalData.login.Userid,
        key: app.globalData.login.Key,
        uid: id,
        role: 0,
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      success: (res) => {
        console.log("admin获取用户，返回：", res)
        var all = new Array()
        if (res.data.Code == 200) {
          var info = that.data.UserData
          for (var i = 0; i < info.length; i++) {
            if (info[i].Id == id) {
              info[i].Role = 0
            }
          }
          that.setData({
            UserData: info,
            hiddenToast: false
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
  toastHidden: function () {
    this.setData({
      hiddenToast: true
    })
  },
})