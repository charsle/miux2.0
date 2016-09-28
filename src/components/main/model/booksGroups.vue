<template>
	<div class=" book_group" id="tab_group">
		<div class="col-xs-12 itemInfo bottom0 itemSelect">
			<div class="col-xs-10 lh30 fs14" @click="toggleSlide($event,1)">
				<i class="light-grey glyphicon glyphicon-triangle-top"></i>&nbsp;&nbsp;&nbsp;
				<span class="dark-gray bold">公开频道</span>&nbsp;&nbsp;&nbsp;
				<i class="light-grey" v-cloak>{{publicList.length}}个</i>
			</div>
			<div class="col-xs-2 lh30 tr fs24" @click.stop="addPublicGroup" v-if="isManage.UM0121!=0">
				<i class="iconfont light-blue">&#xe62c;</i>
			</div>
		</div>
		<div class="col-xs-12 grop_item mt10 slideGK">
			<ul>
				<li v-for="item in publicList" style="cursor: pointer;">
					<div class="col-xs-10" @click="showPublicInfo(item,$index)">
						<div class="col-xs-2 group_left">
							<img :src="item.TM00210 | getUrl" />
						</div>
						<div class="col-xs-10 pt10 pl5" v-cloak>
							<div class="col-xs-10 word_space nowrap overflow" title="{{item.TM00206}}">
								{{item.TM00206}}&nbsp;&nbsp;
							</div>
							<div class="col-xs-2">
								<span class="light-grey">{{item.personNum==null?0:item.personNum}}人</span>
							</div>

						</div>
					</div>
					<div class="col-xs-2">
						<span class="fr" v-if="item.isJoin==0">
							<button type="button" class="btn btn-success btn-xs" @click="nowJoinGroup(item.TM00201,item.TM00206,item.isJoin,$index)">加入</button>
						</span>
						<span class="fr mt10" v-else>
							已加入
						</span>
					</div>
					<div class="clearfix"></div>
				</li>
			</ul>
		</div>
		<div class="col-xs-12 itemInfo bottom0 itemSelect" @click="toggleSlide($event,2)">
			<div class="col-xs-10 lh30 fs14" v-cloak>
				<i class="light-grey glyphicon glyphicon-triangle-top"></i>&nbsp;&nbsp;&nbsp;
				<span class="dark-gray bold">私密群组</span>&nbsp;&nbsp;&nbsp;
				<i class="light-grey">{{secretList.length}}个</i>
			</div>
			<div class="col-xs-2 lh30 tr fs24" @click.stop="addSecretGroup">
				<i class="iconfont light-blue">&#xe62c;</i>
			</div>
		</div>
		<div class="col-xs-12 grop_item mt10 slideSM">
			<ul>
				<li v-for="item in secretList" @click="showPublicInfo(item,$index)" class="pointer">
					<div class="group_left">
						<img :src="item.TM00210 | getUrl" />
					</div>
					<div class="group_right" v-cloak>
						{{item.TM00206}}&nbsp;&nbsp;<span class="light-grey">{{item.personNum==null?0:item.personNum}}人</span>
					</div>
					<div class="clearfix"></div>
				</li>
			</ul>
			<ul>
				<li v-for="item in waitJoinList">
					<div class="group_left">
						<img :src="item.TM00210 | getUrl" />
					</div>
					<div class="group_right" v-cloak>
						{{item.TM00206}}&nbsp;&nbsp;<span class="light-grey">{{item.personNum==null?0:item.personNum}}人</span>
						<div class="fr">
							<a href="javascript:;" class="btn btn-danger btn-xs mr10" @click="refuseAndArgeeGroup(item.sid,item.TM00206,2,$index,$event)">拒绝</a>
							<a href="javascript:;" class=" btn btn-success btn-xs " @click="refuseAndArgeeGroup(item.sid,item.TM00206,1,$index,$event)">同意</a>
						</div>
					</div>
					<div class="clearfix"></div>
				</li>
			</ul>
		</div>

		<div id="createGroup" style="display: none;">
			<creat-group></creat-group>
		</div>
		<div id="createPubGroup" style="display: none;">
			<creat-pubgroup></creat-pubgroup>
		</div>
		<div id="groupInfo" style="display: none;">
			<group-info :info="groupInfo" :is-num="isNum"></group-info>
		</div>
		<div id="choosePerson" style="display: none;">
			<choose-person :type-join="1"></choose-person>
		</div>
	</div>
</template>
<style type="text/css">
	.slideGK,
	.slideSM {
		display: none;
	}
