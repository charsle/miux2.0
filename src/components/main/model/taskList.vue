<template>
	<div class="col-xs-12 itemInfo" v-for="item in newList">
		<div class="col-xs-10" @click="showDetaile(item.CT00101,$index)">
			<div class="col-xs-1 fs18">
				<div v-if="index==1">
					<i class="iconfont red">&#xe605;</i>
				</div>
				<div v-if="index==2">
					<i class="iconfont light-grey">&#xe605;</i>
				</div>
			</div>
			<div class="col-xs-11 fs14 break">
				<div class="row bold overflow nowrap">
					{{item.CT00104}}
				</div>
				<div class="row mt10 fs14">
					<i class="light-blue">{{item.CT00103}}</i>创建于{{item.CT00110}}&nbsp;&nbsp;
					<span v-if="index==1">
						<i class="iconfont light-blue">&#xe637;</i>
					</span>
					<span v-if="index==2">
						<i class="iconfont light-grey">&#xe637;</i>
					</span>
				</div>
			</div>
		</div>
		<div v-if="index==1">
			<div class="col-xs-2 fs16 tr light-grey">
				<div class="row">
					<i class="iconfont" @click="finishedTask(item.CT00101,1,$index)">&#xe644;</i>
				</div>
			</div>
		</div>
		<div v-if="index==2">
			<div class="col-xs-2 fs16 tr light-grey">
				<div class="row">
					<i class="iconfont" @click="unfinishedTask(item,$index)">&#xe643;</i>
				</div>
				<div class="row mt10">
					<i class="iconfont" @click="finishedTask(item.CT00101,2,$index)">&#xe60c;</i>
				</div>

			</div>
		</div>

	</div>
	<div id="seeDetaile" style="display: none;">
		<see-detaile :items="taskInfo" :index="index"></see-detaile>
	</div>

</template>
<script type="text/javascript">
	/**
	 * miux v2.0 定制版  行事历列表
	 * Copyright 2016-2016 Miux, Inc.
	 * author  WF(吴芳);
	 */
	import seeDetaile from './seeDetaile';
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	export default {
		props: ['items', 'index'],
		computed: {
			newList: function() {
				if (this.items.hasOwnProperty('pageUtils')) {
					return this.items.pageUtils.pageList ? this.items.pageUtils.pageList : [];
				} else {
					return this.items.pageList ? this.items.pageList : [];
				}
			}
		},
		data: function() {
			return {
				taskInfo: '',
				checked: false
			}
		},
		watch: {
			getNewTask: {
				handler() {
					if (this.items.pageUtils != undefined) {
						this.items.pageUtils.pageList.unshift(this.getNewTask);
					}
				},
			},
			getFinshTaskID: {
				handler() {
					if (this.items.pageUtils != undefined) {
						for (let item of this.items.pageUtils.pageList) {
							if (this.getFinshTaskID == item.CT00101) {
								this.items.pageUtils.pageList.$remove(item);
							}
						}
					}
				}
			},
			getTaskChecked: {
				handler() {
					this.checked = this.getTaskChecked
				}
			}

		},
		vuex: {
			getters: {
				getNewTask(state) {
					return state.taskList;
				},
				getFinshTaskID(state) {
					return state.finishTaskID;
				},
				getTaskChecked(state) {
					return state.taskChecked;
				}

			}
		},
		components: {
			seeDetaile
		},

		ready() {},
		methods: {
			//查看详情模态框
			showDetaile: function(sid, num) {
				var self = this;
				self.$store.dispatch('TASK_CHECKED', false);
				gloabl.fethAsync([URL.TASK_DETAILE_URL], 'CT00101=' + sid, res => {

					if (res.success) {
						this.taskInfo = res.result;
						gloabl.layer.open({
							type: 1,
							title: '事项详情',
							area: ['600px', '250px'],
							skin: '',
							btn: ['确定'],
							content: $('#seeDetaile'),
							yes() {
								if (self.index == 1) {
									if (self.getTaskChecked == true) {
										var params = 'CT00101=' + sid + '&CTT05=1';
										gloabl.fethAsync([URL.REFRESH_TASK_URL], params, res => {
											if (res.success) {
												self.newList.splice(num, 1);
												self.$store.dispatch('FINISH_TASH_ID', sid);
												self.$store.dispatch('TASK_CHECKED', false);
												gloabl.tipTools('该事项已标记完成');
												gloabl.layer.closeAll();
											} else {
												gloabl.tipTools('操作失败');
											}
										})
									}
								}
								gloabl.layer.closeAll();
							}
						});
					} else {
						gloabl.tipTools('操作失败');
					}

				})
			},
			//勾选完成当前事项
			finishedTask: function(sid, type, index1) {
				var self = this;
				var params = '',
					textTip = ''
				if (type == 1) {
					params = 'CT00101=' + sid + '&CTT05=1';
					textTip = "您确定已完成此事项任务？";
				} else {
					params = 'CT00101=' + sid + '&CTT05=3';
					textTip = "您确定要删除当前事项？";
				}
				layer.confirm(textTip, () => {
					self.fereshList(params, type, index1, sid);
				})
			},
			//删除、刷新
			fereshList: function(params, type, index1, sid) {
				gloabl.fethAsync([URL.REFRESH_TASK_URL], params, res => {

					if (res.success) {
						if (type == 1) {
							this.$store.dispatch('FINISH_TASH_ID', sid);
							this.items.pageUtils.pageList.splice(index1, 1);
						} else {
							this.items.pageList.splice(index1, 1);
							//this.$store.dispatch('TASK_LIST', sid);
							this.$store.dispatch('TASK_CHECKED', false);
						}
						gloabl.layer.closeAll();
					} else {
						gloabl.tipTools('操作失败');
					}

				});
			},
			//确定转移到未完成事项中么
			unfinishedTask: function(item, index1) {
				var self = this;
				gloabl.layer.open({
					type: 0,
					title: '系统提示',
					area: '400',
					skin: '',
					btn: ['确定', '取消'],
					content: `确定转移到未完成事项中么？`,
					yes: function() {
						var params = 'CT00101=' + item.CT00101 + '&CTT05=2';
						self.fereshList(params, 2, index1, item);
						self.$store.dispatch('TASK_LIST', item);

						gloabl.layer.closeAll();
					}
				})
			}
		}
	}
</script>
