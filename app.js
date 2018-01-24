import config from 'utils/config'
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
        login:null
    },
    
    bindToIndex: function() { //返回首页
        wx.reLaunch({
            url: '/pages/index/index',
        })
    },
    /**
     * 用户登录
     */
    
    login: function(fn) {
        var that = this;
        var code, session_id;
        var wxLogin = wxApi.wxLogin()
        wxLogin().then(res => {
            
            console.log(res)
            //1.获取code
            console.log('1.获取code')
            code = res.code;
            console.log(code);
            wx.getUserInfo({
                success: function (res) {
                    console.log(res.userInfo);
                    that.globalData.userInfo=res.userInfo;
                }, fail(res) {
                    console.log(res, '获取用户信息失败')
                }
            })
            var url = config.getSessionIdUrl;
            var params = {
                    code: res.code,
                    imgurl: that.globalData.avatarUrl,
                    nickname: that.globalData.nickName
                }
                //2.获取word
            return wxRequest.postRequest(url, params)
        }).
        then(res => {

            console.log(res);
            that.globalData.login=res.data.data
           
        })
        .catch(res => {
            console.log(res)
            
        })
        .finally(function(res) {
            console.log('finally~')
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