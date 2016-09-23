<template>
	<div v-if="items.length!==0">
		<div v-for="item in items">
			<div class="col-xs-12 itemInfo" v-if="filetype==1" @click="currentRightTag('d_detaile',item.DM00101,'doc')">
					<div class="row" v-cloak>
						<div class="col-xs-2 fs48">
							{{{item.DM00106 | valideType}}}
						</div>
						<div class="col-xs-10 mt15">
							<div class="row mt5">
								<div class="col-xs-10 overflow nowrap docTitleColor">
									{{item.DM00111}}
								</div>
								<div class="col-xs-2 tr docSizeColor text-uppercase">
									{{item.DM00108 | fileSize}}
								</div>
							</div>
							<div class="row docColor mt10">
								<div class="fl d_type">
									{{item.DM00106}}
								</div>
								<div class="fileNameStyle">
									{{item.DM00105}}
								</div>
								<div class="fileNameStyle">
									{{item.DM00103 | reverseTime}}
								</div>
								<div class="col-xs-1 light-grey ml10 relative" v-if="item.DM00114==1">
									<i class="iconfont" style="font-size: 24px;position: absolute;left: 0;top: -8px;">&#xe63e;</i>
								</div>
							</div>
							<div class="clearfix"></div>
						</div>
					</div>
			</div>

			<div class="col-xs-12 itemInfo" v-else @click="currentRightTag('d_detaile',item.DM00101,'grop_file')">
					<div class="row" v-cloak>
						<div class="col-xs-2 fs48">
							{{{item.DM00106 | valideType}}}
						</div>
						<div class="col-xs-10 mt15">
							<div class="row mt5">
								<div class="col-xs-10 overflow nowrap docTitleColor">
									{{item.DM00111}}
								</div>
								<div class="col-xs-2 tr docSizeColor text-uppercase">
									{{item.DM00108 | fileSize}}
								</div>
							</div>
							<div class="row docColor mt10">
								<div class="fl d_type">
									{{item.DM00106}}
								</div>
								<div class="fileNameStyle">
									{{item.DM00105}}
								</div>
								<div class="fileNameStyle">
									{{item.DM00103 | reverseTime}}
								</div>
								<div class="col-xs-1 light-grey ml10 relative" v-if="item.DM00114==1">
									<i class="iconfont" style="font-size: 24px;position: absolute;left: 0;top: -8px;">&#xe63e;</i>
								</div>
							</div>
							<div class="clearfix"></div>
						</div>
					</div>
			</div>

		</div>
	</div>
	<div v-else>
		<p class="tc mt30">
			<img  src="../../../../static/images/b.png" alt="" />
			<p class="tc mt20 light-grey">暂时数据</p>
		</p>

	</div>
</template>
<script type="text/javascript">
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	export default {
		props: ['item', 'filetype'],
		computed: {
			items: function() {
				return this.item.pageList ? this.item.pageList : []
			}
		},
		data: function() {
			return {
				pageDoc: 1
			}
		},

		methods: {
			currentRightTag(type, id, parent) {
				this.$store.dispatch('SWITCH_RIGHT', type, id, parent)
			}
		}
	}
</script>
