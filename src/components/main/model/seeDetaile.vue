<template>
	<div class="col-xs-12 mt10">
		<div class="col-xs-2 d_headerPoto tc">
			<img :src="items.TM00321" />
		</div>
		<div class="col-xs-10 bold">
			<div class="row fs12 light-grey">{{items.CT00103}}</div>
			<div class="row fs14 mt5 lh30 bottom">{{items.CT00104}}</div>
		</div>
	</div>
	<div class="col-xs-12">
		<div class="col-xs-10 mt10 fr">
			<div class="row">
				<div class="col-xs-1 fs18 iconfont light-blue">&#xe605;</div>
				<div class="col-xs-10 fs12 lh25">
					<div v-if="items.CT00105==1">
						{{items.CT00106}}
					</div>
					<div v-else>
						<span class="light-blue">无提醒时间</span>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-1 fs18 iconfont light-blue">&#xe637;</div>
				<div class="col-xs-10 fs12 lh25">
					<div v-if="items.CT00109==''">
						<span class="light-blue">无参与人</span>
					</div>
					<div v-else class="bold">
						{{items.CT00109}}
					</div>

				</div>
			</div>
			<div class="row light-grey checkbox mt5">
				<label v-if="index==1" >
					<input type="hidden" name="name" :value="checked" id="isChooseChecked">
     				<input type="checkbox" v-model="checked" id="checkbox" >完成该事项
   				</label>
				<label v-if="index==2">
     				<input type="checkbox" checked="checked" disabled="disabled">完成该事项
   				</label>
			</div>
		</div>
		<div class="clearfix"></div>

	</div>
</template>
<script type="text/javascript">
	export default {
		props: ['items', 'index'],
		data() {
			return {
				checked: false
			}
		},
		// vuex: {
		// 	getters: {
		// 		getTaskChecked(state) {
		// 			return state.taskChecked;
		// 		}
		// 	}
		// },
		watch: {
			checked: {
				handler() {

					this.$store.dispatch('TASK_CHECKED', this.checked);
					// console.log(this.checked);
				}
			},
			// getTaskChecked: {
			// 	handler() {
			// 		this.checked = this.getTaskChecked
			// 	}
			// }
		},

	}
</script>
