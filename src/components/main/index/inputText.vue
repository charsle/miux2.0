<template>

	<div class="m-text relative" id="m-text">
		<div class=" icon_function" style="overflow: hidden;">

			<a href="javascript:;" @click.prevent="clickEmoji"><i class="iconfont">&#xe608;</i></a>
			<input type="file" id="textfile" @change="textFileOnChange" style="display: none;" />
			<a href="javascript:;" @click="clickfile('img')"><i class="iconfont">&#xe609;</i></a>

			<a href="javascript:;" @click="clickfile('file')"><i class="iconfont">&#xe607;</i></a>
			<a href="javascript:;" v-if="nowCurrent.sendtype!=1"><i class="iconfont" @click="clickAt">&#xe606;</i></a>
		</div>
		<div class="col-lg-11 col-md-10">
			<textarea maxlength="300" placeholder="请输入文字内容，“Enter”键快捷发送，“Shift+Enter”键换行" id="text-custom-trigger" v-model="message" @keydown="keydownHandler($event)" @keyup="keyupHandler()"></textarea>
		</div>
		<div class="col-lg-1 col-md-2 tr">
			<a href="javascript:;" class="send_btn iconfont" @click="sendSingleMessage($event)">&#xe60d;</a>
		</div>
		<div class="atContent" v-show="isAtContent">
			<div class="atList" id="atList">
				<ul v-if="atItem!=null">
					<li v-for="item in atItem" @click="chooseAt(item.TM00301, item.TM00306);">
						<a href="javascript:;" v-cloak>
							<img :src="item.TM00321 | atImages" />
							<span class="fs14">{{item.TM00306}}</span>
							<span class="fs12">{{item.orgCname}}</span>
							<span class="fs12 light-grey">{{item.TM00322}}</span>
							<i class="line_circle green" v-if="item.isOnline==1"></i>
							<i class="line_circle grey" v-if="item.isOnline==0"></i>
						</a>
					</li>
				</ul>
				<ul v-else>
					<li><a href="javascript:;">暂无数据</a></li>
				</ul>
			</div>
			<div class="baseStyle" @click="chooseAt('0', '频道所有人')">
				<a href="javascript:;" class="top">
					<img src="../../../../static/images/people.png" />
					频道所有人</a>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import 'jquery-emoji-picker/css/jquery.emojipicker.css'
	import 'jquery-emoji-picker/css/jquery.emojipicker.tw.css'
	import {
		sendMessageInfo
	} from '../../../assets/js/websocket';
	import StringUtil from '../../../assets/js/stringUtil';
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	import {
		uploadAll
	} from '../../../assets/js/upload';
	require('jquery-emoji-picker/js/jquery.emojipicker');
	require('jquery-emoji-picker/js/jquery.emojis');
	export default {
		props: ['sessionList'],
		data() {
			return {
				message: '',
				type: '',
				isAtContent: false,
				atItem: null,
				aiteList: [],
				isEnter: '',
				isUserInfo: JSON.parse(gloabl.getCookie('allUserInfo')).user
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
			var _this = this;
			document.onclick = () => {
				this.isAtContent = false;
			}
			console.log(JSON.stringify(this.isUserInfo))
			$('#text-custom-trigger').focus();
		},
		filters: {
			atImages(val) {
				var _url = '';
				if (val == null || val == undefined || val == '') {
					_url = '../../../static/images/about.png';
				} else {
					_url = val;
				}
				return _url;
			}
		},
		methods: {
			/*
			 * 表情
			 */
			clickEmoji() {
				if ($('.emojiPicker').length == 0) {
					$('#text-custom-trigger').emojiPicker({
						width: '350px',
						height: '200px',
						position: 'top',
						button: false
					})
				}
				$('#text-custom-trigger').emojiPicker('toggle');
			},
			sendSingleMessage() {
				//this.message = this.message.substr(0, this.message.length - 1)
				var alist = this.aiteList;
				if (this.message.trim() && this.message.length <= 300) {
					var txt = this.message;
					for (var i = 0; i < alist.length; i++) {
						var alistname = alist[i].split('<at>');
						var atName = '<at>' + alistname[0] + ',' + alistname[1].substring(0, alistname[1].length - 1) + '</at>';
						txt = txt.replace(alistname[1], atName);
					}
					var p = this.sendParam(txt, alist.length > 0 ? 6 : 1);
					if (p != null) {
						if (this.nowCurrent.sendtype == 2) {
							this.getGroupDataList(data => {
								p.isShare = 0;
								p.docImg = data.TM00210;
								sendMessageInfo(p);
								this.message = '';
								this.aiteList = [];
							})
						} else {
							sendMessageInfo(p);
							this.message = '';
							this.aiteList = [];
						}

					}
				} else {
					gloabl.tipTools('您输入的消息为空，或者长度大于300', '#text-custom-trigger');
					return;
				}

			},
			/*
			 * 发送file
			 */
			clickfile(t) {
				this.type = t;
				$('#textfile').val('');
				var file = document.getElementById('textfile');
				//发送图片
				if (t == 'img') {
					file.removeAttribute("accept");
					file.setAttribute('accept', 'image/jpg,image/jpeg,image/png');
				} else {
					//发送文档
					file.removeAttribute("accept");
				}
				file.click();
			},
			//@频组成员人
			clickAt: function(e) {
				if (this.isAtContent) {
					this.isAtContent = false;
				} else {
					this.isAtContent = true;
					var ev = e || window.event;
					if (ev.stopPropagation) {
						ev.stopPropagation();
					} else if (window.event) {
						window.event.cancelBubble = true; //兼容IE
					}
					document.onclick = () => {
						this.isAtContent = false;
					}

					gloabl.fethAsync([URL.FIND_GROUP_NUM_URL], 'TM00506=' + this.nowCurrent.sendid + '&TMT01=1', res => {
						if (res.success) {
							this.atItem = res.result;
						} else {
							gloabl.tipTools("选择失败");
						}

					});
				}
			},
			/*
			 * 添加@信息
			 */
			chooseAt(id, name) {
				var old = this.message;
				if ((old.trim() && (old.length + name.length + 2) <= 300) || old.trim() == '') {
					var atName = '<at>' + id + ',@' + name + '</at>';
					this.message = old + '@' + name + ';';
					this.aiteList.push(id + '<at>@' + name + ';');
					$('#text-custom-trigger').focus();
				}

			},
			/*
			 * 编辑时候处理@信息
			 */
			keyupHandler(event) {
				if (this.nowCurrent.sendtype != 1) {
					if (this.message.substring(this.message.length, this.message.length - 1) == '@') {
						this.message = this.message.substring(0, this.message.length - 1);
					}
				}
				var txt = this.message.split('@');
				var alist = this.aiteList;
				var newAtList = [];
				//@+名字+‘；’比对list，实时更新list
				for (var i = 0; i < txt.length; i++) {
					if (i > 0) { //下表为0的不是@数据
						var atxt = '@' + txt[i].substring(0, txt[i].indexOf(';') + 1);
						for (var j = 0; j < alist.length; j++) {
							var alistname = alist[j].split('<at>');
							if (alistname[1] == atxt) {
								newAtList.push(alistname[0] + '<at>' + alistname[1]);
							}
						}
					}
				}
				this.aiteList = newAtList;
				if (this.isEnter)
					this.message = '';
			},
			/*
			 * 输入@弹出
			 */
			keydownHandler(event) {
				this.isEnter = false;
				var keyCode = event.keyCode;
				if (this.nowCurrent.sendtype != 1) {
					if (event.shiftKey && keyCode == 50) {
						this.clickAt();
						return false;
					}
				}
				if (event.shiftKey && keyCode == 13) {
					this.message = this.message + '\n';
					this.message = this.message.substr(0, this.message.length - 1);
				} else if (keyCode == 13) {
					this.isEnter = true;
					this.sendSingleMessage();
				}

				//				event.shiftKey

			},
			/*
			 * 发送消息参数
			 */
			sendParam(msg, type) {
				var time = StringUtil.dateFormat();
				var u_id = StringUtil.UUId(32);

				var params = {
					"UM0301": u_id,
					"MSG00101": u_id,
					"MSG00102": this.isUserInfo.UM0101,
					"MSG00103": this.isUserInfo.UM0102,
					"MSG00104": this.nowCurrent.sendid,
					"MSG00105": this.nowCurrent.name,
					"MSG00106": time,
					"MSG00107": this.nowCurrent.sendtype,
					"MSG00108": type,
					"MSG00109": msg,
					"MSG00110": this.isUserInfo.UM0111,
					"MSG00111": 0,
					"isSelf": 0
				};
				return params;

			},
			getGroupDataList(__callback) {
				gloabl.fethAsync([URL.SEARCH_GROUP_BASE_INFO_URL], 'TM00201=' + this.nowCurrent.sendid, res => {
					if (res.success) {
						__callback(res.result)
					}
				})
			},
			/*
			 * 上传改变事件中打开上传窗口
			 */
			textFileOnChange: function(ev) {
				var _this = this;
				var fileInfo = ev.target.files[0];
				//消息ID
				var msgId = StringUtil.UUId(32);
				//发送时间
				var DM00103 = StringUtil.dateFormat();
				//文件名称
				var fname = fileInfo.name;
				var DM00105 = fname.substring(0, fname.lastIndexOf('.'));
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
				var tag = _this.type == 'img' ? 1 : 2;
				uploadAll(tag, fileInfo, '', '', function(d) {
					if (d.data == null) {
						//layer.msg("文件上传失败");
						return;
					} else {
						//文件标识：上传文档之后由文档服务器生成的key
						var DM00110 = d.data.key;
						if (_this.type == 'img') {
							//图片
							gloabl.createThumbnail(1, DM00110, '', 0, 0, 30, function(r) {
								if (r.code != 0) {
									layer.msg("生成缩略图失败");
									return;
								}
								var txt = {
									key: DM00110,
									thumbnailKey: r.data.key,
									url: d.data.url,
									thumbnailURL: r.data.url
								};

								var p = _this.sendParam(JSON.stringify(txt), 2);
								if (p) {
									sendMessageInfo(p);
								}

							})
						} else {
							//文件
							var param = 'msgId=' + msgId + '&DM00103=' + DM00103 + '&DM00105=' + DM00105 + '&DM00106=' + DM00106 + '&DM00108=' + DM00108 + '&DM00109=' + DM00109 + '&DM00110=' + DM00110 + '&DM00112=' + DM00112 + '&DM00113=' + DM00113 + '&DM00116=' +
								DM00116 + '&DM00119=' + d.data.url;
							gloabl.fethAsync([URL.DOC_UPLOAD_URL], param, res => {
								if (res.success) {
									var result = res.result;
									result.MSG00111 = 0;
									result.isSelf = 0;
									result.MSG00110 = _this.isUserInfo.UM0111;
									result.UM0301 = result.MSG00101
									_this.$store.dispatch('MESSAGE_LIST', result);
									//_this.$store.dispatch('SEND_NEW_PERSON_LIST', result)
								} else {
									layer.msg("发送失败");
								}
							})
						}
					}
				});


			}
		}
	}
</script>
