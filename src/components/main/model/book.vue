<template>
	<div class="">
		<h1>通讯录<span class="fr fs14 tabTitleColor"><i class="iconfont">&#xe64d;</i></span></h1>
		<div class="col-xs-12 book_tab">
			<ul>
				<li>
					<a href="javascript:;" class="bookActive right0 radTL3" id="booksTeams" @click="changeBookTab($event,1)">团队</a>
				</li>
				<li>
					<a href="javascript:;" class="right0" id="booksGroups" @click="changeBookTab($event,2)">频组</a>
				</li>
				<li>
					<a href="javascript:;" class="radRB3" id="booksStar" @click="changeBookTab($event,3)">星标</a>
				</li>
				<div class="clearfix"></div>
			</ul>
		</div>
		<div id="book_box" style="width: 100%;">
			<component :is="booksView" :list="booksList"></component>
		</div>

	</div>
</template>
<script type="text/javascript">
	import booksTeams from './booksTeams'
	import booksGroups from './booksGroups'
	import booksStar from './booksStar'
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	export default {
		data() {
			return {
				booksView: 'booksTeams',
				booksList: '',
				booksNum: '',
			}
		},
		components: {
			booksTeams,
			booksGroups,
			booksStar
		},
		ready() {
			gloabl.doResizeHeight();
			this.getBooksList([URL.BOOKS_TEMA_URL]);
		},
		vuex: {
			getters: {
				currentID: (state) => state.currentID,
			}
		},
		watch: {
			currentID: {
				//deep: true,
				handler() {
					console.log(11);
					if (this.currentID != '') {
						this.booksView = this.currentID;
						$('.book_tab li a').removeClass('bookActive');
						$('.book_tab li').eq(1).find('a').addClass('bookActive');
						this.getBooksList([URL.BOOKS_GROUP_URL]);
					} else {
						$('.book_tab li a').removeClass('bookActive');
						$('.book_tab li').eq(0).find('a').addClass('bookActive');
						this.booksView = 'booksTeams';
						this.getBooksList([URL.BOOKS_TEMA_URL]);
					}
				}
			}
		},
		methods: {
			changeBookTab(e, type) {
				$('.book_tab a').removeClass('bookActive');
				$(e.currentTarget).addClass('bookActive');
				this.booksView = e.target.id;
				if (type === 1) {
					this.getBooksList([URL.BOOKS_TEMA_URL]);
				} else if (type === 2) {
					this.getBooksList([URL.BOOKS_GROUP_URL], 2);
				} else {
					this.getBooksList([URL.BOOKS_FOR_STAR_URL], 3);
				}

			},
			getBooksList(url, index) {
				var parmas = '';
				if (index === 3) {
					parmas = 'UMT13=1'
				}
				gloabl.fethAsync(url, parmas, res => {
					if (res.success) {
						try {
							this.booksList = res.result;
						} catch (e) {
							throw e
						}

					}
				})

			}
		}

	}
</script>
