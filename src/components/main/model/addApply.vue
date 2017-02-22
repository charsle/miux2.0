<template>
	<div class="p10">
		<div class="row bottom lh30">
			审批对象：
            <span v-if="addapply.CK00101!=''">
                <a class="pointer" @click="addPerson" style="color: #009bff;">{{addapply.process[1].TM00306}}</a>
            </span>
            
            <span v-else>
                <a class="pointer" @click="addPerson" style="color: #009bff;">{{personList.length!=0 ?personList[0].TM00306:''}}</a>
            </span>
            
			<a class="pointer" @click="addPerson" style="color: #009bff;" v-if="addapply.process.length==0&&personList.length==0">请选择审批对象</a>
		</div>
<div id="appAddApplyList">
        <div class="pt20">标题</div>
		<div class="row mt10">
			<input type="text" class="form-control" v-model="applyTitle"  maxlength="100" placeholder="请输入标题" />
		</div>
         <div class="pt20">详情</div>
		<div class="row mt10">
			<textarea name="" class="form-control" v-model="applyContent" rows="9" cols="" maxlength="768" placeholder="可填"></textarea>
		</div>
		<div class="row mt10">
			<div class="form-group relative">
				<a class="openWindow pointer">
                    <i class="iconfont icon-10 fs20" style="color: #999999;"></i>
                    <input type="file" class="upLoadBTNTAB baseTABBtn" name="file" accept="image/jpg,image/png,image/jpeg,image/bmp,image/gif"  @change="imgPreview($event)">{{addapply.img.length>0?'继续添加('+addapply.img.length+'/5)':'打开文件夹'}}
                </a>
				<div id="preview" class="relative">

                </div>
                <div class="relative imgAndVoice  mt10" >
					<ul v-if="addapply.img.length!=0">
                        <li v-for="img in addapply.img" class="relative mt10">
                            <img :src="img.CK00203">
                            <i class="iconfont icon-icon pointer deleteMedie" @click="deleteMedie(img,1)"></i>
                            </li>
                    </ul>
					<ul v-if="addapply.voice.length!=0">
                        <li v-for="voice in addapply.voice" class="relative mt10">
                            <video width="100%" height="30" controls>
                                <source :src="voice.CK00203" type="">
                            </video>
                            <i class="iconfont icon-icon pointer deleteMedie" @click="deleteMedie(voice,2)"></i>
                        </li>
                    </ul>
					
				</div>
			</div>
		</div>
</div>
		<div class="row tr">
			<button class="btn btn-sure" @click="submitApply" :disabled="isDisplay==true?'disabled':null">确定</button>
			<a href="javascript:;" class="btn btn-cancle ml10" @click="closeLayer">取消</a>
		</div>
	</div>
   
