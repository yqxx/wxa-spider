//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    source:{
      'mafengwo': {
        name: '蚂蜂窝',
        icon: 'http://images.mafengwo.net/images/app/m/logo_gonglve_v6.png?v=20150825'
      },
      'ifanr': {
        name: '爱范儿',
        icon: 'http://ifanr-cdn.b0.upaiyun.com/wp-content/themes/ifanr-4.0/static/images/ifanr/top-nav-down-logo.png'
      }
    }
  }
})