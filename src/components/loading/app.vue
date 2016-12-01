<template>
  <div id="MIUX">
			<div class="loading_left fl">
			</div>
			<div class="loading_right fr">
<!-- <div style="height:300px;overflow:auto;">{{userInfo | json}}</div> -->
            <div class="col-sm-3" v-for="user in userInfo">
              <div class="thumbnail">
                <img :src="user.UM0123" alt="...">
                <div class="caption">
                  <h3>{{user.UM0102}}</h3>
                  <div class="fs16">{{user.UM0116}}</div>
                  <br />
                  <p>
                    <a href="javascript:;" class="btn btn-primary" role="button" @click="enterMain(user)">进入</a>
                    </p>
                </div>
              </div>
            </div>
					<div class="clearfix"></div>
			</div>
			<div class="clearfix"></div>
		</div>
</template>
<script type="text/javascript">
  import '../../assets/css/loading.css'
  import gloabl from '../../api/globConfig'
  import systemConfig from '../../api/systemConfig'
  import * as URL from '../../api/restfull'
  export default {

    data() {
      return {
        // userInfo: JSON.parse(gloabl.getCookie('allUserInfo')),
        userInfo: JSON.parse(sessionStorage.getItem('allUserInfo')),
        BASE_URL_CONFIG: systemConfig
      }
    },
    methods: {
      enterMain(user) {
        var params = 'UM0103=' + user.UM0103 + '&UM0101=' + user.UM0101 + '&UMT99=0';
        console.log()
        gloabl.fethAsync(URL.CHOOSE_TEAR_URL, params, res => {
          if (res.success) {
            gloabl.setCookie('chooseTeam', JSON.stringify(user));
            location.href = 'test.html'
          } else {
            //gloabl.tipTools(res.msg, '[name="user_code"]');
            return;
          }
        })
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
