<template>
	<div class="HOME_CONTENT_HEADERT">
		<!--右边头部信息-->

		<div class="CONTENT_HEADERT_LEFT fl">
			<ul v-cloak>
				<li v-if="nowCurrent.hasOwnProperty('sendid')" >
					<a v-link="{name:'message',params:nowCurrent}">
						<span class="tip_name">
						<i v-if="nowCurrent.sendtype==1">个人</i>
						<span v-if="nowCurrent.sendtype==2">
							<i v-if="getGroupList.TM00209==1">群组</i><i v-else>频组</i>
						</span>
						<i v-if="nowCurrent.sendtype==3">公告</i>
						</span>
						<i v-if="nowCurrent.sendid!=0" class="iconfont fs12 star_color">
						<i class="iconfont fs12 star_color" v-if="nowCurrent.sendtype==1 && nowCurrent.isStar==1" v-if="nowCurrent.sendid!=0" @click="markPersonStar(nowCurrent.sendid,0)">&#xe60b;</i>
						<i class="iconfont fs12 light-grey" v-if="nowCurrent.sendtype==1 && nowCurrent.isStar==0" @click="markPersonStar(nowCurrent.sendid,1)">&#xe60b;</i>
						</i>
						{{nowCurrent.name}}
					</a>
				</li>
				<li v-if="isShowNoticeTab">
					<a v-link="{path:'/notice/detaile'}" class="light-grey"><span class="tip_name">公告</span>团队公告 公告详情
					</a>
					<i class="iconfont light-grey pointer" @click="closeTab(1)">&#xe654;</i>
				</li>
				<li v-if="isShowManageTab">
					<a v-link="{path: '/manage/tram'}"><span class="tip_name">频组</span>团队管理</a>
					<i class="iconfont light-grey pointer" @click="closeTab(2)">&#xe654;</i>
				</li>
			</ul>
			<div class="clearfix"></div>
		</div>
		<div class="fr">
			<div class="light-grey fl search_all">
				<i class="iconfont fs18">&#xe61b;</i>
				<input type="text" class="checkAll" v-model="mainValue" @keyup="searchMain($event) | debounce 500" placeholder="搜索..." />
				<i class="iconfont fs18 pointer" v-show="isShowDel" @click="clearMainValue">&#xe60c;</i>
				<div class="searchTip" v-show="isShowDel" v-cloak>
					<div id="searchTipResult">

						<a v-for="item in searchList" href="javascript:;" class="overflow nowrap" @click="showCardMessage(item)">{{item.cname}}
							<span v-if="item.type!=2">-{{item.position!=''?item.position:'暂无职位'}}</span> </a>
					</div>
				</div>
			</div>
			<div class="CONTENT_HEADERT_RIGHT fr">
				<a v-link="{path: '/manage/tram'}" class="icon_manage" title="团队管理" v-if="isManage.UM0121!=0" @click="showManageTab"><i class="icon iconfont">&#xe603;</i></a>
				<a href="javascript:;" class="icon_books" @click="currentRightTag('books','')" title="通讯录"><i class="icon iconfont">&#xe616;</i></a>
				<a href="javascript:;" class="icon_doc" @click="currentRightTag('doc')" title="文档库"><i class="icon iconfont">&#xe615;</i></a>
				<a href="javascript:;" class="icon_apply" @click="currentRightTag('apply')" title="审批流程"><i class="iconfont icon-yinzhang2"></i></a>
				<a href="javascript:;" class="icon_task" @click="currentRightTag('task')" title="行事历"><i class="icon iconfont">&#xe605;</i></a>
				<a href="javascript:;" class="icon_about" @click="currentRightTag('about')" title="与我有关"><i class="icon iconfont">&#xe60a;</i></a>
				<a href="javascript:;" class="icon_star" @click="currentRightTag('star')" title="星标收藏"><i class="icon iconfont">&#xe60b;</i></a>
				<!--<a href="javascript:;" class="icon_wall" title="便签墙"><i class="icon iconfont">&#xe614;</i></a>-->
				<span><i class="icon iconfont" @click="showMoreContent">&#xe61c;</i></span>
				<div class="tip-popover bottom" v-show="isTipShow">
					<div class="arrow" style="left: 73.0769230769231%;"></div>
					<div class="tip-popover-content">
						<a href="javascript:;" class="icon_setting" @click="currentRightTag('setting')" title="设置"><i class="icon iconfont">&#xe603;</i>个人设置</a>
						<a href="javascript:;" class="icon_help" @click="currentRightTag('info')" title="帮助与反馈"><i class="icon iconfont">&#xe61d;</i>帮助与反馈</a>

						<!--<a href="javascript:;" class="icon_wall" title="便签墙"><i class="icon iconfont">&#xe614;</i>便签墙</a>-->
						<a href="javascript:;" class="icon_star" @click="currentRightTag('star')" title="星标收藏"><i class="icon iconfont">&#xe60b;</i>星标收藏</a>
						<a href="javascript:;" class="icon_about" @click="currentRightTag('about')" title="与我有关"><i class="icon iconfont">&#xe60a;</i>与我有关</a>
						<a href="javascript:;" class="icon_task" @click="currentRightTag('task')" title="行事历"><i class="icon iconfont">&#xe605;</i>行事历</a>
						<a href="javascript:;" class="icon_apply" @click="currentRightTag('apply')" title="审批流程"><i class="iconfont icon-yinzhang2">;</i>审批流程</a>
						<a href="javascript:;" class="icon_doc" @click="currentRightTag('doc')" title="文档库"><i class="icon iconfont">&#xe615;</i>文档库</a>
						<a href="javascript:;" class="icon_books" @click="currentRightTag('books','')" title="通讯录"><i class="icon iconfont">&#xe616;</i>通讯录</a>
						<a v-link="{path: '/manage/tram'}" class="icon_manage" title="团队管理" v-if="isManage.UM0121!=0"><i class="icon iconfont">&#xe603;</i>团队管理</a>
					</div>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
		<div class="fr tr" style="margin-right: 10px;">
			<div class="fs16 lh40">
				<span v-if="nowCurrent.sendtype==3 && isManage.UM0121!=0"><a href="javascript:;" class="btn btn-notice btn-sm mr10" @click="sendNoctice">发起公告</a>
				<a href="javascript:;" class="btn btn-vote btn-sm" @click="sendVote">发起投票</a>
				</span>
				<div class="fl tr" v-cloak>
					<div v-if="getGroupList.length!=0 && nowCurrent.sendtype==2">
						<a href="javascript:;" class="light-blue" @click="currentRightTag('group',getGroupList.TM00201)">
							<i class="iconfont" title="频组信息">&#xe637;</i>
						</a>&nbsp;&nbsp;
						<span class="light-grey">
							<i class="iconfont">&#xe612;</i>&nbsp;
							{{getGroupList.onlinePersonNum==null?0:getGroupList.onlinePersonNum}}/{{getGroupList.personNum==null?0:getGroupList.personNum}}</span>
					</div>
				</div>
				<!--<div class="fr pl10">
					<input type="text" class="form-control mt7" name="" placeholder="搜索..." />
				</div>-->
			</div>

		</div>
		<div id="voteTemplate" style="display: none;">
			<create-vote></create-vote>
		</div>
		<div id="noticeTemplate" style="display: none;">
			<create-notice></create-notice>
		</div>
	</div>

