<template>
	<div class="" style="padding-left:10px ;padding-right: 10px;">
		<div class="col-sm-12">
			<div class="col-sm-5 book_tab">
				<ul class="choose_tab">
					<li class="right0 bookSelect radTL3" id="chooseTeams" @click="changeChooseTab($event,1)">团队</li>
					<li class="right0" id="chooseGroup" @click="changeChooseTab($event,2)" v-if="typeJoin==1?false:true">频组</li>
					<li class="radRB3" id="chooseStar" @click="changeChooseTab($event,3)" v-if="typeJoin==1?false:true">星标</li>
					<div class="clearfix"></div>
				</ul>
			</div>
			<div class="col-sm-1"></div>

		</div>
		<div class="clearfix"></div>
		<component :is="chooseView" :choose-list="chooseList"></component>
	</div>
</template>
<script type="text/javascript">
	import chooseTeams from './chooseTeams'
	import chooseStar from './chooseStar'
	import chooseGroup from './chooseGroup'
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	export default {
		props: ['typeJoin'],
		data() {
			return {
				chooseView: 'chooseTeams',
				chooseList: '',
				userInfo: JSON.parse(gloabl.getCookie('allUserInfo')).user
			}
		},
		components: {
			chooseTeams,
			chooseGroup,
			chooseStar
		},
		ready() {
			this.getBooksList([URL.SEARCH_TEMA_URL]);
		},
		methods: {
			changeChooseTab(e, type) {
				$('.choose_tab li').removeClass('bookSelect');
				//this.$store.dispatch('CHOOSE_ALL_PERSON', [])
				if (type === 1) {
					this.getBooksList([URL.SEARCH_TEMA_URL]);
				} else if (type === 2) {
					this.getBooksList([URL.BOOKS_GROUP_URL]);
				} else {
					this.getBooksList([URL.BOOKS_FOR_STAR_URL]);
				}
				$(e.currentTarget).addClass('bookSelect');
				this.chooseView = e.target.id;
			},
			getBooksList(url) {
				var param = '';
				//				if(this.userInfo.UM0121 != '-1' && this.userInfo.UM0121 != 0) {
				//					param = 'TMT01=1'
				//				}
				gloabl.fethAsync(url, param, res => {
					if (res.success) {
						this.chooseList = res.result;
					}
				})

			}
		}

	}
</script>
