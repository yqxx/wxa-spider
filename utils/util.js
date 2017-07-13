function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function topicTime(timeInMs) {
  var cur = new Date();
  var flag = false;
  var dstr;
  var difInSecond = (cur.getTime() - timeInMs) / 1000;
  if (difInSecond < 60) {
    if (difInSecond <= 0) difInSecond = 1;

    dstr = Math.ceil(difInSecond) + "秒前";
    flag = true;
  } else if (difInSecond < 1800) {
    var aa = Math.ceil((difInSecond / 60))

    dstr = aa + "分钟前";
    flag = true;
  } else {
    var ctime = new Date();
    ctime.setTime(timeInMs);
    if (cur.getFullYear() == ctime.getFullYear() && cur.getMonth() == ctime.getMonth() && cur.getDate() == ctime.getDate()) {
      dstr = ctime.toString("HH:mm");
    } else {
      dstr = ctime.toString("MM月dd日");
    }
  }
  return dstr;
}

Date.prototype._toString = Date.prototype.toString;
Date.prototype.toString = function (c) {
  var a = this;
  var b = function b(d) {
    return (d.toString().length == 1) ? "0" + d : d
  };
  return c ? c.replace(/dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?/g, function (d) {
    switch (d) {
      case "hh":
        return b(a.getHours() < 13 ? a.getHours() : (a.getHours() - 12));
      case "h":
        return a.getHours() < 13 ? a.getHours() : (a.getHours() - 12);
      case "HH":
        return b(a.getHours());
      case "H":
        return a.getHours();
      case "mm":
        return b(a.getMinutes());
      case "m":
        return a.getMinutes();
      case "ss":
        return b(a.getSeconds());
      case "s":
        return a.getSeconds();
      case "yyyy":
        return a.getFullYear();
      case "yy":
        return a.getFullYear().toString().substring(2, 4);
      case "dddd":
        return a.getDayName();
      case "ddd":
        return a.getDayName(true);
      case "dd":
        return b(a.getDate());
      case "d":
        return a.getDate().toString();
      case "MMMM":
        return a.getMonthName();
      case "MMM":
        return a.getMonthName(true);
      case "MM":
        return b((a.getMonth() + 1));
      case "M":
        return a.getMonth() + 1;
      case "t":
        return a.getHours() < 12 ? Date.CultureInfo.amDesignator.substring(0, 1) : Date.CultureInfo.pmDesignator.substring(0, 1);
      case "tt":
        return a.getHours() < 12 ? Date.CultureInfo.amDesignator : Date.CultureInfo.pmDesignator;
      case "zzz":
      case "zz":
      case "z":
        return ""
    }
  }) : this._toString()
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function imageUtil(e) {
  var imageSize = {};
  var originalWidth = e.detail.width;//图片原始宽  
  var originalHeight = e.detail.height;//图片原始高  
  var originalScale = originalHeight / originalWidth;//图片高宽比  
  console.log('originalWidth: ' + originalWidth)
  console.log('originalHeight: ' + originalHeight)
  //获取屏幕宽高  
  wx.getSystemInfo({
    success: function (res) {
      var windowWidth = res.windowWidth;
      var windowHeight = res.windowHeight;
      var windowscale = windowHeight / windowWidth;//屏幕高宽比  
      console.log('windowWidth: ' + windowWidth)
      console.log('windowHeight: ' + windowHeight)
      if (originalScale < windowscale) {//图片高宽比小于屏幕高宽比  
        //图片缩放后的宽为屏幕宽  
        imageSize.imageWidth = windowWidth;
        imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
      } else {//图片高宽比大于屏幕高宽比  
        //图片缩放后的高为屏幕高  
        imageSize.imageHeight = windowHeight;
        imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
      }

    }
  })
  console.log('缩放后的宽: ' + imageSize.imageWidth)
  console.log('缩放后的高: ' + imageSize.imageHeight)
  return imageSize;
}

function formatStr(str) {
  str = str.replace(/&nbsp;/g, " ");
  str = str.replace(/<br>/g, " ");
  return str
}

module.exports = {
  formatTime: formatTime,
  topicTime: topicTime,
  imageUtil: imageUtil,
  formatStr: formatStr
}
