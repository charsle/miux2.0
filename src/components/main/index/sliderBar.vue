<template>
	<div>
		<div class="HOME_SLIDER_LIST LIST_ITEMS">
			<!--l左边tab-->
			<div class="slide_tab">
				<a href="javascript:;" @click="tabChange('message')" :class="{'v-link-active':isActive}">最近消息</a>
				<a href="javascript:;" @click="tabChange('contact')" :class="{'v-link-active':noActive}">最常联系</a>
			</div>
			<div class="slide_items" id="slid_bars">
				<!--加载模版列表入口-->
				<component :is="currentView" transition="fade" transition-mode="out-in"></component>
				<!--<div class="home_task">正在执行的任务（2）</div>-->

			</div>
		</div>
		<div class="col-xs-12" id="left_task">
			<div class="row white fs14 paddStyle lh25" @click="currentRightTag('task')">
				正在执行的任务&nbsp;<span v-if="taskList.length>4">(4)</span>
				<span v-else>({{taskList.length}})</span>
				<i class="glyphicon glyphicon-menu-right fr lh25"></i>
				<div class="clearfix"></div>
			</div>
			<div class="col-xs-12 paddStyle lh20" v-for="item in taskList"  v-cloak>
				<div v-if="$index<4">
				<div class="col-xs-10 task_left_title" @click="overTaskShow(item.CT00101,$index)">
					<div class="row fs12 white">
						{{item.CT00104}}
					</div>
					<div class="row fs10 light-grey">
						{{item.CT00103}}&nbsp;&nbsp;{{item.CT00110 | reverseTime}}
					</div>
				</div>
				<div class="col-xs-2 tr fs16">
					<div class="row white">
						<i class="iconfont" @click="overTaskChoose(item.CT00101,$index)">&#xe644;</i>
					</div>
					<div class="row red">
						<i class="iconfont">&#xe605;</i>
					</div>
				</div>
				</div>
			</div>
		</div>

		<div class="col-xs-12 pointer" id="myInfo">
			<div class="row infoBac">
				<div class="col-xs-2">
					<a href="javascript:;" data-lightbox="miux-img" :href="info.UM0111 | getUrl">
						<img :src="info.UM0111 | getUrl" class="img-circle" width="45" height="45px" id="userSmillImg" />
					</a>
				</div>
				<div class="col-xs-10 light-grey pl10" @click="currentRightTag('setting')" v-cloak>
					<div class="row fs14 mt5">{{info.UM0102}}</div>
					<div class="row fs12">{{info.UM0118}}</div>
				</div>
			</div>
			<div class="row infoBac light-grey break single">
				<span v-if="info.UM0116!=''">{{info.UM0116}}</span>
				<span v-else>暂无签名，去设置吧</span>
			</div>
		</div>
		<div id="showDetaile" style="display: none;">
			<see-detaile :items="taskInfoDet" :index="taskNumber"></see-detaile>
		</div>
	</div>
