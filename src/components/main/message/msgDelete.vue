<template>
	<div>
		<div class="main">
			<img class="avatar" class="fl" width="30" height="30" :src="itemList.MSG00110 | getUrl" />
			<div class="fl maxWidth90">
				<div class="msgName">{{itemList.MSG00103}}</div>
				<div class="msg_box text mt5 fs14" >[{{itemList.MSG00109}}]</div>
				<div class="fl more_choose">
					<div>{{itemList.MSG00106 | time}}</div>
					<div class="clearfix"></div>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
	</div>

</template>
<script type="text/javascript">
	export default{
		props:['itemList']
	}
</script>