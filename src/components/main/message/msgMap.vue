<template>
	<div>
		<div class="main">
			<img class="avatar" class="fl" width="30" height="30" :src="itemList.MSG00110 | getUrl" />
			<div class="fl maxWidth90">
				<div class="msgName">{{itemList.MSG00103}}</div>
				<div class="msg_box msg_pic m{{itemList.MSG00101}}">
					<a :href="href" target="_blank">
						<img :src="getSrc" /><br/><br/> {{itemList.MSG00109.addressName}}
					</a>
				</div>
				<div class="fl more_choose">
					<div>{{itemList.MSG00106 | time}}</div>
					<div class="fl mr5" v-if="itemList.MSG00111==1?true:false">
						<i class="iconfont fs13 star_color">&#xe60b;</i>
					</div>
					<div class="iconfont light-grey btn_more fs13" @click="showMake($event)">&#xe63d;</div>
					<div class="tip-popover bottom msg_tips">
						<div class="tip-popover-container">
							<a href="javascript:;" @click="cancelMessage(itemList,$index)"  v-if="itemList.MSG00102 | isMySelf"><i class="iconfont">&#xe630;</i>&nbsp;撤回</a>
							<a href="javascript:;" @click="markStar(itemList,1)" v-if="itemList.MSG00111==0?true:false"><i class="iconfont">&#xe60b;</i>&nbsp;星标收藏</a>
							<a href="javascript:;" @click="markStar(itemList,2)" v-if="itemList.MSG00111==1?true:false"><i class="iconfont">&#xe60b;</i>&nbsp;取消星标</a>
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
	export default {
		props: ['itemList'],
		data() {
			return {
				href: '../../../../static/map.html#' + this.itemList.MSG00109.Lng + '-' + this.itemList.MSG00109.Lnt
			}
		},
		ready() {
			document.body.onclick = () => {
				$('.msg_tips').hide();
			}

		},
		computed: {
			getSrc() {
				var keys = this.itemList.MSG00109.thumbnailURL;
				return keys;
			}
		},
		methods: {
			showMake(ev) {
				var curr = $(ev.currentTarget);
				var l_top = curr.offset().top;
				var all_height = $('.msg_tips').height() + l_top;
				var content_height = $('#m-message').height();
				var currTarget = curr.siblings('.msg_tips');
				if (all_height > content_height) {
					currTarget.css({
						'margin-top': '-' + ($('.msg_tips').height() + 15) + 'px'
					})
				}
				$('.msg_tips').hide();
				currTarget.toggle();
				if (ev.stopPropagation) {
					ev.stopPropagation();
				} else if (window.event) {
					window.event.cancelBubble = true; //兼容IE
				}
				if (currTarget.css('display') == 'none') {
					this.isTipShow = false
				} else {
					this.isTipShow = true
				}
			},
			markStar(item, type) {
				if (type == 1) {
					gloabl.makeSuperStar(item, type, loop => {
						if (loop) {
							if (this.itemList.MSG00108 == 4) {
								this.itemList.MSG00109 = JSON.parse(this.itemList.MSG00109);
								this.itemList.MSG00111 = 1;
							}
						} else {
							layer.msg('添加星标失败')
						}

					});
				} else {
					gloabl.makeSuperStar(item, type, loop => {
						if (loop) {
							this.itemList.MSG00111 = 0;
						} else {
							layer.msg('添加星标失败')
						}
					})
				}
			},
		}

	}
</script>