</template>
<script type="text/javascript">
    import contactList from './contactList';
    import messageList from './messageList';
    import seeDetaile from '../model/seeDetaile';
    import gloabl from '../../../api/globConfig'
    import * as URL from '../../../api/restfull'
    import {
        sendRegisterInfo
    } from '../../../assets/js/websocket';


    export default {
        data() {
            return {
                isActive: true,
                noActive: false,
                currentView: 'message',
                info: Object,
                taskList: [],
                taskInfoDet: '',
                taskNumber: '1',
                checked: false
            }
        },
        vuex: {
            getters: {
                getNewTask(state) {
                    return state.taskList;
                },
                getFinshTaskID(state) {
                    return state.finishTaskID;
                },
                getTaskChecked(state) {
                    return state.taskChecked;
                }
            }
        },
        watch: {
            getNewTask: {
                //deep: true,
                handler() {
                    this.taskList.push(this.getNewTask);
                    this.computedHeight('add');
                }
            },
            getFinshTaskID: {
                handler() {
                    for (let item of this.taskList) {
                        if (this.getFinshTaskID == item.CT00101) {
                            this.taskList.$remove(item);
                            this.computedHeight('del');
                        }
                    }
                    console.log(1);
                }
            },
            getTaskChecked: {
                handler() {
                    this.checked = this.getTaskChecked
                }
            }
        },
        ready() {
            var _hash = (location.href)
            if (_hash.indexOf('contact') > -1) {
                this.isActive = false
                this.noActive = true
                this.currentView = 'contact';
            } else if (_hash.indexOf('message') > -1) {
                this.isActive = true
                this.noActive = false
                this.currentView = 'message';
            }
            this.getUserInfo();
            this.getTaskInfo();
        },
        methods: {
            computedHeight(type) {
                if (this.taskList.length <= 4) {
                    var height = document.getElementById('slid_bars').style.height
                    if (type == 'add') {
                        document.getElementById('slid_bars').style.height = (Number(height.replace('px', '')) - 50) + 'px';
                    } else {
                        // console.log('222', '----')
                        document.getElementById('slid_bars').style.height = (Number(height.replace('px', '')) + 50) + 'px';
                    }
                }
            },
            currentRightTag(type) {
                this.$store.dispatch('SWITCH_RIGHT', type);
            },
            //勾选完成行事历
            overTaskChoose(tid, index) {
                var params = 'CT00101=' + tid + '&CTT05=1';
                var textTip = "您确定已完成此事项任务？";
                layer.confirm(textTip, () => {
                    gloabl.fethAsync(URL.REFRESH_TASK_URL, params, res => {
                        if (res.success) {

                            this.$store.dispatch('FINISH_TASH_ID', tid);

                            layer.closeAll();
                        } else {
                            gloabl.tipTools('操作失败');
                        }

                    });
                })
            },
            tabChange(tag) {
                if (tag === 'message') {
                    this.isActive = true
                    this.noActive = false
                } else {
                    this.isActive = false
                    this.noActive = true
                }
                this.currentView = tag;
            },
            getUserInfo() {
                gloabl.fethAsync([URL.SETTING_URL], '', res => {
                    if (res.success) {
                        this.info = res.result;
                        sendRegisterInfo(this);
                    }

                });
            },
            getTaskInfo() {
                gloabl.fethAsync([URL.GET_LEFT_TASKDONE_LIST], '', res => {

                    if (res.success) {
                        this.taskList = res.result;
                    }

                });
            },
            overTaskShow(taskSid, numTask) {
                var self = this;
                self.$store.dispatch('TASK_CHECKED', false);
                gloabl.fethAsync([URL.TASK_DETAILE_URL], 'CT00101=' + taskSid, res => {
                    if (res.success) {
                        this.taskInfoDet = res.result;
                        gloabl.layer.open({
                            type: 1,
                            title: '事项详情',
                            area: ['600px'],
                            skin: '',
                            btn: ['确定'],
                            content: $('#showDetaile'),
                            yes() {
                                if (self.checked) {
                                    var params = 'CT00101=' + taskSid + '&CTT05=1';
                                    gloabl.fethAsync([URL.REFRESH_TASK_URL], params, res => {
                                        if (res.success) {
                                            self.$store.dispatch('FINISH_TASH_ID', taskSid);
                                            self.$store.dispatch('TASK_CHECKED', false);

                                            gloabl.tipTools('该事项已标记完成');
                                            gloabl.layer.closeAll();
                                        } else {
                                            gloabl.tipTools('操作失败');
                                        }
                                    })
                                }
                                gloabl.layer.closeAll();
                            }
                        });
                    } else {
                        gloabl.tipTools('操作失败');
                    }

                })
            }
        },
        components: {
            contact: contactList,
            message: messageList,
            seeDetaile
        }
    }
</script>