var imageUtil = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    title:'',
    list: [],
    imageWidth: wx.getSystemInfoSync().windowWidth
  },
  onLoad: function (option) {
    var that = this;
    wx.request({
      url: app.globalData.api_host + '/detail/' + option.source + '/' + option.sid,
      success: function (res) {
        that.setData({
          title: res.data.title,
          list: JSON.parse(res.data.content)
        })
        console.log(that.data.list)
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
