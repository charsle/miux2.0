<template>
	<div class="">
			<div class="col-sm-7 p10" id="applyDeLeft">
				
				<div class="row">
					<div class="col-xs-2">
						<img :src="userImg | getUrl" class="img-circle" width="80%"/>
					</div>
					<div class="col-xs-10">
						<div class="row fs16 break mt7">
							{{detaileList.CK00102}}
						</div>
						<div class="row fs12 light-grey mt5">
							<div class="col-xs-6">
								{{{userName}}}
							</div>
							<div class="col-xs-6 tr light-grey">
								{{detaileList.CK00107 | timeReset}}
							</div>
						</div>
					</div>
				</div>
				<!--{{detaileList | json}}-->
				<div class="row p10 break">
					<p>{{detaileList.CK00103}}</p>
					 <div class="relative imgAndVoice  mt10" >
					<ul v-if="applyImage.length!=0" class="mt10">
                        <li v-for="img in applyImage" class="relative mt10">
                            <img :src="img.CK00203">
                            
                            </li>
                    </ul>
					<ul v-if="applyVoice.length!=0" class="mt10">
                        <li v-for="voice in applyVoice" class="relative mt10">
                            <audio width="100%"  controls>
                                <source :src="voice.CK00203" type="">
                            </audio>
                           
                        </li>
                    </ul>
					 </div>
				</div>
			</div>
			<div class="col-sm-5 p10" style="border-left:1px solid #e5e5e5;height:555px;">
				<div class="applyDeRight" id="applyDeRight">
				<div class="row listRes" v-for="item in applyPersonList">
					<div class="col-xs-2">
						<img :src="item.TM00321 | getUrl" class="img-circle" width="80%"/>
					</div>
					<div class="col-xs-10">
						<div class="row fs12">
							<div class="col-xs-6">
								{{item.TM00306}}
							</div>
							<div class="col-xs-6 tr">
								{{item.CK00304 | timeReset}}
							</div>
						</div>
						<div class="row break mt2 fs14">
							{{item.CK00306==null?'':item.CK00306}}
						</div>
						<div class="row light-grey mt2">
							{{item.zc}}
						</div>
					</div>
				</div>
                <!--{{applyPersonList | json}}-->
				</div>
				<div class="examineType1 btnApply" v-if="detaileList.isself==0&&detaileList.CK00106==0">
					<div class="applyButtons fl" @click="giveUpApply(detaileList.CK00101)">
						放弃审批
						<i class="fr">|</i>
						<div class="clearfix"></div>
					</div>
					<div class="fr applyButtons" @click="resetEditApply">重新编辑</div>
					<div class="clearfix"></div>
				</div>
				<div class="examineType2 btnApply commStatusBtn" v-if="detaileList.isself==1&&detaileList.isover==0">
					
						<div class="toTopPopover popTopBox" id="toTopPopover" :style="{display:dispaly}">
							<div  :class="[arrowClass,arrowClassPoint]" v-if="!arrow"></div>
							<div class="row tl bottom light-grey" v-if="isZC">
								转呈给：{{personList.length!=0 ?personList[0].TM00306:''}}&nbsp;&nbsp;<a class="light-blue underline pointer" @click="addPerson">{{personList.length==0?'添加':'修改'}}</a>
							</div>
							<div class="row mt10">
								<div class="col-xs-2 relative tl">
									<img class="img-circle" :src="user.UM0111 | getUrl" width="30" height="30" alt="头像"/>
									<i class="iconfont icon-tongyi smallIconapp" style="color: rgb(100, 201, 106);" v-if="type==1"></i>
								
									<i class="iconfont icon-icon smallIconapp" style="color: red;"   v-if="type==2"></i>
								</div>
								<div class="col-xs-10 pl5">
									<textarea name="" class="form-control textarea-auto" :rows="rows" cols="" maxlength="35" v-model="userIdea" ></textarea>
								</div>
							</div>
							<div class="row tr mt10">
								<button href="javascript:;" class="btn btn-sure btnSmallType" @click="fuckTopPopver">确定</button>
								<button href="javascript:;" class="btn btn-cancle ml10 btnSmallType" @click="cancelTopPopver">取消</button>
							</div>
							<div  :class="[arrowClass,arrowClassPoint]" v-if="arrow"></div>
						</div>
						
					<div class="applyButtons" @click="applyButtonPop($event,1)">
						<i class="iconfont icon-tongyi" style="color: rgb(100, 201, 106);"></i>&nbsp;同意
						<i class="fr">|</i>
						<div class="clearfix"></div>
					</div>
					<div class="applyButtons" @click="applyButtonPop($event,2)">
						<i class="iconfont icon-icon" style="color: red;"></i>&nbsp;拒绝
						<i class="fr">|</i>
						<div class="clearfix"></div>
					</div>
					<div class="applyButtons" @click="applyButtonPop($event,3)">
						<i class="iconfont icon-zhuanfa light-grey"></i>&nbsp;转呈	
					</div>
					<div class="clearfix"></div>
				</div>
				<div class="applyAgreeBtn applyStatusBtn applyStatusBase commStatusBtn" v-if="(detaileList.isself==1&&detaileList.isover==1)||(detaileList.isself==0&&detaileList.CK00106==1)">
					<i class="iconfont icon-tongyi"></i>&nbsp;已同意
				</div>
				<div class="applyRefuseBtn applyStatusBtn commStatusBtn" v-if="detaileList.isself==1&&detaileList.isover==2 ||(detaileList.isself==0&&detaileList.CK00106==2)">
					<i class="iconfont icon-icon"></i>&nbsp;
					已拒绝
				</div>
				<div class="applyTurnBtn applyStatusBtn applyStatusBase commStatusBtn" v-if="detaileList.isself==1&&detaileList.isover==3">
					<i class="iconfont icon-zhuanfa"></i>&nbsp;
					已转呈
				</div>
				<div class="clearfix"></div>
			</div>
			
			<div class="clearfix"></div>
		</div>
		
