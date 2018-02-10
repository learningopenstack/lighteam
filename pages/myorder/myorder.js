//获取应用实例
var app = getApp()
Page({
    data: {
        showBox: true,
        navbar: ['自然物语', '手工坊', '小画廊', "创造家", '奇妙碰撞', '工程大师', '好心情'],
        currentTab: 0,
        currenttopic: '',
        info: [],
        show: ['半月维保', '季度维保', '半年维保', "年度维保", '55', '66', '77'],
    },
    expendList: function() {
        var that = this;
        that.setData({
            showBox: that.data.showBox
        });
        wx.showLoading({
            title: '努力加载中...',
        })

        /*
        wx.getSystemInfo({
          success: function (res) {
            var windowWidth = res.windowWidth;
            //video标签认宽度300px、高度225px，设置宽高需要通过wxss设置width和height。
            var videoHeight = (225 / 300) * windowWidth//屏幕高宽比  
            console.log('videoWidth: ' + windowWidth)
            console.log('videoHeight: ' + videoHeight)
            that.setData({
              videoWidth: windowWidth,
              videoHeight: videoHeight
            })
          }
        })

        var url = app.config.getClassesVideo;
        var params = {start: 1, count:3};
        app.wxRequest.getRequest(url, params).
        then(res => {
                console.log('社区页面获取分类列表', res);
                that.setData({
                    alltopic: res.data.data.All,
                    expendListData: res.data.data.Base
                })
            })
            .catch(res => {
                console.log('错误信息', res)
            })
            .finally(function(res) {
                console.log('finally~')
                wx.hideLoading();
            })
        */
        this.getTypes()
        wx.hideLoading()
    },

    getTypes: function () {
      var that = this
      var url = app.config.getClassType;
      var params = {};
      app.wxRequest.getRequest(url, params).
        then(res => {
          console.log('社区页面页面，返回主题分类：', res)
          that.setData({
            navbar: res.data.data
          })
          //获取分类视频信息
          var order = this.data.currentTab
          var topicid = that.data.navbar[order].Id
          var topicname = that.data.navbar[order].Name
          console.log("topicid;", topicid)
          //发送请求获取视频信息：
          wx.request({
            url: app.config.getClassesVideo,
            data: {
              topicid: topicid,
              start: 1,
              count: 3,
            },
            method: 'GET',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },

            success: (res) => {
              console.log("获取主题详情视频返回：", res)
              if (res.data.Code == 200) {
                this.setData({
                  currenttopic: topicname,
                  info: res.data.data.Base,
                  total: res.data.data.All
                })
              } else {
                console.log('request topicinfo error')
              }
            },
            fail: function (fail) {
              console.log(fail)
            },
          })
        })
        .catch(res => {
          console.log('错误信息', res)
        })
        .finally(function (res) {
          console.log('finally~')
          //wx.hideLoading();
        })
    },

    addvideo: function() {
        wx.navigateTo({
            url: '../add/add',
            success: function(res) {
                // success
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
    },

    waitplay: function(){
      wx.showLoading({
        title: '努力加载中...',
      })

      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    },

    onLoad: function(options) {
      // 生命周期函数--监听页面加载
      this.expendList()
    },

    onReady: function() {
        // 生命周期函数--监听页面初次渲染完成

    },
    onShow: function() {
        // 生命周期函数--监听页面显示

    },
    onHide: function() {
        // 生命周期函数--监听页面隐藏

    },
    onUnload: function() {
        // 生命周期函数--监听页面卸载

    },
    onPullDownRefresh: function() {
        // 页面相关事件处理函数--监听用户下拉动作

    },
    onReachBottom: function() {
        // 页面上拉触底事件的处理函数

    },
    onShareAppMessage: function() {
        // 用户点击右上角分享
        return {
            title: 'title', // 分享标题
            desc: 'desc', // 分享描述
            path: 'path' // 分享路径
        }
    },
    //响应点击导航栏
    navbarTap: function (e) {
      var that = this;
      that.setData({
        currentTab: e.currentTarget.dataset.idx,
      })
      var order = this.data.currentTab
      var topicid = that.data.navbar[order].Id
      var topicname = that.data.navbar[order].Name
      console.log("topicid;", topicid)
      var infos = new Array()
      //发送请求获取视频信息：
      wx.request({
        url: app.config.getClassesVideo,
        data: {
          topicid: topicid,
          start: 1,
          count: 3,
        },
        method: 'GET',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },

        success: (res) => {
          console.log("获取主题详情视频返回：", res)
          if (res.data.Code == 200) {
            this.setData({
              currenttopic: topicname,
              info: res.data.data.Base,
              total: res.data.data.All
            })
          } else {
            console.log('request topicinfo error')
          }
        },
        fail: function (fail) {
          console.log(fail)
        },
      })
    },

})