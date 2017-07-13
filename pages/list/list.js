var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    list: [],
    sources: [],
    imageWidth: wx.getSystemInfoSync().windowWidth,
    scrollHeight: wx.getSystemInfoSync().windowHeight
  },
  onLoad: function() {
    var that = this;
    that.source;
    that.size = 5;
    that.page = 1;
    that.list = [];
    that.loadList();
    that.loadSource();
  },
  loadSource: function() {
    var that = this;
    app.getSource(function(data) {
      that.setData({
        sources: data
      });
    })
  },
  loadList: function() {
    var that = this;
    console.log('size:' + that.size);
    console.log('page:' + that.page);
    var offset = (that.page - 1) * that.size;
    var url = app.globalData.api_host + '/page?limit=' + that.size + '&offset=' + offset;
    if (that.source) {
      url += '&source=' + that.source;
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: url,
      success: function(res) {
        that.renderList(res.data.rows);
        that.setData({
          list: that.list
        })
      },
      complete:function(){
        wx.hideLoading();
      }
    })
  },
  renderList: function(data) {
    var that = this;
    for (var d in data) {
      var _data = data[d];
      try {
        var source = app.renderSource(_data.source);
        _data.sourceName = source.name;
        _data.sourceIcon = source.icon;
        _data.time = util.topicTime(new Date(_data.createdAt).getTime());
      } catch (error) {

      }
      that.list.push(_data);
    }
  },
  goDetailView: function(e) {
    var id = e.currentTarget.dataset.id;
    var source = e.currentTarget.dataset.source;
    wx.navigateTo({
      url: '/pages/detail/detail?sid=' + id + '&source=' + source
    })
  },
  onSourceClick: function(e) {
    var that = this;
    var code = e.currentTarget.dataset.code;
    that.source = code;
    that.size = 5;
    that.page = 1;
    that.list = [];
    that.loadList();
  },
  bindDownLoad: function() {
    var that = this;
    that.page++;
    that.loadList();
  }
})