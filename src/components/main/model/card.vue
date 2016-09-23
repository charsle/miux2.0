<template>
	<div>
		<h1>
			<a href="javascript:;" v-if="isParent" @click="returnParent(currentParentType)">
				<span class="glyphicon glyphicon-menu-left"></span>&nbsp;&nbsp;个人名片
			</a>
			<i v-else>个人名片</i>
			<span class="fr fs14 tabTitleColor"><i class="iconfont">&#xe64d;</i></span>
		</h1>
		<div id="cardList" class="col-xs-12">
			<div class="col-xs-12 header_card relative">
				<img :src="cardList.TM00323 | getBigUrl" />
				<div class="userInfosetting" v-cloak>
					{{cardList.TM00306}}&nbsp;
					<i class="cardLine"  v-if="cardList.isOnline==1"></i>
					<i class="cardUnline" v-else> </i>&nbsp;
					<i class="iconfont fs20 star_color pointer" v-if="cardList.isStar!='0'" @click="markPersonStar(cardList.TM00301,0)">&#xe60b;</i>
					<i class="iconfont fs20 light-grey pointer" v-else @click="markPersonStar(cardList.TM00301,1)">&#xe60b;</i>
				</div>
			</div>

			<div class="col-xs-12 s_paddingBottom fs14" v-cloak>
				{{cardList.TM00312}}
			</div>
			<div class="col-xs-12 s_paddingBottom fs14" v-cloak>
				<div class="row">
					<span class="light-grey">职位</span><span class="inlineblock ml20">{{cardList.TM00322}}</span>
				</div>
				<div class="row mt10">
					<span class="light-grey">编号</span><span class="inlineblock ml20">{{cardList.TM00318}}</span>
				</div>
			</div>
			<div v-if="cardList.isHide==1?true:false">
				<div class="col-xs-12 card_info pt10" v-cloak>
					<ul>
						<li v-if="cardList.TM00308!=null"><i class="iconfont light-blue fs18">&#xe617;</i><span class="inlineblock ml20">{{cardList.TM00308}}</span></li>
						<li v-if="cardList.TM00310!=null"><i class="iconfont light-blue fs18">&#xe619;</i><span class="inlineblock ml20">{{cardList.TM00310}}</span></li>
						<li v-if="cardList.TM00311!=null"><i class="iconfont light-blue fs18">&#xe60e;</i><span class="inlineblock ml20 light-blue">{{cardList.TM00311}}</span></li>
				</ul>

				</div>
				<div class="col-xs-12 mt15">
					<a href="javascript:;" class="fl share_btn btn_basic card_btn" @click="shareCard">分享名片</a>
					<a href="javascript:;" @click="sendMessage({name:'message',params:{name:cardList.TM00306,sendid:cardList.TM00301,sendtype:1}},cardList)" class="fr msg_btn btn_basic card_btn">即时消息</a>
				</div>
				<div class="col-xs-12 mt15" style="display: none;">
					<a href="javascript:;" class="btn_basic fullWidth msg_btn">即时消息</a>
				</div>
			</div>
			<div class="col-xs-12 mt15" v-if="cardList.isHide==1?false:true">
				<div>
					<p class="light-grey fs16"><i class="glyphicon glyphicon-question-sign"></i>对方是隐秘用户</p>
					<p class="light-grey mt5">该用户已被管理员设置成为了隐秘用户，其电话号码等联系信息和即时消 息等功能需要获得授权才能查阅和使用。要获得授权您可以：
						<br>· 联系团队管理员赋予权限；<br> · 点击下方的“验证手机号码”按钮输入对方的手机号码，验证正确后将自动获取授权。</p>
				</div>
				<div class="form-group mt10" v-if="isPhone">
					<label class="sr-only" for="exampleInputAmount">Amount (in dollars)</label>
					<div class="input-group">
						<input type="text" class="form-control radTL3 green_border" v-model="userPhone" name="userPhone" maxlength="11" placeholder="请输入对方完整手机号">
						<div class="input-group-addon radRB3">
							<a href="javascript:;" @click="validePhone">验证</a>
						</div>
					</div>
				</div>

				<div class="col-xs-12 mt15" v-if="!isPhone">
					<button type="button" class="form-control " @click="showEditPhone" style="background:#37d52f ;color: #fff;border: 1px solid #37d52f;"><i class="glyphicon glyphicon-lock"></i>&nbsp;&nbsp;验证对方手机号码</button>
				</div>

				<div class="clearfix"></div>
			</div>
		</div>
	</div>
