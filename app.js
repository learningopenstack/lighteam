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
        login: null
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
                var wxGetUserInfo = wxApi.wxGetUserInfo()
                return wxGetUserInfo()

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