</template>
<script>
    import gloabl from '../../../api/globConfig'
    import * as URL from '../../../api/restfull'
    import stringUtil from '../../../assets/js/stringUtil.js'
    export default {
        props: ['detailes'],
        data() {
            return {
                detaileList: {},
                userImg: '',
                userName: '',
                applyImage: [],
                applyVoice: [],
                applyPersonList: [],
                isZC: false,
                arrowClass: '',
                arrowClassPoint: 'arrowTop',
                arrow: false,
                userIdea: '',
                type: '',
                dispaly: 'none',
                rows: 1,
                user: JSON.parse(gloabl.getCookie('allUserInfo')).user, //用户id

            }
        },
        ready() {
            gloabl.doResizeHeight();
        },
        watch: {
            detailes: {
                handler() {
                    this.detaileList = this.detailes;
                    if (this.detaileList.hasOwnProperty('CK00101')) {
                        this.userImg = this.detaileList.process[0].TM00321
                    }
                    if (this.detaileList.hasOwnProperty('CK00101')) {
                        if (this.detaileList.isself != 0) {
                            this.userName = `by&nbsp;${this.detaileList.process[0].TM00306}`
                        } else {
                            this.userName = 'by&nbsp;<span style="color:#009bff;">我</span>'
                        }
                    }
                    if (this.detaileList.hasOwnProperty('CK00101')) {
                        this.applyImage = this.detaileList.img
                    }
                    if (this.detaileList.hasOwnProperty('CK00101')) {
                        this.applyVoice = this.detaileList.voice
                    }
                    if (this.detaileList.hasOwnProperty('CK00101')) {
                        var arr = [];
                        var obj = this.detaileList.process;
                        for (let i = (obj.length - 1); i > 0; i--) {
                            //审批状态：0未处理；1同意；2拒绝；3转呈
                            if (obj[i].CK00305 == 0) {
                                obj[i].zc = '未处理';
                            } else if (obj[i].CK00305 == 1) {
                                obj[i].zc = '已同意';
                            } else if (obj[i].CK00305 == 2) {
                                obj[i].zc = '已拒绝';
                            } else {
                                obj[i].zc = '转呈给了' + obj[i + 1].TM00306;
                            }
                            arr.push(obj[i]);
                        }
                        this.applyPersonList = arr
                    }
                    this.$nextTick(() => {
                        var appright = $('#applyDeRight').height();
                        if (appright >= 510) {
                            $('#applyDeRight').css({
                                height: 510,
                            })
                            $('#applyDeRight').niceScroll({
                                cursorcolor: "#000",
                                oneaxismousemode: false
                            });
                        } else {
                            $('#applyDeRight').css({
                                height: 'auto',
                            })
                        }
                        $('#applyDeLeft').css({
                            height: 555,
                        })
                        $('#applyDeLeft').niceScroll({
                            cursorcolor: "#000",
                            oneaxismousemode: false
                        });
                    })
                }
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
        methods: {
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
            //小弹框
            applyButtonPop(ev, type) {
                var top = $('#applyDeRight').height();
                var _postion = 0;
                var toTopPopover = $('#toTopPopover');
                var p_height = toTopPopover.height();
                this.type = type;
                if (type == 1) {
                    //arrowLeft
                    this.isZC = false;
                    this.arrowClass = 'arrowLeft';

                } else if (type == 2) {
                    //arrowCenter
                    this.isZC = false;
                    this.arrowClass = 'arrowCenter';
                } else {
                    this.isZC = true;
                    //arrowRight
                    this.arrowClass = 'arrowRight';
                }
                if (p_height > top) {
                    this.arrow = false;
                    this.arrowClassPoint = 'arrowTop'
                    _postion = 40;

                } else {
                    this.arrow = true;
                    this.arrowClassPoint = 'arrowBottom'
                    if (type == 1 || type == 2) {
                        _postion = -120;
                    } else {
                        _postion = -155;
                    }
                }
                toTopPopover.show().css({
                    'top': _postion
                });

            },
            showHeight(event) {
                var event = event || window.event;
                var rows = event.target.rows;
                var curr = $(event.currentTarget);


                // if (event.keycode == 13) {

                if (curr.attr('rows') == 3) { //忘了回车的 key code 是不是13了
                    curr.attr('rows', 3);
                    return;
                    // event.target.style.height = event.target.style.height.height + 16 + 'px';
                } else {
                    rows++;
                    this.rows = rows;
                }
                // }

            },
            fuckTopPopver() {
                var CK00303 = '';
                if (this.type == 1 || this.type == 2) {
                    CK00303 = this.user.UM0101;
                } else {
                    CK00303 = this.personListIndex[0]
                }
                if (CK00303 == '' || CK00303 == undefined || CK00303 == null) {
                    gloabl.tipTools('请选择转呈对象!');
                    return;
                }
                if (this.userIdea.length > 35) {
                    gloabl.tipTools('回复字数不能超过35个字!');
                    return;
                }
                var params = 'CK00101=' + this.detailes.CK00101 + '&CK00303=' + CK00303 + '&type=' + this.type + '&CK00306=' + this.userIdea
                gloabl.fethAsync(URL.DELIVER_APPLY, params, res => {

                    if (res.success) {
                        this.detaileList.isover = this.type;
                        var data = {
                            "CK00303": "",
                            "TM00306": this.user.UM0102,
                            "TM00321": this.user.UM0111,
                            "CK00305": this.type,
                            "CK00306": this.userIdea,
                            "CK00304": stringUtil.dateFormat(),
                            "CK00309": 1
                        }
                        if (this.type == 1) {
                            data.zc = '已同意';
                        } else if (this.type == 2) {
                            data.zc = '已拒绝';
                        } else {
                            data.zc = '转呈给了' + this.personList[0].TM00306;
                        }
                        this.applyPersonList.$set(0, data);
                        this.$store.dispatch('NEW_APPLY_PBJ', Math.random());
                        this.resetData();
                    } else {
                        gloabl.tipTools(res.msg);
                    }



                })
            },
            //放弃审批
            giveUpApply(id) {
                var _this = this;
                layer.confirm('您确定要放弃审批吗?', {
                    title: '放弃审批'
                }, function() {
                    gloabl.fethAsync(URL.GIVE_UP_APPLY, 'CK00101=' + id, res => {
                        if (res.success) {
                            _this.$store.dispatch('NEW_APPLY_PBJ', Math.random());
                            layer.closeAll();
                        }

                    })
                })

            },
            cancelTopPopver() {
                this.resetData();
            },
            resetData() {
                this.isZC = false;
                this.arrowClass = '';
                this.arrowClassPoint = 'arrowTop';
                this.arrow = false;
                this.userIdea = '';
                this.type = '';
                this.rows = 1;
                this.dispaly = 'none';
                this.$store.dispatch('CHOOSE_ALL_PERSON', []);
                this.$store.dispatch('CHOOSE_ALL_INDEX', []);
                $('#toTopPopover').hide();
            },
            //重新编辑
            resetEditApply() {
                this.$store.dispatch('EDIT_APPLY', this.detailes);
            }
        },



    }
</script>