</template>
<script>
    import gloabl from '../../../api/globConfig'
    import * as URL from '../../../api/restfull'
    import UploadFile from '../../../assets/js/upload1.js'
    export default {
        props: ['addapply'],
        data() {
            return {
                applyTitle: '', //标题
                applyContent: '', //内容
                applyImgUrl: [], //图片
                isDisplay: false,
                userId: JSON.parse(gloabl.getCookie('allUserInfo')).user, //用户id
            }
        },
        vuex: {
            getters: {
                personList(state) {
                    return state.chooseSuerPerson;
                },
                personListIndex(state) {
                    return state.chooseSuerIndex;
                }
            }
        },
        watch: {
            personList: {
                handler() {
                    if (this.personList.length != 0 && this.addapply.process.length != 0) {
                        this.addapply.process[1].TM00306 = this.personList[0].TM00306
                    }

                }
            },
            addapply: {
                handler() {
                    this.applyTitle = this.addapply.CK00102;
                    this.applyContent = this.addapply.CK00103
                }
            }
        },
        methods: {
            //添加审批对象
            addPerson() {

                var self = this;
                var ll = layer.open({
                    type: 1,
                    shade: 0,
                    title: '添加参与人',
                    area: ['750px'],
                    content: $('#choosePerson1'),
                })
                self.$store.dispatch('LAYER_OBJECT', ll + ';' + 'apply');
            },
            imgPreview(e) {
                var _this = this;
                var img = new Image();
                var file = e.currentTarget.files[0]; //获取file对象
                if (file.hasOwnProperty('type') && !/image\/\w+/.test(file.type)) {
                    gloabl.tipTools('您选择的不是图片格式')
                    return false;
                }
                if (this.addapply.img.length > 4) {
                    gloabl.tipTools('上传图片个数已上限');
                    return;
                }
                var URL = window.URL || window.webkitURL;
                img = URL.createObjectURL(file);
                var reader = new FileReader(); //声明一个FileReader实例
                $('#preview').html('<div><div class="progress"><span></span><br>正在上传</div> <img src="' + img + '" alt=""/></div>');

                let data = {
                        type: 1,
                        xls: '',
                        parames: '',
                    }
                    //上传
                var uploadFile = new UploadFile(file, data)
                uploadFile.initFileUpload((d) => {
                    var url = d.data.url;
                    if (url) {
                        this.addapply.img.unshift({
                            CK00203: url
                        });
                        $('#preview').html('');
                    }

                }, (p) => {

                    $('.progress').css({
                        background: 'rgba(0, 0, 0, 0.5)',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        'padding-top': '50%',
                        'text-align': 'center',
                        'color': '#fff'
                    }).find('span').html(p);
                });
            },
            //提交审判
            submitApply() {

                var applyId = this.personListIndex.length != 0 ? this.personList[0].TM00301 : this.addapply.process.length != 0 ? this.addapply.process[1].CK00303 : null;
                if (applyId == null || applyId == '' || applyId == undefined) {
                    gloabl.tipTools('请选择审批对象');
                    return;
                }
                if (this.applyTitle == '' || this.applyTitle.length == 0) {
                    gloabl.tipTools('请输入审批标题');
                    return;
                }
                // console.log(applyId)
                var params = '',
                    a_url = '';;
                //编辑

                if (this.userId.UM0101 == applyId) {
                    gloabl.tipTools('您不能选择自己为审批对象!');
                    return;
                }
                for (let item of this.addapply.img) {
                    this.applyImgUrl.push(item.CK00203)
                }
                if (this.addapply.CK00101 == '') {
                    a_url = URL.CREATE_APPLY;
                    params = 'CK00102=' + this.applyTitle + '&CK00103=' + this.applyContent + '&CK00104=' + this.userId.UM0101 + '&CK00105=' + applyId + '&CK00203=' + this.applyImgUrl.toString() + '&CK00204=';
                } else {
                    var voice = [];
                    a_url = URL.EDITOR_APPLY;
                    for (let item of this.addapply.voice) {
                        voice.push(item.CK00203)
                    }

                    params = 'CK00101=' + this.addapply.CK00101 + '&CK00102=' + this.applyTitle + '&CK00103=' + this.applyContent + '&CK00104=' + this.userId.UM0101 + '&CK00105=' + applyId + '&CK00203=' + this.applyImgUrl.toString() + '&CK00204=' + voice.toString();
                }
                // console.log(params)
                // return;
                gloabl.fethAsync(a_url, params, res => {

                    if (res.success) {
                        this.isDisplay = true;
                        var result = res.result;
                        this.$store.dispatch('NEW_APPLY_PBJ', result);
                        gloabl.tipTools(res.msg);
                        this.closeLayer();

                    } else {
                        gloabl.tipTools(res.msg);
                    }


                })
            },
            deleteMedie(item, type) {
                if (type == 1) {
                    this.addapply.img.$remove(item);

                } else {
                    this.addapply.voice.$remove(item);
                }
            },
            closeLayer() {
                layer.closeAll();
                this.isDisplay = false;
                this.applyTitle = '';
                this.applyContent = '';
                this.applyImgUrl = [];
                this.addapply.img = [];
                this.addapply.voice = [];
                $('input[name="file"]').val('');
                this.$store.dispatch('CHOOSE_ALL_PERSON', []);
                this.$store.dispatch('CHOOSE_ALL_INDEX', []);
            }
        },

    }
</script>
<style scoped>
    .imgAndVoice li {
        margin-top: 10px;
    }
    
    .deleteMedie {
        position: absolute;
        right: 10px;
        top: 0px;
        color: #ccc;
        font-size: 20px;
    }
    
    .progress {}
</style>