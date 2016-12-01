<template>
	<div class="row">
		<div class="dialog-content col-md-12" style="padding:10px;">
			<div style="padding-top:10px;">
				<input type="text" class="form-control" maxlength="54" v-model="teamNoticeTitle" id="teamNoticeTitle" name="teamNoticeTitle" placeholder="标题" />
			</div>
			<div style="padding-top:10px;">
				<div id="textarea1"  placeholder="正文" style="width:755px;height:240px;"></div>
			</div>
			<div class="clearfix"></div>
		</div>
		<div class="col-md-12 plr10" style="height: 85px;">
			<div class="" v-if="uploadFileList.length>0">
				<div class="col-md-12 bottom lh30 fs12" v-cloak>
					附件&nbsp;&nbsp;<span class="light-grey">({{uploadFileList.length}}个)</span>
				</div>
				<div class="col-md-12 bottom">
					<div class="col-md-4" v-for="item in uploadFileList" v-cloak>
						<div class="col-md-2 fs36">
							{{{item.type | valideType}}}
						</div>
						<div class="col-md-10 mt10">
							<div class="row">
								<div class="col-xs-6 overflow nowrap">
									{{item.attName}}
								</div>

								<div class="col-xs-4 tr">
									<a href="javascript:;" class="light-blue" @click="deleteNoticeUpload(item)">删除</a>
								</div>
							</div>
							<div class="row light-grey">
								<!--<div class="col-md-10 mt5">
									<div class="progress">
										<div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%">
											<span class="sr-only">20% Complete</span>
										</div>
									</div>
								</div>
								<div class="col-md-2 tr fs10">
									20%
								</div>-->
								{{item.size | fileSize}}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-12 mt15 pl10 pr10 text-right">
			<span class="light-blue pull-left pointer" @click="uploadNoticeAttach">
				上传附件
				<input type="file" name="" class="upLoadNotice" style="display:none;" id="noticeFile" @change="fileOnChagne"/>
			</span>
			<span class="btn btn-default light-blue" @click="subimitNotice">确定</span>
			<span class="btn btn-default light-blue" @click="cancelNotice">取消</span>
		</div>
	<input type="file" name="" id="editor_file" value="" style="display:none" accept="image/jpg,image/jpeg,image/png" @change="editorFiles"/>
	</div>
</template>

