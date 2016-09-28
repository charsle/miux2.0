<template>
	<div>
		<div class="m-message" id="m-message" v-el:list>
			<div class="text-center">
				<a href="javascript:;" @click="searchHistory">查询历史记录</a>
			</div>
			<!--{{items | json}}-->
			<ul>
				<!--文字1 图片2 声音3 位置4 文件5 @信息6 分享名片7 好友申请消息8 好友申请处理结果9 团队公告10 团队投票11 行事历通知12 消息删除13-->
				<!--文字-->
				<li v-for="item in items" track-by="$index" v-cloak>
					<p v-if="item.ischange==1" class="time"><span> {{item.MSG00106 | timesAfter}}</span></p>
					<msg-text v-if="item.MSG00108==1" :item-list="item"></msg-text>
					<msg-img v-if="item.MSG00108==2" :item-list="item"></msg-img>
					<msg-voice v-if="item.MSG00108==3" :item-list="item"></msg-voice>
					<msg-map v-if="item.MSG00108==4" :item-list="item"></msg-map>
					<msg-file v-if="item.MSG00108==5" :item-list="item"></msg-file>
					<msg-at v-if="item.MSG00108==6" :item-list="item"></msg-at>

					<msg-share v-if="item.MSG00108==7" :item-list="item"></msg-share>
					<msg-friends v-if="item.MSG00108==8" :item-list="item"></msg-friends>
					<msg-friends v-if="item.MSG00108==9" :item-list="item"></msg-friends>

					<group-notice v-if="item.MSG00107==2&&item.MSG00108==10" :item-list="item"></group-notice>
					<msg-notice v-if="item.MSG00107==3&&item.MSG00108==10" :item-list="item"></msg-notice>

					<msg-vote v-if="item.MSG00108==11" :item-list="item"></msg-vote>
					<!--<msg-vote v-if="item.MSG00108==12" :item-list="item"></msg-vote>-->
					<msg-delete v-if="item.MSG00108==13" :item-list="item"></msg-delete>
					<msg-robot.vue v-if="item.MSG00108==15" :item-list="item"></msg-robot>
				</li>
			</ul>

		</div>
		<input-text v-if="sendType!=3"></input-text>
	</div>

