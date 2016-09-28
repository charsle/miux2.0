<template>
	<div class="login_box">
		<h3 :style="{color:  BASE_URL_CONFIG.COMMON_BASE.COLOR}">设置密码</h3>
		<form style="margin-top: 50px;">
			<div class="rightLoginBox mt25">
				<div class="col-md-12 ESWFW066BottomLine">
					<input type="password" name="" id="set_pwd" value="" v-model="set_pwd" placeholder="输入新密码(至少6位)" maxlength="20" class="ESWFW066Form" />
				</div>
				<div class="col-md-12 ESWFW066BottomLine mt10">
					<input type="password" name="" id="sureSetPwd" value="" v-model="sureSetPwd" placeholder="确认新密码" maxlength="20" class="ESWFW066Form" />
				</div>
				<div class="col-md-12 ESWFW066BottomLine mt20">
					<button class="ESWFW066Submit" type="button" @click="setPwdSubmit" :style="{background:  BASE_URL_CONFIG.COMMON_BASE.COLOR}">确定</button>
				</div>
			</div>
		</form>
	</div>
</template>
<script type="text/javascript">
	import gloabl from '../../api/globConfig'
	import systemConfig from '../../api/systemConfig'
	import * as URL from '../../api/restfull'
	export default {
		data: function() {
			return {
				set_pwd: '',
				sureSetPwd: '',
				mobile: '',
				BASE_URL_CONFIG: systemConfig
			}
		},
		ready: function() {
			this.mobile = gloabl.getCookie('settingmobile');
			if (this.mobile == null) {
				this.$router.go('fpassword');
			}
		},
		methods: {
			setPwdSubmit: function() {
				if (!gloabl.passwordReg.test(this.set_pwd)) {
					gloabl.tipTools('密码至少6位', '#set_pwd');
					return;
				}
				if (this.set_pwd !== this.sureSetPwd) {
					gloabl.tipTools('两次输入密码不一致', '#sureSetPwd');
					return;
				}
				var params = 'UMT02=&UM0103=' + this.mobile + '&UM0115=' + this.sureSetPwd;
				gloabl.fethAsync(URL.RESET_PASSWORD_URL, params, res => {
					if (res.success) {
						gloabl.delCookie('settingmobile');
						location.href = './index.html';
						gloabl.tipTools('修改成功');
					} else {
						gloabl.tipTools('修改失败，请重新设置密码');
						this.$router.go('/fpassword');
					}
				})
			}
		}

	}
</script>