<script type="text/javascript">
	import {
		sendMessageInfo
	} from '../../../assets/js/websocket';
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	import StringUtil from '../../../assets/js/stringUtil';
	import wangEditor from 'wangEditor'
	import {
		uploadAll
	} from '../../../assets/js/upload';
	export default {
		data() {
			return {
				ue: null,
				teamNoticeTitle: '',
				uploadFileList: [],
				urlImg: ''
			}
		},
		vuex: {
			getters: {
				nowCurrent(state) {
					return state.threads;
				}
			}
		},
		ready() {


			this.editor = new wangEditor('textarea1');
			this.editor.config.menus = [
				'source',
				'|',
				'bold',
				'underline',
				'italic',
				'|',
				'quote',
				'fontfamily',
				'fontsize',
				'unorderlist',
				'orderlist',
				'alignleft',
				'aligncenter',
				'alignright',
				'|',
				'img',
				'table',
				'|',
				'undo',
				'redo',
				'fullscreen'
			]
			this.editor.config.customUpload = true;
			this.editor.config.customUploadInit = this.uploadInit;
			this.editor.create();

		},
		methods: {
			editorFiles(ev) {
				uploadAll(1, ev.target.files[0], '', '', (data) => {
					console.log(data.data.url);
					this.editor.$txt.append('<p><img src="' + data.data.url + '" style="max-width:100%;"/></p>');
				})

			},
			uploadInit() {
				var btnId = this.editor.customUploadBtnId;
				var containerId = this.editor.customUploadContainerId;
				$('#' + containerId).click(function() {
					var e_files = document.getElementById('editor_file');
					e_files.value = '';
					e_files.click();
				})

				return;
			},
			uploadNoticeAttach() {
				var noticeFile = document.getElementById('noticeFile');
				noticeFile.value = '';
				console.log(noticeFile.value);
				noticeFile.click()
			},
			subimitNotice() {

				var title = this.teamNoticeTitle;
				var text = this.editor.$txt.html();

				if (title.length > 54) {
					gloabl.tipTools('标题长度不能超过54个字！');
					return;
				}
				if (this.editor.$txt.text().length > 768) {
					gloabl.tipTools('文本长度不能超过768个字！', {
						time: 2000
					});
					return;
				}
				if (title == "" && this.editor.$txt.text()) {
					gloabl.tipTools('请至少输入标题或正文，且不能为全空格！');
					return;
				}
				var imgs = this.editor.$txt.find('img'),
					src = '';
				console.log(imgs.length);
				var contentWord = '';
				if (imgs.length == 0) {
					src = '';
				} else {
					src = imgs[0].src
				}
				if (this.editor.$txt.text().length > 200) {
					contentWord = this.editor.$txt.text().substring(0, 200) + '...'
				} else {
					contentWord = this.editor.$txt.text();
				}
				this.noticeSendData(title, text, src, contentWord)
			},
			deleteNoticeUpload(item) {
				this.uploadFileList.$remove(item);
			},
			noticeSendData(title, text, img, contentWord) {
				var time = StringUtil.dateFormat();
				var u_id = StringUtil.UUId(32);
				var personList = JSON.parse(gloabl.getCookie('allUserInfo')).user;
				var notice_data = {
					"title": title,
					"content": text,
					"userName": personList.UM0102,
					"attachment": this.uploadFileList,
					"image": img,
					"contentWord": contentWord
				}
				var params = {
					"MSG00101": u_id,
					"MSG00102": personList.UM0101,
					"MSG00103": personList.UM0102,
					"MSG00104": this.nowCurrent.sendid,
					"MSG00105": this.nowCurrent.name,
					"MSG00106": time,
					"MSG00107": this.nowCurrent.sendtype,
					"MSG00108": 10,
					"MSG00109": JSON.stringify(notice_data),
					"MSG00110": personList.UM0111,
					"isSelf": 0
				};
				sendMessageInfo(params);
				this.teamNoticeTitle = '';
				this.editor.$txt.html('');
				this.uploadFileList = [];
				setTimeout(() => {
					layer.closeAll();
				}, 60)
			},
			cancelNotice() {
				this.teamNoticeTitle = '';
				this.editor.$txt.html('');
				this.uploadFileList = [];
				gloabl.layer.closeAll();
			},
			fileOnChagne(ev) {
				var _this = this;

				var fileInfo = ev.target.files[0],
					fname = fileInfo.name,
					img = new Image();
				if (window.URL) {
					this.urlImg = img.src = window.URL.createObjectURL(fileInfo);
				} else if (window.FileReader) {
					var reader = new FileReader();
					reader.readAsDataURL(fileInfo);
					this.urlImg = img.src;
				}
				if (this.urlImg != null) {
					if (_this.uploadFileList.length > 2) {
						gloabl.tipTools('上传个数上限为3个');
						return;
					}
					//消息ID
					var msgId = StringUtil.UUId(32);
					//发送时间
					var DM00103 = StringUtil.dateFormat();
					//文件名称
					var DM00105 = fname.substring(0, fname.lastIndexOf('.'));
					// if (StringUtil.isSafe(DM00105)) {
					// 	layer.msg("文件名称存在非法字符");
					// 	return false;
					// }
					//文件后缀
					var DM00106 = fname.substring(fname.lastIndexOf('.') + 1, fname.length);
					//文件大小
					var DM00108 = fileInfo.size;
					//文件描述
					var DM00109 = '';
					//对话类型
					var DM00112 = _this.nowCurrent.sendtype;
					//对话对象id
					var DM00113 = _this.nowCurrent.sendid;
					//对话对象名称
					var DM00116 = _this.nowCurrent.name;
					uploadAll(1, fileInfo, '', '', function(d) {
						//						d.data.url,//图片url
						var fileObj = {};
						fileObj.attName = fname;
						fileObj.key = d.data.key;
						fileObj.size = DM00108;
						fileObj.type = DM00106;
						fileObj.url = d.data.url;

						_this.uploadFileList.push(fileObj)
						if (d.data == null) {
							//	layer.msg("文件上传失败");
							return;
						}
						//文件标识：上传文档之后由文档服务器生成的key
						var DM00110 = d.data.key;
						if (StringUtil.ifImg(DM00106)) {
							//图片
							gloabl.createThumbnail(DM00110, '', 0, 0, 30, function(r) {
								if (r.code != 0) {
									gloabl.tipTools("生成缩略图失败");
									return;
								}
							})
						} else {
							//文件
							var param = 'msgId=' + msgId + '&DM00103=' +
								DM00103 + '&DM00105=' + DM00105 + '&DM00106=' +
								DM00106 + '&DM00108=' + DM00108 + '&DM00109=' +
								DM00109 + '&DM00110=' + DM00110 + '&DM00112=' +
								DM00112 + '&DM00113=' + DM00113 + '&DM00116=' +
								DM00116 + '&DM00119=' + d.data.url;
							gloabl.fethAsync([URL.DOC_UPLOAD_URL], param, res => {
								if (res.success) {
									//										_this.$store.dispatch('MESSAGE_LIST', res.result);
								} else {
									gloabl.tipTools("发送失败");
								}
							})
						}

					});

				}
			},
		}

	}
</script>
