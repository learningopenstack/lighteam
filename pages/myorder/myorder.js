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
        array: [1,2,3],
        flags:[],
        currentTab2: 0,
        count: 0,
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

    openVideo: function (e) {
      console.log('openvideo;')
      console.log(e)
      console.log("end")
      var item = e.currentTarget.dataset.name;
      console.log(item)

      wx.navigateTo({
        url: '../video/video?id=' + item.Vid + '&name=' + item.Vname + '&title=' + item.Vtitle + '&view=' + item.Vview + '&zan=' + item.Vzan,
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
          var flags = that.data.navbar[order].Flags
          that.setData({
            flags: flags
          })
          console.log("flags:", flags)
          console.log("topicid;", topicid)
          //发送请求获取视频信息：
          wx.request({
            url: app.config.getClassesVideo,
            data: {
              topicid: topicid,
              flag: that.data.flags[order],
              start: 0,
              count: 3,
            },
            method: 'GET',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },

            success: (res) => {
              console.log("获取视频分类：", res)
              var all = new Array()
              if (res.data.Code == 200) {
                for(var i=1; i<res.data.data.All/3+1; i++){
                  all.push(i)
                }

                this.setData({
                  currenttopic: topicname,
                  info: res.data.data.Base,
                  array: all,
                  count: all.length,
                })
                console.log("next page:", all)
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

    addzan: function (e) {
      var that = this
      console.log("addzan :", e)
      var item = e.currentTarget.dataset.item
      var Info = that.data.info 
      if (app.globalData.zanmap.has(Info[item].Vid)) {
        if (app.globalData.zanmap.get(Info[item].Vid)) { //已点过赞了；
          app.globalData.zanmap.set(Info[item].Vid, false)
          
          Info[item].Vzan = Info[item].Vzan - 1
          Info[item].Vsecond=0
          that.setData({
            info: Info
          })
        } else {
          app.globalData.zanmap.set(Info[item].Vid, true)
          Info[item].Vzan = Info[item].Vzan + 1
          Info[item].Vsecond = 1
          that.setData({
            info: Info
          })
        }
      } else {
        app.globalData.zanmap.set(Info[item].Vid, true)
        app.globalData.zanmap[Info[item].Vid] = true;
        Info[item].Vzan = Info[item].Vzan + 1
        Info[item].Vsecond = 1
        that.setData({
          info: Info
        })
      }
      wx.request({
        url: app.config.addzan,
        data: {
          userid: app.globalData.login.Userid,
          key: app.globalData.login.Key,
          vid: that.data.info[item].Vid,
          zan: that.data.info[item].Vzan,
        },
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: (res) => {
          console.log("admin获取视频总数，返回：", res)
          if (res.data.Code == 200) {
            console.log("res:", res)
          } else {
            console.log('admin request user error')
          }
        },
        fail: function (fail) {
          console.log(fail)
        },
      })
    },

    bindPickerChange: function(e){
      var that = this
      console.log("bindPickerChange:",e)
      if(e.detail.value == 0){
        return
      }

      var page =Number(e.detail.value) + 1
      console.log("order: ", order)
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
          start: 3 * (page -1),
          flag: that.data.flags[that.data.currentTab2],
          count: 3,
        },
        method: 'GET',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },

        success: (res) => {
          console.log("bindPikerChanger：", res)
          var all = new Array()

          if (res.data.Code == 200) {
            for (var i = 1; i < res.data.data.All / 3 + 1; i++) {
              all.push(i)
            }

            this.setData({
              currenttopic: topicname,
              info: res.data.data.Base,
              array: all,
              total: all.length,
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

    navbarTap2: function (e) {
      var that = this;
      that.setData({
        currentTab2: e.currentTarget.dataset.idx,
      })
      var order = that.data.currentTab
      var topicid = that.data.navbar[order].Id

      //发送请求
      var infos = new Array()
      //发送请求获取视频信息：
      wx.request({
        url: app.config.getClassesVideo,
        data: {
          topicid: topicid,
          flag: that.data.flags[that.data.currentTab2],
          start: 0,
          count: 3,
        },
        method: 'GET',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },

        success: (res) => {
          console.log("navbarTap2 return：", res)
          if (res.data.Code == 200) {
            var all = new Array()
            for (var i = 1; i < res.data.data.All / 3 + 1; i++) {
              all.push(i)
            }

            this.setData({
              info: res.data.data.Base,
              array: all,
              total: res.data.data.All,
            })
            console.log("array: ", all, " total:", all.length)
          } else {
            console.log('request topicinfo error')
          }
        },
        fail: function (fail) {
          console.log(fail)
        },
      })
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
      var flags = that.data.navbar[order].Flags
      that.setData({
        flags: flags
      })
      console.log("topicid;", topicid)
      var infos = new Array()
      //发送请求获取视频信息：
      wx.request({
        url: app.config.getClassesVideo,
        data: {
          topicid: topicid,
          flag: that.data.flags[0],
          start: 0,
          count: 3,
        },
        method: 'GET',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },

        success: (res) => {
          console.log("navbarTap：", res)
          if (res.data.Code == 200) {
            var all = new Array()
            for (var i = 1; i < res.data.data.All / 3 + 1; i++) {
              all.push(i)
            }

            this.setData({
              info: res.data.data.Base,
              array: all,
              total: res.data.data.All,
            })
            console.log("array: ", all, " total:", all.length)
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