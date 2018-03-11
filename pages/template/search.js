//获取应用实例
var app = getApp()
Page({
    data: {
        showBox: true,

    },
    expendList: function() {
        var that = this;
        that.setData({
            showBox: !that.data.showBox
        });
        wx.showLoading({
            title: '努力加载中...',
        })
        var url = app.config.getClassesUrl;
        var params = {};
        app.wxRequest.getRequest(url, params).
        then(res => {
                console.log('1.获取分类信息列表', res);
                that.setData({
                    expendListData: res.data.data
                })
            })
            .catch(res => {
                console.log('错误信息', res)
            })
            .finally(function(res) {
                console.log('finally~')
                wx.hideLoading();
            })
    },

    onLoad: function(options) {
        // 生命周期函数--监听页面加载

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
    goSearch: function () {
      console.log("goSearch")
      // 跳转查询页面
      wx.navigateTo({
        url: '../search/search',
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