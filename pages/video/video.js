//获取应用实例
var app = getApp()
Page({
    data: {
        imgs: [],
        content: '',
        valLen: 0,
        admin: false,
        testImgs: [],
        array: [],
    },
    onLoad: function(options) {
        // 生命周期函数--监听页面加载
        //获取code 
        var that = this
        //console.log(app.globalData)
        console.log("globalData:", app.globalData)

        if(app.globalData.exit==false && app.globalData.login.Role==1){
          that.setData({
            admin: true
          })
        }


        console.log("options", options)
        that.setData({
          vid: options.id,
          vurl: app.globalData.videourl + options.name,
          vtitle:options.title,
          vview: options.view,
          vzan: options.zan,
        })
        wx.setNavigationBarTitle({ title: options.title })
        if (app.globalData.zanmap.has(that.data.vid)) {
          if (app.globalData.zanmap.get(that.data.vid)) { //已点过赞了；
            that.setData({
              zan: true,
            })
          }
        }

        //获取用户视频评论
        var url = app.config.getVideoComment;
        var userid=0;
        if (app.globalData.exit==false){
          userid = app.globalData.login.Userid;
        }
        var params = { userid: userid, start: 0, count: 3, videoid: options.id};
        app.wxRequest.getRequest(url, params).
          then(res => {
            console.log('视频播放页面获取评论列表', res);
            /*
            var commentImgs = new Array()
            commentImgs = res.data.data.Info.Pic
            console.log("commentimgs:", commentImgs)
            for (var i=0; i<res.data.data.Info.Pic.length; i++){
              console.log("pic: ", res.data.data.Info.Pic[i] )
              commentImgs.push('https://cephcp.ztgame.com.cn/lighteam/upload/pic/' + res.data.data.Info.Pic[i])
            }
            console.log("commentimgs:", commentImgs)
            */
            var all = new Array()
              for (var i = 1; i < res.data.data.All / 3 + 1; i++) {
                all.push(i)
              }
            that.setData({
              allcomment: res.data.data.All,
              array: all,
              Info: res.data.data.Info,
            })
            
            var comments = new Array()
            comments =  that.data.Info
            for (var i=0; i<that.data.Info.length; i++){
              if (that.data.Info[i].Pic != null) {
                for (var j = 0; j < that.data.Info[i].Pic.length; j++) {
                  console.log("pic: ", that.data.Info[i].Pic[j], "j=", j)
                  comments[i].Pic[j] = 'https://cephcp.ztgame.com.cn/lighteam/upload/pic/' + that.data.Info[i].Pic[j]
                }
              }
            }
            console.log("comments: ", comments)
            that.setData({
              Info: comments
            })
            console.log("Info: ", that.data.Info)
          })
          .catch(res => {
            console.log('错误信息', res)
          })
          .finally(function (res) {
            console.log('finally~')
            wx.hideLoading();
          })
    },

    bindPickerChange:function(e){
      var that = this
      console.log("bindPickerChange:", e)
      if (e.detail.value == 0) {
        return
      }

      var page = Number(e.detail.value) + 1
      var url = app.config.getVideoComment;
      var userid = 0;
      if (app.globalData.exit == false) {
        userid = app.globalData.login.Userid;
      }
      var params = { userid: userid, start: 3 * (page - 1), count: 3, videoid: that.data.vid};
      app.wxRequest.getRequest(url, params).
        then(res => {
          console.log('视频播放页面获取评论列表', res);
          /*
          var commentImgs = new Array()
          commentImgs = res.data.data.Info.Pic
          console.log("commentimgs:", commentImgs)
          for (var i=0; i<res.data.data.Info.Pic.length; i++){
            console.log("pic: ", res.data.data.Info.Pic[i] )
            commentImgs.push('https://cephcp.ztgame.com.cn/lighteam/upload/pic/' + res.data.data.Info.Pic[i])
          }
          console.log("commentimgs:", commentImgs)
          */
          that.setData({
            Info: res.data.data.Info,
          })

          var comments = new Array()
          comments = that.data.Info
          for (var i = 0; i < that.data.Info.length; i++) {
            if (that.data.Info[i].Pic != null){
              for (var j = 0; j < that.data.Info[i].Pic.length; j++) {
                console.log("pic: ", that.data.Info[i].Pic[j], "j=", j)
                /*
                if(j==0){
                  comments[i].Pic.splice(0, comments[i].Pic.length) 
                }*/

                comments[i].Pic[j] = 'https://cephcp.ztgame.com.cn/lighteam/upload/pic/' + that.data.Info[i].Pic[j]
              }
            }
          }
          console.log("comments: ", comments)
          that.setData({
            Info: comments
          })
          console.log("Info: ", that.data.Info)
        })
        .catch(res => {
          console.log('错误信息', res)
        })
        .finally(function (res) {
          console.log('finally~')
          wx.hideLoading();
        })
    },

    addzan:function(e){
      var that = this
      console.log("addzan :", e, " zanmap:", app.globalData.zanmap)
      if(app.globalData.zanmap.has(that.data.vid)){
        if(app.globalData.zanmap.get(that.data.vid)){ //已点过赞了；
          app.globalData.zanmap.set(that.data.vid, false)
          that.setData({
            vzan: Number(that.data.vzan) - 1,
            zan: false,
          })
        }else{
          app.globalData.zanmap.set(that.data.vid, true)
          that.setData({
            zan: true,
            vzan: Number(that.data.vzan) + 1,
          })
        } 
      }else{
        app.globalData.zanmap.set(that.data.vid, true)
        app.globalData.zanmap[that.data.vid] = true;
        that.setData({
          zan: true,
          vzan: Number(that.data.vzan) + 1,
        })
      }
      wx.request({
        url: app.config.addzan,
        data: {
          //userid: app.globalData.login.Userid,
          //key: app.globalData.login.Key,
          vid: that.data.vid,
          zan: that.data.vzan,
        },
        method:'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: (res) => {
          console.log("admin获取视频总数，返回：", res)
          if (res.data.Code == 200) {
            console.log("res:", res)
          } else {
            console.log('admin request user error')
          }
        },
        fail: function (fail) {
          console.log(fail)
        },
      })
    },

    del: function(e){
      var that = this
      console.log("del video:", e)
      wx.request({
        url: app.config.videodel,
        data: {
          userid: app.globalData.login.Userid,
          key: app.globalData.login.Key,
          vid: that.data.vid,
        },
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: (res) => {
          console.log("admin获取视频总数，返回：", res)
          if (res.data.Code == 200) {
            console.log("res:", res)
            wx.navigateBack({//返回
              delta: 1
            })
          } else {
            console.log('admin request user error')
          }
        },
        fail: function (fail) {
          console.log(fail)
        },
      })
    },

    deepClone: function (data) {
      var type = getType(data);
      var obj;
      if (type === 'array') {
        obj = [];
      } else if (type === 'object') {
        obj = {};
      } else {
        //不再具有下一层次
        return data;
      }
      if (type === 'array') {
        for (var i = 0, len = data.length; i < len; i++) {
          obj.push(deepClone(data[i]));
        }
      } else if (type === 'object') {
        for (var key in data) {
          obj[key] = deepClone(data[key]);
        }
      }
      return obj;
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
        if(app.globalData.exit==true){
          wx.showModal({
            title: '友情提醒',
            content: '暂未获取您的授权，无法进行评论。请在[我的]进行授权',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          });
          return
        }
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
                //需要刷新页面来展示最新评论
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
    onShareAppMessage: function () {
      // 用户点击右上角分享
      return {
        title: '有材- 孩子们的分享社区', // 分享标题
        desc: 'desc', // 分享描述
        path: '/pages/index/index' // 分享路径
      }
    },
    previewImage: function (e) {
      var that = this,
        index = e.currentTarget.dataset.index;
        var images = e.currentTarget.dataset.images;
      wx.previewImage({
        current: images[index],
        urls: images
      })
    }
})