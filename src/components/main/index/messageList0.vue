<template>
	<div id="slide_items">
		<ul class="slide_item" >
			<li v-for="item in messageList | orderBy 'UM0306' -1" class="relative" v-cloak>
				<a v-link="{name:'message',params:{name:item.UM0303,sendid:item.UM0302,sendtype:item.UM0307},activeClass: 'custom-active-class'}" @click="currentThread(item,$index)">

					<img class="avatar" :src="teamPic | getUrl" width="40" height="40" v-if="item.UM0302==1">
					<img class="avatar" :src="item.tx | getUrl" width="40" height="40" v-else>
					<i style="position: absolute;left: 50px; top: 10px;" v-if="item.UM0310==0"></i>
					<div class="name">
						<div class="user_name"><span v-text="item.UM0303"></span><span>{{(item.UM0306) | time}}</span>
						</div>

						<div class="user_message">
							<!--文字1 图片2 声音3 位置4 文件5 @信息6 分享名片7 好友申请消息8 好友申请处理结果9 团队公告10 团队投票11 行事历通知12 消息删除13-->
							<span v-if="item.UM0308==1">{{{item.UM0309}}}</span>
							<span v-if="item.UM0308==2">[图片]</span>
							<span v-if="item.UM0308==3">[语音]</span>
							<span v-if="item.UM0308==4">[位置]</span>
							<span v-if="item.UM0308==5">[文件]</span>
							<span v-if="item.UM0308==6">[@信息]</span>
							<span v-if="item.UM0308==7">[分享名片]</span>
							<span v-if="item.UM0308==8">[好友申请消息]</span>
							<span v-if="item.UM0308==9">[好友申请处理结果]</span>

							<span v-if="item.UM0307==2&&item.UM0308==10">[频组公告]</span>
							<span v-if="item.UM0307==3&&item.UM0308==10">[团队公告]</span>
							<span v-if="item.UM0308==11">[团队投票]</span>
							<span v-if="item.UM0308==13">[消息已删除]</span>
						</div>
					</div>
				</a>
			</li>
		</ul>
		<!--<span v-else style="color: #fff;" class="fs18">暂无数据</span>-->
	</div>
</template>
<script type="text/javascript">
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	export default {
		data() {
			return {
				messageList: [],
				teamPic: JSON.parse(gloabl.getCookie('allUserInfo')).company.TM00109,
			}
		},
		ready() {
			//查询最近消息i
			gloabl.fethAsync([URL.MESSAGE_URL], '', res => {
				if (res.success) {
					this.messageList = res.result;
					// console.table(this.messageList);
					gloabl.doResizeHeight(this.messageList);
				}
			})
		},

		vuex: {
			getters: {
				newMessageList(state) {
					return state.messageList;
				},
				sendNewPersonSingleList(state) {
					return state.sendNewPersonList;
				},
				nowCurrent(state) {
					return state.threads;
				}
			}
		},
		methods: {
			currentThread(item, index) {
				//					var params={name:item.UM0303,sendid:item.UM0302,sendtype:item.UM0307}
				//					sessionStorage.setItem('msgparams',JSON.stringify(params))
				if (item.UM0310 == 0) {
					gloabl.fethAsync(URL.MESSAGE_RED_URL, 'UMT21=' + item.UM0311, res => {
						item.UM0310 = 1;
					});
				}
			}

		},

		watch: {
			sendNewPersonSingleList: {
				handler() {
					var isExits = JSON.stringify(this.messageList).indexOf(this.sendNewPersonSingleList.UM0301);
					if (isExits < 0) {
						this.messageList.push(this.sendNewPersonSingleList);
					}
				}
			},
			newMessageList: {
				//deep: true,
				handler() {
					var loop = false;
					for (let item of this.messageList) {
						if (item.UM0302 === this.newMessageList.MSG00102) {
							if (item.UM0307 == this.newMessageList.MSG00107) {
								loop = true;
								item.UM0301 = this.newMessageList.MSG00101;
								item.UM0302 = this.newMessageList.MSG00102;
								item.UM0303 = this.newMessageList.MSG00103;
								item.UM0304 = this.newMessageList.MSG00104;
								item.UM0306 = this.newMessageList.MSG00106;
								item.UM0307 = this.newMessageList.MSG00107;
								item.UM0308 = this.newMessageList.MSG00108;
								item.UM0309 = gloabl.judgeType(this.newMessageList.MSG00108, this.newMessageList.MSG00109);
								item.tx = this.newMessageList.MSG00110;
								if (item.UM0302 === this.nowCurrent.sendid) {
									item.UM0310 = 1;
								} else {
									item.UM0310 = 0;
								}
							}
						} else if (item.UM0302 === this.newMessageList.MSG00104) {
							loop = true;
							item.UM0309 = gloabl.judgeType(this.newMessageList.MSG00108, this.newMessageList.MSG00109);
							item.UM0306 = this.newMessageList.MSG00106;
							if (item.UM0302 === this.nowCurrent.sendid) {
								item.UM0310 = 1;
							} else {
								item.UM0310 = 0;
							}
						} else {

						}
					}
					if (!loop) {

						var sendName = '',
							redType = '',
							docImg = '';

						if (this.newMessageList.MSG00107 == 2) {
							sendName = this.newMessageList.MSG00105;
							redType = 0;

						} else {
							if (this.newMessageList.hasOwnProperty('isSelf')) {
								console.log(loop + '发送');
								sendName = this.newMessageList.MSG00105;
								redType = 1;
							} else {
								sendName = this.newMessageList.MSG00103
								console.log(loop + '接受');
								redType = this.newMessageList.UM0310
								console.log(redType);
							}
							if (this.newMessageList.hasOwnProperty('isShare')) {
								docImg = this.newMessageList.docImg;
							} else {
								docImg = this.newMessageList.MSG00110;
							}
						}

						var dd = {
							UM0301: this.newMessageList.MSG00101,
							UM0302: this.newMessageList.MSG00104,
							UM0303: sendName,
							UM0304: this.newMessageList.MSG00102,
							UM0306: this.newMessageList.MSG00106,
							UM0307: this.newMessageList.MSG00107,
							UM0308: this.newMessageList.MSG00108,
							UM0309: this.newMessageList.MSG00109,
							UM0310: redType,
							UM0311: this.newMessageList.MSG00101,
							tx: docImg
						}
						this.messageList.unshift(dd);
					}

				}
			}
		}

	}
</script>

<style lang="less">
	.word_space {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.custom-active-class {
		background: #464f5d;
		.user_name {
			color: #fff;
		}
	}

	.slide_items {
		li {
			overflow: hidden;
			padding: 0.5rem;
			a {
				padding: 0.8rem;
				display: block;
				overflow: auto;
				width: 100%;
				border-radius: .5rem;
			}
			border-bottom: 1px solid #292C33;
			cursor: pointer;
			transition: background-color 0.1s;
			&:hover {
				background-color: rgba(255, 255, 255, 0.03);
			}
			&.active {
				background-color: rgba(255, 255, 255, 0.1);
			}
		}
		.avatar {
			border-radius: 50%;
			float: left;
		}
		.name {
			float: left;
			width: 78%;
			color: #fff;
			display: inline-block;
			margin: 0 0 0 15px;
		}
		.user_name {
			span {
				display: inline-block;
				color: #fff;
			}
			:first-child {
				width: 65%;
				font-size: 14px;
				.word_space;
			}
			:last-child {
				width: 35%;
				text-align: right;
				margin-top: -5px;
			}
		}
		.user_message {
			.word_space;
			color: #fff;
		}
	}
</style>
