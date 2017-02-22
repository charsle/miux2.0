<template>
	<div class="col-sm-12 relative">
		<div class="col-sm-6 searchPeo">
			<i class="iconfont">&#xe613;</i>
			<input type="text" name="" v-model="joinsearch" class="chooseInput" placeholder="请输入成员姓名" />
			<i class="iconfont fr pointer mr10">&#xe60c;</i>
			<div class="clearfix"></div>
		</div>
		<div class="col-sm-8">
			<div class="col-sm-6 grey_border">
				<ul class="choose_team">
					<tree-item :model="departmentList"></tree-item>
				</ul>
			</div>
           
			<div class="col-sm-6 grey_border left0 choose_item">
				<h5 class="choose_h5">人员列表<a href="javascript:;" class="light-blue fr" @click="chooseAllPer" v-if="!applyLayer">全选</a></h5>
				<div class="col-xs-12 p10 fs12" v-for="item in departmentPerson | filterBy joinsearch 'TM00306'" >
					<div v-if="item.TM00301!=myuserID" @click="choosePersonItem(item)">
					<div class="col-xs-2">
						<img :src="item.TM00321 | getUrl" width="32" height="32" style="border-radius: 50%;" />
					</div>
					<div class="col-xs-10 mt7" v-cloak>
						<div class="col-xs-6 plr10 td_basic">{{item.TM00306}}</div>
						<div class="col-xs-6 pr10 light-grey td_basic">{{item.TM00322}}</div>
					</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-sm-4 pl10">
			<div class="col-sm-12 grey_border choosed_item">
				<h5 class="choose_h5" v-cloak>已选对象&nbsp;&nbsp;<span class="light-grey">{{choosePerList.length}}个</span></h5>
				<div class="col-xs-12 p10" v-for="list in choosePerList">
					<div class="col-xs-2">
						<img :src="list.TM00321 | getUrl" width="32" height="32" style="border-radius: 50%;" />
					</div>
					<div class="col-xs-10 mt7" v-cloak>
						<div class="col-xs-5 plr10 td_basic">{{list.TM00306}}</div>
						<div class="col-xs-5 pr10 light-grey td_basic">{{list.TM00322}}</div>
						<div class="col-xs-2 tr"><i class="iconfont light-grey pointer" @click="deletePerson($index)">&#xe60c;</i></div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-xs-12 text-right p15">
			<a href="javascript:;" class="btn btn-sure" @click="sureChoosePerson">确定</a>
			<a href="javascript:;" class="btn btn-cancle" @click="closeLayer">取消</a>
		</div>
	</div>

</template>

<script type="text/javascript">
    import gloabl from '../../../api/globConfig'
    import * as URL from '../../../api/restfull'
    export default {
        props: ['chooseList'],
        data() {
            return {
                choosePerList: [],
                chooseIndex: [],
                myuserID: JSON.parse(gloabl.getCookie('allUserInfo')).user,
                groupInfo: JSON.parse(gloabl.getCookie('slingeGroupInfo')),
                applyLayer: false
            }
        },
        computed: {
            departmentList() {
                var b_list = this.chooseList;
                if (b_list == '' || b_list == undefined || b_list == null) {
                    return {};
                } else {
                    return b_list.orgList
                }
            },
            departmentPerson() {
                var b_list = this.chooseList;
                if (this.getDepartList == null) {
                    return b_list.userList ? b_list.userList : []
                } else {
                    return this.getDepartList ? this.getDepartList : []
                }
            }
        },
        vuex: {
            getters: {
                getDepartList(state) {
                    return state.departmentList;
                },
                getLayerObject(state) {
                    return state.layersObject;
                },
                getAera(state) {
                    return state.areaManage
                },
                personListID(state) {
                    return state.chooseSuerIndex;
                }
            }
        },
        watch: {
            personListID: {
                handler() {
                    if (this.personListID.length == 0) {
                        this.choosePerList = [];
                        this.chooseIndex = [];
                    }
                }
            },
            getLayerObject: {
                handler() {
                    if (this.getLayerObject.split(';')[1] == 'apply') {
                        this.applyLayer = true
                    } else {
                        this.applyLayer = false;
                    }
                }
            }
        },
        methods: {
            //单选
            choosePersonItem(item) {
                if (this.applyLayer) {
                    this.chooseIndex.$set(0, item.TM00301)
                    this.choosePerList.$set(0, item)
                } else {
                    if (this.chooseIndex.indexOf(item.TM00301) < 0) {
                        this.chooseIndex.push(item.TM00301);
                        this.choosePerList.push(item);
                    }
                }

            },
            //全选
            chooseAllPer() {
                for (var i = 0; i < this.departmentPerson.length; i++) {
                    this.choosePersonItem(this.departmentPerson[i]);
                }
            },
            //删除
            deletePerson(index) {
                this.choosePerList.splice(index, 1);
                this.chooseIndex.splice(index, 1);

            },
            //添加超级管理员喝区域管理员
            sureChoosePerson() {
                if (this.choosePerList.length > 100) {
                    gloabl.layer.msg("选择人员不能超过100人！");
                    return;
                }


                if (this.getLayerObject.split(';')[1] == 'manage') {
                    var params = 'TM00301=' + this.chooseIndex.toString();
                    this.addManagePerson([URL.ADD_SUPER_MANAGER_URL], params, (data) => {
                        this.$store.dispatch('SUPER_MANAGER', data);
                        this.choosePerList = [];
                        this.chooseIndex = [];
                    });
                } else if (this.getLayerObject.split(';')[1] == 'areas') {
                    var params = 'TM00301=' + this.chooseIndex.toString() + '&TM00101=' + this.getAera;
                    this.addManagePerson([URL.ADD_AREA_MANAGER_URL], params, (data) => {
                        this.$store.dispatch('SUPER_MANAGER', data);
                        this.choosePerList = [];
                        this.chooseIndex = [];
                    });
                } else if (this.getLayerObject.split(';')[1] == 'add') {

                    var params = 'TM00507=' + this.chooseIndex.toString() + '&TM00506=' + this.groupInfo.TM00201;
                    console.log(params);
                    this.addManagePerson(URL.GROUP_INVIRED_PARSON_URL, params, (data) => {
                        this.choosePerList = [];
                        this.chooseIndex = [];
                    });

                } else if (this.getLayerObject.split(';')[1] == 'apply') {
                    this.$store.dispatch('CHOOSE_ALL_PERSON', this.choosePerList);
                    this.$store.dispatch('CHOOSE_ALL_INDEX', this.chooseIndex);
                    this.closeLayer();
                } else {
                    layer.close(this.getLayerObject.split(';')[0]);
                    this.$store.dispatch('CHOOSE_ALL_PERSON', this.choosePerList);
                    this.$store.dispatch('CHOOSE_ALL_INDEX', this.chooseIndex);
                    this.$store.dispatch('AREA_MANAGE', '');
                    //	console.log(this.chooseIndex);
                    //this.choosePerList = [];
                    //this.chooseIndex = [];
                }

            },
            addManagePerson(url, params, _callback) {
                gloabl.fethAsync(url, params, res => {
                    if (res.success) {
                        gloabl.layer.msg("添加成功");
                        _callback(res.result)
                        setTimeout(() => {
                            gloabl.layer.close(this.getLayerObject.split(';')[0]);
                        }, 300)

                    } else {
                        gloabl.layer.msg(res.msg);
                    }
                })
            },

            closeLayer() {
                this.choosePerList = [];
                this.chooseIndex = [];
                gloabl.layer.close(this.getLayerObject.split(';')[0]);
            }

        }

    }
</script>