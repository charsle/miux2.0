<template id="">
  <div id="MIUX">
    <div class="ESWFW066Left" id="ESWFW066Left" :style="{background:BASE_URL_CONFIG.COMMON_BASE.ISLEFTLOGO==false?'#34B6E7':baseConfig.BASE_URL_CONFIG.COMMON_BASE.BACKGROUND}">
      <div class="ESWFW066Logo" v-if="BASE_URL_CONFIG.COMMON_BASE.ISLEFTLOGO">
        <a href="index.html"><img :src="BASE_URL_CONFIG.COMMON_BASE.LOGO" /></a>
      </div>
      <div class="ESWFW066LeftBac tc" id="ESWFW066LeftBac">
        <h4 v-if="BASE_URL_CONFIG.COMMON_BASE.ISLEFTLOGO"><img :src="BASE_URL_CONFIG.COMMON_BASE.ISTITLELOGO"/></h4>
        <h4 v-else><img :src="BASE_URL_CONFIG.COMMON_BASE.LEFTLOGO" style="max-width: 30%;"/></h4>
        <div v-if="BASE_URL_CONFIG.COMMON_BASE.ISTITLE">
          <h4 class="mt10">{{BASE_URL_CONFIG.COMMON_BASE.TITLE}}</h4>
        </div>

      </div>
      <div v-if="BASE_URL_CONFIG.COMMON_BASE.ISLEFTLOGO==false">

        <div style="position: absolute; bottom: 0;">

          <img src="../../../static/images/copticmm/pic-1.png" style="max-width: 100%;" />

        </div>

      </div>
    </div>
    <div class="ESWFW066Right" id="ESWFW066Right">
      <div class="ESWFW066Logo">
        <a class="ESWFW066Back" href="javascript:;" @click="backGo" :name="$route.name"></a>
      </div>
      <div class="rightLayout">
        <router-view></router-view>
      </div>

    </div>
    <div class="clearfix"></div>
  </div>
</template>
<script type="text/javascript">
  import gloabl from '../../api/globConfig'
  import '../../assets/css/login.css'
  import systemConfig from '../../api/systemConfig'
  import * as URL from '../../api/restfull'
  export default {
    data() {
      return {
        BASE_URL_CONFIG: systemConfig
      }
    },
    ready: function() {
      this.resizeAll();
      var _self = this;
      window.onresize = function() {
        _self.resizeAll();
      }
    },
    methods: {
      resizeAll: function() {
        let ESWFW066Left = document.querySelector("#ESWFW066Left"),
          ESWFW066Right = document.querySelector("#ESWFW066Right"),
          ESWFW066LeftBac = document.querySelector("#ESWFW066LeftBac"),
          top = (document.documentElement.clientHeight - ESWFW066LeftBac.offsetHeight) / 2 - 126 + 'px';
        ESWFW066LeftBac.style.marginTop = top;
        ESWFW066Left.style.height = ESWFW066Right.style.height = document.documentElement.clientHeight + 'px';
      },
      backGo: function() {
        var local = (this.$route.name);

        if (local === 'fpassword' || local === 'register') {
          location.href = 'index.html';
        } else {
          layer.confirm('信息未完成，您确定离开本页面吗？', {
            btn: ['残忍离开', '取消'], //按钮
            title: '系统信息',
            skin: '',
          }, function() {
            layer.closeAll();
            history.go(-1);
          });

        }
      }
    }

  }
</script>
