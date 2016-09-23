<template>
	<div class="PopUpManager-content notice_content">
		<div class="w100 relative">
			<span><input class="form-control pr30 pl10" type="text" placeholder="请输入投票主题" @keyup="interword($event)" name="" id="voteTitle" v-model="title" /></span>
			<span class="let-empty-title" v-if="showDel" @click="deleteTitle"><i class="iconfont">&#xe654;</i></span>
		</div>
		<div class="w100 mt10 notice_row" v-for="item in noticeItem">
			<span class="w90 fl block"><input type="text" class="form-control" placeholder="输入选项内容" maxlength="64" name="options" id="" value="" /></span>
			<span class="w10 fr block tc"><i class="mt10 pointer iconfont" @click="removeCurr(item)">&#xe654;</i></span>
			<div class="clearfix"></div>
		</div>
		<div class="w90 mt20 preve_div">
			<div class="fl add_btn_notice">
				<a href="javascript:;" class="block" @click="addChooseItem" v-show="isAddItem">
					<span class="block fl"><i class="iconfont light-blue fs20">&#xe62c;</i></span>
					<span class="add_row_notice light-blue fs14 block fl pt3 ml10">增加选项</span>
				</a>
			</div>
			<div class="fr">
				<a href="javascript:;" class="block fl" @click="singleChoose">
					<span class="block fl"><i class="iconfont fs20">{{{sligeBox}}}</i></span>
					<span class="fs14 dark-gray block fl pt3 ml10">单选</span>
				</a>
				<a href="javascript:;" class="block fl ml20" @click="moreChoose">
					<span class="block fl"><i class="iconfont fs20">{{{moreBox}}}</i></span>
					<span class="fs14 dark-gray block fl pt3 ml10">多选</span>
				</a>
			</div>
			<div class="clearfix"></div>
		</div>
		<div class="layer-footer text-right p15">
			<a href="javascript:;" class="btn btn-primary" @click="sendVoteSubmit">确定</a>
			<a href="javascript:;" class="btn btn-default" @click="cancelLayer">取消</a>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {
		sendMessageInfo
	} from '../../../assets/js/websocket';
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	import StringUtil from '../../../assets/js/stringUtil';
	export default {

		vuex: {
			getters: {
				nowCurrent(state) {
					return state.threads;
				}
			}
		},
		data() {
			return {
				chooseVal: 1,
				title: '',
				showDel: false,
				isAddItem: true,
				sligeBox: '&#xe63c;',
				moreBox: '&#xe644;',
				chooseType: 1,
				noticeItem: [{
					name: ''
				}, {
					name: ''
				}],
			}
		},
		methods: {
			deleteTitle() {
				this.title = '';
				this.showDel = false;
			},
			interword() {
				if (this.title != '') {
					this.showDel = true;
				} else {
					this.showDel = false;
				}
			},
			// 添加选项
			addChooseItem() {
				var layer_height = $('.layui-layer-content').height() + 10;
				var notice_row = $('.notice_row').length;
				this.noticeItem.push({
					name: ''
				});
				$('.layui-layer-content').css({
					'height': layer_height += $('.notice_row').outerHeight(),
					'overflow': 'hidden'
				})
				if (this.noticeItem.length >= 7) {
					this.isAddItem = false;
				} else {
					this.isAddItem = true;
				}
			},
			removeCurr(index) {
				if (this.noticeItem.length > 2) {
					this.noticeItem.$remove(index);
					var layer_height = $('.layui-layer-content').height() - 10;
					$('.layui-layer-content').css({
						'height': layer_height -= $('.notice_row').outerHeight(),
						'overflow': 'hidden'
					})
				} else {
					gloabl.tipTools('至少保留两个选项！')
					return;
				}
				if (this.noticeItem.length < 7) {
					this.isAddItem = true;
				}
			},
			//单选
			singleChoose() {
				this.chooseVal = 1;
				this.chooseType = 1;
				this.sligeBox = (this.chooseVal = 1 ? '&#xe63c;' : '&#xe645;');
				this.moreBox = '&#xe644;'
			},
			//多选
			moreChoose() {
				this.chooseVal = 2;
				this.chooseType = 2;
				this.sligeBox = '&#xe645;'
				this.moreBox = (this.chooseVal = 2 ? '&#xe643;' : '&#xe644;')
			},
			sendVoteSubmit() {
				this.createVote();
			},
			cancelLayer() {
				this.noticeItem = [{
					name: ''
				}, {
					name: ''
				}];
				this.title = '';
				this.isAddItem = true;
				this.sligeBox = '&#xe63c;'
				this.moreBox = '&#xe644;'
				layer.closeAll();
			},
			createVote() {
				var vateOption = [];
				//标题

				if (undefined == this.title || "" == this.title) {
					gloabl.tipTools('标题不能为空', '#voteTitle');
					return false;
				}
				if (this.title.length > 54) {
					gloabl.tipTools('标题不能超过54个字符', '#voteTitle');
					return false;
				}

				//选项内容

				var options_obj = $('input[name="options"]');
				for (let i = 0; i < options_obj.length; i++) {
					let options = $(options_obj[i]);
					if (options.val().trim().length > 60) {
						gloabl.tipTools('投票选项内容不能超过60个字符！');
						return;
					}
					if (undefined == options.val().trim() || "" == options.val().trim()) {
						gloabl.tipTools('选项内容不能为空');

						return;
					}

					vateOption.push({
						'VM00203': options.val()
					});

				}

				var params = 'VM00102=' + this.title + '&VM00103=' + this.chooseType + '&VM002List=' + JSON.stringify(vateOption)
				layer.confirm("是否发起投票？", () => {
					gloabl.fethAsync([URL.SEND_VOTE_URL], params, res => {
						if (res.success) {
							var time = StringUtil.dateFormat();
							var u_id = StringUtil.UUId(32);
							var personList = JSON.parse(gloabl.getCookie('allUserInfo')).user;
							var params = {
								"MSG00101": u_id,
								"MSG00102": personList.UM0101,
								"MSG00103": personList.UM0102,
								"MSG00104": this.nowCurrent.sendid,
								"MSG00105": this.nowCurrent.name,
								"MSG00106": time,
								"MSG00107": this.nowCurrent.sendtype,
								"MSG00108": 11,
								"MSG00109": JSON.stringify(res.result),
								"MSG00110": personList.UM0111,
								"isSelf": 0
							};
							sendMessageInfo(params);
							this.noticeItem = [{
								name: ''
							}, {
								name: ''
							}];
							this.title = '';
							this.isAddItem = true;
							layer.closeAll();
						} else {
							gloabl.tipTools(res.msg);
							return;
						}
					})
				});
			}

		}
	}
</script>
