var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    list: [],
    sources: [],
    imageWidth: wx.getSystemInfoSync().windowWidth
  },
  onLoad: function () {
    var that = this;
    that.loadList();
    that.loadSource();
  },
  loadSource: function () {
    var that = this;
    app.getSource(function (data) {
      that.setData({
        sources: data
      });
    })
  },
  loadList: function () {
    var that = this;
    wx.request({
      url: app.globalData.api_host + '/list',
      success: function (res) {
        that.setData({
          list: that.renderList(res.data)
        })
      }
    })
  },
  renderList: function (list) {
    var that = this;
    var array = new Array();
    for (var d in list) {
      var data = list[d];
      try {
        var source = app.renderSource(data.source);
        data.sourceName = source.name;
        data.sourceIcon = source.icon;
        data.time = util.topicTime(new Date(data.createdAt).getTime());
      } catch (error) {

      }

      array.push(data);
    }
    return array;
  },
  goDetailView: function (e) {
    var id = e.currentTarget.dataset.id;
    var source = e.currentTarget.dataset.source;
    wx.navigateTo({
      url: '/pages/detail/detail?sid=' + id + '&source=' + source
    })
  }
})
