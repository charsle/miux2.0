<template>
	<div style="padding: 10px 10px 0 10px;">
	<div class="col-xs-12">
		<div class="col-xs-2">
			<img :src="info.TM00210 | getUrl" width="32" height="32"/>
		</div>
		<div class="col-xs-10" v-cloak>
			<div class="row">
				<span class="tip_name">{{info.TM00209==0?'公开频道':'私密频组'}}</span>&nbsp;&nbsp;
				<span>{{info.TM00206}}</span>&nbsp;&nbsp;
				<span>{{isNum}}</span>人
			</div>
			<div class="row mt5 light-grey">
				由<span>{{info.creater}}</span>&nbsp;创建于<span>{{info.TM00203}}</span>
			</div>
		</div>
	</div>
	<div class="col-xs-12 mt15">
		<h5 class="fs14 light-grey">简介</h5>
		<div class="row break mt10">
			{{info.TM00208}}
		</div>
	</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		props:['info','isNum'],
	}
</script>