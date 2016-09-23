<template>
	<div>
		<div class="main">
			<img class="avatar" class="fl" width="30" height="30" :src="itemList.MSG00110 | getUrl" />
			<div class="fl maxWidth90">
				<div class="msgName">吴芳</div>
				<div class="msg_box share_box mt5 m{{itemList.MSG00101}}">
					<h4>上传了一个文件</h4>
					<div class="col-xs-12 share_content invite_content">
						<div class="col-xs-2 fs50 xls_color"><i class="icon iconfont icon-xls"></i></div>
						<div class="col-xs-7 mt15">
							<div class="row overflow nowrap">
								拟加入安保公司弟子名单.xls
							</div>
							<div class="row mt2">
								13K
							</div>
						</div>
						<div class="col-xs-3 mt15 tr fr">
							<a href="javascript:;" class="btn btn-default"><i class="glyphicon glyphicon-share-alt"></i></a>
							<a href="javascript:;" class="btn btn-default"><i class="glyphicon glyphicon-download-alt"></i></a>
						</div>
						<div class="clearfix"></div>
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