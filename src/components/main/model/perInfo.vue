<template>
	<div>
		<h1><a href="javascript:;" v-if="isParent" @click="returnParent(currentParentType)">
			<span class="glyphicon glyphicon-menu-left"></span>&nbsp;&nbsp;个人资料</a>
			<i v-else>个人资料</i> <span class="fr fs14 tabTitleColor"><i class="iconfont">&#xe64d;</i></span>
		</h1>
		<div id="person_layer">
			<div class="col-xs-12 header_card relative">
				<img :src="personInfo.UM0123 | getBigUrl" id="userBigImg" />
				<div class="header_up card_up" @click="uploadPersonImg">
					<i class="glyphicon glyphicon-camera"></i>
				</div>
				<div class="userInfosetting">
					{{personInfo.UM0102}}
				</div>
			</div>
			<div class="col-xs-12 s_paddingBottom fs14">
				<div class="col-xs-10 mt10 break">
					<span v-text="personInfo.UM0116?personInfo.UM0116:'暂无签名'" v-show="!singloop">{{personInfo.UM0116}}</span>
					<span v-show="singloop"><input type="text" v-model="single" value="{{personInfo.UM0116}}" class="form-control" placeholder="请输入您的个性签名"/> </span>
				</div>
				<div class="col-xs-2">
					<i class="iconfont edit_pen fr" v-show="!singloop" @click="editUserInfo(12)">&#xe646;</i>
					<i class="iconfont edit_pen fr" style="color:#64c96a" v-show="singloop" @click="saveUserInfo(12)">&#xe63c;</i>
				</div>
			</div>
			<div class="col-xs-12 s_paddingBottom fs14">
				<div class="row">
					<span class="light-grey">职位</span>
					<span class="inlineblock ml20" v-text="personInfo.UM0118?personInfo.UM0118:''"></span>
				</div>
				<div class="row mt10">
					<span class="light-grey">编号</span>
					<span class="inlineblock ml20" v-text="personInfo.UM0106?personInfo.UM0106:''"></span>
				</div>
			</div>
			<div class="col-xs-12 card_info pt10">
				<ul>
					<li>
						<i class="iconfont light-blue fs18">&#xe617;</i>
						<span class="inlineblock ml20" v-text="personInfo.UM0103"></span>
					</li>
					<li>
						<i class="iconfont light-blue fs18">&#xe619;</i>
						<span class="inlineblock ml20" v-text="personInfo.UM0104" v-show="!phoneloop">{{personInfo.UM0104}}</span>
						<span class="inlineblock ml20" v-show="phoneloop">
							<input type="text" name="" v-model="phone" value="{{personInfo.UM0104}}"  placeholder="事例:023-12345678" class="form-control"/>
						</span>
						<i class="iconfont edit_pen fr" @click="editUserInfo(14)" v-show="!phoneloop">&#xe646;</i>
						<i class="iconfont edit_pen fr" style="color:#64c96a" @click="saveUserInfo(14)" v-show="phoneloop">&#xe63c;</i>
					</li>
					<li>
						<i class="iconfont light-blue fs18">&#xe60e;</i>
						<span class="inlineblock ml20 light-blue" v-text="personInfo.UM0105" v-show="!emailloop">{{personInfo.UM0105}}</span>
						<span class="inlineblock ml20 light-blue" v-show="emailloop">
							<input type="text" name="" v-model="email" value="{{personInfo.UM0105}}" placeholder="事例:xxx@qq.com" class="form-control"/>
						</span>
						<i class="iconfont edit_pen fr" @click="editUserInfo(13)" v-show="!emailloop">&#xe646;</i>
						<i class="iconfont edit_pen fr" style="color:#64c96a" @click="saveUserInfo(13)" v-show="emailloop">&#xe63c;</i>
					</li>
				</ul>
			</div>
			<div class="col-xs-12 mt15">
				<a href="javascript:;" class="share_btn btn_basic" @click="shareMycard"><i class="iconfont fs18">&#xe618;</i>&nbsp;&nbsp;分享名片</a>
				<!-- <a href="javascript:;" class="fr msg_btn btn_basic card_btn" @click="shareCode"><i class="iconfont fs18">&#xe642;</i>&nbsp;&nbsp;二维码</a> -->
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	import {
		uploadImage
	} from '../../../../static/lib/updatephoto/miux_update_photo';
	import {
		sendMessageInfo
	} from '../../../assets/js/websocket';
	import StringUtil from '../../../assets/js/stringUtil';
	const SHOWCODE = '';
	export default {
		data() {
			return {
				personInfo: '',
				singloop: false,
				phoneloop: false,
				emailloop: false,
				single: '',
				phone: '',
				email: '',
				isParent: false
			}
		},
		vuex: {

			getters: {
				nowCurrent(state) {
					return state.threads;
				},
				currentParentType: (state) => state.currentParentType,
			},
		},
		computed: {
			isParent() {
				return this.currentParentType ? true : false
			}
		},
		ready() {
			var personList = JSON.parse(gloabl.getCookie('allUserInfo')).user;
			this.personInfo = personList;
			this.single = personList.UM0116;
			this.phone = personList.UM0104;
			this.email = personList.UM0105;
			gloabl.doResizeHeight();
		},
		methods: {
			returnParent() {
				this.$store.dispatch('SWITCH_RIGHT', this.currentParentType);
			},
			uploadPersonImg() {
				uploadImage(1, function(url) {

				});
			},
			shareCode: function() {
				var self = this;
				var params = ''; //接口参数
				layer.open({
					type: 1,
					title: '扫一扫，打开名片更方便',
					skin: '',
					content: `<div class="p10"><img src="" /></div>`,
				})
			},
			editUserInfo: function(type) {
				switch (type) {
					case 12:
						this.singloop = true;
						break;
					case 13:
						this.emailloop = true;
						break;
					case 14:
						this.phoneloop = true;
						break;
				}
			},
			saveUserInfo: function(type) {
				var parmas = '';
				switch (type) {
					case 12:
						parmas = 'UM0116=' + this.single;
						this.saveSubmit(URL.UPDATE_SIGN_URL, parmas, type);
						this.singloop = false;
						break;
					case 13:
						var regEmial = /^[0-9a-z][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}[0-9a-z]\.){1,4}[a-z]{2,4}$/

						if (!regEmial.test(this.email) && this.email != '') {
							tipTools('请输入合法的邮件地址');
							return;
						} else {
							parmas = 'UM0105=' + this.email;
							this.saveSubmit(URL.UPDATA_EMAIL_URL, parmas, type);
							this.emailloop = false;
						}
						break;
					case 14:
						var phoneReg = /^0[1-9]{2,3}-[1-9]\d{5,7}$/;
						console.log(!phoneReg.test(this.phone) && this.phone != '');
						if (!phoneReg.test(this.phone) && this.phone != '') {
							tipTools('请输入合法的固定电话');
							return;
						} else {
							parmas = 'UM0104=' + this.phone;
							this.saveSubmit(URL.UPDATA_PHONE_URL, parmas, type);
							this.phoneloop = false;
						}

						break;
				}
			},
			saveSubmit(url, param, type) {
				gloabl.fethAsync(url, param, res => {
					if (res.success) {

						var personList = JSON.parse(gloabl.getCookie('allUserInfo'));
						if (type == 12) {
							$('.single').html(this.single);
						}
						personList.user.UM0116 = this.single;
						personList.user.UM0105 = this.email;
						personList.user.UM0104 = this.phone;
						this.personInfo = personList.user;
						gloabl.setCookie('allUserInfo', JSON.stringify(personList));
						gloabl.tipTools(res.msg)
					} else {
						gloabl.tipTools('保存失败')
					}
				})

			},
			shareMycard: function() {
				console.log()
				var user = JSON.parse(gloabl.getCookie('allUserInfo')).user;
				var myUserName = JSON.parse(gloabl.getCookie('allUserInfo')).user.UM0102;
				var u_id = StringUtil.UUId(32);
				var sendTime = StringUtil.dateFormat();
				var infoCintent = {
					'TM00306': this.personInfo.UM0102,
					'TM00321': this.personInfo.UM0111,
					'TM00322': this.personInfo.UM0118,
					'TM00301': this.personInfo.UM0101,
					'TM00323': user.UM0123
				}
				var msgParams = {
					"MSG00101": u_id,
					'MSG00102': user.UM0101,
					'MSG00103': user.UM0102,
					'MSG00104': this.nowCurrent.sendid,
					'MSG00105': this.nowCurrent.name,
					'MSG00106': sendTime,
					'MSG00107': this.nowCurrent.sendtype,
					'MSG00108': 7,
					'MSG00109': JSON.stringify(infoCintent),
					'MSG00110': user.UM0111,
					"MSG00111": 0,
					"isSelf": 0
				}

				var hash = location.href;

				if (hash.indexOf('tram') == -1 && this.nowCurrent.sendtype != 3) {
					layer.confirm('是否分享到当前会话区？', () => {
						sendMessageInfo(msgParams);
						gloabl.layer.closeAll();
					})
				} else {
					gloabl.tipTools('名片不能分享到当前会话！');
				}
			}
		}
	}
</script>
