//获取应用实例
var app = getApp()
Page({
    data: {
        imgs: [],
        content: '',
        valLen: 0
    },
    onLoad: function(options) {
        // 生命周期函数--监听页面加载
        //获取code 
        console.log(app.globalData)
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
        console.log(image)
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
    bindPublish: function() {
        var that = this;

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