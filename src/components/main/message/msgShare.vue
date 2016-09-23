<template>
	<div>
		<div class="main">
			<img class="avatar" class="fl" width="30" height="30" :src="itemList.MSG00110 | getUrl" />
			<div class="fl">
				<div class="msgName">{{itemList.MSG00103}}</div>
				<div class="msg_box share_box pointer mt5 m{{itemList.MSG00101}}" id="msg_box{{itemList.MSG00101}}">
					<div @click="personCard(itemList.MSG00109)">
					<!--<div v-if="itemList.MSG00109.TM00301!=personInfo.UM0101" @click="personCard('card',itemList.MSG00109.TM00301)">-->
					<h4>分享了一个名片</h4>
					<div class="col-xs-12 share_content invite_content">
						<div class="col-xs-1 card_header">
							<img class="avatar" :src="itemList.MSG00109.TM00321 | getUrl" />
						</div>
						<div class="col-xs-11 mt2 pl20">
							<div class="row">
								<b>{{itemList.MSG00109.TM00306}}</b>&nbsp;&nbsp;</span>
							</div>
							<div class="row mt2">
								<span v-if="itemList.MSG00109.TM00322!=''">{{itemList.MSG00109.TM00322}}</span>
								<span v-else>暂无职位</span>
							</div>
						</div>
					</div>
					</div>
					</div>
				<div class="fl more_choose">
					<div>{{itemList.MSG00106 | time}}</div>
					<div v-if="personInfo.UM0101==itemList.MSG00102">
						<div class="fl mr5" v-if="itemList.MSG00111==1?true:false">
							<i class="iconfont fs13 star_color">&#xe60b;</i>
						</div>
						<div class="iconfont light-grey btn_more fs13" @click="showMake($event)" v-if="cancelMsg">&#xe63d;</div>
						<div class="tip-popover bottom msg_tips">
							<div class="tip-popover-container">
								<a href="javascript:;" @click="cancelMessage(itemList,$index)" v-if="itemList.MSG00102 | isMySelf"><i class="iconfont">&#xe630;</i>&nbsp;撤回</a>
								<!--<a href="javascript:;" @click="markStar(itemList,1)" v-if="itemList.MSG00111==0?true:false"><i class="iconfont">&#xe60b;</i>&nbsp;星标收藏</a>
							<a href="javascript:;" @click="markStar(itemList,2)" v-if="itemList.MSG00111==1?true:false"><i class="iconfont">&#xe60b;</i>&nbsp;取消星标</a>-->
							</div>
						</div>
						<div class="clearfix"></div>
					</div>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
	</div>
</template>
<script type="text/javascript">
	//	import {
	//		switchRight
	//	} from '../../vuex/actions';
	import gloabl from '../../../api/globConfig'
	export default {
		props: ['itemList'],
		data() {
			return {
				cancelMsg: true,
				personInfo: {}
			}
		},
		ready() {
			gloabl.doResizeHeight();
			this.personInfo = JSON.parse(gloabl.getCookie('allUserInfo')).user;
			document.body.onclick = () => {
				$('.msg_tips').hide();
			}

		},
		methods: {
			personCard(item) {
				var id = this.personInfo.UM0101
				if (item.TM00301 == id) {
					this.$store.dispatch('SWITCH_RIGHT', 'pinfo');
				} else {
					this.$store.dispatch('SWITCH_RIGHT', 'card', item.TM00301);
				}
			},
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
			cancelMessage(item) {
				gloabl.allCancelMessage(item, (loop) => {
					if (loop) {
						$('#msg_box' + item.MSG00101).addClass('text').html('该消息已撤回');
						this.itemList.MSG00109 = '[该消息已撤回!]';
						this.cancelMsg = false;
					}

				})
			}
		},
		//		vuex: {
		//			actions: {
		//				personCard: switchRight
		//			}
		//		},

	}
</script>
�撤回!]'; this.cancelMsg = false; } }) } }, // vuex: { // actions: { // personCard: switchRight // } // }, }
</script>
