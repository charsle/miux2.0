<template>
	<div class="doc">
		<h1>
			<a href="javascript:;" @click="currentRightTag('star')">
				<span class="glyphicon glyphicon-menu-left"></span> 星标详情
			</a>
			<span class="fr fs14 tabTitleColor"><i class="iconfont">&#xe64d;</i></span>
		</h1>
		<!-- {{starListDetaile | json}} -->
		<div class="col-xs-12 ptb20">
			<div class="col-xs-12">
				<div class="col-xs-2 d_headerPoto">
					<img class="img-circle" :src="starListDetaile.MSG00110 | getUrl" />
				</div>
				<div class="col-xs-10">
					<div class="row light-grey fs12 lh40">
						<div class="col-xs-8">
							{{starListDetaile.MSG00103}}
						</div>
						<div class="col-xs-4 tr text-uppercase">
							{{starListDetaile.MSG00106 | reverseTime}}
						</div>
					</div>
				</div>
			</div>
			<div id="docDetaile" class="col-xs-12">
				<div class="col-xs-12 detaileBox break">
					<div v-if="starListDetaile.starType==1">
						<div class="tl msgContant" v-text="starListDetaile.MSG00109"></div>
					</div>
					<div v-if="starListDetaile.starType==2">
						<div class="tc msgContant"><img :src="starListDetaile.MSG00109.thumbnailURL" /></div>
					</div>
					<div v-if="starListDetaile.starType==3">
						<div class="row mt10 p10">
							<audio :src="starListDetaile.MSG00109.url" controls="controls" style="width:360px">
								您的浏览器不支持 audio 标签。
							</audio>
						</div>
					</div>
				</div>
				<div class="col-xs-12 detaileBtn starDet">
					<ul>
						<li @click="doShare(starListDetaile.starType)" v-if="starListDetaile.starType!=3"><i class="iconfont fs18">&#xe636;</i>&nbsp;&nbsp;分享<span class="line">|</span></li>
						<li @click="deleteDoc(starListDetaile)"><i class="iconfont fs18">&#xe630;</i>&nbsp;&nbsp;删除</li>
						<!--<li @click="deleteDoc(starListDetaile.id)" v-else><i class="iconfont fs18">&#xe630;</i>&nbsp;&nbsp;删除</li>-->
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript" charset="UTF-8">
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'

	import {
		sendMessageInfo
	} from '../../../assets/js/websocket';
	import StringUtil from '../../../assets/js/stringUtil';
	export default {
		data: function() {
			return {
				sstorage: window.sessionStorage
			}
		},
		vuex: {
			getters: {
				starListDetaile: function(state) {
					return state.currentID;
				},
				nowCurrent(state) {
					return state.threads;
				}
			}
		},
		ready() {
			gloabl.doResizeHeight();
			this.sstorage.setItem('startReturn', 1);
		},
		methods: {
			currentRightTag(type) {
				this.$store.dispatch('SWITCH_RIGHT', type);
			},
			//分享
			doShare: function(starTypeNum) {
				var u_user = JSON.parse(gloabl.getCookie('allUserInfo')).user;
				var uId = StringUtil.UUId(32);
				var sendTime = StringUtil.dateFormat();
				var msgShare = {
					"MSG00101": uId,
					'MSG00102': u_user.UM0101,
					'MSG00103': u_user.UM0102,
					'MSG00104': this.nowCurrent.sendid,
					'MSG00105': this.nowCurrent.name,
					'MSG00106': sendTime,
					'MSG00107': this.nowCurrent.sendtype,
					'MSG00108': starTypeNum,
					'MSG00109': JSON.stringify(this.starListDetaile.MSG00109),
					'MSG00110': u_user.UM0111,
					"MSG00111": 0,
					"isSelf": 0
				}
				if (this.nowCurrent.sendtype != 3) {
					gloabl.layer.confirm('是否分享到当前会话区？', () => {
						sendMessageInfo(msgShare);
						gloabl.layer.closeAll();
					})
				} else {
					gloabl.tipTools('名片不能分享到团队公告');
				}
			},
			//删除
			deleteDoc: function(item) {
				var self = this;
				gloabl.layer.open({
					type: 0,
					title: '系统信息',
					skin: '',
					btn: ['确定', '取消'],
					content: '您确定要删除吗',
					yes: function() {
						var params = 'UMT11=' + item.id;
						self.cancleStar(params, item);
						gloabl.layer.closeAll();
					}
				});
			},
			cancleStar: function(param, item) {
				gloabl.fethAsync([URL.DELETE_START_URL], param, res => {
					if (res.success) {
						gloabl.tipTools('删除成功');

						this.$store.dispatch('SWITCH_RIGHT', 'star')
						this.$store.dispatch('CANCEL_STAR', item)
						return;
					} else {
						gloabl.tipTools('删除失败');
						return;
					}
				})
			}

		}
	}
</script>
