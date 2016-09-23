<template>
	<div class="col-xs-12 mt10">
		<div class="col-xs-2 d_headerPoto tc">
			<img :src="haederPic | getUrl" />
		</div>
		<div class="col-xs-10 bold light-grey">
			<div class="row fs12">我</div>
			<div class="row fs14 mt5">
				<input type="text" class="bottom_input" maxlength="16" name="" v-model="taskTitle" id="taskTitle" value="" placeholder="想做什么？" />
			</div>
		</div>
	</div>
	<div class="col-xs-12">
		<div class="col-xs-10 mt10 fr">
			<div class="row">
				<div class="col-xs-1 fs18 iconfont light-blue">&#xe605;</div>
				<div class="col-xs-10 fs12 lh25" v-show="isTipText" id="isTipText">
					<a class="light-blue underline" href="javascript:;" @click="addTip">添加提醒</a>
				</div>
				<div class="col-xs-10 fs12" v-show="isShowTip">
					<div class="col-xs-11">
						<div class="col-xs-4">
						<datetime :readonly="true"  format="MM-DD"></datetime>

						</div>
						<div class="col-xs-2 pl10">
							<select v-model="selectedTime" @change="changeTime" style="height:30px">
								<option value="1">上午</option>
								<option value="2">下午</option>
								<option value="3">晚上</option>
							</select>
						</div>
						<div class="col-xs-6 pl10">
							<!-- onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"  -->
							<input class="tc" type="text" id="tHour" v-model="tHour"  @keyup="tipStyle | debounce 1000"  maxlength="2" style="width: 30px;height:30px" />&nbsp;:&nbsp;
							<input class="tc" type="text" id="tMuni" v-model="tMuni"  maxlength="2" style="width: 30px;height:30px"  />
						</div>
					</div>
					<div class="col-xs-1 fs16 tr">
						<a class="light-grey iconfont" href="javascript:;" @click="deleTip">&#xe60c;</a>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-1 fs18 iconfont light-blue">&#xe637;</div>
				<div class="col-xs-10 fs12 lh25">
					<div class="col-xs-11">
						<div v-if="personList.length==0">
							<a class="light-blue underline" href="javascript:;" @click="addGoOn">添加参与人</a>
						</div>
						<div v-else v-cloak>
							<span id="personAdd"><span v-for="item in personList" class="bold" style="padding: 0 2px;">{{item.TM00306}};</span></span> 等{{personList.length}}人
							<a class="light-blue inlineblock ml10" href="javascript:;" @click="addGoOn">继续添加</a>
						</div>
					</div>
					<div class="col-xs-1 fs16 tr" v-if="personList.length>0 ?true :false">
						<a class="light-grey iconfont" href="javascript:;" @click="chooseAllPerson">&#xe60c;</a>
					</div>
				</div>
			</div>
		</div>
		<div class="clearfix"></div>
		<div class="col-xs-12 text-right p15">
			<a href="javascript:;" class="btn btn-sure" @click="newTask">确定</a>
			<a href="javascript:;" class="btn btn-cancle" @click="closeAllPerson">取消</a>
		</div>
	</div>
</template>
<script type="text/javascript">
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	import StringUtil from '../../../assets/js/stringUtil';
	import datetime from 'vue-datetimepicker';
	export default {

		data: function() {
			return {
				isTipText: true,
				isShowTip: false,
				newTaskList: '',
				tHour: '09',
				tMuni: '00',
				tData: '',
				taskTitle: '',
				selectedTime: 1,
				haederPic: JSON.parse(gloabl.getCookie('allUserInfo')).user.UM0111
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
		events: {
			"changeDate": function(msg) {
				this.tData = msg

			}
		},
		methods: {
			chooseAllPerson() {
				this.$store.dispatch('CHOOSE_ALL_PERSON', []);
				this.$store.dispatch('CHOOSE_ALL_INDEX', []);
			},
			closeAllPerson() {
				this.chooseAllPerson();
				layer.closeAll();
			},
			//添加提醒时间
			addTip: function() {
				this.isTipText = false;
				this.isShowTip = true;
			},
			//退出添加提醒时间
			deleTip: function() {
				this.isTipText = true;
				this.isShowTip = false;
			},
			//加载选择参与人公共模板
			addGoOn: function() {
				var self = this;
				var ll = layer.open({
					type: 1,
					shade: 0,
					title: '添加参与人',
					area: ['750px'],
					skin: '',
					content: $('#choosePerson1'),
				})
				self.$store.dispatch('LAYER_OBJECT', ll + ';' + '');
			},
			//上午、下午、晚上
			changeTime: function() {
				if (this.selectedTime == 1) {
					this.tHour = '09';
					this.tMuni = '00';
				} else if (this.selectedTime == 2) {
					this.tHour = '14';
					this.tMuni = '00';
				} else {
					this.tHour = '19';
					this.tMuni = '00';
				}
			},
			//新增行事历
			newTask: function() {
				var taskTitle = this.taskTitle;
				if (taskTitle == '') {
					gloabl.tipTools('请填写事项名称', '#taskTitle');
					return;
				}
				var allId = '';
				var timeAll = '';
				if (this.isShowTip) {
					var timeTip = 1;
					var dd = new Date();
					var y = dd.getFullYear();
					timeAll = y + '-' + this.tData + ' ' + this.tHour + ':' + this.tMuni + ':00';
				} else {
					var timeTip = 0;
				}
				var personAdd = $('#personAdd').text();
				var param = 'CT00104=' + taskTitle + '&CT00105=' + timeTip + '&CT00106=' + timeAll + '&CT00109=' + personAdd + '&CT00108=' + (this.personListIndex).toString();
				gloabl.fethAsync([URL.NEW_TASK_URL], param, res => {
					if (res.success) {
						this.$store.dispatch('TASK_LIST', res.result);
						this.chooseAllPerson();
						this.taskTitle = '';
						gloabl.layer.closeAll();
						gloabl.tipTools('创建成功');
					} else {
						gloabl.tipTools('创建失败');
					}
				})
			},
			//提醒时间（时分）
			tipStyle: function() {
				if (0 <= Number(this.tHour) < 14) {
					this.selectedTime = 1;
				} else if (14 <= Number(this.tHour) < 19) {
					this.selectedTime = 2;
				} else if (19 <= Number(this.tHour) < 24) {
					this.selectedTime = 3;
				} else if (Number(this.tHour) > 24 || Number(this.tHour) < 0) {
					gloabl.tipTools('请填写正确的时间', '#tHour');
					return;
				}
				//console.log(this.selectedTime, Number(this.tHour))
			}
		},
		components: {
			datetime
		}
	}
</script>
<style media="screen">
	.layui-layer-content {
		overflow: inherit!important;
	}
</style>
