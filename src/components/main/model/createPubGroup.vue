<template>
	<div style="padding:0 5px">
		<div class="mt10 col-xs-12">
			<input type="text" class="form-control" placeholder="请输入群组名称" name="" @keyup="enterWord" v-model="pubGroupName" id="pubGroupName" />
			<i class="titleDele iconfont light-grey" id="deletePubIcon" @click="deletePubIcon" v-show="isSHowIcon" style="display:none;">&#xe60c;</i>
		</div>
		<div class="mt15 col-xs-12 fs16 mod-grey">
			<h4>频道简介</h4>
			<div class="row mt10">
				<textarea name="" rows="5" class="form-control" v-model="pubGrouptext" cols="" id="pubGrouptext" placeholder="说点什么来吸引大家"></textarea>
			</div>
		</div>
		<div class="mt10 col-sm-12 break">
			<p class="fs14 light-grey mt15">设置频道头像</p>
			<div class="mt10 col-sm-12">
				<div class="col-sm-2 relative ">
					<img :src="groupImg | getUrl" class="img-circle" width="50" height="50" />
				</div>
				<div class="col-sm-10">
					<a class="light-blue mt15 inlineblock" href="javascript:;" @click="settingGroupImage">更换图片</a>
				</div>
			</div>
		</div>
		<div class="col-md-12 text-right p15">
			<a href="javascript:;" class="btn btn-sure" @click="submitPublicGroup">确定</a>
			<a href="javascript:;" class="btn btn-cancle" @click="closePublicGroup">取消</a>

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
				pubGroupName: '',
				pubGrouptext: '',
				isSHowIcon: false,
				groupImg: '',
			}
		},
		methods: {
			enterWord(ev) {
				if (this.pubGroupName != '') {
					this.isSHowIcon = true;
				} else {
					this.isSHowIcon = false;
				}
			},
			deletePubIcon() {
				this.pubGroupName = '';
				this.isSHowIcon = false;
			},
			//上传公共频道头像
			settingGroupImage() {
				uploadImage(4, url => {
					this.groupImg = url;
				});
			},
			//提交数据
			submitPublicGroup() {
				var name = this.pubGroupName;
				var p_text = this.pubGrouptext;
				if (name === '') {
					gloabl.tipTools('群组名称不能为空！', '#pubGroupName');
					return;
				}
				if (name.length > 8) {
					gloabl.tipTools('频道名字不能超过8个字符！', '#pubGroupName');
					return;
				}
				if (p_text.length > 80) {
					gloabl.tipTools('频道简介不能超过30个字符！', '#pubGrouptext');
					return;
				}
				var param = 'TM00206=' + name + '&TMT04=&TM00209=0&TM00208=' + p_text + '&TM00210=' + this.groupImg;;
				this.secretGroup(param);
			},

			secretGroup(param) {
				gloabl.fethAsync([URL.CREATE_GROUP_URL], param, res => {
					if (res.success) {
						gloabl.tipTools('添加成功');
						// console.log(JSON.stringify(res));
						var result = res.result;
						this.$store.dispatch('ADD_PUBLIC_GROUP', result)
						layer.closeAll();
					} else {
						gloabl.tipTools(res.msg);
					}
				})
			},
			closePublicGroup() {
				gloabl.layer.closeAll();
			}

		}

	}
</script>
