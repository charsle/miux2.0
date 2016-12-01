<template>
	<div>
		<h1 class="model-header">星标收藏<span class="fr fs14 tabTitleColor"><i class="iconfont">&#xe64d;</i></span></h1>
		<div class="col-xs-12 commen_tab star_tabWidth">
			<div id="tabCurrent">
				<ul>
					<li>
						<a href="javascript:;" class="currentStyle right0 radTL3" data-type="all" data-id="0" @click="loadType($event)"><i class="iconfont">&#xe637;</i>&nbsp;&nbsp;所有人</a>
					</li>
					<li>
						<a href="javascript:;" class="radRB3" data-type="my" data-id="1" @click="loadType($event)"><i class="iconfont">&#xe616;</i>&nbsp;&nbsp;我</a>
					</li>
					<li style="float: right;">
						<a href="javascript:;" class="radius3" @click="showAllStar">{{evCurrent}}&nbsp;<i class="glyphicon glyphicon-triangle-bottom"></i></a>
					</li>
					<div class="clearfix"></div>
					<div class="tip-popover bottom" v-show="isStarShow">
						<div class="arrow" style="left: 73.0769230769231%;"></div>
						<div class="tip-popover-container">
							<a href="javascript:;" @click="loadTypeDate($event,0)">全部</a>
							<a href="javascript:;" @click="loadTypeDate($event,1)">文字</a>
							<a href="javascript:;" @click="loadTypeDate($event,2)">图片</a>
							<a href="javascript:;" @click="loadTypeDate($event,3)">语音</a>
							<a href="javascript:;" @click="loadTypeDate($event,4)">位置</a>
							<a href="javascript:;" @click="loadTypeDate($event,5)">文档</a>
						</div>
					</div>
					<div class="clearfix"></div>
				</ul>
			</div>
		</div>

		<div class=" col-xs-12" v-if="star_list.length!==0">
			<div class="active" id="star_allPeo">
				<star-list :items="star_list"></star-list>
			</div>
			<div class="light-blue pointer tc mt15" @click="loadMore" id="starMore">
				{{moreStar}}
			</div>
		</div>
		<div v-else>
			<div class="col-xs-12 tc fs14 mt80">
				暂无星标信息
			</div>
		</div>

	</div>
</template>
<script type="text/javascript">
	/**
	 * miux v2.0 定制版  星标收藏
	 * Copyright 2016-2016 Miux, Inc.
	 * author WF(吴芳);
	 */
	import starList from './starList';
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'

	export default {
		data: function() {
			return {
				isStarShow: false,
				star_list: '', //星标列表返回临时存储数据
				type: '',
				param: {
					UMT15: 1,
					UMT16: 10,
					UMT09: 0,
					UMT10: 0
				},
				pagen: 1,
				index: '0',
				evCurrent: '全部',
				moreStar: '加载更多',
				sstorage: window.sessionStorage
			}
		},
		ready() {
			document.onclick = () => {
				this.isStarShow = false;
			}
			gloabl.doResizeHeight();
			if (this.sstorage.getItem('startReturn') == 1) {
				this.sstorage.setItem('startReturn', 0);
				this.param = JSON.parse(this.sstorage.getItem('startParam'));
			} else {
				this.param.orderBy = this.docType;
			}
			this.getStarData();
		},
		methods: {
			//下拉菜单
			showAllStar: function(e) {
				var ev = e || window.event;
				if (ev.stopPropagation) {
					ev.stopPropagation();
				} else if (window.event) {
					window.event.cancelBubble = true; //兼容IE
				}
				if (this.isStarShow) {
					this.isStarShow = false
				} else {
					this.isStarShow = true
				}
				$('#tabCurrent a').removeClass('currentStyle');
				$(ev.currentTarget).addClass('currentStyle');
			},
			//检索我的、所有人的所有星标列表
			loadType: function(ev, type) {
				$('#tabCurrent a').removeClass('currentStyle');
				$(ev.currentTarget).addClass('currentStyle');
				var id = ev.currentTarget.getAttribute('data-id'); //获取当前类型
				if (id == 0) {
					this.param.UMT09 = 0;
					this.param.UMT10 = 0;
				} else {
					this.param.UMT09 = 0;
					this.param.UMT10 = 1;
				}
				this.getStarData();
			},
			//检索当前星标类型列表
			loadTypeDate: function(ev, index) {
				this.index = index;
				if (this.type === 'all' || this.type === '') {
					this.param.UMT09 = index;
					this.param.UMT10 = 0;
				} else if (this.type === 'my') {
					this.param.UMT09 = index;
					this.param.UMT10 = 1;
				}
				this.getStarData();
				var currentName = ev.currentTarget.innerHTML;
				this.evCurrent = currentName;
				this.getStarData();
			},
			getStarData: function() {
				var params = 'UMT15=' + this.param.UMT15 + '&UMT16=' + this.param.UMT16 + '&UMT09=' + this.param.UMT09 + '&UMT10=' + this.param.UMT10;
				this.sstorage.setItem("startParam", JSON.stringify(this.param));
				gloabl.fethAsync([URL.START_LIST_URL], params, res => {
					if (res.success) {
						var star_list = res.result.pageList;
						//	console.log(JSON.stringify(star_list));
						for (let itm of star_list) {
							itm.UM0206 = JSON.parse(itm.UM0206);
							if (itm.UM0206.hasOwnProperty('MSG00109')) {
								if (itm.UM0206.MSG00108 == 2 || itm.UM0206.MSG00108 == 3 || itm.UM0206.MSG00108 == 4) {
									itm.UM0206.MSG00109 = JSON.parse(itm.UM0206.MSG00109);
								}
							}

						}

						this.star_list = star_list;
						if (res.result.nums == res.result.pageList.length) {
							$('#starMore').hide();
						} else {
							this.moreStar = '加载更多';
						}
					} else {
						gloabl.tipTools(res.msg);
						return;
					}
				})
			},
			/*
			 * 加载更多
			 */
			loadMore: function() {
				this.pagen = this.pagen + 1;
				this.param.UMT16 = 10 * this.pagen;
				this.getStarData();
			}
		},
		components: {
			starList
		}
	}
</script>
