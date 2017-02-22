<template>
	<div class="apply-wapper">
		<h1>审批中心<span class="fr fs14 tabTitleColor"><i class="iconfont">&#xe64d;</i></span></h1>
		<div class="apply-body" id="apply-body">
			<div class="apply-lists">
                <template v-if="applyList.length!=0">
				<div class="apply-items pointer" v-for="item in applyList" @click="showApply('applyDetaileID',item)">
					<div class="apply-item-header relative">
                        <div style="position:absolute;top:0px;left:-5px;width:7px;height:7px;background:red;border-radius:50%;" v-if="item.isLook==0"></div>
						<div class="pull-left overflow nowrap" style="width:60%;">{{item.process[0].TM00306}}</div>
						<div class="pull-right">{{item.CK00107 | timeReset}}</div>
						<div class="clearfix"></div>
					</div>
					<div class="apply-item-body bold mt10 break">
						{{item.CK00102}}
					</div>
					<div class="apply-footer mt10">
						<div class="apply-person">
							<div class="apply-person-item" v-for="(index,it) in item.process">
                                <template v-if="item.processCount>4">
								<div style="margin:0 10px;" v-if="index==1 || index==3">—</div>
								<div style="margin:0 10px;" v-if="index==2"><i class="iconfont icon-32"></i></div>
                                <!--<div style="margin:0 10px;" v-if="$index==3"><i class="glyphicon glyphicon-resize-horizontal"></i></div>-->
								<div class="apply-person-item-photo" title="{{it.TM00306}}">
									<img :src="it.TM00321 | getUrl" alt="" width="25" height="25" style="border-radius:50%;">
									<!--0未处理；1同意；2拒绝；3转呈-->
									<!--转呈-->
									<span class="iconstauts" style="color:rgb(100, 201, 106);" v-if="it.CK00305==3"><i class="iconfont icon-zhuanfa"></i></span>
									<!--完成-->
									<span class="iconstauts" style="background:rgb(100, 201, 106);color:#fff;" v-if="it.CK00305==1"><i class="iconfont icon-dagou" ></i></span>
									<!--失败-->
									<span class="iconstauts" style="color:red;" v-if="it.CK00305==2"><i class="iconfont icon-icon"  ></i></span>
									<!--未处理-->
									<span class="iconstauts" v-if="it.CK00309==1&&it.CK00305==0"><i class="iconfont icon-wenhao-" ></i></span>
								</div>
                                </template>
<template v-else>
                                    <div style="margin:0 10px;" v-if="index!=0">—</div>
								<div class="apply-person-item-photo" title="{{it.TM00306}}">
									<img :src="it.TM00321 | getUrl" alt="" width="25" height="25" style="border-radius:50%;">
									<!--0未处理；1同意；2拒绝；3转呈-->
									<!--转呈-->
									<span class="iconstauts" style="color:rgb(100, 201, 106);" v-if="it.CK00305==3"><i class="iconfont icon-zhuanfa"></i></span>
									<!--完成-->
									<span class="iconstauts" style="background:rgb(100, 201, 106);color:#fff;" v-if="it.CK00305==1"><i class="iconfont icon-dagou" ></i></span>
									<!--失败-->
									<span class="iconstauts" style="color:red;" v-if="it.CK00305==2"><i class="iconfont icon-icon"  ></i></span>
									<!--未处理-->
									<span class="iconstauts" v-if="it.CK00309==1&&it.CK00305==0"><i class="iconfont icon-wenhao-" ></i></span>
								</div>
                                </template>
</div>
</div>
<div class="apply_status">
    <span v-if="item.CK00106==0">未处理</span>
    <span v-if="item.CK00106==1">已同意</span>
    <span v-if="item.CK00106==2">已拒绝</span>
</div>
</div>
</div>
</template>
<template v-else>
                    暂无数据
                </template>

<a class="pointer  pagePute" v-if="currpageNum" @click="currPage">加载更多</a>
<a class="pointer pagePute" v-if="!currpageNum">已经到最后了！</a>

</div>
</div>
<div class="apply-fuck">
    <a class="btn btn-vote pointer" @click="showApply('addApplyID','')">发起新的审批</a>
</div>
<div id="addApplyID" style="display: none;">
    <add-apply :addapply="newApplyD"></add-apply>
</div>
<div id="applyDetaileID" style="display: none;">
    <apply-detaile :detailes="showApplyDetaile"></apply-detaile>
</div>

<div id="choosePerson1" style="display: none;">
    <choose-person :type-join="1"></choose-person>
</div>
</div>

