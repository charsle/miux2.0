<template>
	<div class="col-sm-12">
		<div class="col-sm-8 grey_border chooseStarBac">
			<div class="choose_stat_list">
				<ul>
					<li v-for="item in chooseList" v-if="item.userSid!=0" class="jiClass" @click="chooseStarList(item)">
						<div class="row">
							<div class="col-xs-2">
								<img :src="item.url | getUrl" width="32" height="32" style="border-radius: 50%;" />
							</div>
							<div class="col-xs-10 mt7" v-cloak>
								<div class="col-xs-6 plr10 td_basic">{{item.username}}</div>
								<div class="col-xs-6 pr10 light-grey td_basic">{{item.job}}</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="col-sm-4 pl10">
			<div class="col-sm-12 grey_border">
				<h5 class="choose_h5" v-cloak>已选对象&nbsp;&nbsp;<span class="light-grey">{{chooseStarListItem.length}}个</span></h5>
				<div class="col-xs-12 p10" v-for="item in chooseStarListItem">
					<div class="col-xs-2">
						<img :src="item.url | getUrl" width="32" height="32" style="border-radius: 50%;" />
					</div>
					<div class="col-xs-10 mt7" v-cloak>
						<div class="col-xs-5 plr10 td_basic">{{item.username}}</div>
						<div class="col-xs-5 pr10 light-grey td_basic">{{item.job}}</div>
						<div class="col-xs-2 tr"><i class="iconfont light-grey pointer" @click="deleteChooseed($index)">&#xe60c;</i></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style type="text/css">
	.choose_stat_list {
		overflow: auto;
	}
	
	.choose_stat_list li:nth-child(2n) {
		border-left: 1px dashed #ccc;
		padding-left: 10px;
	}
	
	.choose_stat_list li {
		float: left;
		width: 48%;
		margin-left: 5px;
		margin-top: 5px;
		padding: 5px;
	}
	
	.ouClass {
		background: #f00;
	}
	
	.jiClass {
		background: #F1F4F5;
	}
</style>
<script type="text/javascript">
	export default {
		props: ['chooseList'],
		data() {
			return {
				chooseStarListItem: [],
				chooseIndex: [],
			}
		},
		methods: {
			chooseStarList(item) {
				if(this.chooseIndex.indexOf(item.userSid) < 0) {
					this.chooseIndex.push(item.userSid);
					this.chooseStarListItem.push(item);
					this.$store.dispatch('CHOOSE_ALL_PERSON', this.chooseStarListItem)
				}
			},
			deleteChooseed(index) {
				this.chooseIndex.splice(index, 1);
				this.chooseStarListItem.splice(index, 1);
				this.$store.dispatch('CHOOSE_ALL_PERSON', this.chooseStarListItem)
			}
		}

	}
</script>