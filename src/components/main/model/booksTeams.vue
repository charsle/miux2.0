<template>
	<div role="tabpanel" class="tab-pane fade book_team in active" id="tab_team">
		<div class="col-xs-12 bookList">
			<div v-show="home">
				<div class="col-xs-2 itemHeader">
					<img class="img-circle" :src="teamsNumber.TM00109 | getUrl" />
				</div>
				<div class="col-xs-10" v-cloak>
					<div class="col-xs-10 fs14">
						<div class="row lh18 break">
							{{teamsNumber.TM00106}}
						</div>
						<div class="row lh30 light-grey">
							<span class="light-blue">{{teamsNumber.onlineNum}}</span>/<span>{{teamsNumber.personNum}}人</span>
						</div>
					</div>
					<div class="col-xs-2 tr fs16 red">
						<i class="iconfont mt5 pointer">&#xe604;</i>
					</div>
				</div>
			</div>
			<div class="second-style" v-show="second" v-cloak>
				<ol class="breadcrumb" style="background: none;">
					<li>
						<a href="javascript:;" class="light-blue" @click="getDepartmentList('')">{{teamsNumber.TM00106}}</a>
					</li>
					<li v-for="item in chooseIndex" @click="deleteTip(item,$index)">
						<a href="javascript:;">{{item.name}}</a>
					</li>
				</ol>

			</div>
		</div>
		<div class="col-xs-12 top">
			<h4 class="p10"><span class="fs14 bold">下属部门</span>&nbsp;&nbsp;&nbsp;<span class="light-grey fs14">{{departmentList.length}}个</span></h4>
			<ul class="bookItem mt5 pb10 bookHover">
				<li v-for="item in departmentList" @click="getDepartmentList(item)">
					<div class="col-xs-10">
						<i class="light-grey glyphicon glyphicon-triangle-top"></i>&nbsp;&nbsp;&nbsp; {{item.name}}&nbsp;&nbsp;&nbsp;
						<i class="light-grey">{{item.personNum}}人</i>
					</div>
					<div class="col-xs-2 tr">
						<i class="iconfont fr light-blue" v-if="item.hasRegionManager">&#xe604;</i>
					</div>
				</li>
			</ul>
		</div>

		<div class="col-xs-12 top pb10">
			<h4 class="p10"><span class="fs14 bold">联系人</span>&nbsp;&nbsp;&nbsp;<span class="light-grey fs14">{{notDepartment.length}}个</span></h4>
			<ul class="bookItem mt5">
				<li v-for="item in notDepartment" @click="personCard(item)">
					<div class="col-xs-12 itemInfo bookList">
						<div class="col-xs-2 itemHeader" v-if="item.TM00305==2">
							<img class="img-circle filter_gray" :src="item.TM00321 | getUrl" />
						</div>
						<div class="col-xs-2 itemHeader" v-else>
							<img class="img-circle" :src="item.TM00321 | getUrl" />
						</div>
						<div class="col-xs-10">
							<div class="row">
								<div class="col-xs-10 fs14">
									<div class="row lh18 mt5 overflow nowrap">
										<span class="bold">{{item.TM00306}}</span>&nbsp;&nbsp;&nbsp;<span class="light-grey">{{item.TM00322}}</span>
									</div>
									<div class="row lh18" v-if="item.TM00308==null">
										<span class="light-grey fs10">您无权查看该手机号码</span>
									</div>
									<div class="row lh18" v-else>
										<i class="iconfont fl">&#xe602;</i>&nbsp;<span class="light-grey">{{item.TM00308}}</span>
									</div>
								</div>
								<div class="col-xs-2 pt15" v-if="item.TM00305!=2">
									<i class="line_circle green fr" v-if="item.isOnline==1"></i>
									<i class="line_circle grey fr" v-if="item.isOnline==0"></i>
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>

	</div>
</template>
<style lang="less">
	.second-style {
		height: 30px;
		line-height: 30px;
		padding: 0 5px;
		font-size: 14px;
	}
</style>
<script type="text/javascript">
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	export default {
		props: ['list'],
		data() {
			return {
				chooseIndex: [],
				home: true,
				second: false,
				teamsNumber: ''
			}
		},
		ready() {
			gloabl.fethAsync([URL.SEARCH_BOOKS_NUM_URL], '', res => {
				if (res.success) {
					this.teamsNumber = res.result;
				}
			})
		},
		computed: {
			departmentList() {
				var b_list = this.list;
				var newList = [];
				if (b_list != undefined) {
					for (let i = 0; i < b_list.length; i++) {
						if (b_list[i].id !== null) {
							newList.push(b_list[i]);
						} else {

						}
					}
				}

				return newList;
			},
			notDepartment() {
				var b_list = this.list;
				var notDepart = [];
				if (b_list != undefined) {
					for (let i = 0; i < b_list.length; i++) {
						if (b_list[i].id === null) {
							notDepart = (b_list[i].userList);
						}
					}
				}
				return notDepart;
			}
		},
		methods: {
			personCard(item) {
				var personList = JSON.parse(gloabl.getCookie('allUserInfo')).user;
				if (item.TM00305 != 2) {
					if (item.TM00301 == personList.UM0101) {
						this.$store.dispatch('SWITCH_RIGHT', 'pinfo');
					} else {
						this.$store.dispatch('SWITCH_RIGHT', 'card', item.TM00301, 'books');
					}
				} else {
					layer.msg('此账号未注册');
					return;
				}

			},
			deleteTip(item, index) {
				var arr = [];
				if (this.chooseIndex.length < 1) {
					return;
				}
				for (var i = 0; i < index; i++) {
					arr.push(this.chooseIndex[i]);
				}
				this.chooseIndex = arr;
				this.getDepartmentList(item);
			},
			//单选
			choosePersonItem(item) {
				if (item !== '' && item !== undefined) {
					this.chooseIndex.push(item);
				}

				//				if(item === '' || item === undefined) {
				//					this.chooseIndex = [];
				//				} else {
				//					if(this.chooseIndex.length === 0) {
				//						this.chooseIndex.push({
				//							name: item.name,console
				//							id: item.id
				//						});
				//					} else {
				//						for(var i = 0; i < this.chooseIndex.length; i++) {
				//							if(this.chooseIndex[i].id !== item.id) {
				//								this.chooseIndex.push({
				//									name: item.name,
				//									id: item.id
				//								});
				//							}
				//
				//						}
				//					}
				//				}
			},
			getDepartmentList(item) {

				var id = item ? item.id : ''
				gloabl.fethAsync([URL.BOOKS_TEMA_URL], 'TM00101=' + id, res => {
					if (res.success) {
						if (res.result !== null) {
							if (id == '') {
								this.chooseIndex = [];
							}
							this.list = res.result;
							if (id === '') {
								this.home = true;
								this.second = false;
							} else {
								this.home = false;
								this.second = true;
							}
							this.choosePersonItem(item);
						} else {
							this.notDepartment = [];
						}

					}
				})
			}
		}
	}
</script>
