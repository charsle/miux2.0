<template>
	<div>
		<h1>
			<a href="javascript:;" v-if="isParent" @click="returnParent(currentParentType)">
				<span class="glyphicon glyphicon-menu-left"></span>&nbsp;&nbsp;助手名片
			</a>
			<i v-else>助手名片</i>
			<span class="fr fs14 tabTitleColor"><i class="iconfont">&#xe64d;</i></span>
		</h1>
		<div id="cardList" class="col-xs-12">
			<div class="col-xs-12 header_card relative">
				<img :src="cardList.TM00804 | getBigUrl" />
				<div class="header_up card_up" v-if="isManage.UM0121!=0" @click="uploadPersonImg">
					<i class="glyphicon glyphicon-camera"></i>
				</div>
				<div class="userInfosetting" v-cloak>
					{{cardList.TM00802}}&nbsp;
					<i class="green line_circle lh25" style="display: inline-block;"></i>
					<i class="iconfont fs12 star_color">&#xe60b;</i>
				</div>
			</div>

			<div class="col-xs-12 s_paddingBottom fs14" v-cloak>
				{{cardList.TM00312}}
			</div>
			<div class="col-xs-12 s_paddingBottom">
				<div class="row light-grey">个性签名
					<i class="iconfont edit_pen fr" @click="editAdInfo(3)" v-show="!singloop"  v-if="isManage.UM0121!=0">&#xe646;</i>
					<i class="iconfont edit_pen fr" style="color:#64c96a" v-show="singloop" @click="saveAdInfo(3)">&#xe63c;</i>
					<div class="clearfix"></div>
				</div>
				<div class="row lh18 break" v-cloak>
					<span v-text="cardList.TM00807?cardList.TM00807:'暂无签名'" v-show="!singloop">{{cardList.TM00807}}</span>
					<span v-show="singloop">
						<textarea v-model="single" :value="cardList.TM00807" class="form-control" placeholder="请输入您的个性签名"></textarea>
					</span>
				</div>
			</div>
			<div class="col-xs-12 s_paddingBottom fs14">
				<div class="row">
					<div class="col-xs-1 light-grey">
						职位
					</div>
					<div class="col-xs-9 pl10">
						<span class="inlineblock">{{cardList.TM00805}}</span>
						<!--<span v-show="isPosition"><input type="text" v-model="single" value="{{cardList.TM00805}}" class="form-control" placeholder="请输入职位"/> </span>-->
					</div>
					<!--<div class="col-xs-2 tr">
						<i class="iconfont edit_pen fr" @click="editAdInfo(1)" v-show="!isPosition">&#xe646;</i>
						<i class="iconfont edit_pen fr" style="color:#64c96a" v-show="isPosition" @click="">&#xe63c;</i>
					</div>-->
				</div>
			</div>
			<div class="col-xs-12 pt10 lh40">
				<div class="row">
					<div class="col-xs-1">
						<i class="iconfont light-blue fs18">&#xe619;</i>
					</div>
					<div class="col-xs-9">
						<span v-show="!phoneloop" class="inlineblock">{{cardList.TM00806}}</span>
						<span v-show="phoneloop">
							<input type="text" v-model="phone" :value="cardList.TM00806" class="form-control" placeholder="事例:023-12345678"/>
						</span>
					</div>
					<div class="col-xs-2">
						<i class="iconfont edit_pen fr" v-show="!phoneloop" @click="editAdInfo(1)"  v-if="isManage.UM0121!=0">&#xe646;</i>
						<i class="iconfont edit_pen fr" style="color:#64c96a" v-show="phoneloop" @click="saveAdInfo(1)">&#xe63c;</i>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-1">
						<i class="iconfont light-blue fs18">&#xe60e;</i>
					</div>
					<div class="col-xs-9">
						<span v-show="!emailloop" class="inlineblock light-blue">{{cardList.TM00808}}</span>
						<span v-show="emailloop" class="inlineblock light-blue">
							<input type="text" name="" v-model="email" :value="cardList.TM00808" placeholder="事例:xxx@qq.com" class="form-control"/>
						</span>

					</div>
					<div class="col-xs-2">
						<i v-show="!emailloop" class="iconfont edit_pen fr" @click="editAdInfo(2)"  v-if="isManage.UM0121!=0">&#xe646;</i>
						<i v-show="emailloop" style="color:#64c96a" class="iconfont edit_pen fr" @click="saveAdInfo(2)">&#xe63c;</i>
					</div>
				</div>

			</div>
			<div class="col-xs-12 mt15">
				<a href="javascript:;" style="width: 100%;" @click="sendMessage({name:'message',params:{name:cardList.TM00802,sendid:0,sendtype:1}})" class=" msg_btn btn_basic card_btn">即时消息</a>
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
</style>
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
	export default {
		data() {
			return {
				isParent: false,
				cardList: '',
				single: '',
				phone: '',
				email: '',
				singloop: false,
				phoneloop: false,
				emailloop: false,
				isManage: JSON.parse(gloabl.getCookie('allUserInfo')).user,
			}
		},
		computed: {
			bindImageUrl() {
				return this.cardList.TM00321 != 'null' ? this.cardList.TM00321 : '../../../../static/images/default.jpg'
			}
		},
		ready() {

			this.getCardList();
			gloabl.doResizeHeight();
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
				this.$store.dispatch('SWITCH_RIGHT', type);
			},
			uploadPersonImg() {
				uploadImage(1, url => {
					this.getCardList();
				}, 'ada');
			},
			sendMessage(p) {
				this.$router.go(p)
			},

			getCardList() {
				gloabl.fethAsync([URL.FIND_PRATIVE_CARD_URL], 'TM00301=' + this.currentID, res => {
					if (res.success) {
						this.cardList = res.result;
						//							console.log(JSON.stringify(res.result));
					} else {
						layer.msg('服务器超时!')
					}
				})
			},
			saveAdInfo(type) {
				var parmas = '';
				switch (type) {
					case 3:
						parmas = 'TM00807=' + this.single;
						this.saveSubmit(parmas);
						this.singloop = false;
						break;
					case 2:
						var regEmial = /^[0-9a-z][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}[0-9a-z]\.){1,4}[a-z]{2,4}$/
						if (!regEmial.test(this.email) && this.email != '') {
							gloabl.tipTools('请输入合法的邮件地址');
							return;
						} else {
							parmas = 'TM00808=' + this.email;
							this.saveSubmit(parmas);
							this.emailloop = false;
						}
						break;
					case 1:
						var phoneReg = /^0[1-9]{2,3}-[1-9]\d{5,7}$/;
						if (!phoneReg.test(this.phone) && this.phone != '') {
							gloabl.tipTools('请输入合法的固定电话');
							return;
						} else {
							parmas = 'TM00806=' + this.phone;
							this.saveSubmit(parmas);
							this.phoneloop = false;
						}
						break;
				}
			},
			saveSubmit(param) {
				gloabl.fethAsync([URL.ROBOT_DATA_URL], param, res => {
					if (res.success) {
						//tipTools(res.msg)
						this.getCardList()
					}
				})

			},
			editAdInfo(type) {
				switch (type) {
					case 2:
						this.emailloop = true;
						break;
					case 1:
						this.phoneloop = true;
						break;
					case 3:
						this.singloop = true;
						break;
				}
			}
		}
	}
</script>
