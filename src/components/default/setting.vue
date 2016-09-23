<template>
	<div class="login_box">
		<h3  :style="{color:  BASE_URL_CONFIG.COMMON_BASE.COLOR}">创建登录密码</h3>
		<div class="rightLoginBox mt10">
			<div class="col-md-12 fs14 light-grey">
				设置登录密码后可以用“密码”方式登录MIUX手机版和网页版客户端。您之后可以在“个人设置”页面中修改密码。
			</div>
		</div>
		<form action="" method="post">
			<div class="rightLoginBox mt25">
				<div class="col-md-12 ESWFW066BottomLine">
					<input type="password" name="createPwd" id="" v-model="createPwd" placeholder="输入6位及以上字符" maxlength="20" class="ESWFW066Form" />
				</div>
				<div class="col-md-12 ESWFW066BottomLine mt10">
					<input type="password" name="repeatPwd" id="" v-model="repeatPwd" placeholder="再次输入设定的密码" maxlength="20" class="ESWFW066Form" />
				</div>
				<div class="col-md-12 ESWFW066BottomLine mt20">
					<button class="ESWFW066Submit" type="button" @click="createNewPwd" :style="{background:  BASE_URL_CONFIG.COMMON_BASE.COLOR}">确定</button>
				</div>
			</div>
		</form>
	</div>
</template>
<script type="text/javascript">
	/**
	 * miux v2.0 定制版  注册
	 * Copyright 2016-2016 Miux, Inc.
	 * author  charsle(蔡远生);
	 */
	import gloabl from '../../api/globConfig'
	import systemConfig from '../../api/systemConfig'
	import * as URL from '../../api/restfull'
	export default {
		data() {
			return {
				createPwd: '',
				repeatPwd: '',
				mobile: '',
				BASE_URL_CONFIG: baseConfig
			}
		},
		ready() {
			this.mobile = sessionStorage.getItem('mobile');
			console.log(this.mobile);
			if (this.mobile == null) {
				this.$router.go('/register');
			}
		},
		methods: {
			createNewPwd() {
				if (!gloabl.passwordReg.test(this.createPwd)) {
					gloabl.tipTools('请输入6位及以上的有效密码', '[name="createPwd"]');
					return;
				}
				if (this.createPwd !== this.repeatPwd) {
					gloabl.tipTools('两次输入的密码不一致', '[name="repeatPwd"]');
					return;
				}
				this.register();
			},
			register() {
				let params = 'UM0115=' + this.createPwd + '&UM0103=' + this.mobile;
				fethAsync([URL.IS_REGISTER_URL], params, res => {
					if (res.success) {
						gloabl.setCookie('allUserInfo', JSON.stringify(res.result));
						location.href = 'main.html';
						localStorage.removeItem('mobile');
					} else {
						gloabl.tipTools(res.msg, '[name="userMobile"]');
						return;
					}
				})
			},
		}
	}
</script>
