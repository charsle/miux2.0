<template>
  <div class="miuxRoot" id="MIUX" :style="{background:BASE_URL_CONFIG.COMMON_BASE.BACKGROUND}">
			<div>
				<div class="ESWFW066Logo" v-if="BASE_URL_CONFIG.COMMON_BASE.ISLEFTLOGO">
					<img :src="BASE_URL_CONFIG.COMMON_BASE.LOGO" />
				</div>
				<div class=" mt20 mr20 downloadHtml"><a href="javascript:;" @click="download(0)" :style="{color:BASE_URL_CONFIG.COMMON_BASE.TEXTCOLOR}">用户操作手册</a>｜ <a href="javascript:;" @click="download(1)" :style="{color:BASE_URL_CONFIG.COMMON_BASE.TEXTCOLOR}">下载APP</a></div>
				<div class="clearfix"></div>
			</div>
			<div class="ESWFW001LoginContainer" id="loginContainer">
				<h4><img :src="BASE_URL_CONFIG.COMMON_BASE.ISTITLELOGO"/></h4>
				<div v-if="BASE_URL_CONFIG.COMMON_BASE.ISTITLE">
					<h4 class="mt10" v-text="BASE_URL_CONFIG.COMMON_BASE.TITLE"></h4>
				</div>

				<form id="login_from">
					<div class="registerBox">
						<div class="row mt25">
							<input type="tel" name="login_tel" v-model="login_tel" id="login_tel" maxlength="11" placeholder="您的手机号码" class="form-control" />
						</div>
						<div class="row mt15 showImageCode">
							<div class="timeThere" :class="[isExpand ? 'col-xs-5':'col-xs-12']">
								<input type="password" name="login_pwd" id="login_pwd" v-model="login_pwd" placeholder="您的密码" class="form-control" />
							</div>
							<div class="col-xs-1 "></div>
							<image-code is-type="1" v-if="isExpand"></image-code>
							<div class="clearfix"></div>
						</div>
						<div class="row mt15 fs12">
							<div class="col-xs-6 tl">
								<a href="default.html#!/fpassword" :style="{color:BASE_URL_CONFIG.COMMON_BASE.TEXTCOLOR}">忘记密码？</a>
							</div>
							<div class="col-xs-6 checkbox tr">
								<label :style="{color:BASE_URL_CONFIG.COMMON_BASE.TEXTCOLOR}">
									<input type="checkbox"  v-model="autoLogin"> 下次自动登录
								</label>
							</div>
						</div>
						<div class="row mt20">
							<button class="btn ESWFW001Submit" id="ESWFW001Submit" type="button" :style="{background:BASE_URL_CONFIG.COMMON_BASE.COLOR}" @click="loginSubmit($event)" @keyup.down="loginSubmit($event)">登录</button>
						</div>
						<div class="row mt15 fs12" v-if="!BASE_URL_CONFIG.COMMON_BASE.ISYUN">
							<a href="default.html#!/register" :style="{color:BASE_URL_CONFIG.COMMON_BASE.TEXTCOLOR}">没有账号？立即注册</a>
						</div>
						<div class="clearfix"></div>
					</div>
				</form>

			</div>
			<div class="ESWFW066Footer" v-if="BASE_URL_CONFIG.COMMON_BASE.FOOTERBACKGROUND!=''">
				<img :src="BASE_URL_CONFIG.COMMON_BASE.FOOTERBACKGROUND" />
			</div>
			<div class="ESWFW066Footer" v-else>国网重庆电力专用</div>
		</div>
</template>
<style media="screen">
  .downloadHtml {
    position: absolute;
    right: 10px;
    top: 0;
  }
</style>

