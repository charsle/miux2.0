<template>
	<div class="doc">
		<h1>行事历<span class="fr fs14 tabTitleColor"><i class="iconfont">&#xe64d;</i></span></h1>
		<div id="taskList">
			<div class="col-xs-12 mt10">
				<div class="calendar">
					<div id="act" class="jalendar">
						<div class="added-event" data-date="2016-06-27" data-time="00:00" data-title=""></div>
					</div>
				</div>
				<div class="row mt10 bottom">
					<div class="col-xs-7 lh30 taskTitle">
						<a href="javascript:;" class="mr10" v-bind:class="{ 'active_task': isA }" @click="getTask($event,1)">正在进行的事项</a>
						<a href="javascript:;" v-bind:class="{ 'act_task': isB }" @click="getTask($event,2)">已完成的事项</a>
					</div>
					<div class="col-xs-5 tr">
						<a href="javascript:;" class="btn btn-primary blueBac btn-sm" @click="creat_task"><i class="glyphicon glyphicon-plus">&nbsp;</i>创建行事历</a>
					</div>
				</div>
			</div>
			<task-items :items="taskLists" :index="index"></task-items>
			<div class="light-blue pointer tc mt15" v-if="num !== 0" @click="loadMore" id="taskMore">
				{{moreTask}}
			</div>
			<div class="col-xs-12 tc light-grey fs12" v-if="num === 0" style="padding-top: 50px;">暂无可查询的事项</div>
		</div>

		<div id="createTask" style="display: none;">
			<creat-task></creat-task>
		</div>
		<div id="choosePerson1" style="display: none;">
			<choose-person :type-join="1"></choose-person>
		</div>
	</div>
</template>
<script type="text/javascript">
	import '../../../../static/lib/jalendar/jalendar.css';
	import jalendar from '../../../../static/lib/jalendar/jalendar';
	import taskItems from './taskList';

	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	export default {
		data: function() {
			return {
				taskLists: Object,
				index: 1,
				isA: true,
				isB: false,
				pagen: 1,
				date: '',
				num: 0,
				loadTag: '加载更多',
				moreTask: ''
			}
		},
		ready() {
			var _this = this;
			$('#act').jalendar({
				color: '#fff',
				lang: 'CH'
			}, function(d) {
				_this.pagen = 1;
				_this.date = d;
				_this.taskPage(_this.pagen);
			});
			gloabl.doResizeHeight();
			this.getTask();
		},
		methods: {
			//创建行事历
			creat_task: function() {
				var self = this;
				var cc = gloabl.layer.open({
					type: 1,
					title: '创建新事项',
					area: ['600px'],
					skin: '',
					content: $('#createTask'),
				})
				self.$store.dispatch('LAYER_OBJECT', cc + ';' + '');
			},
			//获取行事历列表
			getTask: function(ev, index) {
				ev = ev ? ev : '';
				index = index ? index : 1;
				this.index = index;
				var now_url = index == 1 ? [URL.GET_TASKING_LIST] : [URL.GET_TASKDONE_LIST];
				if (index == 1) {
					this.isA = true;
					this.isB = false;
				} else {
					this.isA = false;
					this.isB = true;
				}
				gloabl.fethAsync(now_url, '', res => {
					if (res.success) {
						this.taskLists = res.result;
						if (this.index == 2) {
							this.num = this.taskLists.nums;
						} else {
							this.num = this.taskLists.pageUtils.nums;
						}
						if (this.num < 10) {
							$('#taskMore').hide();
						} else {
							$('#taskMore').show();
							this.moreTask = '加载更多';
						}
					} else {
						gloabl.tipTools('查询失败');
					}
				})
			},
			/*
			 * 加载更多
			 */
			loadMore() {
				this.pagen = this.pagen + 1;
				this.taskPage(this.pagen);
			},
			/*
			 * 加载列表
			 */
			taskPage(pageNumber) {
				var _this = this;
				var pageSize = 10;
				var now_url = this.index == 1 ? [URL.GET_TASKING_LIST] : [URL.GET_TASKDONE_LIST];
				var param = 'CTT01=1&CTT02=' + pageSize * this.pagen + '&CTT04=' + this.date;
				gloabl.pagesNum(now_url, param, function(res) {
					_this.taskLists = res;
					if (_this.index == 1) {
						_this.num = res.pageUtils.nums;
						if (_this.num == res.pageUtils.pageList.length) {
							$('#taskMore').hide();
						} else {
							$('#taskMore').show();
							_this.moreTask = '加载更多';
						}
					} else {
						_this.num = res.nums;
						if (_this.num == res.pageList.length) {
							$('#taskMore').hide();
						} else {
							$('#taskMore').show();
							_this.moreTask = '加载更多';
						}
					}

				});
			}
		},
		components: {
			taskItems //行事历列表组件
		}

	}
</script>
