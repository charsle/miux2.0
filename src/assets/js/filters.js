import gloabl from '../../api/globConfig'
var Sys = {};
export function filters(Vue) {
  if (!JSON.parse(gloabl.getCookie('allUserInfo'))) {
    location.href = './index.html';
    return;
  }
  var personList = JSON.parse(gloabl.getCookie('allUserInfo')).user;
  Vue.filter('reverseTime', timestamp => {
    timestamp = timestamp.replace(/-/g, '/');
    var n = new Date();
    var o = new Date(timestamp);
    var now = n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate();
    var old = o.getFullYear() + "-" + (o.getMonth() + 1) + "-" + o.getDate();
    if (now == old) {
      return '今天';
    } else if (new Date(now).getTime() - new Date(old).getTime() == 86400000) {
      return '昨天';
    } else {
      var date = o.getFullYear() + "-" + (o.getMonth() < 9 ? ('0' + (o.getMonth() + 1)) : (o.getMonth() + 1)) + "-" + (o.getDate() < 10 ? ('0' + o.getDate()) : o.getDate());
      return date;
    }
  });
  Vue.filter('time', timestamp => {
    timestamp = timestamp.replace(/-/g, '/');
    var formatDay = new Date(timestamp);
    var month = formatDay.getMonth() + 1;
    var day = formatDay.getDate();
    var HH = formatDay.getHours();
    var hh = formatDay.getMinutes();
    var ss = formatDay.getSeconds();
    HH = HH < 10 ? '0' + HH : HH;
    hh = hh < 10 ? '0' + hh : hh;
    ss = ss < 10 ? '0' + ss : ss;
    return HH + ':' + hh + ':' + ss;
  })
  Vue.filter('getUrl', val => {
    var _url = '';
    if (val == null || val == undefined || val == '') {
      _url = '../../../static/images/people.png';
    } else {
      _url = val;
    }
    return _url;
  })

  Vue.filter('isMySelf', val => {
    var flag = '';
    if (val == personList.UM0101) {
      flag = true;
    } else {
      flag = false;
    }
    return flag;
  })
  Vue.filter('getBigUrl', val => {
    var _url = '';
    if (val == null || val == undefined) {
      _url = '../../../static/images/default.jpg';
    } else {
      _url = val;
    }
    return _url;
  })

  Vue.filter('fileSize', function(bytes) {
    if (bytes === 0 || bytes == '' || bytes == undefined) {
      return '0 B';
    }
    var k = 1000, // or 1024
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    var fileSize = (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    return fileSize;
  })
  Vue.filter('filterEnter', function(word) {
    var c = word.toString().replace(/\n/g, '<br>');
    return c;
  })
  Vue.filter('valideType', function(val) {
    var docHtml = '';
    switch (val) {
      case 'doc':
      case 'docx':
        return '<i class="iconfont doc_color">&#xe61e;</i>';
        break;
      case 'xls':
      case 'xlsx':
        return '<i class="iconfont xls_color">&#xe61f;</i>';
        break;
      case 'pdf':
        return '<i class="iconfont pdf_color">&#xe623;</i>';
        break;
      case 'ppt':
      case 'pptx':
        return '<i class="iconfont ppt_color">&#xe620;</i>';
        break;
      case 'txt':
        return '<i class="iconfont txt_color">&#xe621;</i>';
        break;
      case 'jpg':
      case 'gif':
      case 'bmp':
      case 'png':
        return '<i class="iconfont pic_color">&#xe622;</i>';
        break;
      case 'mp3':
      case 'wma':
        return '<i class="iconfont music_color">&#xe624;</i>';
        break;
      case 'mp4':
      case 'avi':
      case 'rmvb':
        return '<i class="iconfont vidio_color">&#xe626;</i>';
        break;
      case 'zip':
      case 'rar':
        return '<i class="iconfont zip_color">&#xe625;</i>';
        break;
      default:
        return '<i class="iconfont x_color">&#xe649;</i>';
        break;
    }
    return docHtml;

  })
}
