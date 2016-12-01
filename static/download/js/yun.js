$(function() {
  var win_width = $(window).width();
  var win_height = $(window).height();
  var u = navigator.userAgent;
  $('#root').delegate('a', 'click', function() {

    var curr = $(this);
    var type = curr.data('type');
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { //安卓手机
      // alert('xsxaxa===============00000');
      if (is_weixin()) {
        //					window.open('http://a.app.qq.com/o/simple.jsp?pkgname=com.miux.android','_blank');
        $('.overlayout').show();
        $('.yindao-img').show()
      } else {
        //				alert('应用正在审核中...');

        location.href = 'http://hz.miux.com.cn:8086/SessionManager/app-universal-release.apk';
        //				window.location.href = 'http://mobile.baidu.com/simple?action=index#/item?docid=8838464&source=s1001';
      }
    } else if (u.indexOf('iPhone') > -1) { //苹果手机
      if (is_weixin()) {
        $('.overlayout').show();
        $('.yindao-img').show()
          //window.open('https://itunes.apple.com/app/id1150980998', '_blank');
      } else {
        window.location.href = 'https://itunes.apple.com/app/id1176796242';
      }
    } else if (u.indexOf('Windows Phone') > -1) { //winphone手机
      //alert(2);
    } else {}
  })
  $('.overlayout').click(function() {
      $(this).hide();
      $('.yindao-img').hide()
    })
    /* 判断是否是微信浏览器 */
  function is_weixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  }
})
