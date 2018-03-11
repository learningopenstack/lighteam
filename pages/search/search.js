//index.js
var WxSearch = require('../wxSearch/wxSearch.js');
var app = getApp()

Page({
  data: { searchValue: '' },

  // 搜索栏
  onLoad: function () {
    var that = this;
    var url = app.config.hotsearch
    var params = {};
    app.wxRequest.getRequest(url, params).
      then(res => {
        console.log('热点搜索：', res)
        var infos = new Array()
        infos = res.data.data
        /*
        for(var i=0; i<res.data.data.length; i++){
          infos.push(res.data.data[i].Title)
        }*/
        WxSearch.init(
          that,  // 本页面一个引用
          infos, // 热点搜索推荐，[]表示不使用
          ['湖北', '湖南', '北京', "南京"],// 搜索匹配，[]表示不使用
          that.mySearchFunction, // 提供一个搜索回调函数
          that.myGobackFunction //提供一个返回回调函数
        );
      })
      .catch(res => {
        console.log('错误信息', res)
      })
      .finally(function (res) {
        console.log('finally~')
      })


  },

  // 转发函数,固定部分
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数

  // 搜索回调函数  
  mySearchFunction: function (value, id) {
    console.log("mySearchFunction: ", value, "id:", id)
    // do your job here
    // 跳转
    var url = app.config.search
    var params = {}
    if (value==null){
      params = {title: "", id: id};
    }else if(id==null){
      params = {title: value, id: -1}
    }else{
      return
    }
    app.wxRequest.getRequest(url, params).
      then(res => {
        console.log('热点搜索返回：', res)
        app.globalData.mysearchvideos = res.data.data
        wx.navigateTo({
          url: '../wxSearch/show',
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
      })
      .catch(res => {
        console.log('错误信息', res)
      })
      .finally(function (res) {
        console.log('finally~')
      })

  },

  // 返回回调函数
  myGobackFunction: function () {
    // do your job here
    // 跳转
    wx.redirectTo({
      url: '../index/index?searchValue=返回'
    })
  }

})