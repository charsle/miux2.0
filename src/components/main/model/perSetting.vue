<template>
	<div>
		<h1>个人设置<span class="fr fs14 tabTitleColor"><i class="iconfont">&#xe64d;</i></span></h1>
		<div class="col-xs-12 paddingBottom" style="cursor: pointer;" @click="currentRightTag('pinfo','setting')">
			<div class="col-xs-2">
				<img class="img-circle" :src="items.UM0111 | getUrl" width="60" height="60" />
			</div>
			<div class="col-xs-10 pl20">
				<div class="row docSizeColor fs18 lh28">
					{{items.UM0102}}
				</div>
				<div class="row light-grey fs14">
					{{items.TM00106}}
				</div>
			</div>
		</div>
		<div class="col-xs-12 settingItem mt15">
			<div id="perSetting">
				<ul>
					<li>
						<a href="javascript:;" @click="showSetting($event)">更改绑定的手机号码<i class="glyphicon glyphicon-triangle-bottom fr"></i></a>
						<ul>
							<li><input type="tel" name="newMobile" v-model="newMobile" class="form-control" maxlength="11" placeholder="新的手机号码" /></li>

							<li class="mt10 row">
								<div class="col-xs-9">
									<input type="tel" name="newCode" v-model="newCode" class="form-control getCodetel" placeholder="输入验证码" />
								</div>
								<div class="col-xs-3">
									<button class="btn btn-default btnCode" id="uploadM" href="javascript:;" @click="getCode($event)">点击验证</button>
								</div>
							</li>
							<li class="mt10 row">
								<input type="password" name="pw" v-model="pw" class="form-control" placeholder="原密码" />
							</li>
							<li class=" mt10">
								<a class="fr btn btn-success" href="javascript:;" @click="updateMobile">确定更改</a>
							</li>
							<div class="clearfix"></div>
						</ul>
					</li>
					<li>
						<a href="javascript:;" @click="showSetting($event)">推送设置<i class="glyphicon glyphicon-triangle-bottom fr"></i></a>
						<ul>
							<li>
								<span class="setfont">消息免打扰</span>
								<div class="switch fr">
									<input type="checkbox" name="alllowSend" data-off-color="danger" data-size="mini" data-on-color="success" />
								</div>
								<div class="clearfix"></div>
							</li>
							<li class="fs12 light-grey mt10">开启此功能后，除@和关键词消息以外的其他消息都不会以通知的形式推送给您。</li>
							<li class="mt10">
								<span class="setfont">允许推送普通消息</span>
								<div class="switch fr">
									<input type="checkbox" name="nomalMeg" data-size="mini" data-off-color="danger" data-on-color="success" />
								</div>
								<div class="clearfix"></div>
							</li>
							<li class="mt10">
								<span class="setfont">允许推送频组消息</span>
								<div class="switch fr">
									<input type="checkbox" name="groupSend" data-size="mini" data-off-color="danger" data-on-color="success" />
								</div>
								<div class="clearfix"></div>
							</li>
							<li class="mt10">
								<span class="setfont">允许推送系统提示消息</span>
								<div class="switch fr">
									<input type="checkbox" name="tipsSend" data-size="mini" data-off-color="danger" data-on-color="success" />
								</div>
								<div class="clearfix"></div>
							</li>
						</ul>
					</li>
					<li>
						<a href="javascript:;" @click="showSetting($event)">安全设置<i class="glyphicon glyphicon-triangle-bottom fr"></i></a>
						<ul>
							<li><input type="tel" name="oldPwd" v-model="oldPassword" class="form-control" placeholder="请输入原密码" /></li>
							<li class="mt10 row">
								<input type="tel" name="newPwd" v-model="newPassword" class="form-control" placeholder="请输入新密码" />
							</li>
							<li class=" mt10">
								<a class="fr btn btn-success" href="javascript:;" @click="updatePassword">确定</a>
							</li>
							<div class="clearfix"></div>
						</ul>
					</li>
					<li>
						<a href="javascript:;">下载手机客户端</a>
					</li>
					<div class="clearfix"></div>
				</ul>
			</div>
		</div>
		<div class="col-xs-12 exitBtn mt10">
			<a class="btn btn-danger" href="javascript:;" @click="logOut">注销</a>
		</div>
	</div>
