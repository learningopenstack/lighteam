//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    //获取code 
    console.log(app.globalData)
  },

  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    this.setData({
      userInfo: app.globalData.userInfo,
      word: app.globalData.login.Words
    })
  },

  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },

  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: '有材- 孩子们的分享社区', // 分享标题
      desc: 'desc', // 分享描述
      path: '/pages/index/index' // 分享路径
    }
  },

})