/**
 * 全局配置样式和公共插件
 */
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/css/reset.css';
import '../assets/css/iconfont.css';
import '../../static/lib/layer/skin/layer.css'
import 'lightbox2/dist/css/lightbox.css'
require('lightbox2');
import 'bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css'
require('bootstrap-switch');
require('es6-promise').polyfill();
require('isomorphic-fetch');
require('bootstrap');
require('jquery.nicescroll/jquery.nicescroll.min');
require('../assets/js/uploadType');
// import perfectScrollbar from 'perfect-scrollbar';
import layer from '../../static/lib/layer/layer.js'
import * as URL from './restfull';
// console.log(perfectScrollbar);
//手机验证
const mobileReg = /^(13|14|15|18|17)[0-9]{9}$/;
//密码验证
const passwordReg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~\(\)\`\|\\\{\}\[\]\;\:\'\"\,\.\/\<\>\?\-\=\_\+\.]{6,16}$/;
//登出接口
//计算全局高度
/**
 * 公共宽高设置
 * @param  {[type]} ele [description]
 * @return {[type]}     [description]
 */
function commonGloabl() {
  var winHeight = document.documentElement.clientHeight || document.body.clientHeight;
  //整体html的宽度

  //头部公共的高度
  var commHeight = $('.HOME_CONTENT_HEADERT').height();
  console.log(winHeight);


}

function doResizeHeight() {
  //整体html的高度
  var winHeight = document.documentElement.clientHeight || document.body.clientHeight;
  //整体html的宽度
  var winWidth = $('html').width();
  //头部公共的高度
  var commHeight = $('.HOME_CONTENT_HEADERT').height();
  //输入框的高度
  var inputHeight = $('#m-text').height();
  //左侧任务栏高度
  var leftTaskHeight = $('#left_task').height();
  //左侧个人信息高度
  var myInfoHeight = $('#myInfo').height();
  var modalH1height = $('#COMMENT_MODAL h1').height() ? $('#COMMENT_MODAL h1').height() : 0;
  var contentHeight = 0;

  var type = getCookie('typeScrool')
  if (type == 3) {
    contentHeight = (winHeight - commHeight);
  } else {
    contentHeight = (winHeight - commHeight - 105);
  }
  //消息框
  $('#m-message').css({
    height: contentHeight
  })



  $('.HOME_SLIDER,#HOME_CONTENT').css({
      height: winHeight,
    })
    //右侧框
  $('.COMMENT_MODAL').css({
    height: winHeight - commHeight
  });
  //左侧滚动条
  $('#slid_bars').css({
    height: winHeight - (commHeight + leftTaskHeight + myInfoHeight + 50)
  })
  $('#slid_bars').niceScroll({
    cursorcolor: "#000",
    cursorborder: "1px solid #464f5d",
  });

  //通讯录  //星标收藏
  $('#book_box,#star_allPeo').css({
      height: winHeight - (commHeight + modalH1height + 60)
    })
    //文档库
  $('#doc_content,#groupFiles').css({
    height: winHeight - (commHeight + modalH1height + 70)
  });
  //行事历
  $('#taskList').css({
    height: winHeight - (commHeight + modalH1height + 10),
  });
  //与我有关
  $('#selfMessage').css({
    height: winHeight - (commHeight + modalH1height + 135)
  });

  //团队设置
  $('#manage_wrapper').css({
    height: winHeight - (commHeight + 45)
  });

  //团队设置结构🌲
  $('#manage_tree').css({
    height: winHeight - (commHeight + 85)
  });
  //成员管理
  $('#showTableHeight').css({
    height: winHeight - (commHeight + 100)
  });
  //日志管理
  $('#manage_log').css({
    height: winHeight - (commHeight + 140)
  });
  $('#groupListBar').css({
    height: winHeight - (commHeight + modalH1height + 145)
  });
  //文档详情
  $('#docDetaile').css({
      height: winHeight - (commHeight + modalH1height + 110)
    })
    //公共详情
  $('#noticeDetaile').css({
    'height': winHeight - commHeight
  });
  //个人设置
  $('#perSetting').css({
    height: winHeight - (commHeight + modalH1height + 170)
  })
  $('#person_layer').css({
    height: winHeight - (commHeight + modalH1height + 10)
  })
  $('#person_layer,#perSetting,#m-message,#book_box,#doc_content,#taskList,#selfMessage,#star_allPeo,#manage_wrapper,#manage_tree,#showTableHeight,#manage_log,#groupListBar,#docDetaile,#groupFiles,#noticeDetaile').niceScroll({
    cursorcolor: "#000"
  });

  $('h1>span').click(function() {
    $(this).closest('#COMMENT_MODAL').hide();
    $('#messageCount').width($('#HOME_CONTENT').width());
  });
  window.onresize = function() {

    doResizeHeight();
    doResizeWidth();
  }
  getCookieSession();
}
// 计算全局宽度
function doResizeWidth() {
  var winWidth = document.documentElement.clientWidth || document.body.clientWidth;
  $('.HOME_CONTENT').css({
    width: (winWidth - 302),
  });
}

/**
 * 设置cookie
 */
function setCookie(name, value) {
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
/**
 * 获取cookie
 */
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}
/**
 * 删除cookie
 */
function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null) {
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }
}
/**
 * 倒计时
 */
var wait = 60;
var timer = null;

function sendTime(obj) {
  let textId = document.getElementById(obj.target.id);
  if (wait == 0) {
    clearTimeout(timer);
    wait = 60;
    obj.target.removeAttribute('disabled', 'disabled');
    textId.innerHTML = '重新获取';
  } else {
    wait--;
    obj.target.setAttribute('disabled', 'disabled');
    textId.innerHTML = wait + 's'
    timer = setTimeout(() => {
      sendTime(obj);
    }, 1000);
  };
}
/**
 * 封装ajax  fath
 * @param {Object} url 接口路径
 * @param {Object} parmas 接口参数
 * @param {Object} _callback  数据回调
 * @param {Object} isEncrypt 参数是否加密
 */
function fethAsync(url, parmas, _callback) {
  parmas = parmas ? parmas : '';
  var fname = url;
  fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    },
    body: parmas
  }).then(respones => {
    if (respones.status == 500) {
      layer.msg('网络异常，请重新登陆')
      setTimeout(() => {
        location.href = "index.html";
      }, 2000)
      return;
    }

    if (fname.indexOf('addr') > 0) {
      respones.text().then(res => {
        if (_callback !== undefined) {
          _callback(res);
        }
      });
    } else {
      respones.json().then(res => {
        if (_callback !== undefined) {
          _callback(res);
        }

      });
    }

  });
}

/**
 * 右边tab 收缩
 */
function golableTab() {
  var HOME_CONTENT = document.getElementById("HOME_CONTENT");
  var messageCount = document.getElementById("messageCount");
  var COMMENT_MODAL = document.getElementById("COMMENT_MODAL");
  var oWidth = HOME_CONTENT.offsetWidth;
  var modalWidth = $('#COMMENT_MODAL').width();
  if (COMMENT_MODAL.style.display === 'none') {
    messageCount.style.width = (oWidth - modalWidth) - 40 + 'px';
    //		$('#member_right').css({
    //			width: $('#HOME_CONTENT').width() - 639
    //		})
    COMMENT_MODAL.style.display = 'block';

  }
  //	else {
  //		messageCount.style.width = oWidth + 'px';
  //		COMMENT_MODAL.style.display='none'
  //	}

}
/**
 * 登出 清除cookie
 */
function loginOut() {
  fethAsync([URL.LOGIN_OUT_URL], '', res => {
    if (res.success) {
      tipTools(res.msg);
      sessionStorage.removeItem("person_info");
      sessionStorage.removeItem("firstTab");
      sessionStorage.removeItem("loading");
      delCookie('allUserInfo');
      delCookie('autoLogin');
      delCookie('userMobile');
      delCookie('slingeGroupInfo');
      delCookie('typeScrool');
      location.href = 'index.html';
    } else {
      tipTools(res.msg);
    }

  });
}
/**
 * 获取下载凭证token
 */
function getFileDownToken(key, type, callback) {
  var param = 'DM00110=' + key;
  fethAsync([URL.GET_DOWN_TOKEN_URL], param, res => {
    var token = res.result;
    var url = [URL.URL_DOWNLOAD] + key + '.' + type + '?token=' + token;
    if (typeof callback != 'undefined') {
      callback(url);
    } else {
      new FileDownloader({
        url: url,
        filename: key + '.' + type
      });
      // var a = document.createElement('a');
      // a.setAttribute('href', url);
      // a.setAttribute('target', '_blank');
      // a.setAttribute('id', 'downid');
      // //防止反复添加
      // if (!document.getElementById('downid')) {
      //   document.body.appendChild(a);
      // }
      // a.click();
    }
  });

}

/**
 * 无权限下载
 * key: 文件key
 * suffix：文件后缀
 */
function getFileDownKey(key, suffix) {
  var url = [URL.URL_DOWNLOAD_KEY] + key + '.' + suffix;
  new FileDownloader({
    url: url,
    filename: key + '.' + suffix
  });
  // var a = document.createElement('a');
  // a.setAttribute('href', url);
  // a.setAttribute('target', '_blank');
  // a.setAttribute('id', 'downid');
  // //防止反复添加
  // if (!document.getElementById('downid')) {
  //   document.body.appendChild(a);
  // }
  // a.click();
}
/**
 * 获取上传凭证token
 */
function getFileUploadToken(filename, filesize, mimetype, checksum, callback) {
  var _this = this;
  var param = 'filename=' + filename + '&filesize=' + filesize + '&mimetype=' + mimetype + '&checksum=' + checksum;
  fethAsync([URL.GET_UPLOAD_TOKEN_URL], param, res => {
    if (res.success) {
      callback(res.result);
    } else {
      callback(null);
    }
  });
}
/** 无需加密
 * 生成缩略图
 * type: 1无权限， 2有权限
 * key: 文件标识
 * token: 文件上传凭证
 * width: 宽
 * height: 高
 * quality: 精度
 * callback: 回调函数
 */
function createThumbnail(type, key, token, width, height, quality, callback) {
  var _this = this;
  var param = 'width=' + width + '&hight=' + height + '&quality=' + quality;
  var url = '';
  if (type == 1) {
    url = [URL.URL_SCALE] + key;
  } else {
    url = [URL.URL_AUTHORITY] + key;
  }
  fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": token
    },
    body: param
  }).then(function(respones) {
    respones.json().then(function(res) {
      callback(res);
    })
  })
}
/**
 * 添加星标
 */
function makeSuperStar(item, type, callback) {
  var params = '',
    star_url = '';

  if (type == 1) {
    var param = '';
    var msgType = '';
    if (item.MSG00108 != 5) {
      msgType = 2;
      item.id = item.MSG00101;
      item.forUserId = item.MSG00102;
      item.starType = item.MSG00108;
      if (item.MSG00108 != 1) {
        item.MSG00109 = JSON.stringify(item.MSG00109);
      }
      param = JSON.stringify(item);
    } else {
      msgType = 1;
      var dm = (item.MSG00109);
      dm.id = dm.DM00101;
      dm.forUserId = dm.DM00102;
      dm.starType = item.MSG00108;
      param = JSON.stringify(dm);
    }
    star_url = [URL.ADD_START_URL];
    params = 'UMT17=' + param + '&UMT19=' + msgType;
  } else {
    star_url = [URL.DELETE_START_URL];
    params = 'UMT11=' + item.MSG00101;
  }
  console.log(params);
  fethAsync(star_url, params, res => {
    if (res.success) {
      callback(res.success)
    }
  });
}

function allCancelMessage(item, callback) {
  var newTime = Math.floor(+new Date()) / 1000;
  var oldTime = Date.parse(new Date(item.MSG00106)) / 1000;
  var timeEnd = newTime - oldTime;
  if (timeEnd <= 120) {
    var params = 'MSG00102=' + item.MSG00102 + '&MSG00104=' + item.MSG00104 + '&MSG00107=' + item.MSG00107 + '&MSG00101=' + item.MSG00101
    fethAsync(URL.CANCEL_MESSAGE_URL, params, res => {
      if (res.success) {
        callback(res.success);
      }

    });
  } else {
    layer.msg('只能在发送信息两分钟之内撤回!')
  }
}
//取消人员星标
function cancelPersonStar(params, _callback) {
  fethAsync([URL.ADD_STAR_OR_CANCEL_STAR_URL], params, res => {
    if (res.success) {

      _callback(res.success);
    } else {
      tipTools(res.msg);
    }
  });

}

function getCookieSession() {
  var MXSID = getCookie('MXSID');
  if (MXSID == null || MXSID == undefined || MXSID == '') {
    layer.confirm('服务器超时，请重新登录!', () => {
      delCookie('allUserInfo');
      location.href = "index.html";
    })
  }
}
//消息通知
function notify(data, v_this) {
  if (!window.Notification) {
    return;
  }
  if (Notification.permission === 'default') {
    Notification.requestPermission(function() {
      notify(data);
    });
  } else if (Notification.permission === 'granted') {
    var name = data.MSG00105,
      n = null,
      sendid = data.MSG00104;
    if (data.MSG00107 == 1) {
      name = data.MSG00103;
      sendid = data.MSG00102;
    }
    n = new Notification('您有' + data.MSG00103 + '的一条信息', {
      'body': '来自' + name + ':' + data.MSG00109,
      icon: data.MSG00110 ? data.MSG00110 : '../../static/images/people.png',
      'tag': 'unique string'
    });
    n.onclick = function() {
      v_this.$route.router.go({
        name: 'message',
        params: {
          name: name,
          sendid: sendid,
          sendtype: data.MSG00107
        }
      })
    };
    n.onclose = function() {
      this.close();
      console.log('Notification closed');
    };
  } else if (Notification.permission === 'denied') {
    return;
  }

};

function judgeType(type, msg) {
  var str = '';
  if (type == 2) {
    str = '[图片]';
  } else if (type == 4) {
    str = '[位置]';
  } else if (type == 5) {
    str = '[文件]';
  } else if (type == 7) {
    str = '[分享名片]';
  } else if (type == 6) {
    str = '[@信息]';
  } else if (type == 10) {
    str = '[团队公告]';
  } else if (type == 11) {
    str = '[团队投票]';
  } else {
    str = msg
  }
  return str;
};

function pagesNum(url, params, _callback) {
  fethAsync(url, params, res => {
    if (res.success) {
      var r = res.result;
      _callback(r);
    } else {
      tipTools('连接失败');
      return;
    }
  });

}

//判断浏览器
function chooseNavigator() {
  var Sys = {};
  var ua = navigator.userAgent.toLowerCase();
  window.ActiveXObject ? Sys.ie = ua.match(/msie ([\d.]+)/)[1] : document.getBoxObjectFor ? Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1] :
    window.MessageEvent && !document.getBoxObjectFor ? Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1] :
    window.opera ? Sys.opera = ua.match(/opera.([\d.]+)/)[1] :
    window.openDatabase ? Sys.safari = ua.match(/version\/([\d.]+)/)[1] : 0;

  return Sys;
}

function tipTools() {
  Array.prototype.slice.call(arguments);
  if (arguments.length > 1) {
    layer.tips(arguments[0], arguments[1], {
      tips: [3, '#000'],
      time: 2000
    });
  } else {
    layer.msg(arguments[0], {
      time: 2000
    });
  }
}

function searchGroup(obj, type) {
  fethAsync([URL.SEARCH_GROUP_URL], '', res => {
    if (res.success) {
      var groupList = res.result;
      if (type == 'newupdaload') {
        groupList.unshift({
          TM00201: '',
          TM00206: '不分享'
        })
      }
      obj.$store.dispatch('GROUP_LIST_ITEM', groupList);
    }
  })
}



var Rexports = {
  layer,
  commonGloabl,
  mobileReg,
  passwordReg,
  doResizeHeight,
  doResizeWidth,
  setCookie,
  getCookie,
  delCookie,
  tipTools,
  sendTime,
  pagesNum,
  judgeType,
  fethAsync,
  notify,
  golableTab,
  cancelPersonStar,
  allCancelMessage,
  makeSuperStar,
  createThumbnail,
  getFileDownToken,
  getFileUploadToken,
  loginOut,
  searchGroup,
  getFileDownKey
}

module.exports = Rexports;
