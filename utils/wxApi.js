//var Promise = require('../plugins/es6-promise.js')

function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        //成功
        resolve(res)
      }
      obj.fail = function (res) {
        //失败
        reject(res)
      }
      fn(obj)
    })
  }
}
//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};

/**没有授权并提示 */

function notice() {
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
        that.globalData.exit = true
      }
    }
  });
};

/**
 * 微信用户登录,获取code
 */
function wxLogin() {
  return wxPromisify(wx.login)
}
/**
 * 获取微信用户信息
 * 注意:须在登录之后调用
 */
function wxGetUserInfo() {
  return wxPromisify(wx.getUserInfo)
}
/**
 * 获取系统信息
 */
function wxGetSystemInfo() {
  return wxPromisify(wx.getSystemInfo)
}

/**
 * 保留当前页面，跳转到应用内的某个页面
 * url:'../index/index'
 * params:{key:value1}
 */
function wxNavigateTo(url, params) {
  var wxNavigateTo = wxPromisify(wx.navigateTo)
  const serializedParams = this.paramSerializer(params)
  if (serializedParams.length > 0) {
    url += ((url.indexOf('?') == -1) ? '?' : '&') + serializedParams
  }
  return wxNavigateTo({
    url: url
  })
}
module.exports = {
  Promise: Promise,
  wxPromisify: wxPromisify,
  wxLogin: wxLogin,
  wxGetUserInfo: wxGetUserInfo,
  wxGetSystemInfo: wxGetSystemInfo
}
