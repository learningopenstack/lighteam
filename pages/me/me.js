//获取应用实例
var app = getApp()
Page({
    data: {
        userInfo: {},
        word: '',
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
          url: '/image/article.png',
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
            txt: '关于悦町'
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
            word: app.globalData.login.Words
        })
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
      }
    },

    myvideo:function(){
      var that = this
      var url = app.config.myvideo
      var params = { userid: app.globalData.login.Userid, key: app.globalData.login.Key};
      app.wxRequest.getRequest(url, params).
        then(res => {
          console.log('获取我的视频', res)
          app.globalData.myvideos = res.data.data
          //调转到视频页面
          wx.navigateTo({
            url: '../video/myvideo',
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

    onShareAppMessage: function() {
        // 用户点击右上角分享
        return {
            title: 'title', // 分享标题
            desc: 'desc', // 分享描述
            path: 'path' // 分享路径
        }
    }
})