var util = require('../../utils/util.js');  
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
        var list = new Array();
        for(var d in res.data){
          var data = res.data[d];
          data.sourceName = app.globalData.source[data.source].name;
          data.sourceIcon = app.globalData.source[data.source].icon;
          data.time = util.topicTime(new Date(data.createdAt).getTime());
          list.push(data);
        }
        console.log(list)
        that.setData({
          list: list
        })
      },
      fail:function(res){
        console.log(res);
      }
    })   
  },
  goDetailView: function (e) {
    var id = e.currentTarget.dataset.id;
    var source = e.currentTarget.dataset.source;
    wx.navigateTo({
      url: '/pages/detail/detail?sid=' + id + '&source=' + source
    })
  }
})
