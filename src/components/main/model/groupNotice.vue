<template>
	<div class="groupNotice">
		<h1 >
			<a href="javascript:;" @click="currentRightTag('group')"><span class="glyphicon glyphicon-menu-left"></span> 频道公告列表</a>
			<span class="fr fs14 tabTitleColor"><i class="iconfont">&#xe64d;</i></span>
		</h1>
		<div class="col-xs-12 borderB">
			<div class="col-xs-2">
				<img :src="groupNotice.TM00210 | getUrl" width="60px" height="60px" style="border-radius: 100%;"/>
			</div>
			<div class="col-xs-10" v-cloak>
				<div class=" pl10 mt5 overflow nowrap">
					<span class="fs16">{{groupNotice.TM00206}}</span>
				</div>
				<div class="light-grey fs14  pl10 mt5">
					{{groupNotice.TM00209==0?'公开频道':'私有群组'}}
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
		<div class="col-xs-12 mt20">
			<h2 class="fs15 bold fontColor">公告列表</h2>
		</div>

		<div class="col-xs-12" id="groupNotList" v-cloak>
			<div v-for="item in groupItems">
				<div class="col-xs-12 itemInfo">
					<div class="row h20">
						<div class="col-xs-10 overflow nowrap">
							<span class="fs13">{{item.MSG00103}}</span>&nbsp;&nbsp;<span class="fs10 light-grey">{{item.MSG00106}}</span>
						</div>
						<div class="col-xs-2 light-grey tr">
							<i class="iconfont fs16 groupDelete" @click="delGroupNotice(item.MSG00101,$index)">&#xe630;</i>
						</div>
					</div>
					<div class="row break mt5 fontColor">
						{{item.MSG00109}}
					</div>
				</div>
			</div>
			<div class="light-blue pointer tc mt15" @click="getMore" id="txtMore" v-show="loadshow">
				{{moreText}}
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	export default {
		data: function() {
			return {
				groupItems: '',
				page: 1,
				moreText: '加载更多',
				groupNotice: '',
				loadshow: true
			}
		},

		ready() {
			gloabl.doResizeHeight();
			this.groupNoticeList();
		},
		methods: {
			currentRightTag(type) {
				this.$store.dispatch('SWITCH_RIGHT', type);
			},
			getMore: function() {
				this.page = this.page + 1;
				this.groupNoticeList();
			},
			//查看频组公告列表
			groupNoticeList: function() {
				this.groupNotice = JSON.parse(gloabl.getCookie('slingeGroupInfo'));
				var pageSize = 10;

				var param = '&MSG00104=' + this.groupNotice.TM00201 + '&page=1' + '&pageSize=' + this.page * pageSize;
				gloabl.fethAsync([URL.GROUP_NOTIC], param, res => {
					if (res.success) {

						this.groupItems = res.result.pageList;
						if (this.groupItems.length == 0) {
							this.moreText = '';
						} else {
							this.moreText = '加载更多';
						}
						if (res.result.nums > 10) {
							this.loadshow = true;
						} else {
							this.loadshow = false;
						}
						if (res.result.pageList.length == res.result.nums) {
							this.loadshow = false;
						}
					}
				})
			},
			//删除公告
			delGroupNotice: function(gNoticeId, index) {
				var param = '&MSG00101=' + gNoticeId + '&MSG00104=' + this.groupNotice.TM00201;
				gloabl.layer.confirm('是否分享到当前会话区？', () => {
					gloabl.fethAsync([URL.GROUP_NOTIC_DEL], param, res => {
						if (res.success) {
							gloabl.tipTools('删除成功');
							this.groupItems.splice(index, 1);
							return;
						} else {
							gloabl.tipTools('删除失败');
							return;
						}
					})
					gloabl.layer.closeAll();
				})

			}
		}
	}
</script>
