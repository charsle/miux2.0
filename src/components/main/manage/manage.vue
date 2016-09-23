<template>
	<div class="manage_wrapper">
		<div class="manage_tab">
			<ul>
				<li><a href="javascript:;" id="manageSetting" class="tab_active" @click="chanageManageTab($event)">团队设置</a></li>
				<li><a href="javascript:;" id="manageMermber" @click="chanageManageTab($event)">成员管理</a></li>
				<li><a href="javascript:;" id="manageLog" @click="chanageManageTab($event)">管理日志</a></li>
				<div class="clearfix"></div>
			</ul>
		</div>
		<component :is="isManage"></component>
	</div>
</template>
<style type="text/css">
	.tab_active {
		color: #009bff!important;
	}
</style>
<script type="text/javascript">
	import gloabl from '../../../api/globConfig'

	import manageSetting from './manageSetting';
	import manageMermber from './manageMermber';
	import manageLog from './manageLog';
	export default {
		data() {
			return {
				isManage: 'manageSetting'
			}
		},
		ready() {
			gloabl.doResizeHeight();
		},
		methods: {
			chanageManageTab(ev) {
				var id = ev.target.id;
				$('.manage_tab a').removeClass('tab_active');
				$('#' + id).addClass('tab_active')
				this.isManage = id;
			}
		},
		components: {
			manageSetting,
			manageMermber,
			manageLog
		}
	}
</script>
