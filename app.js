import config from 'utils/config';
var wxApi = require('utils/wxApi')
var wxRequest = require('utils/wxRequest')
App({
    data: {
        userInfo: null
    },
    config: config, //应用配置信息
    wxRequest: wxRequest,
    wxApi: wxApi,
    globalData: { //全局数据
        userInfo: null,
        login: null,
        code: null,
        exit: false,
        myvideos: null,
        mysearchvideos: null,
        zanmap: new Map(),
        videourl:'https://cephcp.ztgame.com.cn/lighteam/upload/video/'
    },

    bindToIndex: function() { //返回首页
        wx.reLaunch({
            url: '/pages/index/index',
        })
    },
    /**
     * 用户登录
     */
    /*
    login: function(fn) {
        var that = this;
        var code;
        var wxLogin = wxApi.wxLogin()
        wxLogin().then(res => {
            console.log(res)
                //1.获取code
            console.log('1.获取code')
            code = res.code;
            console.log(code);
        }).
        then(res => {
                //2.获取用户信息
                console.log("=========")
                //var wxGetUserInfo = wxApi.wxGetUserInfo()
                //return wxGetUserInfo()

            })
            .then(res => {
                console.log('2.用户信息', res.userInfo);
                that.globalData.userInfo = res.userInfo;
                var url = config.getLoginUrl;
                var params = {
                    code: code,
                    imgurl: res.userInfo.avatarUrl,
                    nickname: res.userInfo.nickName
                }

                return wxRequest.postRequest(url, params)

            })
            .then(res => {
                //3.获取word
                that.globalData.login = res.data.data
            })
            .catch(res => {
                console.log(res)

            })
            .finally(function(res) {
                console.log('finally~')
            })
    },*/

    
    login: function(fn){
      var that = this;
      var code;
      var wxLogin = wxApi.wxLogin()
      wxLogin().then(res => {
        //1.获取code
        that.globalData.code = res.code
      }).
      then(res => {
        //判断是否授权
        wx.getSetting({ 
          success: res=> {
            if (res.authSetting['scope.userInfo']) {
              console.log('已经授权')
              // 已经授权，可以直接调用 getUserInfo 
                wx.getUserInfo({
                  success: res=>{
                    console.log("get UserInfo success")
                    that.globalData.userInfo = res.userInfo;
                    console.log("userinfo:", that.globalData.userInfo )
                    var url = config.getLoginUrl;
                    var params = {
                      code: code,
                      imgurl: res.userInfo.avatarUrl,
                      nickname: res.userInfo.nickName
                    }
                wxRequest.postRequest(url, params).
                then(res=> {
                //3.获取word
                  that.globalData.login = res.data.data
                })
                .catch(res => {
                  console.log('错误信息', res)
                  return false;
                })
                .finally(function (res) {
                  console.log('finally~')
                })
              }
            }) 
            } else {
              that.globalData.exit = true;
              //没有授权
              /*
              wx.showModal({
                title: '友情提醒',
                content: '暂未获取您的授权，为提升您的交互体验，请稍后再次进入并授权',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    that.globalData.exit = true
                    wx.navigateBack({
                      delta: 0
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                    that.globalData.exit=true
                  }
                }
              });*/
            }
          }
        })
      })
    },

    upLoadImg(imgUrl, success, fail, uploadtask) {
        var that = this;
        var session_id = wx.getStorageSync('PHPSESSID');
        const uploadTask = wx.uploadFile({
            url: that.data.domain + 'user/upLoadImg',
            header: { 'Accept': 'application/vnd.pinming.v1.0+json', 'content-type': 'multipart/form-data', 'Cookie': 'PHPSESSID=' + session_id },
            filePath: imgUrl,
            name: 'file',
            success: function(res) {
                console.log('成功', res)
                var data = JSON.parse(res.data);
                if (data.code == 0) {
                    success(data);
                } else {
                    fail(data);
                }
            },
            fail: function() {
                console.log('接口调用失败！')
                app.showTip("上传图片失败");
            }
        })
        uploadTask.onProgressUpdate((res) => {
            console.log('上传进度', res.progress)
            var data = JSON.parse(res.progress);
            uploadtask(data);

        })
    },
    /**
     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
     */
    onLaunch: function() {

    },

    /**
     * 当小程序启动，或从后台进入前台显示，会触发 onShow
     */
    onShow: function(options) {
        this.login();
    },

    /**
     * 当小程序从前台进入后台，会触发 onHide
     */
    onHide: function() {

    },

    /**
     * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
     */
    onError: function(msg) {

    }
})