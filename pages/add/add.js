// pages/photo/add.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentPhoto: false,
        albumIndex: -1,
        albums: [],
        photos: [],
        pic: '',
        uploadkey: '',
        video: false,
        size: 0,
        //array: ['好心情', '花草', '虫鱼', '宠物'],
        array: [],
        names: [],
        index: 0,
        name: '',
        news: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      this.getTypes()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        var that = this;
        // wx.request({
        //     method: 'GET',
        //     url: 'http://xgh.local.com/xcx/albums',
        //     data: {
        //         fields: 'id,name'
        //     },
        //     header: {
        //         'content-type': 'application/json'
        //     },
        //     success: function (res) {
        //         that.setData({
        //             albums:res.data
        //         });
        //     },
        // })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    /*
     *获取类型
     * 
     */
    getTypes: function(){
      var that = this
      var url = app.config.getClassType;
      var params = {};
      app.wxRequest.getRequest(url, params).
        then(res => {
          console.log('上传视频页，获取视频分类', res)
          that.setData({
            array: res.data.data
          })
          /*
          that.setData({
            HotVideoData: res.data.data,
            hotvideoLoading: false,
            hotvideodisabled: false
          })*/
          console.log(res.data.data)
        })
        .catch(res => {
          console.log('错误信息', res)
        })
        .finally(function (res) {
          console.log('finally~')
          //wx.hideLoading();
        })
    },

  　

    /**
     * 选择 / 拍摄视频
     * @author abei<abei@nai8.me>
     */
    addVideo: function() {
        var that = this
        wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: 60,
            camera: 'back',
            success: function(res) {
                that.setData({
                    video: res.tempFilePath,
                    size: (res.size / (1024 * 1024)).toFixed(2)
                })
            }
        })
    },
    /**
     * 上传图片
     */
    chooseImage: function() {
        var that = this;
        var items = that.data.photos;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                items.push({
                  src: tempFilePaths[0]
                });

              /*
                for (var i = 0; i < tempFilePaths.length; i++) {
                    items.push({
                        src: tempFilePaths[i]
                    });
                }
              */

                that.setData({
                    albumIndex: 1,
                    pic: tempFilePaths[0],
                    photos: items
                });
            }
        })
    },

    previewImage: function(e) {
        var current = e.target.dataset.src

        wx.previewImage({
            current: current,
            urls: this.data.photos
        })
    },

    /**
     * 提交表单
     */
    formSubmit: function(e) {
        console.log("submit data start")
        var that = this;
      //获取视频名字／描述内容／类别
      //this.data.name　／this.data.news　／array[index]
        that.setData({
          topicid: 3,
        })
        console.log(that.data.photos)
        var desc = e.detail.value.desc;
        if (that.data.albumIndex < 0) {
            wx.showToast({
                title: '请选择相册',
            })
            return;
        }
       // var albumId = that.data.albums[that.data.albumIndex].id;

        if (that.data.photos.length == 0) {
            wx.showToast({
                title: '至少传一个图片',
            })
            return;
        }

        if (that.data.video == false) {
            wx.showToast({
              title: '请录制视频',
            })
            return false;
        }

        if (that.data.size > 1024 * 1024 * 20) {
            wx.showModal({
                title: '温馨提示',
                content: '很抱歉，视频最大允许20M，当前为' + (that.data.size / (1024 * 1024)).toFixed(2) + 'M'
            })
            return false;
        }

        wx.showLoading({ title: '提交中' })
        
        //获取key
        var url = app.config.getuploadkey;
        console.log(app.config)
        var params = { userid: app.globalData.login.Userid, key: app.globalData.login.Key, topicid: that.data.topicid, title: that.data.title, second: that.data.second };

        //var params = { userid: app.globalData.login.Userid, key: app.globalData.login.Key, topicid: 3, title: "title", second: "second" };
        app.wxRequest.postRequest(url, params).
          then(res => {
            console.log('提交topid，并获取上传key：', res);
            that.setData({
              uploadkey: res.data.data.Uploadkey,
            })
            console.log('key:', res.data.data.Uploadkey)
            that.uploadImage()
            that.uploadVideo()
          })
          .catch(res => {
            console.log('错误信息', res)
            wx.showToast({
              title: '上传错误，请重试',
            })
            return false;
          })
          .finally(function (res) {
            console.log('finally~')
          })
    
        // wx.request({
        //     method: 'POST',
        //     data: {
        //         album_id: albumId,
        //         description:desc
        //     },
        //     url: 'http://xgh.local.com/xcx/photos',
        //     header: {
        //         'content-type': 'application/x-www-form-urlencoded'
        //     },
        //     success: function (res) {

        //         if (res.statusCode == 201) {
        //             // 成功了
        //             var photos = that.data.photos;
        //             for (var i = 0; i < photos.length; i++) {
        //                 wx.showLoading({ title: '上传中'+(i+1) });
        //                 that.uploadImage(res.data,photos[i]);
        //             }

        //             wx.hideLoading();
        //             wx.showModal({
        //                 title: '小乖猴助手',
        //                 content: '发布照片成功',
        //                 cancelText:'继续上传',
        //                 confirmText:'返回相册',
        //                 success:function(r){
        //                     if (r.confirm) {

        //                     } else if (r.cancel) {

        //                         that.setData({
        //                             photos:[]
        //                         });
        //                     }
        //                 }
        //             })
        //         }else{
        //             wx.showModal({
        //                 title: '小乖猴助手',
        //                 content: res.data
        //             })
        //         }
        //     }
        // });
    },


    uploadImage: function() {
        var that = this;
        console.log("uploadImage start, key:", that.data.uploadkey)
        wx.uploadFile({
          url: app.config.uploadfile,
          filePath: that.data.pic,
          name: 'file',
          formData: {
            uploadkey: that.data.uploadkey,
            order: 0,
          },
          success: function (res) {
            console.log("success upload")
            console.log(res)
          },
          fail: function (res) {
            console.log('upload failed;')
          }
        })
    },

    uploadVideo: function () {
      var that = this;
      console.log("uploadImage start, key:", that.data.uploadkey)
      console.log("video file: ", that.data.video)
      wx.uploadFile({
        url: app.config.uploadvideo,
        filePath: that.data.video,
        name: 'video',
        formData: {
          uploadkey: that.data.uploadkey,
        },
        success: function (res) {
          console.log("success upload")
          console.log(res)
          that.setData({
            video: '',
            pic: '',
            title: '',
            second: '',
          })
        
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)

          wx.showToast({
            title: '上传成功，即将返回',
            icon: 'success',
            duration: 5000
          })

          setTimeout( function(){
          wx.navigateBack({//返回
            delta: 1
          }) }, 5000)
        },
        fail: function (res) {
          console.log('upload failed;')
        }
      })
    },

    bindPickerChange: function(e) {
        this.setData({
            albumIndex: e.detail.value
        })
    },

    //普通选择器的点击事件
    bindPickerChange２: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value
      })
    },
    //获取视频名字和描述内容
    nameInput: function (e) {
      this.setData({
        title: e.detail.value
      })
    },
    newsInput: function (e) {
      this.setData({
        second: e.detail.value
      })
    },
})