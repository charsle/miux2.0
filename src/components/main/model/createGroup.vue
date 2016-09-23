<template>
	<div class="contactGroTeam">
		<div class="col-sm-12 relative">
			<input type="text" class="form-control" placeholder="请输入群组名称" @keyup="enterWord" v-model="groupName" id="groupName" />
			<i class="titleDele iconfont light-grey" @click="deletePubIcon" v-show="isSHowIcon">&#xe60c;</i>
			<div class="clearfix"></div>
		</div>
		<div class="clearfix"></div>
		<p class="fs14 light-grey mt25">设置群组头像</p>
		<div class="mt10 col-sm-12">
			<div class="col-sm-2 relative">
				<img :src="groupImg | getUrl" class="img-circle addScrtGroupImage" width="60" height="60" />
			</div>
			<div class="col-sm-10">
				<a class="light-blue mt30 inlineblock" href="javascript:;" @click="changeScretImage">更换图片</a>
			</div>
		</div>
		<div class="clearfix"></div>
		<p class="fs14 light-grey mt25">邀请成员</p>
		<div class="mt10 col-sm-12 break" v-cloak>
			<div class="col-sm-11">
				<div v-if="personList.length==0">
					<i class="iconfont fs16 light-blue" style="color: #37D52F;">&#xe62c;</i>&nbsp;&nbsp;
					<a class="light-blue inlineblock ml10" href="javascript:;" @click="addGoOn">邀请</a>
				</div>
				<div v-else>
					<span style="padding: 0 2px; font-weight: bold;" v-for="item in personList">{{item.TM00306}},</span> 等人
					<a class="light-blue inlineblock ml10" href="javascript:;" @click="addGoOn">继续添加</a>
				</div>
			</div>
			<div class="col-sm-1 tr" v-if="personList.length!=0">
				<a href="javascript:;" @click="deleteAllPerson">
					<i class="titleDele iconfont">&#xe60c;</i>
				</a>
			</div>
			<div class="clearfix"></div>
		</div>
		<div class="clearfix"></div>
		<div class="col-xs-12 text-right p15">
			<a href="javascript:;" class="btn btn-sure" @click="addSectretGroup">确定</a>
			<a href="javascript:;" class="btn btn-cancle" @click="closeAllPerson">取消</a>
		</div>
	</div>

</template>
<script type="text/javascript">
	import {
		uploadImage
	} from '../../../../static/lib/updatephoto/miux_update_photo';
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	export default {
		data() {
			return {
				groupName: '',
				isSHowIcon: false,
				groupImg: '',
			}
		},
		computed: {
			choosePersonList() {
				return this.getChoosePersonList
			}
		},
		//获取选择人员列表
		vuex: {
			getters: {
				personList(state) {
					return state.chooseSuerPerson;
				},
				personListID(state) {
					return state.chooseSuerIndex;
				}
			}
		},

		methods: {
			enterWord(ev) {
				if (this.groupName != '') {
					this.isSHowIcon = true;
				} else {
					this.isSHowIcon = false;
				}
			},
			deletePubIcon() {
				this.groupName = '';
				this.isSHowIcon = false;
			},
			changeScretImage() {
				uploadImage(5, url => {
					this.groupImg = url;
				});
			},
			addGoOn() {
				var self = this;
				var ll = gloabl.layer.open({
					type: 1,
					shade: 0,
					title: '添加参与人',
					area: ['750px'],
					skin: '',
					content: $('#choosePerson'),

				})
				self.$store.dispatch('LAYER_OBJECT', ll + ';' + '');
			},
			addSectretGroup() {
				var name = this.groupName;
				if (name === '') {
					gloabl.tipTools('群组名称不能为空！', '#groupName');
					return;
				}
				if (name.length > 8) {
					gloabl.tipTools('群组名字不能超过8个字符！', '#groupName');
					return;
				}
				var param = 'TM00206=' + name + '&TM00209=1&TMT04=' + this.personListID.toString() + '&TM00210=' + this.groupImg;
				this.secretGroup(param);
			},
			deleteAllPerson() {
				this.$store.dispatch('CHOOSE_ALL_PERSON', []);
				this.$store.dispatch('CHOOSE_ALL_INDEX', []);
				this.groupName = '';
			},
			closeAllPerson() {
				this.deleteAllPerson();
				gloabl.layer.closeAll();
			},
			//创建私密群组
			secretGroup(param) {
				gloabl.fethAsync([URL.CREATE_GROUP_URL], param, res => {
					if (res.success) {
						this.deleteAllPerson();
						gloabl.tipTools('添加成功');
						var result = res.result;
						this.$store.dispatch('ADD_SECRET_GROUP', result)
						layer.closeAll();
					} else {
						gloabl.tipTools('添加失败');
					}
				})
			},

		}

	}
</script>
