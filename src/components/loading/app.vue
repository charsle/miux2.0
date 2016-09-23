<template>
  <div id="MIUX">
			<div class="loading_left fl">
			</div>
			<div class="loading_right fr">
				<div class="show_box">
					<div class="col-xs-4 mt10">
						<div class="outer"></div>
						<div style="position: absolute;z-index: 99;width: 95px; height: 95px;top:3px;left:3px; border-radius: 50%; overflow: hidden;">
							<img :src="userInfo.user.UM0111 | getUrl" /></div>
					</div>
					<div class="col-xs-8 fs16">
						<div class="row fs30 bold" v-text="userInfo.user.UM0102"></div>
						<div class="row mt10"><span class="light-grey">职位：</span><span v-text="userInfo.user.UM0118"></span></div>
						<div class="row nowrap overflow"><span class="light-grey">部门：</span><span v-if="userInfo.dept!=null">{{userInfo.dept.TM00106}}</span></div>
						<div class="row"><span class="light-grey">编号：</span><span v-text="userInfo.user.UM0106"></span></div>
					</div>
					<div class="clearfix"></div>
				</div>
				<div class="footer" v-if="BASE_URL_CONFIG.COMMON_BASE.ISLEFTLOGO==false">
					<img src="../../../static/images/copticmm/pic-1.png" width="100%" />
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
</template>
<script type="text/javascript">
  import '../../assets/css/loading.css'
  import gloabl from '../../api/globConfig'
  import systemConfig from '../../api/systemConfig'
  export default {
    ready() {
      setTimeout(() => {
        location.href = "main.html"
      }, 2000)
    },
    data() {
      return {
        userInfo: JSON.parse(gloabl.getCookie('allUserInfo')),
        BASE_URL_CONFIG: systemConfig
      }
    }
  }
</script>
<style type="text/css">
  .outer {
    position: absolute;
    width: 103px;
    height: 103px;
    background: -webkit-linear-gradient(left, rgba(52, 182, 231, 0), rgba(52, 182, 231, 1));
    /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, rgba(52, 182, 231, 0), rgba(52, 182, 231, 1));
    /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, rgba(52, 182, 231, 0), rgba(52, 182, 231, 1));
    /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, rgba(52, 182, 231, 0), rgba(52, 182, 231, 1));
    /* 标准的语法（必须放在最后） */
    border-radius: 100%;
    animation: spin 1s infinite linear;
  }

  @keyframes spin {
    0% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
</style>
