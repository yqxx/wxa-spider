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
    that.source;
    that.size = 5;
    that.page = 1;
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
    console.log('size:'+that.size);
    console.log('page:' + that.page);
    var offset = (that.page - 1) * that.size;
    var url = app.globalData.api_host + '/page?limit=' + that.size + '&offset=' + offset;
    if(that.source){
      url += '&source=' + that.source;
    }
    wx.request({
      url: url,
      success: function (res) {
        that.setData({
          list: that.renderList(res.data.rows)
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
  },
  onSourceClick:function(e){
    var that = this;
    var code = e.currentTarget.dataset.code;
    that.source = code;
    that.loadList();
  }
})
