<template>
	<div>
		<div class="main">
			<img class="avatar" class="fl" width="30" height="30" :src="itemList.MSG00110 | getUrl" />
			<div class="fl">
				<div class="msgName">{{itemList.MSG00103}}</div>
				<div class="msg_box notice m{{itemList.MSG00101}}">
					<div class="panel panel-default">
						<div class="panel-body noticePub">
							<h4>频道公告</h4>
							<hr />
							<div class="row lh18 mt10">
								{{{itemList.MSG00109}}}
							</div>
						</div>
						<div class="panel-footer relative">
							由
							<a href="javascript:;" class="light-blue">{{itemList.MSG00103}}</a>发布于{{itemList.MSG00106}}
							<div class="fileContent" v-if="isAttachment">
								<ul>
									<li v-for="list in itemList.MSG00109.attachment">
										<a href="javascript:;" @click="downloadFile(list.key, list.type)">

											<div class="col-md-2 fs36">
												{{{list.type | valideType}}}
											</div>
											<div class="col-md-10 pl10 mt10">
												<div class="row">
													<div class="col-xs-10 overflow nowrap">
														{{list.attName}}
													</div>
												</div>
												<div class="row light-grey">
													{{list.size | fileSize}}
												</div>
											</div>
											<div class="clearfix"></div>
										</a>
									</li>
								</ul>
							</div>

							<a href="javascript:;" class="fr tipNotcie" v-if="isAttachment" @click="showUploadList($event)">
								<i class="iconfont fs18">&#xe611;</i>
							</a>
							<div class="clearfix"></div>

						</div>
					</div>

				</div>
				<div class="fl more_choose">
					<div>{{itemList.MSG00106 | time}}</div>
					<!--<div class="fl mr5" v-if="itemList.MSG00111==1?true:false">
						<i class="iconfont fs18 star_color">&#xe60b;</i>
					</div>
					<div class="iconfont light-grey btn_more fs13" @click="showMake($event)" v-if="cancelMsg">&#xe63d;</div>
					<div class="tip-popover bottom msg_tips">
						<div class="tip-popover-container">
							<a href="javascript:;" @click="cancelMessage(itemList,$index)" v-if="itemList.MSG00102 | isMySelf"><i class="iconfont">&#xe630;</i>&nbsp;撤回</a>
						</div>
					</div>   -->
					<div class="clearfix"></div>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import gloabl from '../../../api/globConfig'
	export default {
		props: ['itemList'],
		data() {
			return {
				cancelMsg: true
			}
		},

		ready() {
			gloabl.doResizeHeight();
			document.body.onclick = () => {
				$('.msg_tips').hide();
			}

		},
		computed: {
			isAttachment() {
				if (this.itemList.MSG00109.attachment != undefined) {
					return this.itemList.MSG00109.attachment.length > 0 ? true : false;
				};

			}
		},
		methods: {
			showMake(ev) {
				var curr = $(ev.currentTarget);
				var currTarget = curr.siblings('.msg_tips');
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
			showUploadList(ev) {
				$(ev.currentTarget).siblings('.fileContent').toggle();
			},
			downloadFile(fileKey, type) {
				gloabl.getFileDownKey(fileKey, type);
			},
			cancelMessage(item) {
				gloabl.allCancelMessage(item, (loop) => {
					if (loop) {
						this.itemList.MSG00109 = '[该消息已撤回!]';
						this.cancelMsg = false;
					}

				})
			}
		},
	}
</script>
