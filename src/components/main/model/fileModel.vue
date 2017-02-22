<template>
	<div class="p15" style="height: auto;">
		<div class="col-xs-12">
			<div class="col-xs-9">
				<div class="row">
					<div v-if="docModelItems.hasOwnProperty('isUpload')">
						<input type="text" class="form-control" v-model="fileName" id="fileName" :value="docModelItems.DM00105" placeholder="请输入文档标题">
					</div>
					<div v-else>
						<input type="text" class="form-control" v-model="fileName" :value="docModelItems.DM00105" readonly="true">
					</div>
				</div>
				<div class="row mt5">
					<!-- {{groupFileItem | json}} -->
					<select id="groupSelectedUpload" v-model="filesSelect" class="form-control" :disabled="disabled">
						<option  v-for="option in options" :value="option">{{option.TM00206}}</option>
					</select>
				</div>
			</div>

			<div class="col-xs-3 tc" v-cloak>
					<div class="row fs36">
						{{{docModelItems.DM00106 | valideType}}}
					</div>
					<div class="row">{{docModelItems.DM00108 | fileSize}}</div>
				</div>
		</div>
		<div class="col-xs-12 mt10 ">
			<div v-if="docModelItems.hasOwnProperty('isUpload')">
				<textarea name="fileRemark" class="form-control" v-model="filesDesc" rows="5" id="fileRemark" cols="" placeholder="文档描述：允许768个汉字 " maxlength="768 "></textarea>
			</div>
			<div v-else v-cloak>
				<textarea class="form-control" rows="5" readonly="true" v-model="filesDesc" placeholder="文档描述：允许768个汉字 " maxlength="768">{{docModelItems.DM00109}}</textarea>
			</div>
		</div>
		<div class="clearfix "></div>
		<div class="par"></div>
		<div class="col-xs-12 text-right ptb10">
			<a href="javascript:;" class="btn btn-sure" @click="uploadFilesSubmit" :disabled="isDisplay==true?'disabled':null">确定</a>
			<a href="javascript:;" class="btn btn-cancle" @click="cancleFile">取消</a>
		</div>
	</div>
