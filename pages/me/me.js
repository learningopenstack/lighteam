//获取应用实例
var app = getApp()
Page({
    data: {
        userInfo: {},
        word: '',
        ActionList: [{
            name: 'notice',
            url: '/image/notice.png',
            txt: '系统通知'
        }, {
            name: 'score',
            url: '/image/score.png',
            txt: '积分'
        }, {
            name: 'zuji',
            url: '/image/zuji.png',
            txt: '我的足迹'
        }, {
            name: 'article',
            url: '/image/article.png',
            txt: '我的作品'
        }, {
            name: 'about',
            url: '/image/about.png',
            txt: '关于'
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
    onShareAppMessage: function() {
        // 用户点击右上角分享
        return {
            title: 'title', // 分享标题
            desc: 'desc', // 分享描述
            path: 'path' // 分享路径
        }
    }
})