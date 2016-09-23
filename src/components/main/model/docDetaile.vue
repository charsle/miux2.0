<template>
	<div class="doc">
		<h1><a href="javascript:;" v-if="isParent" @click="currentRightTag(currentParentType)">
			<span class="glyphicon glyphicon-menu-left"></span>&nbsp;&nbsp;文档详情</a>
			<i v-else>文档详情</i>
			<span class="fr fs14 tabTitleColor"><i class="iconfont">&#xe64d;</i></span>
		</h1>
		<!-- {{detaileList | json}} -->
		<div class="col-xs-12 ptb20">
			<div class="col-xs-12">
				<div class="col-xs-2 d_headerPoto">
					<img :src="detaileList.url | getUrl" />
				</div>
				<div class="col-xs-10" v-cloak>
					<div class="row light-grey fs12">
						<div class="col-xs-10">
							{{detaileList.DM00111}}
						</div>
						<div class="col-xs-2 tr text-uppercase">
							{{detaileList.DM00108 | fileSize}}
						</div>
					</div>
					<div class="row fs14 docSizeColor mt5">
						{{detaileList.DM00105}}.{{detaileList.DM00106}}
					</div>
				</div>
			</div>
			<div id="docDetaile" class="col-xs-12" v-cloak>
				<div class="col-xs-12 detaileBox">
					<div v-if="detaileList.DM00106=='mp4'||detaileList.DM00106=='avi'||detaileList.DM00106=='rmvb'">
						<video :src="fileURL" controls="controls" width="250" preload="auto">
							您的浏览器不支持 video 标签。
						</video>
					</div>
					<div v-if="detaileList.DM00106=='wav'||detaileList.DM00106=='mp3'">
						<audio :src="fileURL" controls="controls" width="250" preload="auto">
							您的浏览器不支持 audio 标签。
						</audio>
					</div>

					<div v-if="detaileList.DM00106=='jpg'||detaileList.DM00106=='gif'||detaileList.DM00106=='bmp'||detaileList.DM00106=='png'">
						<img :src="fileURL" />
					</div>
				</div>
				<div class="col-xs-12 light-grey mt10">
					{{detaileList.DM00109}}
				</div>
				<div class="col-xs-12 mt10 light-grey fs12">
					@{{detaileList.DM00111}}&nbsp;&nbsp;{{detaileList.DM00103}}
				</div>
				<div class="col-xs-12 detaileBtn">
					<ul>
						<li @click="download(detaileList.DM00110,detaileList.DM00106)"><i class="iconfont fs18">&#xe627;</i>&nbsp;&nbsp;下载<span class="line">|</span></li>
						<li @click="doStar(detaileList)" v-if="isStar==0">
							<i class="iconfont fs18">&#xe60b;</i>&nbsp;&nbsp;星标
							<span class="line">|</span>
						</li>
						<li @click="cancleDoStar(detaileList.DM00101,isStar)" v-if="isStar==1">取消星标<span class="line">|</span></li>
						<li @click="doShare(detaileList)"><i class="iconfont fs18">&#xe636;</i>&nbsp;&nbsp;分享<span class="line">|</span></li>
						<li @click="deleteDoc" v-if="detaileList.DM00102==personInfo.UM0101"><i class="iconfont fs18">&#xe630;</i>&nbsp;&nbsp;删除</li>
						<li v-else class="light-grey delete_dd"><i class="iconfont fs18">&#xe630;</i>&nbsp;&nbsp;删除</li>
					</ul>
				</div>
				<div class="col-xs-12 mt20 ">
					<h4 class="light-grey fs14">评论</h4>
					<div v-for="list in commentList">
						<div class="col-xs-12 mt10">
							<div class="col-xs-2 d_headerPoto">
								<img :src="list.url | getUrl" width="50px" height="50" style="border-radius: 50%;" />
							</div>
							<div class="col-xs-10">
								<div class="row light-grey fs12">
									<div class="col-xs-6 nowrap overflow">
										{{list.DM00404}}
									</div>
									<div class="col-xs-6 tr text-uppercase">
										{{list.DM00406 | time}}
									</div>
								</div>
								<div class="row fs14 docSizeColor mt5">
									{{list.DM00405}}
								</div>
							</div>
							<div class="clearfix"></div>
						</div>
					</div>
				</div>
				<div class="col-xs-12 doc_discuss">
					<div class="col-xs-10">
						<textarea v-model="docComment" style="resize: none;" name="" maxlength="500" rows="1" cols="1" class="form-control addDiscuss" placeholder="添加评论"></textarea>
					</div>
					<div class="col-xs-2">
						<a href="javascript:;" class="btn btn-default fr" @click="addComment">评论</a>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>