</style>
<script type="text/javascript">
	import groupInfo from './groupInfo';
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	import StringUtil from '../../../assets/js/stringUtil';
	import {
		uploadImage
	} from '../../../../static/lib/updatephoto/miux_update_photo';

	export default {
		props: ['list'],
		data() {
			return {
				smpzList: [],
				gkpdList: [],
				groupInfo: '',
				isNum: 0,
				isManage: JSON.parse(gloabl.getCookie('allUserInfo')).user,
			}
		},
		components: {
			groupInfo,
		},
		computed: {
			publicList() {
				if (this.list != undefined) {
					return (this.list.gkpd) instanceof Array ? this.list.gkpd : [];
				} else {
					return [];
				}

			},
			secretList() {
				if (this.list != undefined) {
					return (this.list.smpz) instanceof Array ? this.list.smpz : [];
				} else {
					return [];
				}
			},
			waitJoinList() {
				if (this.list != undefined) {
					return (this.list.djr) instanceof Array ? this.list.djr : [];
				} else {
					return [];
				}
			},
			params() {
				return this.getChoosePersonList
			},
		},
		vuex: {
			getters: {
				getPublicGroup(state) {
					return state.addPublicGroup;
				},
				getSecretGroup(state) {
					return state.addSecretGroup;
				}
			}
		},
		watch: {
			getPublicGroup: {
				handler() {
					this.publicList.unshift(this.getPublicGroup);
				}
			},
			getSecretGroup: {
				handler() {
					this.secretList.unshift(this.getSecretGroup);
				}
			}
		},
		methods: {
			toggleSlide(ev, type) {
				var curr = $(ev.currentTarget).find('.glyphicon');
				if (curr.hasClass('glyphicon-triangle-top')) {
					curr.removeClass('glyphicon-triangle-top').addClass('glyphicon-triangle-bottom');
				} else {
					curr.removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-top');
				}
				if (type == 1) {
					$('.slideGK').slideToggle()
					$('.slideSM').slideUp()
				} else {
					$('.slideGK').slideUp();
					$('.slideSM').slideToggle()
				}
			},
			/**
			 * 查看频道信息
			 * @id {String} 当前频道id
			 * @ isJoin {String} 是否已经加入
			 * @num  {Number} 当前索引
			 */
			showPublicInfo(item, index) {
				var _this = this;
				if (item.isJoin == 0) {
					gloabl.fethAsync([URL.SEARCH_GROUP_BASE_INFO_URL], 'TM00201=' + item.TM00201, res => {
						if (res.success) {
							this.groupInfo = res.result;
							this.isNum = item.personNum
							gloabl.layer.open({
								type: 1,
								shade: 0.3,
								title: '公开频道资料',
								area: ['400px', '500px'],
								skin: '',
								btn: ['立即加入', '取消'],
								content: $('#groupInfo'),
								yes() {
									_this.nowJoinGroup(res.result.TM00201, res.result.TM00206, item.isJoin, index);
								}
							})
						} else {
							gloabl.tipTools('添加失败');
						}
					})
				} else {
					//this.$store.dispatch('SHOW_GROUP_ICON', item);
					this.$route.router.go({
						name: 'contact',
						params: {
							id: item.TM00201,
							name: item.TM00206,
							sendid: item.TM00201,
							sendtype: 2
						}
					})
					var time = StringUtil.dateFormat();
					var items = {};
					items.UM0301 = item.TM00201;
					items.UM0302 = item.TM00201;
					items.UM0303 = item.TM00206;
					items.UM0304 = '';
					items.UM0306 = time;
					items.UM0307 = 2;
					items.UM0308 = 1;
					items.UM0309 = '';
					items.UM0310 = 0;
					items.tx = item.TM00210;
					this.$store.dispatch('SEND_NEW_PERSON_LIST', items)

				}
			},
			/**
			 * 查看频道信息
			 * @sid {String} 当前频道id
			 * @name {String} 当前频道名称
			 * @ isJoin {String} 是否已经加入
			 * @index  {Number} 当前索引
			 */
			nowJoinGroup(sid, name, isJoin, index) {
				if (isJoin == 0) {
					layer.confirm('您确定要加入<strong class="light-blue">' + name + '</strong>频组吗?', {
						btn: ['确定', '取消'],
						skin: ''
					}, () => {
						gloabl.fethAsync([URL.INVITED_JOIN_URL], 'TM00201=' + sid, res => {
							if (res.success) {
								layer.msg('加入成功');
								this.publicList.$set(index, res.result)
								setTimeout(function() {
									gloabl.layer.closeAll();
								}, 500)
							}
						})
					});
				} else {
					layer.closeAll();
				}
			},
			addPublicGroup() {
				layer.open({
					type: 1,
					shade: 0.3,
					title: '创建公开频道',
					area: ['500px'],
					skin: '',
					content: $('#createPubGroup'),
				});
			},
			/**
			 * @description 拒绝或者同意加入团队
			 * @sid {String} 团队sid
			 * @name {String} 团队名称
			 * @index {String} 当前团队索引
			 */
			refuseAndArgeeGroup(sid, name, type, index, ev) {
				var word = type == 1 ? '同意' : '拒绝'
				layer.confirm('您确定要' + word + '加入<strong class="light-blue">' + name + '</strong>群组吗?', {
					btn: ['确定', '取消'],
					skin: ''
				}, () => {
					gloabl.fethAsync([URL.CANCLE_AND_REFUSE_URL], 'TM00501=' + sid + '&TM00505=' + type, res => {
						if (res.success) {
							if (type === 2) {
								this.waitJoinList.splice(index, 1);
								$(ev.currentTarget).closest('li').remove();
							} else {
								this.waitJoinList.splice(index, 1);
								this.secretList.push(res.result);
								$(ev.currentTarget).closest('li').remove();
							}
							gloabl.layer.msg('操作成功');
							setTimeout(function() {
								gloabl.layer.closeAll();
							}, 300)

						} else {
							gloabl.layer.msg('操作失败');
							setTimeout(function() {
								gloabl.layer.closeAll();
							}, 300)
						}
					})
				});
			},
			addSecretGroup() {
				var _this = this;
				gloabl.layer.open({
					type: 1,
					shade: 0.3,
					title: '创建私密群组',
					area: ['500px'],
					skin: '',
					content: $('#createGroup'),
				})
			}

		}
	}
</script>
