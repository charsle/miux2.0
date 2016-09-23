<template>
	<div class="tab_doc">
		<h1>
			<a href="javascript:;" @click="currentRightTag('group')">
				<span class="glyphicon glyphicon-menu-left"></span>
				频组-群组文档库
				</a>
			<span class="fr fs14 tabTitleColor"><i class="iconfont">&#xe64d;</i></span>
		</h1>
		<div class="col-xs-12 commen_tab doc_tabWidth">
			<div class="tab_left">
				<ul class="nav nav-tabs" role="tablist">
					<li class="right0 radTL3" style="width: 50%;">
						<a href="javascript:;" v-cloak>{{groupFileObj.TM00206}}</a>
					</li>
					<li class="radRB3" style="width: 50%;">
						<a href="javascript:;" @click="getGroupPeo">
							{{groupPeo}}&nbsp;&nbsp;&nbsp;<i class="glyphicon glyphicon-triangle-bottom"></i>
						</a>
					</li>
					<div class="tip-popover bottom pop_peo" v-show="isGroupShow">
						<div class="tip-popover-content">
							<div class="p10">
								<i class="iconfont search_basic search_icon">&#xe613;</i>
								<input class="search_peo" type="text" name="" v-model="groupSearch" id="" @keyup="getSearch" @keyup.enter="searchGroupAuthor" placeholder="搜索..." />
								<i class="iconfont search_basic del_icon" id="groupDelIcon" @click="clearSerText">&#xe60c;</i>
							</div>
							<div class="p10 pointer hoverBasic" @click="groupUpPeo(0)">
								<div class="row fs14">所有人</div>
								<div class="row fs10 light-grey">共{{groupTotalFile.total}}个文件</div>
							</div>
							<div id="group_pop">
								<a href="javascript:;" v-for="author in authorItem | filterBy groupSearch in 'DM00113'" @click="groupUpPeo(1,author.DM00102,author.DM00113)">
									<img :src="author.url | getUrl" /><span v-text="author.DM00113"></span>
								</a>
							</div>
						</div>
					</div>
				</ul>
			</div>
			<div class="tab_right">
				<input type="file" id="fileUpLoad" style="display: none;" />
				<a class="radius3" href="javascript:;" @click="upFileGroup"><i class="iconfont">&#xe628;</i>&nbsp;&nbsp;上传</a>
			</div>
			<div class="clearfix"></div>
		</div>
		<div class="tab-content mt10 col-xs-12" id="groupFiles">
			<doc-type :item.sync='groupFiles' :filetype='filegroup'></doc-type>
			<div id="groupFileMore" class="light-blue pointer tc mt15" v-if="groupTotalFile.total !== 0" @click="groupFileMore">
				{{moreGroupFile}}
			</div>
		</div>

	</div>