</template>
<script>
	// import msgFriends from '../message/msgFriends'
	import msgMap from '../message/msgMap'
	import msgNotice from '../message/msgNotice'
	// import msgRobot from '../message/msgRobot'
	import msgShare from '../message/msgShare'
	import msgText from '../message/msgText'
	// import msgUpload from '../message/msgUpload'
	import inputText from './inputText'
	import msgVoice from '../message/msgVoice'
	import msgVote from '../message/msgVote'
	import msgImg from '../message/msgImg';
	import msgFile from '../message/msgFile';
	import msgDelete from '../message/msgDelete';
	import msgAt from '../message/msgAt';

	import groupNotice from '../message/msgGroupNotice';
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	var timeArr = []
	export default {
		data() {
			return {
				items: [],
				sendid: '',
				sendType: ''
			}
		},

		vuex: {
			getters: {
				newMessageList(state) {
					return state.messageList;
				},
				cancelStar(state) {
					return state.cancelStar
				}
			}
		},
		ready() {

			gloabl.doResizeHeight();

		},
		watch: {
			//撤销星标
			cancelStar: {
				handler() {
					for (let item of this.items) {
						if (item.MSG00101 === this.cancelStar.MSG00101) {
							item.MSG00111 = 0;
						}
					}
				}

			},

			newMessageList: {
				//deep: true,
				handler() {
					var personList = JSON.parse(gloabl.getCookie('allUserInfo')).user;
					var newMessageListItem = this.newMessageList;

					if (newMessageListItem.MSG00108 == 13) {
						$('.m' + newMessageListItem.MSG00109).html('[该消息已撤回!]');
						return;
					}

					if ((newMessageListItem.MSG00109 + "").indexOf('{') > -1) {
						newMessageListItem.MSG00109 = JSON.parse(newMessageListItem.MSG00109);
					}
					if (newMessageListItem.MSG00102 === this.sendid) {
						if (newMessageListItem.hasOwnProperty('isCancel')) {
							for (let item of this.items) {
								if (item.MSG00101 === newMessageListItem.MSG00101) {
									item.MSG00109 = '[消息已撤回]';
								}
							}
						} else {
							if (newMessageListItem.MSG00107 == this.sendType) {
								this.items.push(newMessageListItem);
							}
						}
					} else if (personList.UM0101 === newMessageListItem.MSG00102) {
						if (newMessageListItem.MSG00107 == this.sendType && newMessageListItem.MSG00104 == this.sendid) {
							this.items.push(newMessageListItem);
						}
					} else if (newMessageListItem.MSG00104 == this.sendid) { //如果id相同，发送类型相同
						if (newMessageListItem.MSG00107 == this.sendType) {
							this.items.push(newMessageListItem);
						}
					}
					//						else if(newMessageListItem.MSG00107==this.sendType) {
					//							this.items.push(newMessageListItem);
					//						}
					this.$nextTick(() => {
						const ul = this.$els.list;
						ul.scrollTop = ul.scrollHeight;
					})
				}
			}
		},
		filters: {
			timesAfter(time) {
				var userAgent = navigator.userAgent;
				if (userAgent.indexOf("Safari") > -1) {
					time = time.replace(/-/g, '/');
				}
				var n = new Date();
				var o = new Date(time);
				var now = n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate();
				var old = o.getFullYear() + "-" + (o.getMonth() + 1) + "-" + o.getDate();
				if (now == old) {
					return '今天';
				} else if (new Date(now).getTime() - new Date(old).getTime() == 86400000) {
					return '昨天';
				} else {
					var date = o.getFullYear() + "-" + (o.getMonth() < 9 ? ('0' + (o.getMonth() + 1)) : (o.getMonth() + 1)) + "-" + (o.getDate() < 10 ? ('0' + o.getDate()) : o.getDate());
					return date;
				}
			}
		},
		route: {
			data: function(transition) {
				var winHeight = document.documentElement.clientHeight || document.body.clientHeight;
				var commHeight = $('.HOME_CONTENT_HEADERT').height();
				//						var searchAllMessageParams = JSON.parse(sessionStorage.getItem('msgparams'));
				var searchAllMessageParams = transition.to.params;

				gloabl.setCookie('typeScrool', searchAllMessageParams.sendtype);
				gloabl.doResizeHeight();
				this.sendid = searchAllMessageParams.sendid;
				this.sendType = searchAllMessageParams.sendtype;
				var params = 'MSG00104=' + this.sendid + '&MSG00106=&MSG00107=' + this.sendType;
				if (searchAllMessageParams.hasOwnProperty('sendid')) {
					sessionStorage.setItem('firstTab', JSON.stringify(searchAllMessageParams));
				}
				this.getHistoryMessage(params)
				if (this.sendType == 2) {
					this.showPublicInfo(this.sendid);
				}

				this.isStarPerson(this.sendid, isStar => {
					searchAllMessageParams.isStar = isStar;
					this.$store.dispatch('CHANGE_HEADER_NAME', searchAllMessageParams)
				});




			}
		},
		methods: {

			//获取频组信息
			showPublicInfo(sid) {
				var _this = this;
				gloabl.fethAsync([URL.SEARCH_GROUP_BASE_INFO_URL], 'TM00201=' + sid, res => {
					if (res.success) {
						gloabl.setCookie('slingeGroupInfo', JSON.stringify(res.result));
						this.$store.dispatch('SHOW_GROUP_ICON', res.result);
					}
				})

			},
			//查看历史记录
			searchHistory() {
				if (this.items.length != 0) {
					var params = 'MSG00104=' + this.sendid + '&MSG00106=' + this.items[0].MSG00113 + '&MSG00107=' + this.sendType;
					this.getHistoryMessage(params, 1);
				} else {
					gloabl.tipTools('无历史数据');
				}
			},
			/**
			 * 获取当前人是否星标
			 */
			isStarPerson(sid, _callback) {
				gloabl.fethAsync([URL.SEARCH_PARSON_STAR], 'UMT10=' + sid, res => {
					if (res.success) {
						_callback(res.result);
					}
				})
			},
			//查询历史记录
			getHistoryMessage(params, historys) {
				historys = historys ? historys : 0;
				//										return;
				var index = gloabl.layer.load(2, {
					shade: [0.1, '#000'] //0.1透明度的白色背景
				});
				gloabl.fethAsync([URL.HISTORY_MESSAGE_URL], params, res => {
					if (res.success) {
						var list = res.result;
						this.doTime(list);
						for (let item of list) {
							var isObject = (item.MSG00109).indexOf('{');
							if (isObject > -1) {
								item.MSG00109 = JSON.parse(item.MSG00109);
							}
						}
						if (historys == 1) {
							if (list.length != 0) {
								this.items = list.concat(this.items);
								this.$nextTick(() => {
									const ul = this.$els.list
									ul.scrollTop = 0;
								})
							} else {
								gloabl.tipTools('无历史消息');
								layer.close(index);
								return;
							}
						} else {
							this.items = list;
							this.$nextTick(() => {
								const ul = this.$els.list
								ul.scrollTop = ul.scrollHeight;
							})
						}

						gloabl.layer.close(index);
					} else {
						gloabl.tipTools('查询失败，请稍后重试!')
						gloabl.layer.close(index);
					}

				})
			},
			doTime(list) {
				for (var i = 0; i < list.length; i++) {
					if (i > 0) {
						var time = list[i].MSG00106.substring(0, list[i].MSG00106.indexOf(' '));
						var last = list[i - 1].MSG00106.substring(0, list[i - 1].MSG00106.indexOf(' '));
						if (time != last) {
							list[i].ischange = 1;
						} else {
							list[i].ischange = 0;
						}
					} else {
						list[i].ischange = 1;
					}
				}
			}
		},
		components: {
			inputText,
			// msgFriends,
			msgMap,
			msgNotice,
			// msgRobot,
			msgShare,
			msgText,
			// msgUpload,
			msgVoice,
			msgVote,
			msgImg,
			msgFile,
			msgDelete,
			msgAt,
			groupNotice,

		}
	}
</script>
