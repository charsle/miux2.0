<template>
	<div class="doc">
		<h1>{{groupInfo.TM00209==0?'公开频道':'私有群组'}}属性<span class="fr fs14 tabTitleColor"><i class="iconfont">&#xe64d;</i></span></h1>
		<div class="col-xs-12 pt20">
			<div class="col-xs-2 groupImg relative">
				<img :src="groupInfo.TM00210 | getUrl" width="60px" id="uploadGroupImg" class="img-circle" />
				<div class="header_up groupUp" @click="uploadGroupImg" v-if="groupInfo.manager==1">
					<i class="glyphicon glyphicon-camera"></i>
				</div>
			</div>
			<div class="col-xs-9" v-cloak>
				<div class="fs16 pl10 mt5 overflow nowrap">
					<span v-if="name">{{groupName_span}}</span>
					<span v-if="!name"><input type="text" name="" v-model="groupName"  value="{{groupInfo.TM00206}}" class="form-control"/></span>
				</div>
				<div class="light-grey fs14  pl10 mt5">
					{{groupInfo.TM00209==0?'公开频道':'私有群组'}}
				</div>
			</div>
			<div class="col-xs-1 lh30 tc" v-if="groupInfo.manager==1 ">
				<i class="iconfont edit_pen" v-if="name" @click="showEditAll(1)">&#xe646;</i>
				<i class="iconfont green_edit_icon" v-if="!name" @click="saveAllData(1)">&#xe63c;</i>
			</div>

			<div class="clearfix"></div>
		</div>
		<div class="col-xs-12 paddingBottom">
			<div class="col-xs-11 break fs14">
				<div class="col-xs-2">
					<span class="fs16 bold dark-gray">简介：</span>
				</div>
				<div class="col-xs-10">
					<span v-if="intto"> {{groupIntro_span}}</span>
					<span v-if="!intto">
						<textarea type="text" maxlength="30"  v-model="groupIntro"  id="" class="form-control">{{groupInfo.TM00208}}</textarea>
					</span>
				</div>
			</div>
			<div class="col-xs-1 tc" v-if="groupInfo.manager==1 ">
				<i class="iconfont edit_pen" v-if="intto" @click="showEditAll(2)">&#xe646;</i>
				<i class="iconfont green_edit_icon" v-if="!intto" @click="saveAllData(2)">&#xe63c;</i>
			</div>
		</div>
		<div id="groupListBar" class="col-md-12">
			<div class="col-xs-12 pb10 bottom">
				<div class="row">
					<div class="col-xs-11 fs16 bold dark-gray lh40 ">
						频道公告
					</div>
					<div class="col-xs-1 lh40 tc" v-if="groupInfo.manager==1 ">
						<i class="iconfont edit_pen" v-if="notice" @click="showEditAll(3)">&#xe646;</i>
						<i class="iconfont green_edit_icon" v-if="!notice" @click="saveAllData(3)">&#xe63c;</i>
					</div>
				</div>

				<div class="row">
					<div class="edit_box lh18 break">
						<span v-if="notice">{{groupNotice_span}}</span>
						<span v-if="!notice">
							<textarea type="text" maxlength="60" class="form-control"  v-model="groupNotice">{{groupInfo.TM00207}}</textarea>
						</span>
					</div>
				</div>
				<div class="clearfix"></div>
			</div>
			<div class="col-xs-12">
				<h4 class="fs16 bold dark-gray lh40">频道功能</h4>
				<ul class="bookItem mt5 pb10 bookHover group_function">
					<li @click="currentRightTag('grop_item',groupInfo) " v-if="groupInfo.manager==1">
						<i class="iconfont ">&#xe62d;</i>查看历史公告
					</li>
					<li @click="currentRightTag('grop_file',groupInfo) ">
						<i class="iconfont ">&#xe607;</i>查询频道分享文档
					</li>
					<!--
                    <li>
						<i class="iconfont " @click="shareNotice">&#xe636;</i>分享频道
					</li>
                    -->

					<li class="p10 ">
						<div class="col-xs-12 h20 ">
							<div class="col-xs-10 "><i class="iconfont ">&#xe62e;</i>消息免打扰 </div>
							<div class="col-xs-2 ">
								<div class="switch fr">
									<input type="checkbox" name="tipsSend" data-size="mini" data-off-color="danger" data-on-color="success" />
								</div>
							</div>
						</div>
						<div class="col-xs-12 disturbing_tip light-grey h20 ">（您可以在“设置－推送设置”中进行“频组推送设置”
							<div class="clearfix "></div>
						</div>
						<div class="clearfix "></div>
					</li>
					<li @click="exitGrouop(groupInfo.TM00201,groupInfo.TM00206,1) ">
						<i class="iconfont ">&#xe62f;</i>退出频道
					</li>
					<li v-if="groupInfo.manager==1?true:false" @click="exitGrouop(groupInfo.TM00201,groupInfo.TM00206,2) ">
						<i class="iconfont ">&#xe630;</i>删除频道
					</li>
				</ul>
			</div>

			<div class="col-xs-12 pb10 ">
				<h4 class="p10 "><span class="fs14 bold ">成员列表</span>&nbsp;&nbsp;&nbsp;
					<span class="light-grey fs14 ">{{getGroupList.onlinePersonNum}}/{{groupInfo.personNum}}</span>
					<a href="javascript:;" @click="addSecretGroup" class="fr" v-if="groupInfo.TM00209==1&&groupInfo.manager==1"><i class="iconfont light-blue">&#xe62c;</i></a>
				</h4>
				<div class="col-xs-12 itemInfo bookList relative " v-for="list in personList ">
					<div class="col-xs-2 itemHeader ">
						<img class="img-circle " :src="list.TM00321 | getUrl " />
					</div>
					<!--列表框-->
					<div class="borderSolid ">
						<ul>
							<li>
								<a v-link="{name: 'contact',params:{name:list.TM00306,sendid:list.TM00301,sendtype:1}} ">即时消息</a>
							</li>
							<li>
								<a href="javascript:;" @click="openUserCard('card',list.TM00301) ">打开名片</a>
							</li>
							<li v-if="groupInfo.manager==1">
								<a href="javascript:; " @click="upManage(list,1,$index)" v-if="list.ismanager==0||list.ismanager==null">提升管理员</a>
								<a href="javascript:; " @click="upManage(list,3,$index)" v-else>移除管理员</a>
							</li>
							<li v-if="groupInfo.manager==1">
								<a href="javascript:; " @click="upManage(list,2,$index) ">将对方移除本群组</a>
							</li>
						</ul>
					</div>
					<!--列表框-->
					<div class="col-xs-10 " @click.stop="showCardInfo($event,list.TM00301) ">
						<div class="col-xs-10 fs14 light-grey mt7 ">
							<span class="dark-gray a_max bold " v-text="list.TM00306 "></span>&nbsp;&nbsp;
							<span class="a_max " v-text="list.TM00322 "></span>&nbsp;&nbsp;
							<i class="iconfont red fr" v-if="list.ismanager==1">&#xe604;</i>
						</div>
						<div class="col-xs-2 pt15 ">

							<i class="line_circle green fr " v-if="list.isOnline==1 "></i>
							<i class="line_circle grey fr " v-if="list.isOnline==0 || list.isOnline==null "></i>

						</div>
					</div>

				</div>
			</div>
		</div>
		<div id="choosePerson2" style="display: none;">
			<choose-person :type-join="1"></choose-person>
		</div>
	</div>