</template>
<style lang="less">
	.input-group-addon {
		background: #37d52f;
		border: 1px solid #37d52f;
		a {
			display: block;
			color: #fff;
		}
	}

	.cardLine {
		display: inline-block;
		width: 20px;
		height: 20px;
		border-radius: 100%;
		background: #fff;
		border: 5px solid #2cb225
	}

	.cardUnline {
		display: inline-block;
		width: 20px;
		height: 20px;
		border-radius: 100%;
		background: #fff;
		border: 5px solid #ccc
	}
</style>
<script type="text/javascript">
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	import {
		sendMessageInfo
	} from '../../../assets/js/websocket';
	import StringUtil from '../../../assets/js/stringUtil';
	export default {
		data() {
			return {
				isParent: false,
				cardList: '',
				isPhone: false,
				userPhone: ''
			}
		},
		computed: {
			bindImageUrl() {
				return this.cardList.TM00321 != 'null' ? this.cardList.TM00321 : '../../../../static/images/default.jpg'
			}
		},
		ready() {

			this.getCardList();

		},
		vuex: {
			getters: {
				currentID: (state) => state.currentID,
				currentParentType: (state) => state.currentParentType,
				nowCurrent(state) {
					return state.threads;
				}
			}
		},
		watch: {
			currentID: {
				deep: true,
				handler() {
					this.getCardList();
				}
			}
		},
		computed: {
			isParent() {
				return this.currentParentType ? true : false
			}
		},
		methods: {
			returnParent(type) {
				this.$store.dispatch('SWITCH_RIGHT', this.currentParentType)
			},
			showEditPhone() {
				this.isPhone = true;
			},
			sendMessage(p, newItem) {
				this.$router.go(p);
				var time = StringUtil.dateFormat();
				var item = {};
				item.UM0301 = newItem.TM00301;
				item.UM0302 = newItem.TM00301;
				item.UM0303 = newItem.TM00306;
				item.UM0304 = '';
				item.UM0306 = time;
				item.UM0307 = 1;
				item.UM0308 = 1;
				item.UM0309 = '';
				item.tx = newItem.TM00321;
				this.$store.dispatch('SEND_NEW_PERSON_LIST', item)
			},
			//验证手机号码
			validePhone() {
				if (!gloabl.mobileReg.test(this.userPhone)) {
					gloabl.tipTools('您输入的手机号码不合法！', 'input[name="userPhone"]');
					return;
				}
				gloabl.fethAsync([URL.VALIDE_CARD_MOBILE_URL], 'TM00301=' + this.currentID + '&TM00308=' + this.userPhone, res => {
					if (res.success) {
						this.cardList = res.result;

					}
				})
			},
			getCardList() {
				gloabl.fethAsync([URL.FIND_PRATIVE_CARD_URL], 'TM00301=' + this.currentID, res => {
					if (res.success) {
						this.cardList = res.result;
						gloabl.doResizeHeight();
						//console.log(JSON.stringify(res.result));
					} else {
						gloabl.layer.msg('服务器超时!')
					}
				})
			},
			//添加或者取消星标
			markPersonStar(sid, type) {
				var params = 'UMT10=' + sid + '&UMT22=' + type;
				gloabl.cancelPersonStar(params, loop => {
					if (type == 1) {
						this.cardList.isStar = '1';
					} else {
						this.cardList.isStar = '0';
					}
					if (sid == this.nowCurrent.sendid) {
						this.nowCurrent.isStar = type;
						this.$store.dispatch('CHANGE_HEADER_NAME', this.nowCurrent);
					}

				})
			},
			shareCard: function() {
				var user = JSON.parse(gloabl.getCookie('allUserInfo')).user;
				var u_id = StringUtil.UUId(32);
				var sendTime = StringUtil.dateFormat();
				var msgParams = {
						"MSG00101": u_id,
						'MSG00102': user.UM0101,
						'MSG00103': user.UM0102,
						'MSG00104': this.nowCurrent.sendid,
						'MSG00105': this.nowCurrent.name,
						'MSG00106': sendTime,
						'MSG00107': this.nowCurrent.sendtype,
						'MSG00108': 7,
						'MSG00109': JSON.stringify(this.cardList),
						'MSG00110': user.UM0111,
						"MSG00111": 0,
						"isSelf": 0
					}
					//					return;
				var hash = location.href;

				if (hash.indexOf('tram') == -1 && this.nowCurrent.sendtype != 3) {
					gloabl.layer.confirm('是否分享到当前会话区？', () => {
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
