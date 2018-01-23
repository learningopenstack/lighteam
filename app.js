import config from 'utils/config'
var wxApi = require('utils/wxApi')
var wxRequest = require('utils/wxRequest')
App({
    data: {

    },
    config: config, //应用配置信息
    wxRequest: wxRequest,
    wxApi: wxApi,
    globalData: { //全局数据
        userInfo: null
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
            //1.获取code
            console.log('1.获取code')
            console.log(res.code)
            code = res.code;
            var url = config.getSessionIdUrl;
            var params = {
                    code: res.code,
                }
                //2.获取sessionId
            return wxRequest.postRequest(url, params)
        }).
        then(res => {
            console.log('2.获取sessionId成功')
            console.log(res)
            session_id = res.data.session_id;
            //3.获取用户信息
            var wxGetUserInfo = wxApi.wxGetUserInfo()
            return wxGetUserInfo()
        }).
        then(res => {
            console.log('3.获取用户信息', session_id)
            console.log(res)
            var url = config.getNameAndPwd;
            var data = {
                session_id: session_id,
                encryptedData: res.encryptedData,
                iv: res.iv
            };
            //4.获取用户名和密码
            return wxRequest.postRequest(url, data)
        }).
        then(res => {
            console.log('4.获取用户名和密码')
            console.log(res)
            var url = config.getUserInfoUrl;
            var data = {
                userid: res.data.userid,
                pwdtemp: res.data.pwdtemp,

            };
            //5.获取台球8用户信息
            return wxRequest.postRequest(url, data)
        }).
        then(res => {
                console.log('5.获取台球八用户信息成功')
                console.log(res)
                that.globalData.userInfo = res.data;
                if (fn) {
                    fn(res.data);
                }
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