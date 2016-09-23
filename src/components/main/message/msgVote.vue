<template>
	<div>
		<div class="main">
			<img class="avatar" class="fl" width="30" height="30" :src="itemList.MSG00110 | getUrl" />
			<div class="fl maxWidth90">
				<div class="msgName">{{itemList.MSG00103}}</div>
				<div class="msg_box notice mt5 m{{itemList.MSG00101}}" id="notice{{itemList.MSG00101}}">
					<div class="panel panel-default">
						<div class="panel-body">
							<h4 class="p10">{{itemList.MSG00109.VM00102}}</h4>
							<table class="table singleAll">
								<tr v-for="item in itemList.MSG00109.VM002List">
									<td width="5%" class="s_option pl10" v-if="itemList.MSG00109.isVoted==0">
										{{item.VM00204}}
									</td>
									<td width="10%" class="pl10" v-else>
										<i class="iconfont fs14 light-blue" v-if="item.isSelected==1">&#xe63c;</i>
										<i class="iconfont fs14 light-grey" v-else>&#xe63c;</i>&nbsp;&nbsp;{{item.VM00204}}
									</td>
									<td width="90%" class="relative" v-if="itemList.MSG00109.isVoted==0">
										<div class="progressBar" style="top: 7px;"></div>
										<div class="progressLength" style="top: 7px;width: 0;"></div>
										<div class="voteText" style="top: 7px;">{{item.VM00203}}</div>
									</td>
									<td width="85%" class="relative" v-else>
										<div class="progressBar" style="top: 2px;"></div>
										<div class="progressLength" :style="{top: 2+'px',width: item.percent*100+'%'}"></div>
										<div class="voteText" style="top: 2px;">{{item.VM00203}}</div>
									</td>
									<td width="5%" class="tc light-blue chooseVote">
										<span v-if="itemList.MSG00109.isVoted==0">
									<i class="fs20 iconfont singleC pointer" alt="0" v-if="itemList.MSG00109.VM00103==1" @click.stop="chooseVote($event,itemList.MSG00109.VM00103,item.VM00201)">&#xe645;</i>
									<i class="fs20 iconfont moreC pointer" alt="0" v-if="itemList.MSG00109.VM00103==2" @click.stop="chooseVote($event,itemList.MSG00109.VM00103,item.VM00201)">&#xe644;</i>
								</span>
										<span v-else>
									{{item.VM00205}}
								</span>
									</td>
								</tr>

							</table>
						</div>
						<div class="panel-footer">
							<span class="inlineblock fl lh30">
						    由<a href="javascript:;" class="light-blue" @click="currentRightTag(itemList.MSG00102)">{{itemList.MSG00103}}</a>
						    发布于{{itemList.MSG00106}}
						</span>
							<span v-if="itemList.MSG00109.isVoted==0">
						<a href="javascript:;" class="btn btn-primary btn-sm fr" @click="subVote($event,itemList.MSG00101, itemList.MSG00109);">确定</a>
						</span>
							<span v-else>
						<a href="javascript:;" class="btn btn-success  btn-sm fr" @click="refreshVote(itemList.MSG00101, itemList.MSG00109.VM00101);">刷新</a>
						</span>
							<div class="clearfix"></div>
						</div>
					</div>

				</div>
				<div class="fl more_choose">
					<div>{{itemList.MSG00106 | time}}</div>
					<div v-if="personInfo.UM0101==itemList.MSG00102">
						<div class="fl mr5" v-if="itemList.MSG00111==1?true:false">
							<i class="iconfont fs18 star_color">&#xe60b;</i>
						</div>
						<div class="iconfont light-grey btn_more fs13" @click="showMake($event)" v-if="cancelMsg">&#xe63d;</div>
						<div class="tip-popover bottom msg_tips">
							<div class="tip-popover-container">
								<a href="javascript:;" @click="cancelMessage(itemList,$index)" v-if="itemList.MSG00102 | isMySelf"><i class="iconfont">&#xe630;</i>&nbsp;撤回</a>
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
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	export default {
		props: ['itemList'],
		data() {
			return {
				cancelMsg: true,
				allChooseList: [],
				personInfo: JSON.parse(gloabl.getCookie('allUserInfo')).user
			}
		},
		ready() {
			document.body.onclick = () => {
				$('.msg_tips').hide();

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
			cancelMessage(item) {
				gloabl.allCancelMessage(item, (loop) => {
					if (loop) {
						$('#notice' + item.MSG00101).removeClass('notice').addClass('text').html('该消息已撤回');
						//this.itemList.MSG00109 = '[该消息已撤回!]';
						this.cancelMsg = false;
					}
				})
			},
			/*
			 * 点击投票选项
			 * type: 1单选，2多选
			 */
			chooseVote(ev, type, sid) {
				var txt = $(ev.currentTarget);
				var id = txt.attr('alt');
				if (type == 1) {
					txt.closest('.singleAll').find('.singleC').html('&#xe645;').attr('alt', '0');
					txt.html('&#xe63c;');
					txt.attr('alt', '1');
				} else {
					if (id == 0) {
						txt.html('&#xe643;');
						txt.attr('alt', '1');
					} else {
						txt.html('&#xe644;');
						txt.attr('alt', '0');
					}
				}
			},
			/*
			 * 提交投票
			 */
			subVote(ev, msgId, MSG00109) {
				var VM00201List = [];
				$(ev.currentTarget).closest('.msg_box').find('table tr').each(function(index) {
					var obj = {};
					var id = $(this).find('.chooseVote i').attr('alt');
					if (id == 1) {
						obj.VM00201 = MSG00109.VM002List[index].VM00201;
						VM00201List.push(obj);
					}

				});
				var params = 'msgId=' + msgId + '&VM00201List=' + JSON.stringify(VM00201List) + '&VM00101=' + MSG00109.VM00101;
				if (VM00201List.length != 0) {
					gloabl.fethAsync(URL.CHOOSE_VOTE_URL, params, res => {
						if (res.success) {
							this.itemList.MSG00109 = res.result;
						} else {
							if (res.error == 0) {
								gloabl.tipTools(res.msg);
								this.refreshVote(msgId, MSG00109.VM00101);
							} else {
								gloabl.layer.msg(res.msg);
							}
						}
					})
				} else {
					gloabl.tipTools('请选择选项!');
				}

			},
			refreshVote(msgId, VM00101) {
				gloabl.fethAsync(REFRESH_VOTE_URL, 'msgId=' + msgId + '&VM00101=' + VM00101, res => {
					this.itemList.MSG00109 = res.result;
				})
			},
			currentRightTag(id) {
				var UM0101 = this.personInfo.UM0101
				if (UM0101 == id) {
					_this.$store.dispatch('SWITCH_RIGHT', 'pinfo');
				} else {

					_this.$store.dispatch('SWITCH_RIGHT', 'card', id);
				}

			}
		}

	}
</script>
