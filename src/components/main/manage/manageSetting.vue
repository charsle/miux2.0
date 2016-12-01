<template>
	<div id="manage_wrapper" class="manageWrapper">
		<div class="col-md-12 p20">
			<div class="fl big_header">
				<img class="default" :src="userInfo.UM0111 | getUrl" />
			</div>
			<!-- {{userInfo | json}} -->
			<div class="col-md-5 col-xs-5 ml20 fs14">
				<div class="row">
					<span class="bold">{{userInfo.UM0102}}</span>&nbsp;&nbsp;<span class="light-grey">{{userInfo.UM0118}}</span>
				</div>
				<div class="row mt5">
					<span class="red" v-if="userInfo.UM0121!='-1' && userInfo.UM0121!=0">区域管理员</span>
					<span class="red" v-else>超级管理员</span>
					<a href="javascript:;" class="btn btn-danger relieve_btn" @click="removeSuperManage(userInfo.UM0101)" v-if="userInfo.UM0121==-1">解除管理权限</a>
					<a href="javascript:;" class="btn btn-danger relieve_btn" @click="removeAreaManage(userInfo.UM0101)" v-else>解除管理权限</a>
					<div class="clearfix"></div>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
		<div v-if="userInfo.UM0121==='-1'">
			<div class="col-md-10 col-xs-10 pl20">
				<h5 class="bold light-grey">团队设置</h5>
				<div class="col-md-12 col-xs-12 white_box mt15">
					<div class="col-md-6 col-xs-6 p10">
						<h5 class="light-grey h30 bold">团队信息</h5>
						<div class="setHeaderWid big_header relative">
							<img :src="team.TM00109 | getUrl" id="teamImg" />
							<div class="header_up manage_up" @click="uploadTeamImg(2)">
								<i class="glyphicon glyphicon-camera"></i>
							</div>
						</div>
						<div class="setNameWid pl10 mt10">
							<input type="text" name="teamName" v-model="teamName" class="form-control" placeholder="输入您的团队名称" />
						</div>
						<div class="setSaveWid mt10">
							<a href="javascript:;" class="btn btn-primary fr" @click="updateTeamNameLogo()">保存</a>
						</div>
						<div class="clearfix"></div>
					</div>
					<div class="col-md-6 col-xs-6 relative p10">
						<h5 class="light-grey h30 bold">团队助理</h5>
						<div class="setHeaderWid big_header relative">
							<img :src="assistant.TM00803 | getUrl" id="assistantImg" />
							<div class="header_up manage_up" @click="uploadTeamImg(3)">
								<i class="glyphicon glyphicon-camera"></i>
							</div>
						</div>
						<div class="left_border"></div>
						<div class="setNameWid pl10 mt10">
							<input type="text" name="teamAssName" v-model="teamAssName" class="form-control" placeholder="输入您的管家名称" />
						</div>
						<div class="setSaveWid mt10">
							<a href="javascript:;" class="btn btn-primary fr" @click="updateTeamAssistantLogo()">保存</a>
						</div>
						<div class="clearfix"></div>
					</div>
				</div>
			</div>
			<div class="col-md-10 col-xs-10 pl20 mt25">
				<h5 class="bold light-grey">超级管理员</h5>
				<div class="col-md-12 col-xs-12 white_box mt15">
					<ul class="supper_manage">
						<li v-for="item in userList">
							<div class="fl big_header relative">
								<img :src="item.TM00321 | getUrl" />
								<i class="iconfont manage_del red" @click="removeSuperManage(item.TM00301,$index);">&#xe60c;</i>
							</div>
							<div class="col-md-5 col-xs-5 fs14 mt15 ml10" v-if="item.TM00322==''">
								<div class="row bold">
									{{item.TM00306}}
								</div>
							</div>
							<div class="col-md-5 col-xs-5 fs14 ml10" v-else>
								<div class="row bold">
									{{item.TM00306}}
								</div>
								<div class="row light-grey mt5">
									{{item.TM00322}}
								</div>
							</div>
						</li>

						<li class="pointer" @click="addGoOn('manage')">
							<div class="fl big_header">
								<img src="../../../../static/images/add_person.png" />
							</div>
							<div class="col-md-5 col-xs-5 fs14 mt15 ml10">
								<div class="row light-grey">
									增设超级管理员
								</div>
							</div>
						</li>
						<div class="clearfix"></div>
					</ul>
					<div class="clearfix"></div>
				</div>
			</div>
		</div>
		<div class="col-md-10 col-xs-10 pl20 mt25 pb10" v-if="isAdmin!=1">
			<h5 class="bold light-grey">区域管理员<a href="javascript:;" class="light-blue fr fs14" @click="addGoOn('areas')"><i class="glyphicon glyphicon-plus" ></i>&nbsp;添加</a></h5>
			<div class="col-md-12 white_box mt15 ptb10">
				<table class="table table-striped fs12">
					<tr class="fs14 bold">
						<td>序号</td>
						<td>姓名</td>
						<td>手机</td>
						<td>所属部门</td>
						<td>职位</td>
						<td>管理区域</td>
					</tr>
					<tr v-for="item in areaList">
						<td>{{$index+1}}</td>
						<td>{{item.TM00306}}</td>
						<td>{{item.TM00308}}</td>
						<td>{{item.orgCname}}</td>
						<td>{{item.TM00322}}</td>
						<td>{{item.area}}</td>
						<td v-if="userInfo.UM0121==='-1'">
							<a class="light-blue" href="javascript:;" @click="resetAeraManage(item.TM00301)">重设区域</a>
						</td>
						<td>
							<a class="light-grey" href="javascript:;" @click="removeAreaManage(item.TM00301,$index)">删除</a>
						</td>
					</tr>
				</table>
				<div class="clearfix"></div>
			</div>
		</div>
			<div class="clearfix"></div>
			<div id="choosePerson1" style="display: none;">
				<choose-person :type-join="1"></choose-person>
			</div>
			<div id="areaManageDiv" style="display: none;">
				<ul class="choose_team areaTeam">
					<tree-item :model="manageItem"></tree-item>
				</ul>
			</div>
	</div>

