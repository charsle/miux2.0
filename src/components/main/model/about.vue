<template>
	<div>
		<h1>与我有关<span class="fr fs14 tabTitleColor"><i class="iconfont">&#xe64d;</i></span></h1>
		<div class="col-xs-12">
			<h4 class="aboutMe_title">高亮关键词设置</h4>
			<div class="row editKey" style="border: 1px solid #ededed;">
				<div class="col-xs-10" v-show="setKeyWords">
					<input type="text" class="setWords" v-model="keyWords" name="valLen" placeholder="请输入关键值" />
				</div>
				<div class="col-xs-10 showKeyWords" v-show="showKeyWords">
					<a href="javascript:;" v-for="item in wordKeysList" track-by="$index">{{item}}<i class="iconfont" @click="removeKey(item)">&#xe60c;</i></a>
				</div>

				<div class="col-xs-2 dark-gray tr">
					<i class="iconfont fs24 pointer" style="color: rgb(100, 201, 106);" @click="addKeyWords()" v-show="showIcon">&#xe63c;</i>
					<i class="iconfont fs24 pointer" @click="eiditKeyWords" v-show="setIcon">&#xe646;</i>
				</div>
			</div>
			<div class="row fs12 mt10">
				<i class="glyphicon glyphicon-info-sign light-grey fs14"></i> 最多6个关键词，单个词不超过10个字符，关键词间请用分号隔离。
			</div>
		</div>
		<div id="selfMessage" class="col-xs-12">
			<div class="col-xs-12" v-if="aboutList.length !== 0">
				<div class="col-xs-12 itemInfo" style="overflow:auto;" v-for="item in aboutList">
					<div class="col-xs-9">
						<div class="col-xs-2 itemHeader">
							<img class="img-circle" :src="teamUrl" />
						</div>
						<div class="col-xs-10 pl10 fs14" v-cloak>
							<div class="row bold">
								{{item.UM1003}}
							</div>
							<div class="row fs12">
								{{item.UM0118}}
							</div>
							<div class="row mt5 tabText">
								{{{item.UM1010 | filterAt}}}
							</div>
						</div>
					</div>
					<div class="col-xs-2 tr light-grey fs12" v-cloak>
						<div class="row">
							{{item.UM1007 | reverseTime}}
						</div>
						<div class="row tabDel fs16 mt5">
							<a href="javascript:;" class="iconfont light-grey" @click="deleteAbout(item.UM1001,$index);">&#xe630;</a>
						</div>
					</div>
				</div>
				<div class="light-blue pointer tc mt15" @click="loadMore" id="aboutMore">
					{{moreAbout}}
				</div>
			</div>
			<div v-else>
				<div class="col-xs-12 tc fs14 mt80">
					暂无与我相关信息
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	import StringUtil from '../../../assets/js/stringUtil';

	export default {
		data() {
			return {
				aboutList: '',
				keyWords: '',
				setKeyWords: '',
				showKeyWords: '',
				wordKeysList: '',
				setIcon: '',
				showIcon: '',
				pagen: '',
				teamUrl: '',
				moreAbout: ''
			}
		},

		filters: {
			filterAt(val) {
				var result = '';
				if (typeof val != 'undefined') {
					var reg = /<at>([^<>]*),([^<>]*)<\/at>/gi;
					result = val.toString().replace(reg, '<a href="javascript:;"  data-id="$1">$2</a>');
				}
				if (result.length > 2 && result.substring(0, 2) == '{"') {
					result = JSON.parse(result).contentWord;
				}
				return result;
			}
		},
		ready() {
			var _this = this;
			this.initAboutList(1);
			this.searchKeyWorld();
			gloabl.doResizeHeight();
			var _user = JSON.parse(gloabl.getCookie('allUserInfo'));
			this.teamUrl = _user.company.TM00109;
			setTimeout(() => {
				$('#selfMessage .tabText a').click(function(ev) {
					ev.stopPropagation();
					var id = $(this).data('id');

					if (id != 0) {
						_this.$store.dispatch('SWITIH_RIGHT', 'card', id, 'about');

					}
				})
			}, 200)

		},
		methods: {
			/*
			 * 与我相关列表查询
			 */
			initAboutList(pageNumber) {
				var _this = this;
				var pageSize = 10;
				this.pagen = pageNumber;
				var param = 'UMT15=1&UMT16=' + pageSize * this.pagen;
				gloabl.pagesNum([URL.ABOUT_URL], param, function(re) {
					var r = re.pageUtil;
					_this.aboutList = r.pageList;
					if (r.nums == r.pageList.length) {
						$('#aboutMore').hide();
					} else {
						$('#aboutMore').show();
						_this.moreAbout = '加载更多';
					}
				});
			},
			/*
			 * 新增/修改关键字
			 */
			addKeyWords(content) {
				var kwds = '';
				if (typeof content != 'undefined') {
					var index = this.wordKeysList.indexOf(content);
					this.wordKeysList.splice(index, 1);
					var wkl = this.wordKeysList;
					this.keyWords = '';
					for (var i in wkl) {
						this.keyWords += wkl[i] + ';';
					}
					if (this.keyWords.length > 0) {
						kwds = this.keyWords.substring(0, this.keyWords.length - 1);
					}
				} else {
					kwds = this.keyWords.replace(/；/g, ';');
					if (kwds.substring(kwds.length - 1) == ';') {
						kwds = kwds.substring(0, kwds.length - 1);
					}
				}
				var ks = kwds.split(';');
				kwds = '';
				if (ks.length > 6) {
					gloabl.tipTools("最多只能设置6个关键词", 'input[name="valLen"]');
					return;
				}
				for (var i in ks) {
					if (ks[i] != '') {
						var vl = StringUtil.valueLength(ks[i]);
						if (vl > 10) {
							gloabl.tipTools("关键词[" + ks[i] + "]超过10个字符", 'input[name="valLen"]');
							return;
						}
						kwds += ks[i] + ';';
					}
				}
				gloabl.fethAsync([URL.ADD_AND_UPDATE_KEYWORDS_URL], 'UMT14=' + kwds, res => {
					if (res.success) {
						this.searchKeyWorld();
						setTimeout(function() {
							gloabl.layer.closeAll();
						}, 500)
					}
				})
			},
			/*
			 * 查询用户关键字
			 */
			searchKeyWorld() {
				gloabl.fethAsync([URL.SEARCH_KEYWORDS_URL], '', res => {
					if (res.success) {
						if (res.result == null) {
							this.showKeyWords = false;
							this.showIcon = true;
							this.setKeyWords = true;
							this.setIcon = false;
						} else {
							this.showKeyWords = true;
							this.showIcon = false;
							this.setKeyWords = false;
							this.setIcon = true;
							this.wordKeysList = res.result.UM0503.split(';');
							this.keyWords = res.result.UM0503;
						}
					}
				})
			},
			/*
			 * 移除某个高亮关键字
			 */
			removeKey(item) {
				this.addKeyWords(item);
			},
			/*
			 * 切换编辑模式
			 */
			eiditKeyWords() {
				this.showKeyWords = false;
				this.showIcon = true;
				this.setKeyWords = true;
				this.setIcon = false;
			},
			/*
			 * 删除与我相关
			 */
			deleteAbout(id, index) {
				gloabl.layer.confirm('确定删除？', {
					btn: ['确定', '取消'],
					skin: ''
				}, () => {
					gloabl.fethAsync(URL.DELETE_ABOUT_URL, 'UM1001=' + id, res => {
						if (res.success) {
							this.aboutList.splice(index, 1);
							gloabl.layer.msg("删除成功");
							setTimeout(function() {
								gloabl.layer.closeAll();
							}, 500)
						}
					})
				});
			},
			/*
			 * 加载更多
			 */
			loadMore() {
				this.pagen = this.pagen + 1;
				this.initAboutList(this.pagen);
			}
		}

	}
</script>
