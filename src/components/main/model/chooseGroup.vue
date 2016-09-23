<template>

	<div class="col-sm-12">
		<div class="col-sm-8">
			<div class="col-sm-6 grey_border">
				<a href="javascript:;">
					<i class="glyphicon glyphicon-triangle-bottom"></i>&nbsp;&nbsp;公开频道
				</a>
				<ul class="choose_team">
					<li v-for="item in publicList" @click="choosePinZu(item,$index)">
						<div class="col-xs-12 p10 fs12">
							<div class="col-xs-2">
								<img :src="item.TM00210 | getUrl" width="32" height="32" style="border-radius: 50%;" />
							</div>
							<div class="col-xs-10 mt7">
								<div class="col-xs-12 plr10 td_basic" v-cloak>
									<span class="tip_name">#频道</span>{{item.TM00206}}
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="col-sm-6 grey_border left0">
				<div class="col-xs-12 fs12">
					<a href="javascript:;">
						<i class="glyphicon glyphicon-triangle-bottom"></i>&nbsp;&nbsp;私密群组
					</a>
					<ul class="choose_team">
						<li v-for="item in secretList" @click="choosePinZu(item,$index)">
							<div class="col-xs-12 p10 fs12">
								<div class="col-xs-2">
									<img :src="item.TM00210 | getUrl" width="32" height="32" style="border-radius: 50%;" />
								</div>
								<div class="col-xs-10 mt7">
									<div class="col-xs-12 plr10 td_basic">
										<span class="tip_name" style="background: #009bff;">*群组</span>{{item.TM00206}}</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="col-sm-4 pl10">
			<div class="col-sm-12 grey_border">
				<h5 class="choose_h5">已选对象&nbsp;&nbsp;
					<span class="light-grey" v-cloak>{{choosePinZuList.length}}个</span>
				</h5>
				<div class="col-xs-12 p10" v-for="item in choosePinZuList">
					<div class="col-xs-2">
						<img :src="item.TM00210 | getUrl" width="32" height="32" style="border-radius: 50%;" />
					</div>
					<div class="col-xs-10 mt7">
						<div class="col-xs-10 plr10 td_basic" v-cloak>
							<span class="tip_name" v-if="item.TM00209==0">#频道</span>
							<span class="tip_name" style="background: #009bff;" v-if="item.TM00209==1">*群组</span>{{item.TM00206}}
						</div>
						<div class="col-xs-2 tr"><i class="iconfont light-grey pointer" @click="deleteChooseed($index)">&#xe60c;</i></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: ['chooseList'],
		data() {
			return {
				smpzList: [],
				gkpdList: [],
				choosePinZuList: [],
				chooseIndex: [],
				isNum: 0
			}
		},
		computed: {
			publicList() {
				return(this.chooseList.gkpd) instanceof Array ? this.chooseList.gkpd : [];
			},
			secretList() {
				return(this.chooseList.smpz) instanceof Array ? this.chooseList.smpz : [];
			}
		},
		methods: {
			choosePinZu(item, index) {
				if(this.chooseIndex.indexOf(item.TM00201) < 0) {
					this.chooseIndex.push(item.TM00201);
					this.choosePinZuList.push(item);
					this.$store.dispatch('CHOOSE_ALL_PERSON', this.choosePinZuList)
				}
			},
			deleteChooseed(index) {
				this.chooseIndex.splice(index, 1);
				this.choosePinZuList.splice(index, 1);
				this.$store.dispatch('CHOOSE_ALL_PERSON', this.choosePinZuList)
			}
		}
	}
</script>