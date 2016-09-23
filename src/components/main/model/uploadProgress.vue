<template>
	<div class="upLoadFile" v-if="isUpLoad">
		<h4 class="bottom">文件
				<a href="javascript:;" class="fr light-grey" @click="deleteProgress">
					<i class="fs18 iconfont">&#xe60c;</i>
				</a>
				<div class="clearfix"></div>
			</h4>
		<div class="col-xs-12 share_content ">
			<div class="col-xs-2 fs48 ">
				<i class="iconfont pdf_color">&#xe623;</i>
			</div>
			<div class="col-xs-10 mt10">
				<div class="row overflow nowrap">里名字.pdf</div>
				<div class="row light-grey mt2">12%&nbsp;(12KB)</div>
				<div class="row">
					<div class="col-xs-8 mt5">
						<div class="progress">
							<div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%">
								<span class="sr-only">20% Complete</span>
							</div>
						</div>
					</div>
					<div class="col-xs-4 tc">
						<a href="javascript:;" class="dark-gray">{{situation}}</a>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">

</script>
