//获取应用实例
var app = getApp()
Page({
    data: {
        userInfo: {},
        word: '',
        role: 0,
        ActionList: [{
            id: 1,
            name: 'notice',
            url: '/image/notice.png',
            txt: '系统通知'
        }, {
            id: 2,
            name: 'score',
            url: '/image/score.png',
            txt: '我的积分'
        },{
            id: 3,
            name: 'article',
            url: '/image/article.png',
            txt: '我的作品'
        },{
          id: 4,
          name: 'article',
          url: '/image/upload.png',
          txt: '上传入口'
        }, {
            id: 5,
            name: 'zuji',
            url: '/image/zuji.png',
            txt: '我的足迹'
        }, {
          　id: 6,
            name: 'about',
            url: '/image/about.png',
            //url:'/image/about.jpg',
            txt: '关于悦町'
        }],
        AdminAction: [{
          id: 10,
          name: 'userslist',
          url: '/image/notice.png',
          txt: '用户管理'
        }, {
          id: 11,
          name: 'videolist',
          url: '/image/notice.png',
          txt: '视频管理'
        }, {
          id: 12,
          name: 'topicadd',
          url: '/image/notice.png',
          txt: '主题管理'
        }, {
          id: 13,
          name: 'comment',
          url: '/image/notice.png',
          txt: '评论管理'
        }]
    },
    onLoad: function(options) {
        // 生命周期函数--监听页面加载
        //获取code 
        console.log(app.globalData)
    },

    onReady: function() {
        // 生命周期函数--监听页面初次渲染完成

    },
    onShow: function() {
        // 生命周期函数--监听页面显示
        this.setData({
            userInfo: app.globalData.userInfo,
            role: app.globalData.login.Role,
            word: app.globalData.login.Words
        })
        console.log("user role:", app.globalData.login.Role)
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

    action: function(event){
      console.log(event)
      console.log("id = ", event.currentTarget.dataset.id)
      
      if (event.currentTarget.dataset.id==3){
        this.myvideo()
      }else if(event.currentTarget.dataset.id==4){
        this.uploadvideo()
      }else if(event.currentTarget.dataset.id==1){
        this.notice()
      }else if(event.currentTarget.dataset.id==2){
        this.score()
      } else if (event.currentTarget.dataset.id == 5) {
        console.log('zuji')
        this.zuji()
      } else if (event.currentTarget.dataset.id == 6) {
        this.about()
      } else if (event.currentTarget.dataset.id == 10) {
        this.usermanage()
      } else if (event.currentTarget.dataset.id == 11) {
        this.videomanage()
      } else if (event.currentTarget.dataset.id == 12) {
        this.topicmanage()
      } else if (event.currentTarget.dataset.id == 13) {
        this.commentmanage()
      }
    },

    usermanage:function(){
      wx.navigateTo({
        url: '../me/usermanage',
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

    videomanage:function() {
      wx.navigateTo({
        url: '../me/videomanage',
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
    topicmanage: function () {
      wx.navigateTo({
        url: '../me/topicmanage',
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
    commentmanage: function () {
      wx.navigateTo({
        url: '../me/commentmanage',
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

    zuji:function(){
      wx.navigateTo({
        url: '../me/zuji',
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

    about: function(){
      wx.navigateTo({
        url: '../me/about',
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

    score:function(){
      wx.navigateTo({
        url: '../me/score',
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

    notice: function(){
      wx.navigateTo({
        url: '../me/notice',
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
    uploadvideo: function(){
      //调转到视频页面
      wx.navigateTo({
        url: '../add/add',
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

    myvideo:function(){
      wx.navigateTo({
        url: '../videohistroy/videohistroy',
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

    Myvideo:function(){
      var that = this
      var url = app.config.myvideo
      var params = { userid: app.globalData.login.Userid, key: app.globalData.login.Key};
      app.wxRequest.getRequest(url, params).
        then(res => {
          console.log('获取我的视频', res)
          app.globalData.myvideos = res.data.data
          //调转到视频页面
          wx.navigateTo({
            url: '../videohistroy/videohistroy',
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
          /*
          that.setData({
            HotVideoData: res.data.data,
            hotvideoLoading: false,
            hotvideodisabled: false
          })*/
          console.log(app.globalData.myvideos)
        })
        .catch(res => {
          console.log('错误信息', res)
        })
        .finally(function (res) {
          console.log('finally~')
          //wx.hideLoading();
        })
    },

    onShareAppMessage: function () {
      // 用户点击右上角分享
      return {
        title: '有材- 孩子们的分享社区', // 分享标题
        desc: 'desc', // 分享描述
        path: '/pages/index/index' // 分享路径
      }
    },

    bindKeyInput: function (e) {
      var that = this
      that.setData({
        word: e.detail.value
      })
      var that = this
      var url = app.config.saveword;
      var params = { userid: app.globalData.login.Userid, key: app.globalData.login.Key, word: that.data.word };
      app.wxRequest.postRequest(url, params).
        then(res => {
          console.log('提交说说：', res);
        })
        .catch(res => {
          console.log('错误信息', res)
          return false;
        })
        .finally(function (res) {
          console.log('finally~')
        }) 
        console.log("now word :", that.data.word)
        app.globalData.login.Words = that.data.word
    },
})