<script type="text/javascript">
  import 'bootstrap/dist/css/bootstrap.min.css'
  import '../../assets/css/reset.css';
  import '../../assets/css/iconfont.css';
  import '../../../static/lib/layer/skin/layer.css'
  require('bootstrap');
  import gloabl from '../../api/globConfig'

  require('../../assets/js/uploadType')
  var NProgress = require('nprogress');
  import '../../assets/css/login.css'
  import systemConfig from '../../api/systemConfig'
  import imageCode from './../../components/login/imageCode'
  import * as URL from '../../api/restfull'

  export default {
    data() {
      return {
        login_tel: '', //手机号码
        login_pwd: '', //登录密码
        login_code: '', //验证码
        autoLogin: false, //自动登录
        isExpand: false, //验证错误三次出行验证码
        BASE_URL_CONFIG: systemConfig, //全局配置logo,
        errorTherr: localStorage.getItem('errorCode'),
      }
    },
    ready() {
      document.title = this.BASE_URL_CONFIG.COMMON_BASE.TITLETEXT;
      this.resizeAll();
      document.onkeydown = (e) => {
        var theEvent = e || window.event;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13) {
          document.getElementById('ESWFW001Submit').focus();
        }
      };
      window.onresize = () => {
        this.resizeAll();
      }
      this.getGaobleCookie();
      if (this.errorTherr !== null && this.errorTherr !== '' && this.errorTherr.length > 0) {
        this.isExpand = true;
      }
      //自动登录
      var auto = gloabl.getCookie('autoLogin');
      if (auto) {
        this.autoLogin = true;
        setTimeout(() => {
          this.valideLogin(true, auto);
        }, 2000);
      }
    },
    events: {
      'code-val' (msg) {
        this.login_code = msg;
      }
    },
    methods: {
      /**
       * 获取cookie
       */
      getGaobleCookie() {
        gloabl.fethAsync(URL.GET_COOKIE_URL, '', (res) => {

        });
      },
      /**
       * 点击下载文档和app
       */
      download(type) {
        var _this = this;
        if (type != 0) {
          gloabl.layer.open({
            type: 1,
            shade: 0.3,
            title: '扫一扫',
            area: ['300px', '330px'],
            shadeClose: true,
            content: `<div class="tc"><img src="${_this.BASE_URL_CONFIG.COMMON_BASE.DOWNLOADIMAGES}"></div>`,
          })
        } else {
          new FileDownloader({
            url: encodeURI('../../static/resource/systemBook.docx'),
            filename: "系统用户手册.docx"
          });
        }
      },
      loginSubmit(ev) {
        var self = this;
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
          gloabl.tipTools('不支持IE浏览器');
          return;
        }

        if (!gloabl.mobileReg.test(self.login_tel)) {
          gloabl.tipTools('手机号码输入不合法,请重新输入', '#login_tel');
          return;
        }
        if (!gloabl.passwordReg.test(self.login_pwd)) {
          gloabl.tipTools('您输入的密码长度至少6位', '#login_pwd');
          return;
        }
        if (this.errorTherr !== null && this.errorTherr !== '' && this.errorTherr.length > 0) {
          this.valideCode();
        } else {
          this.valideLogin();
        }
        ev.target.setAttribute('disabled', 'disabled');
        setTimeout(() => {
          ev.target.removeAttribute('disabled');
          document.getElementById("ESWFW001Submit").disabled = false;
        }, 5000)
      },
      /**
       * 验证登录(包括自动登录)
       * loop {Boolean}   是否是自动登录 true|false
       * auto_key {String}  自动登录key值
       */
      valideLogin(loop, auto_key) {
        NProgress.start();
        var laod = layer.load(2);
        var self = this,
          param = '',
          loop = loop ? loop : false;
        if (loop) {
          param = 'UMT06=' + auto_key + '&UMT05=3&UM0103=' + gloabl.getCookie('userMobile');
        } else {
          param = 'UM0103=' + self.login_tel + '&UMT05=1&UM0115=' + this.login_pwd + '&UMT02=1&UMT03=' + self.login_code;
        }
        gloabl.fethAsync([URL.LOGIN_URL], param, res => {
          if (res.success) {
            layer.close(laod);
            localStorage.removeItem('errorCode');
            var UM0113 = res.result.user.UM0113;
            gloabl.setCookie('autoLogin', UM0113);
            if (self.autoLogin) {
              gloabl.setCookie('userMobile', self.login_tel);
            } else {
              gloabl.delCookie('autoLogin');
            }
            gloabl.setCookie('allUserInfo', JSON.stringify(res.result));
            // return;
            location.href = 'main.html';
            NProgress.done();
          } else {
            layer.close(laod);
            var code = res.error;
            if (res.result == 'PIC_CODE') {
              localStorage.setItem('errorCode', 'PIC_CODE')
              this.isExpand = true;
            }
            switch (code) {
              case '6003':
                gloabl.tipTools(res.msg);
                break;
              case '5003':
                gloabl.tipTools(res.msg, '#login_pwd');
                break;
              case '1002':
                gloabl.tipTools(res.msg, '#login_tel');
                break;
              case '8888':
                gloabl.tipTools('验证码不能为空或者验证码错误！', '#login_code');
                break;
              default:
                gloabl.tipTools(res.msg);
                break;
            }
          }
        })
      },
      /*
       * 效验验证码
       */
      valideCode() {
        var self = this;
        if (self.login_code == '') {
          gloabl.tipTools('您输入的验证码不能为空!', '#login_code');
          return;
        } else {
          self.valideLogin();
        }
      },
      resizeAll() {
        let miuxRoot = document.querySelector("#MIUX"),
          loginContainer = document.querySelector("#loginContainer"),
          top = (document.documentElement.clientHeight - loginContainer.offsetHeight) / 2 - 106 + 'px';
        loginContainer.style.marginTop = top;
        miuxRoot.style.height = document.documentElement.clientHeight + 'px';
      }

    },
    components: {
      imageCode
    }
  }
</script>