</template>
<style type="text/css">
    .w100 {
        width: 100%;
    }
    
    .w90 {
        width: 90%;
    }
</style>
<script type="text/javascript">
    import createVote from '../model/createVote'
    import createNotice from '../model/createNotice'
    import gloabl from '../../../api/globConfig'
    import * as URL from '../../../api/restfull'
    export default {
        components: {
            createVote,
            createNotice
        },
        data() {
            return {
                isTipShow: false,
                isManage: JSON.parse(gloabl.getCookie('allUserInfo')).user,
                isContact: false,
                isShowManageTab: false,
                isShowNoticeTab: false,
                sid: '',
                searchList: [],
                mainValue: '',
                isShowDel: false,
                nowCurrent: JSON.parse(sessionStorage.getItem('firstTab'))
            }
        },
        vuex: {

            getters: {
                threadsCurrent(state) {
                    return state.threads
                },
                noticeTab(state) {
                    return state.noticeTab;
                },
                getGroupList(state) {
                    return state.showGroupIcon;
                }
            }
        },
        watch: {
            noticeTab: {
                handler() {
                    this.isShowNoticeTab = this.noticeTab;
                }
            },
            threadsCurrent: {
                handler() {
                    this.nowCurrent = this.threadsCurrent.hasOwnProperty('sendid') ? this.threadsCurrent : nowCurrent;
                }
            }
        },
        ready() {
            this.sid = sessionStorage.getItem('sid');
            var host = location.hash;
            if (host.indexOf('tram') > -1) {
                this.isShowManageTab = true;
                this.isContact = false;
            } else {
                this.isShowManageTab = false;
                this.isContact = true
            }
            if (host.indexOf('notice') > -1) {
                this.isShowNoticeTab = this.noticeTab == false ? true : true;
            } else {
                this.isShowNoticeTab = false;
            }
        },
        methods: {
            closeTab(type) {
                if (type == 1) {
                    this.isShowNoticeTab = false;
                    this.$route.router.go({
                        name: 'contact',
                        params: {
                            name: '团队公告',
                            sendid: 1,
                            sendtype: 3,
                        }
                    })
                } else {
                    this.$route.router.go({
                        name: 'contact',
                        params: {
                            name: this.nowCurrent.name,
                            sendid: this.nowCurrent.sendid,
                            sendtype: this.nowCurrent.sendtype,
                        }
                    })
                    this.isShowManageTab = false;
                }

            },
            currentRightTag(type, id) {
                this.$store.dispatch('SWITCH_RIGHT', type, id)
            },
            showManageTab() {
                this.isShowManageTab = true;
            },
            showCardMessage(item) {
                if (this.isManage.UM0101 == item.sid) {
                    this.$store.dispatch('SWITCH_RIGHT', 'pinfo');
                } else {
                    this.$store.dispatch('SWITCH_RIGHT', 'card', item.sid);

                }
            },
            //发起公告
            sendNoctice() {
                var ue = null;
                var _this = this;
                layer.open({
                    type: 1,
                    title: '发起公告',
                    content: $('#noticeTemplate'),
                    area: ['800px', '550px'],
                });
            },
            //发起投票
            sendVote() {
                layer.open({
                    type: 1,
                    title: '发起投票',
                    content: $('#voteTemplate'),
                    area: ['430px', 'auto'],
                });
            },
            showMoreContent(e) {
                if (this.isTipShow) {
                    this.isTipShow = false
                } else {
                    var ev = e || window.event;
                    this.isTipShow = true;
                    if (ev.stopPropagation) {
                        ev.stopPropagation();
                    } else if (window.event) {
                        window.event.cancelBubble = true; //兼容IE
                    }
                    document.onclick = () => {
                        this.isTipShow = false
                    }
                    $('.tip-popover').click(function(e) {
                        var ev = e || window.event;
                        if (ev.stopPropagation) {
                            ev.stopPropagation();
                        } else if (window.event) {
                            window.event.cancelBubble = true; //兼容IE
                        }
                    })
                }
            },
            //添加或者取消星标
            markPersonStar(sid, type) {
                var params = 'UMT10=' + sid + '&UMT22=' + type;
                gloabl.cancelPersonStar(params, loop => {
                    if (type == 1) {
                        this.nowCurrent.isStar = 1;
                    } else {
                        this.nowCurrent.isStar = 0;
                    }

                })
            },
            /*
             * 主页面搜索
             */
            searchMain(e) {
                var ev = e || window.event;
                this.isShowDel = true;
                if (ev.stopPropagation) {
                    ev.stopPropagation();
                } else if (window.event) {
                    window.event.cancelBubble = true; //兼容IE
                }
                document.onclick = () => {
                    this.isShowDel = false
                }
                $('.searchTip').click(function(e) {
                    var ev = e || window.event;
                    if (ev.stopPropagation) {
                        ev.stopPropagation();
                    } else if (window.event) {
                        window.event.cancelBubble = true; //兼容IE
                    }
                })
                if (this.mainValue == '') {
                    this.clearMainValue();
                } else {
                    gloabl.fethAsync(URL.SEARCH_MAIN_URL, 'TMT01=' + this.mainValue, res => {
                        if (res.success) {
                            if (res.result.length > 0) {
                                this.isShowDel = true;
                                this.searchList = res.result;
                                gloabl.doResizeHeight();
                            }
                        }
                    })
                }
            },
            clearMainValue() {
                this.isShowDel = false;
                this.mainValue = '';
                this.searchList = [];

            }
        }
    }
</script>