</template>
<style type="text/css">
	.btn_cut_fun {
		width: 250px;
		right: 10px;
		bottom: 50px;
	}
</style>
<script type="text/javascript">
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	// import uploadImg from '../../upload/uploadImage'

	import {
		uploadImage
	} from '../../../../static/lib/updatephoto/miux_update_photo';
	export default {
		//获取选择人员列表
		vuex: {
			getters: {
				getAera(state) {
					return state.areaManage;
				},
				getSuperManagerList(state) {
					return state.userList;
				}
			}
		},
		data() {
			return {
				user: '',
				teamName: '',
				teamAssName: '',
				userList: '',
				areaList: '',
				team: '',
				assistant: '',
				manageItem: {},
				typeM: '',
				userInfo: JSON.parse(gloabl.getCookie('allUserInfo')).user,
				isAdmin: sessionStorage.getItem('admin')
			}
		},
		ready() {
			gloabl.doResizeWidth();
			gloabl.doResizeHeight();
			if (this.userInfo.UM0121 == 0) {
				this.$route.router.go({
					name: 'contact',
					params: {
						name: '阿达',
						sendid: 0,
						sendtype: 1
					}
				})
			}

			this.searchAreaManage();
			this.searchSuperManage();
			this.searchTeamNameLogo();
			this.searchTeamAssistantLogo();
			this.getTeamsTree();
		},
		watch: {
			getSuperManagerList: {
				handler: function() {
					if (this.typeM == 'manage') {
						this.userList = this.getSuperManagerList;
					} else {
						this.areaList = this.getSuperManagerList;
					}
				}
			}
		},
		methods: {
			//上传团队头像
			uploadTeamImg(tag) {
				if (tag == 2) {
					uploadImage(tag, function(url) {
						$('#teamImg').attr('src', url);
						$('#teamimage').attr('src', url);
					});
				} else {
					uploadImage(1, function(url) {
						$('#assistantImg').attr('src', url);
					}, 'ada');
				}

			},
			//添加超级管理和区域管理
			addGoOn: function(layerout) {
				var self = this;
				this.typeM = layerout;
				if (layerout != 'manage') {
					sessionStorage.setItem('supper', 'supper');
					var parent = layer.open({
						type: 1,
						shade: 0.2,
						title: '添加区域',
						area: ['300px', 'auto'],
						btn: ['下一步', '取消'],
						skin: '',
						content: $('#areaManageDiv'),
						yes() {
							if (self.getAera == '') {
								layer.msg('请选择区域！');
								return;
							}
							if (self.getAera == self.manageItem.id) {
								layer.msg('您无权选择总区域');
								return;
							}
							layer.close(parent);
							var manage = layer.open({
								type: 1,
								shade: 0.2,
								title: '添加参与人',
								area: ['750px'],
								skin: 'layui-layer-molv',
								content: $('#choosePerson1'),
							})
							sessionStorage.setItem('supper', '');
							self.$store.dispatch('LAYER_OBJECT', manage + ';' + layerout);
						},
						cancel() {
							self.$store.dispatch('AREA_MANAGE', '');
						}
					});
				} else {
					var manage = layer.open({
						type: 1,
						shade: 0.2,
						title: '添加参与人',
						area: ['750px'],
						// skin: 'layui-layer-molv',
						content: $('#choosePerson1'),
					})
					self.$store.dispatch('LAYER_OBJECT', manage + ';' + layerout);
				}
				return;
			},
			//查询部门机构树
			getTeamsTree() {
				var param = '';
				gloabl.fethAsync(URL.SEARCH_TEAM_TREE_URL, param, res => {
					if (res.success) {

						this.manageItem = res.result;
					}
				})
			},
			resetAeraManage(id) {
				var _this = this;
				sessionStorage.setItem('supper', 'supper');
				layer.open({
					type: 1,
					shade: 0.2,
					title: '添加区域',
					area: ['250px', '300px'],
					btn: ['确定', '取消'],
					// skin: 'layui-layer-molv',
					content: $('#areaManageDiv'),
					yes() {
						var params = 'TM00301=' + id + '&TM00101=' + _this.getAera;
						gloabl.fethAsync(URL.ADD_AREA_MANAGER_URL, params, res => {
							if (res.success) {
								_this.$store.dispatch('AREA_MANAGE', '');
								sessionStorage.setItem('supper', '');
								_this.areaList = res.result;
								layer.msg("修改成功");
								setTimeout(() => {
									layer.closeAll();
								}, 300)
							} else {
								layer.msg(res.msg);
							}
						});
					}
				})
			},
			/**
			 * 修改团队名称
			 */
			updateTeamNameLogo() {
				if (this.teamName == '') {
					gloabl.tipTools('团队名称不能为空', 'input[name="teamName"]');
					return;
				}
				gloabl.fethAsync(URL.UPDATE_TEAR_NAME_URL, 'TM00106=' + this.teamName, res => {
					if (res.success) {
						layer.msg("修改成功");
						setTimeout(function() {
							layer.closeAll();
						}, 500)

					}
				})

			},
			/**
			 * 查询团队名称
			 */
			searchTeamNameLogo() {
				gloabl.fethAsync(URL.SEARCH_TEAR_NAME_URL, '', res => {
					if (res.success) {
						this.teamName = res.result.TM00106;
						this.team = res.result;
					}
				})

			},
			/**
			 * 查询团队助理名称
			 */
			searchTeamAssistantLogo() {
				gloabl.fethAsync(URL.SEARCH_TEAR_ASSISTANT_URL, '', res => {
					if (res.success) {
						this.teamAssName = res.result.TM00802;
						this.assistant = res.result;
					}
				})
			},
			/**
			 * 修改团队助理名称
			 */
			updateTeamAssistantLogo() {
				if (this.teamAssName == '') {
					gloabl.tipTools('团队助理名称不能为空', 'input[name="teamAssName"]');
					return;
				}
				gloabl.fethAsync(URL.UPDATE_TEAR_ASSISTANT_URL, 'TM00802=' + this.teamAssName, res => {
					if (res.success) {
						gloabl.tipTools("修改成功");
					}
				})

			},
			/**
			 * 查询超级管理员
			 */
			searchSuperManage() {
				gloabl.fethAsync(URL.SEARCH_SUPER_MANAGER_URL, '', res => {
					if (res.success) {
						var result = res.result;
						for (var i = 0; i < result.length; i++) {
							if (result[i].TM00321 == null) {
								result[i].TM00321 = "../../../../static/images/people.png";
							}
							if (result[i].isSelf == 1) {
								this.user = result[i];
							}
						}
						this.userList = result;
					}
				})
			},

			/**
			 * 移出超级管理员
			 * @TM00301 {String} 移除对象SID
			 */
			removeSuperManage(sid, index) {
				if (this.userList.length == 1) {
					gloabl.tipTools("您是最后一个超级管理员，不可自行解除权限");
					setTimeout(function() {
						layer.closeAll();
					}, 1000);
					return;
				}
				if (typeof index != 'undefined') {
					if (this.user.TM00301 == sid) {
						this.removeSuperRequest(sid);
					} else {
						layer.confirm('确定要解除该管理员权限吗？', {
							btn: ['确定', '取消'],
							// skin: 'layui-layer-molv'
						}, () => {
							gloabl.fethAsync(URL.REMOVE_SUPER_MANAGER_URL, 'TM00301=' + sid, res => {
								if (res.success) {
									this.userList.splice(index, 1);
									gloabl.tipTools("解除成功");
									setTimeout(function() {
										layer.closeAll();
									}, 500)
								}
							})
						});

					}
				} else {
					this.removeSuperRequest(sid, index);
				}
			},
			/*
			 * 移除超级管理员请求
			 */
			removeSuperRequest(sid, index) {
				layer.confirm('确定要解除管理员权限吗?您将会：<br>1.重新返回登录页面;<br>2.不在具有管理员对应的管理及查看权限;', {
					btn: ['确定', '取消'],
					// skin: 'layui-layer-molv'
				}, () => {
					gloabl.fethAsync(URL.REMOVE_SUPER_MANAGER_URL, 'TM00301=' + sid, res => {
						if (res.success) {
							loginOut();
							gloabl.tipTools("解除成功");
							setTimeout(function() {
								layer.closeAll();
							}, 500)
						}
					})
				});
			},

			/**
			 * 查询区域管理员
			 */
			searchAreaManage() {
				gloabl.fethAsync(URL.SEARCH_AREA_MANAGER_URL, '', res => {
					if (res.success) {
						this.areaList = res.result;
					}
				})
			},
			/**
			 * 移出区域管理员
			 */
			removeAreaManage(sid, index) {
				layer.confirm('您确定要删除区域管理员吗?', {
					btn: ['确定', '取消'],
					// skin: 'layui-layer-molv'
				}, () => {
					gloabl.fethAsync(URL.REMOVE_AREA_MANAGER_URL, 'TM00301=' + sid, res => {
						if (res.success) {
							if (index != undefined) {
								this.areaList.splice(index, 1);
								gloabl.tipTools("删除成功");
								setTimeout(function() {
									layer.closeAll();
								}, 500)
							} else {
								location.href = "index.html";
							}

						}
					})
				});
			}
		}
	}
</script>
