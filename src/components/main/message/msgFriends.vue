<template>
	<div>
		<div class="main">
			<img class="avatar" class="fl" width="30" height="30" :src="itemList.MSG00110 | getUrl" />
			<div class="fl">
				<div class="msgName">{{itemList.MSG00103}}</div>
				<div class="msg_box share_box">
					<h4>好友邀请</h4>
					<div class="invite_content col-xs-12">
						<div class="col-xs-1 card_header">
							<img class="avatar" width="40" height="40" src="../../../../static/images/1.jpg" />
						</div>
						<div class="col-xs-7 pl20 lh18">
							<a href="javascript:;" class="light-blue" >{{itemList.MSG00103}}</a> 希望成为您的好友，您可以到 <a href="javascript:;" class="light-blue" @click="currentRightTag('books')">通讯录-添加好友</a> 查看详情，或直接就这么定了！
						</div>
						<div class="col-xs-4">
							<div class="fr">
								<a href="javascript:;" class="btn btn-danger btn-sm" @click="refusefriend">拒绝</a>&nbsp;&nbsp;
								<a href="javascript:;" class="btn btn-primary btn-sm" @click="agreeFriend">同意</a>
							</div>
							<div class="clearfix"></div>
						</div>
					</div>
				</div>
				<div class="fl more_choose">
					<div>8:18&nbsp;AM</div>
					<div class="fl mr5">
						<i class="iconfont fs18 star_color">&#xe60b;</i>
					</div>
					<div class="iconfont light-grey btn_more">&#xe63d;</div>
					<div class="tip-popover bottom msg_tips">
						<div class="tip-popover-container">
							<a href="javascript:;"><i class="iconfont">&#xe630;</i>&nbsp;删除</a>
							<a href="javascript:;"><i class="iconfont">&#xe60b;</i>&nbsp;星标收藏</a>
						</div>
					</div>
					<div class="clearfix"></div>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {switchRight} from '../../vuex/actions';
	export default {
		props:['itemList'],
		vuex: {
			actions: {
				currentRightTag: switchRight
			}
		},
		methods: {
			refusefriend() {
				alert('拒绝了');
			},
			agreeFriend() {
				alert('同意了');
			},
		}

	}
</script>
