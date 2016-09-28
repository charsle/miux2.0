<script type="text/javascript">
	/**
	 * miux v2.0 定制版  注册验证手机号码
	 * Copyright 2016-2016 Miux, Inc.
	 * author  charsle(蔡远生);
	 */

	import gloabl from '../../api/globConfig'
	import systemConfig from '../../api/systemConfig'
	import * as URL from '../../api/restfull'

	export default {
		data: function() {
			return {
				userMobile: '',
				userRang: '',
				BASE_URL_CONFIG: systemConfig
			}
		},
		methods: {
			getCodeClick(e) {
				if (!gloabl.mobileReg.test(this.userMobile)) {
					gloabl.tipTools('手机号码不正确', '[name="userMobile"]')
					return;
				}
				this.valideSMSMessage(e);
			},
			/*
			 * 短信验证
			 */
			valideSMSMessage(e) {
				let params = 'UMT01=2&UM0103=' + this.userMobile;
				gloabl.fethAsync([URL.PHONE_COLDE_URL], params, res => {
					if (res.success) {
						gloabl.tipTools(res.msg);
						gloabl.sendTime(e);
					} else {
						gloabl.tipTools(res.msg, '[name="userMobile"]')
						return;
					}

				})
			},
			valideRegister() {
				var params = 'UMT01=2&UM0103=' + this.userMobile + '&UMT04=' + this.userRang;
				gloabl.fethAsync([URL.VALIDE_SMS], params, res => {
					if (res.success) {
						sessionStorage.setItem('mobile', this.userMobile);
						this.$router.go('/setting');
					} else {
						gloabl.tipTools(res.msg, '[name="userMobile"]');
						return;
					}

				})

			},
			registerSubmit() {
				if (!gloabl.mobileReg.test(this.userMobile)) {
					gloabl.tipTools('手机号码不正确', '[name="userMobile"]');
					return;
				}
				if (this.userRang == '') {
					gloabl.tipTools('验证码不能为空', '[name="userRang"]');
					return;
				}
				this.valideRegister();
			},
		}
	}
</script>
<template>
	<div class="login_box">
		<h3 :style="{color: BASE_URL_CONFIG.COMMON_BASE.COLOR}">注册</h3>
		<form style="margin-top: 50px;">
			<div class="rightLoginBox mt25">
				<div class="col-md-12 ESWFW066BottomLine">
					<input type="tel" name="userMobile" v-model="userMobile" placeholder="请输入您的手机号码" maxlength="11" class="ESWFW066Form" />
				</div>
				<div class="col-md-12 ESWFW066BottomLine mt10">
					<div class="col-sm-8">
						<input type="tel" name="userRang" v-model="userRang" id="" placeholder="请输入短信验证码" maxlength="8" class="ESWFW066Form" />
					</div>
					<div class="col-sm-4">
						<button type="button" class="ESWFW066GetCode" id="ESWFW066GetCode" @click="getCodeClick($event)">点击获取</button>
						<div class="clearfix"></div>
					</div>
				</div>
				<div class="col-md-12 ESWFW066BottomLine mt20">
					<button class="ESWFW066Submit" type="button" @click="registerSubmit" :style="{background:  BASE_URL_CONFIG.COMMON_BASE.COLOR}">立即注册</button>
				</div>
				<div class="col-md-12 mt10 tc">
					<a class="ESWFW002RegisterBtn" href="login.html" :style="{color:  BASE_URL_CONFIG.COMMON_BASE.COLOR}"><span class="light-grey">已有账号？</span>登录</a>
				</div>
			</div>
		</form>
	</div>
</template>
