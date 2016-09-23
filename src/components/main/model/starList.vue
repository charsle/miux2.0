<template>
	<div class=" col-xs-12" id="star_content">
		<div class="col-xs-12 itemInfo" v-for="item in items">
			<div v-if="item.UM0204==1">
				<div class="col-xs-9" @click="currentRightTag('s_detaile',item.UM0206)">
					<div class="row itemHeader light-grey">
						<img class="img-circle" :src="item.UM0111 | getUrl" /><span class="inlineblock lh34" v-text="item.UM0206.MSG00103"></span>
					</div>
					<div class="row mt10 tabText" v-text="item.UM0206.MSG00109">
					</div>
				</div>
			</div>

			<div v-if="item.UM0204==3">
				<div class="col-xs-9" @click="currentRightTag('s_detaile',item.UM0206)">
					<div class="row itemHeader light-grey">
						<img class="img-circle" :src="item.UM0111 | getUrl" /><span class="inlineblock lh34" v-text="item.UM0206.MSG00103"></span>
					</div>
					<div class="row mt10 lh18 p10">
						<audio :src="item.UM0206.MSG00109.url" controls="controls" width="100%">
							您的浏览器不支持 audio 标签。
						</audio>
					</div>
				</div>
			</div>

			<div v-if="item.UM0204==2">
				<div class="col-xs-9" @click="currentRightTag('s_detaile',item.UM0206)">
					<div class="row itemHeader light-grey">
						<img class="img-circle" :src="item.UM0111 | getUrl" />
						<span class="inlineblock lh34" v-text="item.UM0206.MSG00103"></span>
					</div>
					<div class="row mt10 tabText tc">
						<img :src="item.UM0206.MSG00109.thumbnailURL"/>
					</div>
				</div>
			</div>

			<div v-if="item.UM0204==4">
				<div class="col-xs-9">
					<div class="row itemHeader light-grey">
						<img class="img-circle" :src="item.UM0111 | getUrl" />
						<span class="inlineblock lh34" v-text="item.UM0206.MSG00103"></span>
					</div>
					<div class="row mt10 lh18 itemborder p10">
						<div class="col-xs-3 tc">
							<!-- <img src="../../images/place.png" /> -->
						</div>
						<div class="col-xs-9">
							<div class="row overflow nowrap">
								<a href="../../../../static/map.html#{{item.UM0206.MSG00109.Lng}}-{{item.UM0206.MSG00109.Lnt}}">{{item.UM0206.MSG00109.addressName}}</a>
							</div>
							<div class="row mt5">
								<a class="greyBasic" href="../../../../static/map.html#{{item.UM0206.MSG00109.Lng}}-{{item.UM0206.MSG00109.Lnt}}">地理位置</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="item.UM0204==5">
				<div class="col-xs-9" @click="currentRightTag('d_detaile',item.UM0206.DM00101,'star')">
					<div class="row itemHeader light-grey">
						<img class="img-circle" :src="item.UM0111 | getUrl" />
						<span class="inlineblock lh34" v-text="item.UM0206.DM00111"></span>
					</div>
					<div class="row mt10 lh18 itemborder p10">
						<div class="col-xs-3 fs48 pdf_color pt10" v-cloak>
							{{{item.UM0206.DM00106 | valideType}}}
						</div>
						<div class="col-xs-9">
							<div class="row">
								<div class="col-xs-10 overflow nowrap" v-cloak>
									{{item.UM0206.DM00105}}
								</div>
								<div class="col-xs-2" v-cloak>
									{{item.UM0206.DM00106}}
								</div>
							</div>
							<div class="row mt5" v-cloak>
								<span class="greyBasic">{{item.UM0206.DM00108 | fileSize}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-xs-3 tr">
				<div class="row fs12 itemDate" v-cloak>{{item.UM0207 | reverseTime}}</div>
				<div class="row do_del fs16 mt10">
					<i class="iconfont fs18 light-grey" @click="doDel(item.UM0203,$index,item.UM0206)">&#xe630;</i>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
	</div>
</template>

<script type="text/javascript">
	/**
	 * miux v2.0 定制版  星标收藏列表
	 * Copyright 2016-2016 Miux, Inc.
	 * author  WF(吴芳);
	 */

	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'

	export default {
		props: ['items'],
		ready() {
			gloabl.doResizeHeight();
		},
		methods: {
			currentRightTag(type, id, parent) {
				this.$store.dispatch('SWITCH_RIGHT', type, id, parent)
			},
			//删除星标
			doDel: function(msgId, index, item) {
				var self = this;
				gloabl.layer.open({
					type: 0,
					title: '系统信息',
					skin: '',
					btn: ['确定', '取消'],
					content: '您确定要删除吗',
					yes: function() {
						var params = 'UMT11=' + msgId;
						self.cancleStar(params, index, item);
						gloabl.layer.closeAll();
					}
				});
			},
			//删除星标接口
			cancleStar: function(param, index, item) {
				gloabl.fethAsync([URL.DELETE_START_URL], param, res => {
					if (res.success) {
						gloabl.tipTools('删除成功');
						this.items.splice(index, 1);
						this.$store.dispatch('CANCEL_STAR', item)
						return;
					} else {
						gloabl.tipTools('删除失败');
						return;
					}
				})
			}
		}

	}
</script>
