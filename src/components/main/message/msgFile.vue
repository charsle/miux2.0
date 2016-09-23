<template>
	<div>
		<div class="main">
			<img class="avatar" class="fl" width="30" height="30" :src="itemList.MSG00110 | getUrl" />
			<div class="fl">
				<div class="msgName">{{itemList.MSG00103}}</div>
				<div class="msg_box share_box mt5 m{{itemList.MSG00101}}" id="share_box{{itemList.MSG00101}}">
					<h4 v-if="itemList.MSG00109.isShareDoc==0">文件上传</h4>
					<h4 v-else>文件分享</h4>
					<div class="col-xs-12 share_content">
						<div class="col-xs-2 fs48">
							{{{itemList.MSG00109.DM00106 | valideType}}}
						</div>

						<div class="col-xs-10 invite_content">
							<div class="col-xs-7 mt10">
								<p class="overflow nowrap">{{itemList.MSG00109.DM00105}}.{{itemList.MSG00109.DM00106}}</p>
								<p>{{itemList.MSG00109.DM00108 | fileSize}}</p>
							</div>
							<div class="col-xs-5 fs14 tr">
								<a href="javascript:;" class="btn btn-default mr10" @click="shareToGroup(itemList)"><i class="iconfont">&#xe636;</i></a>
								<a href="javascript:;" class="btn btn-default" @click="msgDownLoad(itemList.MSG00109.DM00110, itemList.MSG00109.DM00106);"><i class="iconfont">&#xe627;</i></a>
							</div>
						</div>
					</div>
				</div>
				<div class="fl more_choose">
					<div>{{itemList.MSG00106 | time}}</div>
					<div v-if="personInfo.UM0101==itemList.MSG00102">
					<div class="fl mr5 isStarShow{{itemList.MSG00101}}" v-if="itemList.MSG00111==1?true:false">
						<i class="iconfont fs13 star_color">&#xe60b;</i>
					</div>
					<div class="iconfont light-grey btn_more fs13" @click="showMake($event)">&#xe63d;</div>
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
		</div>
		<div class="clearfix"></div>
	</div>

</template>
<script type="text/javascript">
	import stringUtil from '../../../assets/js/stringUtil';
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'

	import {
		sendMessageInfo
	} from '../../../assets/js/websocket';

	export default {
		data() {
			return {
				personInfo: JSON.parse(gloabl.getCookie('allUserInfo')).user
			}
		},
		props: ['itemList'],
		ready() {
			document.body.onclick = () => {
				$('.msg_tips').hide();
			}
		},
		events: {
			'task-checked' (msg) {
				this.isCheck = msg;
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
						$('#share_box' + item.MSG00101).removeClass('share_box').addClass('text').html('该消息已撤回');
						//this.itemList.MSG00109 = '[该消息已撤回!]';
						this.cancelMsg = false;
					}
				})
			},
			/*
			 * 文件下载
			 */
			msgDownLoad: function(key, suffix) {
				//文档下载方法
				if (key != null) {
					gloabl.getFileDownToken(key, suffix);
				}
			},
			//分享
			shareToGroup: function(item) {
				//分享的数据
				gloabl.searchGroup(this);
				var self = this;
				gloabl.layer.open({
					type: 1,
					title: '文档分享',
					area: ['400px', '315px'],
					skin: '',
					content: $('#fileShareModel'),
				})
				this.$store.dispatch('SHARE_DOC_DATA', item.MSG00109)
			}

		}
	}
</script>
