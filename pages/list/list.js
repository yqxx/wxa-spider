var imageUtil = require('../../utils/util.js');  
var app = getApp()
Page({
  data: {
    list: [],
    imageWidth: wx.getSystemInfoSync().windowWidth
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://api.liyiqi.me/list',
      success: function (res) {
        console.log(res);
        that.setData({
          list: res.data
        })
      },
      fail:function(res){
        console.log(res);
      }
    })
    
    
  },
  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    console.log(imageSize)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  }
})
