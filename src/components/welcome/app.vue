<template id="">
  <div>
    <div class="welcome-header">
      <div class="welcome-wapper">
      <div class="fl">
        <img src="../../../static/images/cloud/logo1.png" alt="" />
      </div>
      <div class="fr">
        <a href="admin.html">
            <img src="../../../static/images/cloud/login1.png" alt="" width="20px"/>
        </a>
      </div>
    </div>
</div>
    <div class="welcome-content" id="welcome-content">
      <!-- <img src="../../../static/images/cloud/w_bg.png" alt="" style="max-width:100%;height:785px;"/> -->
    </div>
    <div class="welcome-footer tc">
      <a href="http://hz.miux.com.cn:8086/SessionManager/app-universal-release.apk" class="android_app">

      </a>
      <a href="https://itunes.apple.com/app/id1176796242" class="ios_app">

      </a>
      <a href="javascript:;" class="scan_code">
          <img src="../../../static/images/cloud/weishi.png" alt="" width="100%"/>
      </a>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {

    ready() {
      this.doresize();
      window.onresize = () => {
        this.doresize();
      }
    },
    methods: {
      doresize() {
        var con = document.getElementById('welcome-content');
        var winHeight = document.documentElement.clientHeight || document.body.clientHeight;
        con.style.height = (winHeight - 280) + 'px';
      }
    }

  }
</script>
<style media="screen">
  html {
    overflow: auto!important;
  }

  .welcome-header {
    height: 60px;
    line-height: 70px;
    background: #fff;
  }

  .welcome-wapper {
    max-width: 1200px;
    margin: 0 auto;
  }

  .welcome-content {
    background: url(../../../static/images/cloud/w_bg.png);
    height: 785px;
    background-position: center;
    /*background-size: cover;*/
  }

  .welcome-wapper::after {
    clear: both;
  }

  .welcome-footer {
    height: 200px;
    padding-top: 20px;
  }

  .welcome-footer a {
    display: inline-block;
    width: 160px;
    height: 160px;
    line-height: 160px;
    border: 1px solid #ccc;
    margin-left: 20px;
  }

  .welcome-footer a:hover {
    background-color: #157efb;
  }

  .android_app {
    background: url(../../../static/images/cloud/android1.png) center center;
    background-repeat: no-repeat;
  }

  .android_app:hover {
    background: url(../../../static/images/cloud/android.png) center center;
    background-repeat: no-repeat;
  }

  .ios_app {
    background: url(../../../static/images/cloud/iphone.png) center center;
    background-repeat: no-repeat;
  }

  .ios_app:hover {
    background: url(../../../static/images/cloud/iphone1.png) center center;
    background-repeat: no-repeat;
  }

  .scan_code {
    background: url(../../../static/images/cloud/iphone.png) center center;
    background-repeat: no-repeat;
  }

  .scan_code:hover {
    background: url(../../../static/images/cloud/iphone1.png) center center;
    background-repeat: no-repeat;
  }
</style>