</template>

<script type="text/javascript ">
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
				groupInfo: [],
				name: true,
				groupName: '',
				groupName_span: '',
				intto: true,
				groupIntro: '',
				groupIntro_span: '',
				notice: true,
				groupNotice: '',
				groupNotice_span: '',
				personList: [],
				isMyInfo: JSON.parse(gloabl.getCookie('allUserInfo'))
			}
		},
		vuex: {
			getters: {
				groupID(state) {
					return state.currentID;
				},
				getGroupList(state) {
					return state.showGroupIcon;
				},
				nowCurrent(state) {
					return state.threads;
				}
			}
		},
		watch: {
			groupID: {
				//deep: true,
				handler() {
					this.getGroupDataList();
				}
			}
		},
		ready() {
			gloabl.doResizeHeight();
			this.getGroupDataList();
		},
		methods: {
			currentRightTag(type, item) {
				this.$store.dispatch('SWITCH_RIGHT', type, item);
			},
			//1提升管理员    2 移除成员 3移除管理
			upManage(item, type, index) {
				var ma_url = '';
				if (type == 1) {
					ma_url = URL.UP_MANAGE_URL
				} else if (type == 2) {
					ma_url = URL.REMOVE_GROUP_PERSON_URL
				} else {
					ma_url = URL.REMOVE_GROUP_MANAGE_URL
				}
				var parmas = 'TM00506=' + this.groupInfo.TM00201 + '&TM00507=' + item.TM00301;
				gloabl.fethAsync(ma_url, parmas, res => {
					if (res.success) {
						if (type == 1) {
							gloabl.tipTools('您提升' + item.TM00306 + '管理员职位成功!')
							item.ismanager = 1;
							this.personList.$set(index, item);
						} else if (type == 2) {
							this.personList.$remove(item);
							gloabl.tipTools('您已将' + item.TM00306 + '成功移除频组!')
						} else {
							gloabl.tipTools('您已将' + item.TM00306 + '成功移除管理员职位!')
							item.ismanager = 0;
							this.personList.$set(index, item);
						}
					} else {
						gloabl.tipTools(res.msg)
					}
				})
			},
			openUserCard(type, sid) {
				this.$store.dispatch('SWITCH_RIGHT', type, sid);
			},
			//显示卡片信息
			showCardInfo(e, id) {
				console.log(id);
				if (this.isMyInfo.user.UM0101 == id) {
					this.$store.dispatch('SWITCH_RIGHT', 'pinfo');
					return;
				}
				document.body.onclick = (e) => {
					e.stopPropagation();
					$('.borderSolid').hide();
				}
				var currentTag = $(e.currentTarget).siblings('.borderSolid');
				$('.borderSolid').hide();
				var ev = e || window.event;
				if (ev.stopPropagation) {
					ev.stopPropagation();
				} else if (window.event) {
					window.event.cancelBubble = true; //兼容IE
				}
				if (currentTag.css('display') == 'none') {
					currentTag.show();
				} else {
					currentTag.hide();
				}

			},
			/**
			 * 查询公开频组属性
			 */
			getGroupDataList() {

				var item = JSON.parse(gloabl.getCookie('slingeGroupInfo'));
				gloabl.fethAsync([URL.SEARCH_GROUP_BASE_INFO_URL], 'TM00201=' + item.TM00201, res => {
					if (res.success) {
						var result = res.result;
						this.groupInfo = result;
						this.groupName_span = result.TM00206;
						this.groupNotice_span = result.TM00207;
						this.groupIntro_span = result.TM00208;
						this.findGroupPersonList(result.TM00201);
						var isPush = res.result.push == 1 ? true : false;
						$('input[name="tipsSend"]').bootstrapSwitch('state', isPush)
						this.updateGrouopDistutb(isPush);
					}
				})
			},
			showEditAll(index) {
				switch (index) {
					case 1:
						this.name = false;
						break;
					case 2:
						this.intto = false;
						break;
					case 3:
						this.notice = false;
						break;
					default:
						this.name = false;
						break;
				}
			},
			saveAllData(index) {
				switch (index) {
					case 1:
						//1.22.	修改频组名称
						var parmas = "TM00201=" + this.groupInfo.TM00201 + '&TM00206=' + this.groupName;
						this.updateGrouopAll([URL.UPDATE_GROUP_NAME_URL], parmas, index);
						break;
					case 2:
						//1.23.	修改频组简介
						var parmas = "TM00201=" + this.groupInfo.TM00201 + '&TM00208=' + this.groupIntro;
						this.updateGrouopAll([URL.UPDATE_GROUP_INTRO_URL], parmas, index);
						break;
					case 3:
						//修改频组公告
						var parmas = "TM00201=" + this.groupInfo.TM00201 + '&TM00207=' + this.groupNotice;
						this.updateGrouopAll([URL.UPDATE_GROUP_NOTICE_URL], parmas, index, this.groupNotice);
						break;
					default:
						break;
				}
				this.getGroupDataList();
			},
			/**
			 * 修改频组信息
			 */
			updateGrouopAll(url, param, index, info) {
				gloabl.fethAsync(url, param, res => {
					if (res.success) {
						//this.getGroupDataList();
						switch (index) {
							case 1:
								this.groupName_span = this.groupName;
								this.name = true;
								break;
							case 2:
								this.groupIntro_span = this.groupIntro;
								this.intto = true;
								break;
							case 3:
								this.groupNotice_span = this.groupNotice;
								sendMessageInfo(this.sendParam(info, 10));
								this.notice = true;
								break;
							default:
								this.name = true;
								break;
						}
					}
				})
			},
			/**
			 * 修改频组免打扰模式
			 */
			updateGrouopDistutb() {
				$('input[name="tipsSend"]').bootstrapSwitch().on('switchChange.bootstrapSwitch', (e, state) => {
					var type = state == true ? 1 : 0;
					gloabl.fethAsync([URL.UPDATE_GROUP_DISTURB_URL], 'TM00201=' + this.groupInfo.TM00201 + '&TM00509=' + type, res => {
						if (res.success) {
							var _user = JSON.parse(gloabl.getCookie('allUserInfo'));
							_user.set.UM0805 = type;
							gloabl.setCookie('allUserInfo', JSON.stringify(_user));
						}
					})
				});
			},
			/**
			 * 查询频组成员
			 */
			findGroupPersonList(sid) {
				gloabl.fethAsync([URL.FIND_GROUP_NUM_URL], 'TM00506=' + sid, res => {
					if (res.success) {
						this.personList = res.result;
					}
				});

			},
			/**
			 *退出频组
			 */
			exitGrouop(sid, name, type) {
				var _this = this;
				var _url = type == 1 ? [URL.EXIT_GROUP_URL] : [URL.DELETE_GROUP_URL];
				var _text = type == 1 ? '退出' : '删除';
				gloabl.layer.confirm('您确定要' + _text + '<strong class="light-blue ">' + name + '</strong>团队吗?', {
					btn: ['确定', '取消'],
					skin: ''
				}, () => {
					gloabl.fethAsync(_url, 'TM00201=' + sid, res => {
						if (res.success) {
							//	if(type == 1) {
							$('#COMMENT_MODAL').hide();
							$('#messageCount').width($('#HOME_CONTENT').width());
							this.$route.router.go({
									name: 'message',
									params: {
										name: _this.isMyInfo.ada.um0102,
										sendid: _this.isMyInfo.ada.um0101,
										sendtype: 1
									}
								})
								//	}
							gloabl.layer.msg('操作成功');
							setTimeout(function() {
								gloabl.layer.closeAll();
							}, 500)
						} else {
							gloabl.tipTools(res.msg)
						}
					})
				});
			},

			//1.57. 修改频组LOGO
			groupImageUrl: function(url) {
				gloabl.fethAsync(URL.GROUP_IMAGE_URL, 'TM00201=' + this.groupInfo.TM00201 + '&TM00210=' + url, res => {
					if (res.success) {
						//layer.msg('头像上传成功!')
					}
				})
			},

			//上传频组头像
			uploadGroupImg() {
				uploadImage(4, url => {
					this.groupImageUrl(url);
					$('#uploadGroupImg').attr('src', url);
				});
			},
			/*
			 * 发送消息参数
			 */
			sendParam(msg, type) {
				var time = StringUtil.dateFormat();
				var u_id = StringUtil.UUId(32);
				var params = {
					"MSG00101": u_id,
					"MSG00102": this.isMyInfo.user.UM0101,
					"MSG00103": this.isMyInfo.user.UM0102,
					"MSG00104": this.groupInfo.TM00201,
					"MSG00105": this.groupInfo.TM00206,
					"MSG00106": time,
					"MSG00107": 2,
					"MSG00108": type,
					"MSG00109": msg,
					"MSG00110": this.isMyInfo.user.UM0111,
					"MSG00111": 0,
					"isSelf": 0
				};
				return params;
			},
			addSecretGroup() {
				var _this = this;
				var add = layer.open({
					type: 1,
					shade: 0,
					title: '添加参与人',
					area: ['750px'],
					skin: '',
					content: $('#choosePerson2'),

				})
				_this.$store.dispatch('LAYER_OBJECT', add + ';' + 'add');
			}
		}
	}
</script>