</template>
<script type="text/javascript">
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'

	export default {
		data() {
			return {
				newMobile: '',
				newCode: '',
				oldPassword: '',
				newPassword: '',
				um0803: '',
				um0804: '',
				um0805: '',
				um0806: '',
				pw: '',
				items: [],
			}
		},

		ready() {
			gloabl.doResizeHeight();
			this.getAllUserInfo();
			$('#perSetting li ul').css('display', 'none').eq(0).show();
		},
		methods: {
			currentRightTag(type, parent) {
				this.$store.dispatch('SWITCH_RIGHT', type, '', parent)
			},
			//拼装用户数据
			getAllUserInfo() {

				var _user = JSON.parse(gloabl.getCookie('allUserInfo'));
				this.items = _user.user;
				this.items.TM00106 = _user.company.TM00106;
				this.items.UM0803 = _user.set.UM0803 == 1 ? true : false;
				this.items.UM0804 = _user.set.UM0804 == 1 ? true : false;
				this.items.UM0805 = _user.set.UM0805 == 1 ? true : false;
				this.items.UM0806 = _user.set.UM0806 == 1 ? true : false;
				this.um0803 = _user.set.UM0803;
				this.um0804 = _user.set.UM0804;
				this.um0805 = _user.set.UM0805;
				this.um0806 = _user.set.UM0806;
				$('input[name="alllowSend"]').bootstrapSwitch('state', this.items.UM0803);
				$('input[name="nomalMeg"]').bootstrapSwitch('state', this.items.UM0804);
				$('input[name="groupSend"]').bootstrapSwitch('state', this.items.UM0805);
				$('input[name="tipsSend"]').bootstrapSwitch('state', this.items.UM0806);
				$('input[name="alllowSend"]').bootstrapSwitch().on('switchChange.bootstrapSwitch', (e, state) => {
					if (state) {
						this.um0803 = 1;
					} else {
						this.um0803 = 0;
					}
					this.getStateSendMsg();
					$('input[name="nomalMeg"],input[name="groupSend"],input[name="tipsSend"]').bootstrapSwitch('disabled', state);
				});
				$('input[name="nomalMeg"]').bootstrapSwitch().on('switchChange.bootstrapSwitch', (e, state) => {
					if (state) {
						this.um0804 = 1;
					} else {
						this.um0804 = 0;
					}
					this.getStateSendMsg();
				});
				$('input[name="groupSend"]').bootstrapSwitch().on('switchChange.bootstrapSwitch', (e, state) => {
					if (state) {
						this.um0805 = 1;
					} else {
						this.um0805 = 0;
					}
					this.getStateSendMsg();
				});;
				$('input[name="tipsSend"]').bootstrapSwitch().on('switchChange.bootstrapSwitch', (e, state) => {
					if (state) {
						this.um0806 = 1;
					} else {
						this.um0806 = 0;
					}
					this.getStateSendMsg();
				});
			},

			// 更改推送状态
			getStateSendMsg() {
				var params = 'UM0803=' + this.um0803 + '&UM0804=' + this.um0804 + '&UM0805=' + this.um0805 + '&UM0806=' + this.um0806;
				console.log(params);
				gloabl.fethAsync([URL.CHANGE_STATE_URL], params, res => {
					if (res.success) {
						console.log(res);
						var _user = JSON.parse(gloabl.getCookie('allUserInfo'));
						_user.set.UM0803 = this.um0803;
						_user.set.UM0804 = this.um0804;
						_user.set.UM0805 = this.um0805;
						_user.set.UM0806 = this.um0806;
						gloabl.setCookie('allUserInfo', JSON.stringify(_user));
					}
				})

			},
			getCode(ev) {
				if (!gloabl.mobileReg.test(this.newMobile)) {
					gloabl.tipTools('您输入的不是合法手机号码!', '[name="newMobile"]');
					return;
				}
				this.sendSMS(ev);
			},
			updateMobile() {
				if (this.newCode === '') {
					gloabl.tipTools('您输入的验证码不能为空!', '[name="newCode"]');
					return;
				}
				if (this.pw == '') {
					gloabl.tipTools('您输入的密码不能为空!', '[name="pw"]');
					return;
				}
				//验证短信验证码
				var params = 'UMT01=4&UM0103=' + this.newMobile;
				this.updateChangeMobile();
			},
			//更改手机号码
			updateChangeMobile() {
				var params = 'UMT01=4&UMT08=' + this.newMobile + '&UM0115=' + this.pw + '&UMT04=' + this.newCode;
				console.log(params);
				gloabl.fethAsync([URL.UPDATE_MOBILE], params, res => {
					if (res.success) {
						gloabl.tipTools('修改成功，正在为您跳转登录页面!');
						setTimeout(() => {
							loginOut();
						}, 2000)
					} else {
						gloabl.tipTools(res.msg)
					}
				})
			},
			//发送验证码
			sendSMS(ev) {
				var params = 'UMT01=4&UM0103=' + this.newMobile;
				gloabl.fethAsync([URL.SEND_SMS], params, res => {
					if (res.success) {
						sendTime(ev)
					} else {
						gloabl.tipTools(res.msg, '[name="newMobile"]');
					}
				})
			},
			showSetting(ev) {
				$('#perSetting li ul').slideUp();
				$(ev.currentTarget).siblings('ul').slideDown();
			}, //修改密码
			updatePassword() {
				if (!passwordReg.test(this.oldPassword)) {
					gloabl.tipTools('您输入的密码不合法！', '[name="oldPwd"]');
					return;
				}
				if (!passwordReg.test(this.newPassword)) {
					gloabl.tipTools('您输入的密码不合法！', '[name="newPwd"]');
					return;
				}
				var params = 'UM0115=' + this.oldPassword + '&UMT07=' + this.newPassword
				gloabl.fethAsync([URL.UPDATE_PASSWORD_URL], params, res => {
					console.log(res);
					if (res.success) {
						gloabl.tipTools(res.msg);
						location.href = "login.html"
					} else {
						gloabl.tipTools(res.msg, '[name="oldPwd"]');
					}
				})
			},
			//注销
			logOut() {
				gloabl.layer.confirm('您确定要退出系统吗?', function() {
					gloabl.loginOut();
				})

			}
		}

	}
</script>
