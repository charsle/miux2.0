<template>
	<div>
		<!--<p class="time"><span>1月25日1月25日1月25日1月25日</span></p>-->
		<div class="main">
			<img class="avatar" class="fl" width="30" height="30" :src="itemList.MSG00110 | getUrl" />
			<div class="fl maxWidth90">
				<div class="msgName">{{itemList.MSG00103}}</div>
				<!--<div class="msg_box text mt5 fs14 atListItem">{{{itemList.MSG00109 | filterEnter| filterAt }}}</div>-->
				<div class="msg_box text mt5 fs14 atListItem m{{itemList.MSG00101}}">{{{itemList.MSG00109 | filterAt | filterEnter}}}</div>
				<div class="fl more_choose">
					<div>{{itemList.MSG00106 | time}}</div>
					<div class="fl mr5 isStarShow{{itemList.MSG00101}}" v-if="itemList.MSG00111==1?true:false">
						<i class="iconfont fs13 star_color">&#xe60b;</i>
					</div>
					<div class="iconfont light-grey btn_more fs13" @click="showMake($event)">&#xe63d;</div>
					<div class="tip-popover bottom msg_tips">
						<div class="tip-popover-container">
							<a href="javascript:;" @click="cancelMessage(itemList,$index)" v-if="itemList.MSG00102 | isMySelf"><i class="iconfont">&#xe630;</i>&nbsp;撤回</a>
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
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	export default {
		props: ['itemList'],
		ready() {
			var _this = this;
			document.body.onclick = () => {
				$('.msg_tips').hide();
			}
			$('.atListItem a').click(function(ev) {
				ev.stopPropagation();
				var personInfo = JSON.parse(gloabl.getCookie('allUserInfo')).user;
				var id = $(this).data('id');
				var UM0101 = personInfo.UM0101
				if (id != 0) {
					if (UM0101 == id) {
						_this.$store.dispatch('SWITCH_RIGHT', 'pinfo');
					} else {
						_this.$store.dispatch('SWITCH_RIGHT', 'card', id);
					}
				}
			});
		},

		filters: {
			filterAt(val) {
				var reg = /<at>([^<>]*),([^<>]*)<\/at>/gi;
				var result = val.toString().replace(reg, '<a href="javascript:;"  data-id="$1">$2</a>');
				return result;
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
							this.itemList.MSG00111 = 1;
						} else {
							gloabl.layer.msg('添加星标失败')
						}

					});
				} else {
					gloabl.makeSuperStar(item, type, loop => {
						if (loop) {
							this.itemList.MSG00111 = 0;
						} else {
							gloabl.layer.msg('添加星标失败')
						}
					})
				}
			},
			cancelMessage(item) {
				var newTime = Math.floor(+new Date()) / 1000;
				var oldTime = Date.parse(new Date(item.MSG00106)) / 1000;
				var timeEnd = newTime - oldTime;
				if (timeEnd <= 120) {
					var params = 'MSG00102=' + item.MSG00102 + '&MSG00104=' + item.MSG00104 + '&MSG00107=' + item.MSG00107 + '&MSG00101=' + item.MSG00101
					gloabl.fethAsync([URL.CANCEL_MESSAGE_URL], params, res => {
						if (res.success) {
							item.MSG00109 = '[消息已撤回]';
							item.isCancel = 0;
							this.$store.dispatch('MESSAGE_LIST', item)
						}
					})
				} else {
					gloabl.layer.msg('只能在发送信息两分钟之内撤回!')
				}
			}
		}
	}
</script>
