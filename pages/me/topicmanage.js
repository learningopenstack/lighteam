//获取应用实例
var app = getApp()
Page({
  data: {
    Info: [],
    hiddenToast: true,
    total: 0,
    array: [],
    page: 1,
    hiddenmodalput: true,
    hiddenmodalput2: true,
    hiddenToast:true,
  },

  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.config.topicsUrl,
      data: {
        userid: app.globalData.login.Userid,
        key: app.globalData.login.Key,
      },
      mothod: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: (res) => {
        console.log("admin get topicInfo：", res)
        if (res.data.Code == 200) {
          that.setData({
            Info: res.data.data
          })
          console.log("Info:", res.data.data)
        }
      },
      fail: function (fail) {
        console.log(fail)
      },
    })
  },
  toastHidden: function () {
    this.setData({
      hiddenToast: true
    })
  },

  deltopic: function (e) {
    var that=this
    console.log("deltopic", e)
    wx.showModal({
      title: '提示',
      content: '确认删除该主题?',
      success:function(res){
       if(res.confirm){
        console.log('用户点击确认')
        topicid = e.currentTarget.dataset.id
        //发送请求删除主题
        wx.request({
          url: app.config.topicdel,
          data: {
            userid: app.globalData.login.Userid,
            key: app.globalData.login.Key,
            topicid: topicid,
          },
          mothod: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: (res) => {
            console.log("admin get topicInfo：", res)
            if (res.data.Code == 200) {
              that.setData({
                hiddenToast: false,
              })
              console.log("Info:", res.data.data)
            }
          },
          fail: function (fail) {
            console.log(fail)
          },
        })
      }else if(res.cancel)
        console.log("用户点击取消")
      },
      fail:function(fail){
        console.log("fail")
      }
    })
  },

  delflag: function (e) {
    console.log("delflag", e)
    name = e.currentTarget.dataset.name
    wx.showModal({
      title: '提示',
      content: '确认删除该标记',
      success: function (res) {
        if (res.confirm) {
          //发送请求删除标记
          wx.request({
            url: app.config.flagdel,
            data: {
              userid: app.globalData.login.Userid,
              key: app.globalData.login.Key,
              name: name,
            },
            mothod: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: (res) => {
              console.log("admin get topicInfo：", res)
              if (res.data.Code == 200) {
                that.setData({
                  hiddenToast: false,
                })
                console.log("Info:", res.data.data)
              }
            },
            fail: function (fail) {
              console.log(fail)
            },
          })
        } else if (res.cancel)
          console.log("用户点击取消")
      },
      fail: function (fail) {
        console.log("fail")
      }
    })
  },

  onBindInput: function (e) {
    console.log("onBindInput:", e)
    this.setData({ inputValue: e.detail.value });
  },



  //点击按钮痰喘指定的hiddenmodalput弹出框  
  addtopic: function (e) {
    console.log("inputdata:",)
    this.setData({
      hiddenmodalput: false
    })
  },
  //取消按钮  
  cancel: function (e) {
    console.log("cancel,", e)
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function (e) {
    var that = this
    console.log("value:", that.data.inputValue)
    console.log("confirm:", e)
    console.log("info:", that.data.Info)
    this.setData({
      hiddenmodalput: true,
    })
    //发送请求添加主题
    wx.request({
      url: app.config.topicadd,
      data: {
        userid: app.globalData.login.Userid,
        key: app.globalData.login.Key,
        topicname: that.data.inputValue,
      },
      mothod: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: (res) => {
        console.log("admin new topic:", res)
        if (res.data.Code == 200) {
          that.setData({
            hiddenToast: false,
          })
          console.log("Info:", res.data.data)
        }
      },
      fail: function (fail) {
        console.log(fail)
      },
    })
  }, 

  //点击按钮痰喘指定的hiddenmodalput弹出框  
  addflag: function (e) {
    this.setData({
      hiddenmodalput2: false
    })
  },
  //取消按钮  
  cancel2: function (e) {
    console.log("cancel,", e)
    this.setData({
      hiddenmodalput2: true
    });
  },
  //确认  
  confirm2: function (e) {
    var that=this
    console.log("value:", that.data.inputValue)
    console.log("confirm:", e)
  
    this.setData({
      hiddenmodalput2: true,
    })
  }, 
})