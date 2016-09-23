<template>
	<div class="book_group" id="tab_star">
		<div class="col-xs-12 itemInfo bottom0 itemSelect">
			<div class="col-xs-10 lh30 fs14">
				<i class="light-grey glyphicon glyphicon-triangle-top"></i>&nbsp;&nbsp;&nbsp;
				<span class="dark-gray bold"> 星标联系人</span>&nbsp;&nbsp;&nbsp;
				<i class="light-grey" v-cloak>{{starList.length}}人</i>
			</div>
		</div>
		<div class="col-xs-12 grop_item mt10 bookItem">
			<div class="col-xs-12 itemInfo bookList" v-for="item in starList">
				<div class="col-xs-2 itemHeader">
					<img class="img-circle" :src="item.url | getUrl" />
				</div>
				<div class="col-xs-10">
					<div class="row">
						<div class="col-xs-9 fs14" @click="currTager(item.userSid,'books')">
							<div class="row lh18">
								<span class="bold" v-text="item.username"></span>&nbsp;&nbsp;&nbsp;<span class="light-grey" v-text='item.job'></span>
							</div>
							<div class="row lh18 light-grey">
								<i class="iconfont fs16">&#xe602;</i><span v-text="item.phone"></span>
							</div>
						</div>
						<div class="col-xs-3 tr">
							<i class="iconfont fs18 mt8 star_color" @click="cancelStar(item.userSid,$index)">&#xe60b;</i>
							<i class="line_circle  circle_style" :class="[item.online==1 ? 'green':'grey']"></i>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>
<script type="text/javascript">
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	export default {
		props: ['list'],
		vuex: {
			getters: {
				nowCurrent(state) {
					return state.threads;
				}
			}
		},
		computed: {
			starList() {
				if (this.list != null) {
					return (this.list) instanceof Array ? this.list : [];
				} else {
					return [];
				}
			}
		},
		methods: {
			currTager(sid, p) {
				if (sid == 0) {
					this.$store.dispatch('SWITCH_RIGHT', 'ada', sid, p)
				} else {
					this.$store.dispatch('SWITCH_RIGHT', 'card', sid, p)
				}

			},
			cancelStar(sid, index) {
				var params = 'UMT10=' + sid + '&UMT22=0';

				if (sid !== 0) {
					gloabl.cancelPersonStar(params, loop => {
						if (loop) {
							if (sid == this.nowCurrent.sendid) {
								this.nowCurrent.isStar = 0;
								this.$store.dispatch('CHANGE_HEADER_NAME', this.nowCurrent);
							}
							this.list.splice(index, 1);
						}
					})

				}

			}

		}

	}
</script>
