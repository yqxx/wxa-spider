App({
  onLaunch: function () {
    var that = this;
    that.getSource(function (data) {
      that.globalData.source = data
    })
  },
  getSource: function (cb) {
    var that = this;
    if (that.globalData.source) {
      typeof cb == "function" && cb(that.globalData.source)
    } else {
      wx.request({
        url: this.globalData.api_host + '/sources',
        success: function (res) {
          typeof cb == "function" && cb(res.data)
        }
      })
    }
  },
  renderSource: function (code) {
    var that = this;
    var source;
    that.globalData.source.forEach(function (v) {
      if (v.code === code) {
        source = v;
        return;
      }
    })
    return source;
  },
  globalData: {
    userInfo: null,
    source: null,
    api_host:'https://api.liyiqi.me'
  }
})
