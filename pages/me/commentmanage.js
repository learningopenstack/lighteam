//获取应用实例
var app = getApp()
Page({
  data: {
    Info: [],
    hiddenToast: true,
    total: 0,
    array: [],
    page: 1,
  },
  
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.config.commentcountUrl,
      data: {
        userid: app.globalData.login.Userid,
        key: app.globalData.login.Key,
      },
      mothod: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: (res) => {
        console.log("admin获取评论总数，返回：", res)
        var arr = new Array()
        if (res.data.Code == 200) {
          arr = new Array()
          for (var i = 0; i < res.data.data / 10; i++) {
            arr.push(i + 1)
          }
          this.setData({
            array: arr,
            page: arr.length,
          })
          console.log("arr:", arr)
        } else {
          console.log('admin request user error')
        }
      },
      fail: function (fail) {
        console.log(fail)
      },
    })

    //获取用户视频评论
    var url = app.config.getVideoComment;
    var params = { userid: app.globalData.login.Userid, key: app.globalData.login.Key, start: 1, count: 10, videoid: 0};
    app.wxRequest.getRequest(url, params).
      then(res => {
        console.log('admin获取评论列表', res);
        that.setData({
          allcomment: res.data.data.All,
          Info: res.data.data.Info
        })

        var comments = new Array()
        comments = that.data.Info
        for (var i = 0; i < that.data.Info.length; i++) {
          console.log("Pic:", comments[i].Pic)
          for (var j = 0; j < that.data.Info[i].Pic.length; j++) {
            console.log("pic: ", that.data.Info[i].Pic[j], "j=", j)
            comments[i].Pic[j] = 'https://cephcp.ztgame.com.cn/lighteam/upload/pic/' + that.data.Info[i].Pic[j]
          }
        }
        console.log("comments: ", comments)
        that.setData({
          Info: comments
        })
        console.log("Info: ", that.data.Info)
      })
      .catch(res => {
        console.log('错误信息', res)
      })
      .finally(function (res) {
        console.log('finally~')
        wx.hideLoading();
      })
  },
  toastHidden: function () {
    this.setData({
      hiddenToast: true
    })
  },

  del: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认删除该主题?',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确认')
          console.log("admin comment delete:", e)
          var commentid = e.currentTarget.dataset.id;
          wx.request({
            url: app.config.commentdelete,
            data: {
              userid: app.globalData.login.Userid,
              key: app.globalData.login.Key,
              commentid: commentid,
            },
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: (res) => {
              if (res.data.Code == 200) {
                that.setData({
                  hiddenToast: false,
                })
                var info = that.data.Info
                for(var i=0; i<that.data.Info.length; i++){
                  console.log("info.Id", info[i].Id)
                  console.log("commentid:", commentid)
                  if(info[i].Id == parseInt(commentid) ){
                    info.splice(i, 1)
                    break;
                  }
                }
                that.setData({
                  Info: info
                })
                console.log("Info:", that.data.Info)
                console.log("info:", info)
              }
            },
            fail: function (fail) {
              console.log(fail)
            },
          })
        } else if (res.cancel)
          console.log("用户点击取消")
      },
      fail: function (fail) {
        console.log("fail")
      }
    })
  },

    //  bindPickerChange : function (e) {
    bindPickerChange: function(e){
    var that = this
    console.log("bindPickerChange:", e)
    if (e.detail.value == 0) {
      return
    }

    var page = Number(e.detail.value) + 1
    var url = app.config.getVideoComment;
    var params = { userid: app.globalData.login.Userid, key: app.globalData.login.Key, start:  10 * (page - 1), count: 10, videoid: 0 };
    app.wxRequest.getRequest(url, params).
      then(res => {
        console.log('admin获取评论列表', res);
        that.setData({
          allcomment: res.data.data.All,
          Info: res.data.data.Info
        })
        var comments = new Array()
        comments = that.data.Info
        for (var i = 0; i < that.data.Info.length; i++) {
          console.log("Pic:", comments[i].Pic)
          for (var j = 0; j < that.data.Info[i].Pic.length; j++) {
            console.log("pic: ", that.data.Info[i].Pic[j], "j=", j)
            comments[i].Pic[j] = 'https://cephcp.ztgame.com.cn/lighteam/upload/pic/' + that.data.Info[i].Pic[j]
          }
        }
        console.log("comments: ", comments)
        that.setData({
          Info: comments
        })
        console.log("Info: ", that.data.Info)
      })
      .catch(res => {
        console.log('错误信息', res)
      })
      .finally(function (res) {
        console.log('finally~')
        wx.hideLoading();
      })
    }
  })