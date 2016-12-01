<template>
	<div>
		<div class="col-md-12">
			<div class="operating_tab">
				<ul>
					<li class="select_member fl">
						<div class="dropdown">
							<button class="btn btn-default" id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							          管理员
							    <span class="caret"></span>
							  </button>
							<ul class="dropdown-menu" aria-labelledby="dLabel">
								<li>
									<a href="javascript:;" @click="chooseSuperManager('');">全选</a>
								</li>
								<li v-for="item in userList">
									<a href="javascript:;" @click="chooseSuperManager(item.TM00301);">{{item.TM00306}}</a>
								</li>

							</ul>
						</div>
					</li>
					<li class="select_time fl">


							  <!-- <datetime :readonly="true"  format="YYYY-MM-DD" value="请选择时间"></datetime> -->
								<vue-flatpickr v-model='date'   :options="fpOptions" placeholder="请选择时间" @update='update'></vue-flatpickr>
							  <!-- </button> -->

					</li>
					<li class="select_con bold fl">操作内容</li>
					<li class="fr">
						<a href="javascript:;" class="btn btn-default bold" @click="removeTime();">显示全部时间</a>
					</li>
					<div class="clearfix"></div>
				</ul>

			</div>
			<div class="col-md-12 p10 fs12" id="manage_log">
				<table class="table table-hover">
					<tr v-for="log in allLog">
						<td class="select_member">{{log.TM00406}}</td>
						<td class="select_time">{{log.TM00403}}</td>
						<td class="select_content">{{log.TM00407}}</td>
					</tr>
				</table>
			</div>
			<div id="pages" style="margin: 0 20px!important;"></div>
		</div>

	</div>
</template>
<style media="screen">


	.flatpickr-input {
		padding: 6px 12px;
		width: 150px;
		height: 35px;
		border-radius: 5px;
		border: 1px solid #ccc;
	}
</style>
<script type="text/javascript">
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	import datetime from 'vue-datetimepicker';
	import '../../../../static/lib/pages/simplePagination.css'
	require('../../../../static/lib/pages/jquery.simplePagination');
	import vueFlatpickr from 'vue-flatpickr/vue-flatpickr-default.vue'
	export default {
		data() {
			return {
				allLog: '',
				userList: '',
				logParams: {
					TMT05: '',
					TM00301: ''
				},
				date: '',
				fpOptions: {
					// dateFormat: 'Y-m-d H:i:S K',
					enableTime: false,
					enableSeconds: false,
					noCalendar: false,
					shorthandCurrentMonth: false,
					weekNumbers: false,
					time_24hr: false,
					utc: false,
				}
			}
		},
		components: {
			vueFlatpickr
		},
		ready() {
			gloabl.doResizeHeight();
			$('#dLabel').dropdown('toggle');
			this.searchManageLog(1);
			this.searchSuperManage();


		},
		// events: {
		// 	"changeDate": function(msg) {
		// 		this.logParams.TMT05 = msg
		// 		this.searchManageLog(1);
		// 	}
		// },
		methods: {
			update(val) {
				this.logParams.TMT05 = val
				this.searchManageLog(1);
				// console.log(val)
			},
			searchManageLog(pageNumber) {
				var _this = this;
				var pageSize = 20;
				var param = 'TMT05=' + this.logParams.TMT05 + '&TM00301=' + this.logParams.TM00301 + '&TMT06=' + pageNumber + '&TMT07=' + pageSize;
				// console.log(param)
				gloabl.fethAsync([URL.SEARCH_MANAGE_LOG_URL], param, res => {
					var r = res.result;
					if (r != null) {
						_this.allLog = r.pageList;
					} else {
						_this.allLog = null;
						r = {
							nums: 0,
							page: 0
						};
					}
					$("#pages").pagination({
						items: parseInt(r.nums), //总的条数:int类型
						currentPage: r.page, //页数
						itemsOnPage: pageSize, //每页显示几条
						cssStyle: 'light-theme',
						selectOnClick: true,
						hrefTextPrefix: '',
						onPageClick: function(pageNum) {
							_this.searchManageLog(pageNum);
						}
					});
				})
			},
			/**
			 * 查询超级管理员
			 */
			searchSuperManage() {
				gloabl.fethAsync([URL.SEARCH_SUPER_MANAGER_URL], '', res => {
					if (res.success) {
						this.userList = res.result;
					}
				})
			},
			/**
			 * 筛选超级管理员
			 */
			chooseSuperManager(sid) {
				this.logParams.TM00301 = sid;
				this.searchManageLog(1);
			},
			/*
			 * 显示全部时间
			 */
			removeTime() {
				this.logParams.TMT05 = '';
				this.searchManageLog(1);
			},

		}

	}
</script>