</template>
<script>
    var newApply = {
        "CK00101": "",
        "CK00102": "",
        "CK00103": "",
        "CK00106": 0,
        "CK00107": "",
        "img": [],
        "voice": [],
        "process": []
    };
    import addApply from './addApply';
    import applyDetaile from './applyDetaile';

    import gloabl from '../../../api/globConfig'
    import * as URL from '../../../api/restfull'
    export default {
        data() {
            return {
                applyList: [],
                page: 1,
                currpageNum: false,
                showApplyDetaile: {},
                newApplyD: newApply,

                userId: JSON.parse(gloabl.getCookie('allUserInfo')).user.UM0101,
            }
        },

        vuex: {
            getters: {
                newApplyobj(state) {
                    return state.newApplyObj;
                },
                editApplyobj(state) {
                    return state.editApply;
                }
            }
        },
        watch: {
            newApplyobj: {
                handler() {
                    this.applyList = [];
                    this.getApplyList();
                }
            },
            editApplyobj: {
                handler() {
                    layer.closeAll();
                    this.newApplyD = this.editApplyobj;
                    this.showApply('addApplyID', '', 'edit')
                }
            }
        },
        ready() {
            gloabl.doResizeHeight();
            this.getApplyList();
        },
        methods: {
            getApplyList(page, pageSize) {
                page = page ? page : 1;
                pageSize = pageSize ? pageSize : 20;
                var params = 'userId=' + this.userId + '&page=' + page + '&pageSize=' + pageSize
                gloabl.fethAsync(URL.APPLY_LISTS, params, res => {
                    if (res.success) {
                        if (res.result != null) {
                            var result = res.result.pageList;
                            this.applyList = this.applyList.concat(result);
                            if (result.length == pageSize) {
                                this.currpageNum = true;
                            } else {
                                this.currpageNum = false;
                            }
                        } else {
                            this.applyList = []
                        }

                    } else {
                        gloabl.tipTools(res.msg);
                    }

                })
            },
            //添加审批流程
            showApply(eleid, item, edit) {
                var closeBtn = 0;
                if (edit == undefined) {
                    this.newApplyD = newApply
                }
                if (item != '') {
                    // console.log(item.CK00101)
                    gloabl.fethAsync(URL.APPLY_DETAILE, 'CK00101=' + item.CK00101 + '&userId=' + this.userId, res => {
                        if (res.success) {
                            closeBtn = 1;
                            this.showApplyDetaile = res.result;

                            if (item.isLook == 0) {
                                this.isLookApply(item);
                            }
                            if (this.showApplyDetaile != null) {
                                this.isOpenLayer(closeBtn, eleid)
                            }
                        } else {
                            gloabl.tipTools(res.msg);
                            //this.getApplyList();
                        }
                    })

                } else {
                    this.isOpenLayer(closeBtn, eleid)
                }
            },
            isOpenLayer(closeBtn, eleid) {
                var self = this;
                layer.open({
                    type: 1,
                    title: '',
                    closeBtn: closeBtn,
                    area: ['700px', '558px'],
                    content: $('#' + eleid),
                    cancel: function() {
                        self.$store.dispatch('CHOOSE_ALL_PERSON', []);
                        self.$store.dispatch('CHOOSE_ALL_INDEX', []);
                    }
                })
            },
            //是否查看，取消小红点
            isLookApply(item) {
                var param = 'CK00101=' + item.CK00101 + '&userId=' + this.userId;
                console.log(param);
                gloabl.fethAsync(URL.IS_LOOK_APPLY, param, res => {
                    if (res.success) {
                        item.isLook = 1;
                    }
                });
            },
            currPage() {
                this.page++;
                this.getApplyList(this.page, 20);
            }
            //查看详情
        },
        components: {
            addApply,
            applyDetaile
        }

    }
</script>
<style scoped>
    .apply-wapper {
        position: relative;
    }
    
    .apply-body {
        background: #efeff4;
        padding: 0 5px;
        margin: 0;
        width: 100%;
    }
    
    .apply-wapper h1 {
        background: #fff;
    }
    
    .apply-fuck {
        height: 60px;
        line-height: 60px;
        text-align: center;
        background: #fff;
        border-top: 1px solid #e5e6e8;
    }
    
    .apply-items {
        color: #8d959b;
        background: #fff;
        border-radius: 5px;
        padding: 10px;
        border: 1px solid #e5e6e8;
        margin-top: 10px;
    }
    
    .apply-items:hover {
        border: 1px solid deepskyblue;
    }
    
    .iconstauts {
        display: block;
        position: absolute;
        width: 15px;
        height: 15px;
        border: 1px solid #ccc;
        border-radius: 50%;
        font-size: 10px;
        background: #fff;
        right: -7.5px;
        bottom: 0;
        text-align: center;
        line-height: 13px;
    }
    
    .apply-person-item {
        position: relative;
        display: flex;
    }
    
    .apply-person-item-photo {
        position: relative;
    }
    
    .apply-footer {
        display: flex;
    }
    
    .apply-person {
        display: flex;
        align-items: center;
        flex: 4;
    }
    
    .apply_status {
        flex: 1;
        text-align: right;
    }
    
    .pagePute {
        padding: 5px 0;
        display: block;
        text-align: center;
        color: #009bff;
        margin-top: 10px;
    }
</style>