<style type="text/css">
	.delete_dd,
	.delete_dd:hover {
		color: #ccc!important;
	}
</style>
<script type="text/javascript" charset="UTF-8">
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	import StringUtil from '../../../assets/js/stringUtil';
	import {
		sendMessageInfo
	} from '../../../assets/js/websocket';
	import stringUtil from '../../../assets/js/stringUtil';
	export default {
		data: function() {
			return {
				isParent: false,
				detaileList: '',
				docComment: '',
				items: '',
				isStar: '',
				fileURL: '',
				commentList: [],
				sstorage: window.sessionStorage,
				personInfo: JSON.parse(gloabl.getCookie('allUserInfo')).user
			}
		},
		vuex: {
			getters: {
				currentId: function(state) {
					return state.currentID;
				},
				currentParentType: (state) => state.currentParentType,
			}

		},
		computed: {
			isParent() {
				return this.currentParentType ? true : false
			}
		},
		ready() {
			gloabl.doResizeHeight();
			this.getDocDetaile();

		},
		methods: {
			currentRightTag() {
				this.$store.dispatch('SWITCH_RIGHT', this.currentParentType);
				this.sstorage.setItem('documentReturn', 1);
				this.sstorage.setItem('groupReturn', 1);
			},

			//文档详情查看接口
			getDocDetaile: function() {
				var params = 'DM00101=' + this.currentId;
				gloabl.fethAsync([URL.GET_DOCDETA_URL], params, res => {
					if (res.success) {
						this.detaileList = res.result.DM001;
						this.isStar = res.result.isStar;
						this.commentList = res.result.list;
						gloabl.getFileDownToken(this.detaileList.DM00110, this.detaileList.DM00106, (url) => {
							this.fileURL = url;
						});
					} else {
						var msg = res.msg != null ? res.msg : '查询失败'
						gloabl.tipTools(msg)
					}
				})
			},
			//添加评论
			addComment: function() {
				if (this.docComment == '') {
					gloabl.tipTools('评论不能为空');
					return;
				} else {
					var self = this;
					var params = 'DM00402=' + this.currentId + '&DM00405=' + this.docComment;
					gloabl.fethAsync([URL.DOC_COMMENT_URL], params, res => {
						if (res.success) {
							this.commentList.push(res.result);
							self.docComment = '';
						} else {
							gloabl.tipTools(res.msg)
						}
					})
				}
			},
			//文档下载方法
			download: function(key, type) {
				if (key != null) {
					gloabl.getFileDownToken(key, type);
				}
			},
			//添加星标
			doStar: function(item) {
				item.id = item.DM00101;
				item.forUserId = item.DM00102;
				item.starType = 5;
				var params = 'UMT17=' + JSON.stringify(item) + '&UMT19=1';
				gloabl.fethAsync([URL.ADD_START_URL], params, res => {
					if (res.success) {
						this.isStar = 1;
						gloabl.tipTools('星标成功')
					} else {
						gloabl.tipTools('星标失败')
					}
				})
			},
			//取消星标
			cancleDoStar: function(Sid, star) {
				var params = 'UMT11=' + Sid;
				gloabl.fethAsync([URL.DELETE_START_URL], params, res => {
					if (res.success) {
						this.isStar = 0;
						gloabl.tipTools('取消星标成功');
					} else {
						gloabl.tipTools('取消星标失败')
					}
				})
			},
			//分享
			doShare: function(item) {
				var self = this;
				gloabl.searchGroup(this);
				gloabl.layer.open({
					type: 1,
					title: '文档分享',
					area: '400',
					skin: '',
					content: $('#fileShareModel'),
				})
				this.$store.dispatch('SHARE_DOC_DATA', item)
			},
			//删除文档方法
			deleteDoc: function() {
				var self = this;
				gloabl.layer.open({
					type: 0,
					title: '系统提示',
					area: '400',
					skin: '',
					btn: ['确定', '取消'],
					content: `确定删除该文档吗？`,
					yes: function() {
						self.delDoc();
						gloabl.layer.closeAll();
					}
				})
			},
			//删除文档接口
			delDoc: function() {
				var params = 'DM00101=' + this.currentId + '&DM00110=' + this.detaileList.DM00110;
				gloabl.fethAsync([URL.DOC_DEL_URL], params, res => {
					if (res.success) {
						this.$store.dispatch('SWITCH_RIGHT', 'doc')
						gloabl.tipTools('删除成功')
					} else {
						gloabl.tipTools('删除失败')
					}

				})
			},
		}
	}
</script>
