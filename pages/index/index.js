//获取应用实例
var app = getApp()
Page({
    data: {
        showBox: true,
        imgUrls: [
            'https://cephcp.ztgame.com.cn/lighteam/roll1.jpeg',
            'https://cephcp.ztgame.com.cn/lighteam/roll2.jpeg',
            'https://cephcp.ztgame.com.cn/lighteam/roll3.jpeg',
            'https://cephcp.ztgame.com.cn/lighteam/roll4.jpeg',
        ],
        domainImg: app.config.domain,
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
    },
    openVideo: function(e) {
        var Name = e.currentTarget.dataset.Name;
        wx.navigateTo({
            url: '../video/video',
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
    tryhotvideo: function() {
        var that = this;
        wx.showLoading({
            title: '努力加载中...',
        })
        that.setData({
            hotvideoLoading: true,
            hotvideodisabled: true
        })
        var url = app.config.getTryHotVideoUrl;
        var params = {};
        app.wxRequest.getRequest(url, params).
        then(res => {
                console.log('3.获取热门视频"试一试"列表', res);
                that.setData({
                    HotVideoData: res.data.data,
                    hotvideoLoading: false,
                    hotvideodisabled: false
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
    hotvideo: function() {
        var that = this;
        wx.showLoading({
            title: '努力加载中...',
        })
        that.setData({
            hotvideoLoading: true,
            hotvideodisabled: true
        })
        var url = app.config.getHotVideoUrl;
        var params = {};
        app.wxRequest.getRequest(url, params).
        then(res => {
                console.log('2.获取热门视频列表', res);
                that.setData({
                    HotVideoData: res.data.data,
                    hotvideoLoading: false,
                    hotvideodisabled: false
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
    tryhottopic: function() {
        var that = this;
        that.setData({
            hottopicLoading: true,
            hottopicdisabled: true
        })
        wx.showLoading({
            title: '努力加载中...',
        })
        var url = app.config.getTryHotTopicUrl;
        var params = {};
        app.wxRequest.getRequest(url, params).
        then(res => {
                console.log('3.获取热门主题"试一试"列表', res);
                that.setData({
                    HotTopicData: res.data.data,
                    hottopicLoading: false,
                    hottopicdisabled: false
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
    hottopic: function() {
        var that = this;
        that.setData({
            hottopicLoading: true
        })
        wx.showLoading({
            title: '努力加载中...',
        })
        var url = app.config.getHotTopicUrl;
        var params = {};
        app.wxRequest.getRequest(url, params).
        then(res => {
                console.log('2.获取热门主题列表', res);
                that.setData({
                    HotTopicData: res.data.data,
                    hottopicLoading: false
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
    changeIndicatorDots: function(e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function(e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange: function(e) {
        this.setData({
            interval: e.detail.value
        })
    },
    durationChange: function(e) {
        this.setData({
            duration: e.detail.value
        })
    },
    onLoad: function(options) {
        // 生命周期函数--监听页面加载
        this.hotvideo();
        this.hottopic();
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
    }
})