</template>
<script type="text/javascript ">
    import gloabl from '../../../api/globConfig'
    import * as URL from '../../../api/restfull'
    import StringUtil from '../../../assets/js/stringUtil';
    import UploadFile from '../../../assets/js/upload1';
    import {
        uploadAll
    } from '../../../assets/js/upload';
    export default {
        data: function() {
            return {
                fileName: '',
                filesSelect: '',
                filesDesc: '',
                disabled: false,
                isDisplay: false,
                userInfo: JSON.parse(gloabl.getCookie('allUserInfo')).user
            }
        },
        vuex: {
            getters: {
                docModelItems(state) {
                    return state.shareDocData;
                },
                options(state) {
                    return state.groupListItem;
                },
                groupFileItem(state) {
                    return state.chooseFilesItem;
                }
            }
        },
        watch: {
            options: {
                handler() {
                    if (this.options.length != 0) {
                        this.filesSelect = this.options[0];
                    }
                }
            },
            groupFileItem: {
                handler() {

                    if ('TM00201' in this.groupFileItem) {
                        // console.log('111', this.groupFileItem)
                        this.filesSelect = this.groupFileItem;
                        this.disabled = true;
                    } else {
                        // console.log('222', this.groupFileItem)
                        this.filesSelect = this.options[0];
                        this.disabled = false;
                    }
                }
            }
        },
        methods: {
            uploadFilesSubmit() {
                if (this.docModelItems.hasOwnProperty('isUpload')) {
                    this.uploadFiles();
                } else {
                    this.shreFile();
                }
            },
            //文档上传
            uploadFiles() {
                //var loadFile = layer.load(2);
                this.isDisplay = true;
                let data = {
                    type: 2,
                    xls: '',
                    parames: '',
                }
                var objFile = this.docModelItems.objFile;
                var upload = new UploadFile(objFile, data);
                upload.initFileUpload((d) => {

                    var msgId = this.docModelItems.msgId; //UUId
                    var DM00103 = this.docModelItems.DM00103; //时间
                    var DM00105 = (objFile.name).replace(/%/gi, '_'); //文件名称
                    var DM00106 = this.docModelItems.DM00106; //文件后缀
                    var DM00108 = objFile.size; //文件大小
                    var DM00109 = this.filesDesc; //文档描述
                    var DM00110 = d.data.key; //文档key
                    //对话类型
                    var DM00112 = this.filesSelect.TM00201 == '' ? '' : 2; //文件类型 分享和不分享
                    var DM00113 = this.filesSelect.TM00201; //下拉框id
                    var DM00116 = this.filesSelect.TM00201 == '' ? '' : this.filesSelect.TM00206 //下拉框名称
                        //缩略图key
                    var DM00117 = '';
                    //缩略图URL
                    var DM00118 = '';
                    var DM00119 = d.data.url;
                    if (StringUtil.ifImg(DM00106)) {
                        gloabl.getFileUploadToken(DM00105, DM00108, d.data.mimetype, d.data.checksum, (token) => {
                            gloabl.createThumbnail(2, DM00110, token, 0, 0, 30, (r) => {
                                if (r.code != 0) {
                                    layer.msg("生成缩略图失败");
                                    return;
                                }
                                DM00117 = r.data.key;
                                DM00118 = r.data.url;
                                var params = 'msgId=' + msgId + '&DM00103=' + DM00103 + '&DM00105=' + DM00105 + '&DM00106=' + DM00106 + '&DM00108=' + DM00108 + '&DM00109=' + DM00109 + '&DM00110=' + DM00110 + '&DM00112=' + DM00112 + '&DM00113=' + DM00113 +
                                    '&DM00116=' + DM00116 + '&DM00117=' + DM00117 + '&DM00118=' + DM00118 + '&DM00119=' + DM00119;
                                this.sendFileMsg(params, DM00112);
                            })
                        });
                    } else {
                        var params = 'msgId=' + msgId + '&DM00103=' + DM00103 + '&DM00105=' + DM00105 + '&DM00106=' + DM00106 + '&DM00108=' + DM00108 + '&DM00109=' + DM00109 + '&DM00110=' + DM00110 + '&DM00112=' + DM00112 + '&DM00113=' + DM00113 +
                            '&DM00116=' + DM00116 + '&DM00117=' + DM00117 + '&DM00118=' + DM00118 + '&DM00119=' + DM00119;
                        this.sendFileMsg(params, DM00112);
                    }

                }, (p) => {
                    var data = {
                        fileName: objFile.name,
                        fileType: this.docModelItems.DM00106,
                        fileSize: objFile.size,
                        pressNum: p,
                        isShow: true
                    }
                    this.$store.dispatch('PARESS_BAR', data);
                });
            },
            //分享后发送信息
            sendFileMsg(params, DM00112) {
                gloabl.fethAsync(URL.DOC_UPLOAD_URL, params, res => {
                    if (res.success) {
                        this.disabled = false;
                        gloabl.layer.msg("文件上传成功");
                        var result = res.result

                        this.$store.dispatch('UPLOAD_FILES_RETUEN', JSON.parse(result.MSG00109));
                        setTimeout(() => {
                            this.isDisplay = false;
                            var data = {
                                fileName: '',
                                fileType: '',
                                fileSize: '',
                                pressNum: '100%',
                                isShow: false
                            }
                            this.$store.dispatch('PARESS_BAR', data);
                            layer.closeAll();

                        }, 500);
                        if (DM00112 == 2) {
                            result.isSelf = 0;
                            this.$store.dispatch('MESSAGE_LIST', result);
                        }
                    }
                })

            },
            //确定分享
            shreFile() {
                //消息ID
                var msgId = StringUtil.UUId(32);
                var fileSid1 = this.docModelItems.DM00101;
                var fileSize1 = this.docModelItems.DM00108;
                var fileType1 = this.docModelItems.DM00106;
                var fileName1 = this.docModelItems.DM00105;
                var fileKey1 = this.docModelItems.DM00110;
                //对话类型
                var DM00112 = 2;
                //对话对象id
                var DM00113 = this.filesSelect.TM00201;
                //对话对象名称
                var DM00116 = this.filesSelect.TM00206;
                var DM00117 = this.docModelItems.DM00117;
                var DM00118 = this.docModelItems.DM00118;
                var DM00119 = this.docModelItems.DM00119;
                var params = 'msgId=' + msgId + '&DM00101=' + fileSid1 + '&DM00106=' + fileType1 + '&DM00108=' + fileSize1 + '&DM00105=' + fileName1 + '&DM00110=' + fileKey1 + '&DM00112=' + DM00112 + '&DM00113=' + DM00113 + '&DM00116=' + DM00116 + '&DM00117=' +
                    DM00117 + '&DM00118=' + DM00118 + '&DM00119=' + DM00119;
                gloabl.fethAsync([URL.DOC_UPLOAD_URL], params, res => {
                    if (res.success) {

                        var result = res.result;
                        this.getGroupDataList(DM00113, data => {
                            result.MSG00110 = this.userInfo.UM0111;
                            result.isSelf = 0;
                            result.isShare = 0;
                            result.docImg = data.TM00210;
                            console.log(JSON.stringify(result))
                            this.$store.dispatch('MESSAGE_LIST', result);
                        });
                        gloabl.layer.closeAll();
                        gloabl.layer.msg("文件分享成功");
                    } else {
                        gloabl.tipTools('文件分享失败')
                    }
                });

            },
            getGroupDataList(DM00113, __callback) {
                gloabl.fethAsync([URL.SEARCH_GROUP_BASE_INFO_URL], 'TM00201=' + DM00113, res => {
                    if (res.success) {
                        __callback(res.result)
                    }
                })
            },
            //取消分享
            cancleFile() {
                gloabl.layer.closeAll();
            }
        }
    }
</script>