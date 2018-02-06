//获取应用实例
var app = getApp()
Page({
    data: {
        imgs: [],
        content: '',
        valLen: 0,
    },
    onLoad: function(options) {
        // 生命周期函数--监听页面加载
        //获取code 
        var that = this
        console.log(app.globalData)
        console.log("globalData")
        that.setData({
          vid: options.id,
          vurl: app.globalData.videourl + options.name,
          vtitle:options.title,
        })

        //获取用户视频评论
        var url = app.config.getVideoComment;
        var params = { start: 1, count: 3, videoid: options.id};
        app.wxRequest.getRequest(url, params).
          then(res => {
            console.log('视频播放页面获取评论列表', res);
            that.setData({
              allcomment: res.data.data.All,
              Info: res.data.data.Info
            })
          })
          .catch(res => {
            console.log('错误信息', res)
          })
          .finally(function (res) {
            console.log('finally~')
            wx.hideLoading();
          })
    },
    imageLoad: function(e) {
        var that = this;
        var imagewidth = e.detail.width, //获取图片真实宽度
            imageheight = e.detail.height
        that.setData({
            imagewidth: imagewidth,
            imageheight: imageheight
        })
    },
    chooseImage: function() {
        var that = this;
        if (that.data.imgs) {
            console.log(that.data.imgs)
        }
        var image = that.data.imgs.length;
        console.log('=======================')
        console.log(image)
        console.log('=======================') 
        var num = 5 - image;
        console.log(num)
        wx.chooseImage({
            count: num, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    disabled: false
                })
                var tempFilePaths = res.tempFilePaths
                wx.getImageInfo({
                    src: tempFilePaths[0],
                    success: function(res) {
                        console.log(res.width)
                        console.log(res.height)
                        var imgwidth = res.width;
                        var imgheight = res.height;
                        var scale = res.width / res.height;
                        that.setData({
                            imgwidth: res.width,
                            imgheight: res.height,
                            scale: res.width / res.height
                        })
                    }
                })
                console.log(tempFilePaths)

                var arr = [];
                for (var i = 0; i < tempFilePaths.length; i++) {
                    // app.upLoadImg(tempFilePaths[i], function(res) {
                    //     console.log('上传图片成功', res)
                    //     that.data.imgs.push(res.fileurl);
                    //     that.setData({
                    //         arr: that.data.imgs,
                    //         imgs: that.data.imgs
                    //     })
                    //     that.setData({
                    //         disabled: true
                    //     })

                    // }, function(res) {
                    //     console.log('上传图片失败', res)
                    //     app.showTip('上传图片失败');
                    // }, function() {

                    // })
                    that.data.imgs.push(tempFilePaths[i]);
                    that.setData({
                        arr: that.data.imgs,
                        imgs: that.data.imgs
                    })
                }

            }
        })
    },
    delete: function(e) {
        var that = this;
        var index = e.currentTarget.dataset.index;
        var imgs = that.data.imgs;
        console.log(imgs, imgs[index])
        imgs.splice(index, 1);
        that.setData({
            imgs: imgs
        })
    },
    onblur: function(e) {
        //去掉换行符\n
        var aStr = e.detail.value;
        this.setData({
            content: aStr,
            valLen: aStr.length
        })
    },
    bindPublish: function(e) {
        console.log(e)
        var that = this;
        var url = app.config.postComment;
        console.log(app.config)
        var params = { userid: app.globalData.login.Userid, key: app.globalData.login.Key, videoid: e.currentTarget.id, comment: that.data.content};
        app.wxRequest.postRequest(url, params).
          then(res => {
            console.log('提交评论，并获取上传key：', res);
            that.setData({
              uploadkey: res.data.data.Uploadkey,
            })

          //图片上传
          console.log('upload pic start')
          for (var i = 1; i <= that.data.arr.length; i++){
            wx.uploadFile({
              url: app.config.uploadfile,
              filePath: that.data.arr[i-1],
              name: 'file',
              formData:{
                uploadkey: that.data.uploadkey,
                order: i,
              },
              success: function(res){
                console.log("success upload")
                if (i==that.data.arr.length+1){
                  wx.showToast({
                    title: '提交成功',  //标题  
                    icon: 'success',  //图标，支持"success"、"loading"  
                    //image: '../image/img.png',  //自定义图标的本地路径，image 的优先级高于 icon  
                    duration: 2000, //提示的延迟时间，单位毫秒，默认：1500  
                    mask: true,  //是否显示透明蒙层，防止触摸穿透，默认：false  
                    success: function () { }, //接口调用成功的回调函数  
                    fail: function () { },  //接口调用失败的回调函数  
                    complete: function () { } //接口调用结束的回调函数  
                  })  
                }
              },
              fail: function(res){
                console.log('upload failed;')
              }
          })
          }

          that.setData({
            content: '',
            imgs:   [],
          })
          console.log('upload pic end')
          })
          .catch(res => {
            console.log('错误信息', res)
          })
          .finally(function (res) {
            console.log('finally~')
            wx.hideLoading();
          })
      console.log("comment info:")
      console.log(that.data.content)
      console.log(that.data.valLen)
      console.log(that.data.arr)
      console.log(that.data.imgs)
      console.log("imgs info end")
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