var imageUtil = require('../../utils/util.js');  
var app = getApp()
Page({
  data: {
    detail: {},
    imageWidth: wx.getSystemInfoSync().windowWidth
  },
  onLoad: function (option) {
    var that = this;
    wx.request({
      url: 'https://api.liyiqi.me/detail/' + option.source + '/' + option.sid,
      success: function (res) {
        console.log(res)
        that.setData({
          detail: res.data
        })
      },
      fail:function(res){
        console.log(res);
      }
    })   
  },
  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e);
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  }
})