</template>
<script type="text/javascript">
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	import fileModel from './fileModel';
	import docType from './docType';
	import {
		uploadAll
	} from '../../../assets/js/upload';
	import stringUtil from '../../../assets/js/stringUtil';
	import {
		sendMessageInfo
	} from '../../../assets/js/websocket';
	export default {

		data() {
			return {
				groupPeo: '所有人',
				isGroupShow: false,
				groupFiles: '',
				groupSearch: '',
				groupTotalFile: '',
				authorItem: '',
				nullGroupData: '',
				moreGroupFile: '加载更多',
				grFilePage: 1,
				filetype: 2,
				groupFileObj: '',
				params: {
					DM00112: 2,
					DM00113: '',
					TM00506: '',
					DM00102: '',
					pageSize: 10
				},
				sstorage: window.sessionStorage
			}
		},
		ready() {
			gloabl.doResizeHeight();
			this.groupFileObj = JSON.parse(gloabl.getCookie('slingeGroupInfo'));
			if (this.sstorage.getItem('groupReturn') == 1) {
				this.sstorage.setItem('groupReturn', 0);
				this.params = JSON.parse(this.sstorage.getItem('groupParam'));
			} else {
				this.params.DM00113 = this.groupFileObj.TM00201;
			}
			this.getGroupFile();
			this.fileOpenChange();
		},
		methods: {
			currentRightTag(type) {
				this.$store.dispatch('SWITCH_RIGHT', type);
			},
			//查询文件列表
			getGroupFile() {
				this.sstorage.setItem("groupParam", JSON.stringify(this.params));
				if (this.groupPeo == '所有人') {
					this.params.DM00102 = '';
				}
				var p = 'DM00112=' + this.params.DM00112 + '&DM00113=' + this.params.DM00113 + '&TM00506=' + this.params.TM00506 + '&DM00102=' + this.params.DM00102 + '&pageSize=' + this.params.pageSize + '&page=1';
				gloabl.fethAsync(URL.DOC_LIST_URL, p, res => {
					if (res.success) {
						this.groupFiles = res.result;
						self.docList = res.result;
						if (res.result.nums == res.result.pageList.length) {
							$('#groupFileMore').hide();
						} else {
							$('#groupFileMore').show();
							self.moreDoc = '加载更多';
						}
					} else {
						gloabl.tipTools('连接失败');
						return;
					}
					return;
				})
			},
			//查询文档上传者
			getGroupPeo(e) {
				this.isGroupShow = true;
				var self = this;
				var param = 'TM00506=' + self.groupFileObj.TM00201;
				gloabl.fethAsync([URL.DOC_PER_URL], param, res => {
					if (res.success) {
						self.authorItem = res.result.list;
						self.groupTotalFile = res.result;
					} else {
						tipTools(res.msg);
						return;
					}
				})
			},
			//查询当前选择人员文档列表
			groupUpPeo(isType, currentId, currentName) {
				this.groupPeo = currentName;
				if (isType == 0) {
					this.params.DM00113 = this.groupFileObj.TM00201;
					this.groupPeo = '所有人';
					this.getGroupFile();
				} else {
					this.params.DM00113 = this.groupFileObj.TM00201;
					this.params.DM00102 = currentId;
					this.getGroupFile();
				}
				this.isGroupShow = false;
			},
			//搜索文档上传者回车事件
			searchGroupAuthor() {

			},
			//清除搜索框
			clearSerText() {
				this.groupSearch = '',
					$('#groupDelIcon').hide();
			},
			getSearch() {
				$('#groupDelIcon').show();
			},
			//上传
			upFileGroup() {
				$('#fileUpLoad').val('');
				$('#fileRemark').val('');
				$('#groupSelectedUpload').val('');
				$('#fileUpLoad').click();
			},
			/*
			 * 发送消息
			 */
			sendFileMsg(param, DM00112) {
				gloabl.fethAsync([URL.DOC_UPLOAD_URL], param, res => {
					if (res.success) {
						gloabl.layer.msg("文件上传成功");
						this.params.DM00113 = this.groupFileObj.TM00201;
						this.getGroupFile();
						setTimeout(function() {
							gloabl.layer.closeAll();
						}, 1000);
						if (DM00112 == 2) {
							this.$store.dispatch('MESSAGE_LIST', res.result);
						}
					}
				})

			},
			//上传打开窗口
			fileOpenChange: function() {
				var _this = this;
				$('#fileUpLoad').change(function() {
					gloabl.layer.open({
						type: 1,
						title: '文件上传',
						area: '400',
						skin: '',
						btn: ['确定', '取消'],
						content: $('#fileShareModel'),
						yes: function() {
							var fileInfo = document.getElementById("fileUpLoad").files[0];
							//消息ID
							var msgId = stringUtil.UUId(32);
							//发送时间
							var DM00103 = stringUtil.dateFormat();
							//文件名称
							var DM00105 = $('#fileName').val();
							//文件后缀
							var DM00106 = _this.DM00106;
							//文件大小
							var DM00108 = fileInfo.size;
							//文件描述
							var DM00109 = $('#fileRemark').val();
							//对话对象id
							var DM00113 = $('#groupSelectedUpload').val();
							//对话类型
							var DM00112 = DM00113 == '' ? '' : 2;

							//对话对象名称
							var DM00116 = DM00113 == '' ? '' : $("#groupSelectedUpload").find("option:selected").text();
							uploadAll(2, fileInfo, '', '', function(d) {
								if (d.data == null) {
									gloabl.layer.msg("文件上传失败");
									setTimeout(function() {
										gloabl.layer.closeAll();
									}, 1000);
									return;
								}
								//文件标识：上传文档之后由文档服务器生成的key
								var DM00110 = d.data.key;
								//缩略图key
								var DM00117 = '';
								//缩略图URL
								var DM00118 = '';
								var DM00119 = d.data.url;

								if (stringUtil.ifImg(DM00106)) {
									gloabl.getFileUploadToken(DM00105, DM00108, d.data.mimetype, d.data.checksum, function(token) {
										gloabl.createThumbnail(2, DM00110, token, 0, 0, 30, function(r) {
											if (r.code != 0) {
												layer.msg("生成缩略图失败");
												return;
											}
											DM00117 = r.data.key;
											DM00118 = r.data.url;
											var param = 'msgId=' + msgId + '&DM00103=' + DM00103 + '&DM00105=' + DM00105 + '&DM00106=' + DM00106 + '&DM00108=' + DM00108 + '&DM00109=' + DM00109 + '&DM00110=' + DM00110 + '&DM00112=' + DM00112 + '&DM00113=' + DM00113 +
												'&DM00116=' + DM00116 + '&DM00117=' + DM00117 + '&DM00118=' + DM00118 + '&DM00119=' + DM00119;
											_this.sendFileMsg(param, DM00112);
										})
									});
								} else {
									var param = 'msgId=' + msgId + '&DM00103=' + DM00103 + '&DM00105=' + DM00105 + '&DM00106=' + DM00106 + '&DM00108=' + DM00108 + '&DM00109=' + DM00109 + '&DM00110=' + DM00110 + '&DM00112=' + DM00112 + '&DM00113=' + DM00113 +
										'&DM00116=' + DM00116 + '&DM00117=' + DM00117 + '&DM00118=' + DM00118 + '&DM00119=' + DM00119;
									_this.sendFileMsg(param, DM00112);
								}

							});

						}

					})
					_this.$store.dispatch('SHARE_DOC_DATA', '');
					var array = document.getElementById("fileUpLoad").files[0];
					var fname = array.name;
					$('#fileName').val(fname.substring(0, fname.lastIndexOf('.')));
					_this.DM00106 = fname.substring(fname.lastIndexOf('.') + 1, fname.length);
					$('#fileSize').html(stringUtil.formatSize(array.size));
				})
			},
			//分页
			groupFileMore() {
				this.grFilePage = this.grFilePage + 1;
				this.params.pageSize = this.grFilePage * 10;
				this.getGroupFile();
			}
		},
		components: {
			docType
		}
	}
</script>
