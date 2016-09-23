<template>
	<div class="login_box">
		<h3 :style="{color:BASE_URL_CONFIG.COMMON_BASE.COLOR}">忘记密码</h3>
		<form style="margin-top: 50px;">
			<div class="rightLoginBox mt25">
				<div class="col-md-12 ESWFW066BottomLine">
					<input type="tel" name="" id="user_tel" v-model="user_tel" placeholder="请输入电话号码" maxlength="11" class="ESWFW066Form" />
				</div>
				<div class="col-md-12 ESWFW066BottomLine mt10">
					<div class="col-sm-5">
						<input type="text" name="user_code" id="" v-model="user_code" placeholder="请输入图形验证码" maxlength="8" class="ESWFW066Form" />
					</div>
					<div class="col-sm-3 ESWFW003Code">
						<img :src="img_url" alt="" id="changeCode" />
					</div>
					<div class="col-sm-4 fr">
						<a href="javascript:;" @click="changeCode" class="ESWFW066GetCode">换一张</a>
						<div class="clearfix"></div>
					</div>
				</div>
				<div class="col-md-12 ESWFW066BottomLine mt20">
					<button class="ESWFW066Submit" type="button" @click="getCode" :style="{background:  BASE_URL_CONFIG.COMMON_BASE.COLOR}">获取验证码</button>
				</div>
			</div>
		</form>
		<div class="clearfix"></div>
	</div>
</template>
<script type="text/javascript">
	/*!
	 * miux v2.0 定制版  忘记密码验证
	 * Copyright 2016-2016 Miux, Inc.
	 * author  WF(吴芳);
	 */
	import gloabl from '../../api/globConfig'
	import systemConfig from '../../api/systemConfig'
	import * as URL from '../../api/restfull'
	export default {
		data: function() {
			return {
				user_tel: '',
				user_code: '',
				img_url: [URL.IMAGE_CODE_URL] + '?UMT02=2',
				BASE_URL_CONFIG: systemConfig
			}
		},
		methods: {
			changeCode: function(ev) {
				document.getElementById("changeCode").setAttribute('src', this.img_url + '&time=' + (+new Date()));
			},
			//			短信验证码是否发送成功
			getSMSMessage: function() {
				var self = this;
				var params = 'UMT01=3&UM0103=' + this.user_tel;
				gloabl.fethAsync([URL.PHONE_COLDE_URL], params, res => {
					if (res.success) {
						this.dialogTip();
					} else {
						gloabl.tipTools(res.msg, '[name="user_code"]');
						return;
					}
				})

			},
			dialogTip() {
				var self = this;
				gloabl.layer.open({
					type: 0,
					title: '系统信息',
					skin: '',
					btn: ['确定', '取消'],
					content: `<input type="text" id="user_tel_code" placeholder="请输入手机验证码" maxlength="4" class="form-control" />`,
					yes() {
						var user_tel_code = document.getElementById('user_tel_code').value;
						if (user_tel_code == '') {
							gloabl.tipTools('验证码不能为空', '#user_tel_code');
							return;
						} else {
							self.goSetting(user_tel_code);
						}
					}

				})
			},
			//			手机验证码验证
			goSetting: function(code) {
				var params = 'UMT01=3&UM0103=' + this.user_tel + '&UMT04=' + code;
				gloabl.fethAsync([URL.VALIDE_PHONE_COLDE_URL], params, res => {
					if (res.success) {
						gloabl.layer.closeAll();
						setCookie('settingmobile', this.user_tel);
						this.$router.go('/spassword');
					} else {
						gloabl.tipTools(res.msg, '#user_tel_code');
						return;
					}

				})

			},

			getCode: function() {
				var self = this;
				if (!mobileReg.test(this.user_tel)) {
					tipTools('手机号码输入不合法,请重新输入', '#user_tel');
					return;
				}
				if (this.user_code == '') {
					tipTools('验证码不能为空', '[name="user_code"]');
					return;
				} else {
					//验证验证码是否成功、
					var params = 'UMT02=2&UMT03=' + this.user_code;
					fethAsync([URL.VALIDE_PHONE_BOOLEAR_URL], params, res => {
						if (res.success) {
							this.getSMSMessage()
						} else {
							var error_code = res.error;
							this.changeCode();
							switch (error_code) {
								case '6001':
									tipTools(res.msg, '[name="user_code"]');
									break;
								case '1001':
									tipTools(res.msg, '#user_tel');
									break;
								default:
									tipTools(res.msg);
									break;
							}
						}
					})
				}
			}
		}
	}
</script>
