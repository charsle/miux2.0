<template>
	<div class="tab_doc">
		<h1>文档库<span class="fr fs14 tabTitleColor"><i class="iconfont">&#xe64d;</i></span></h1>
		<div class="col-xs-12 commen_tab doc_tabWidth">
			<div class="tab_left">
				<ul class="nav nav-tabs" role="tablist">
					<li role="presentation" class="right0 radTL3">
						<a href="javascript:;" @click="show_sort($event)"><span id="sortText">时间排序</span>&nbsp;<i class="glyphicon glyphicon-triangle-bottom"></i></a>
					</li>
					<div class="tip-popover bottom pop_position" v-show="isSortShow">
						<div class="tip-popover-container">
							<a href="javascript:;" @click="sizeSort('DM00108')">容量排序</a>
							<a href="javascript:;" @click="sizeSort('DM00103')">时间排序</a>
						</div>
					</div>
					<li role="presentation" class="right0">
						<a href="javascript:;" @click="show_peo($event)">
							{{currentPeo}}&nbsp;<i class="glyphicon glyphicon-triangle-bottom"></i>
						</a>
					</li>
					<div class="tip-popover bottom pop_peo" v-show="isPeoShow">
						<div class="tip-popover-content">
							<div class="p10">
								<i class="iconfont search_basic search_icon">&#xe613;</i>
								<input class="search_peo" type="text" name="" v-model="searchPeo" id="" @keyup="getSearch" @keyup.enter="searchAuthor" placeholder="搜索..." />
								<i class="iconfont search_basic del_icon" id="delDocIcon" @click="clearText">&#xe60c;</i>
							</div>
							<div class="p10 pointer hoverBasic" @click="allpeople">
								<div class="row fs14">所有人</div>
								<div class="row fs10 light-grey">共{{totalFile.total}}个文件</div>
							</div>
							<div id="sort_pop">
								<a href="javascript:;" v-for="author in authorList | filterBy searchPeo in 'DM00113'" @click="searchPeoFile(author.DM00102,author.DM00113)">
									<img :src="author.url | getUrl" /><span v-text="author.DM00113"></span>
								</a>
							</div>
						</div>
					</div>
					<li role="presentation" class="all radRB3">
						<a href="javascript:;" @click="show_type($event)"><span id="fileType">所有文档</span>&nbsp;<i class="glyphicon glyphicon-triangle-bottom"></i></a>
					</li>
					<div class="clearfix"></div>
					<div class="tip-popover bottom pop_pos" v-show="isTypeShow">
						<div class="tip-popover-container">
							<a href="javascript:;" @click="file_list('',$event)">所有</a>
							<a href="javascript:;" @click="file_list(1,$event)">文本</a>
							<a href="javascript:;" @click="file_list(2,$event)">图片</a>
							<a href="javascript:;" @click="file_list(3,$event)">音频</a>
							<a href="javascript:;" @click="file_list(4,$event)">视频</a>
							<a href="javascript:;" @click="file_list(5,$event)">其他</a>
						</div>
					</div>
				</ul>
			</div>
			<div class="tab_right">
				<!-- <input type="file" id="file" style="display: none;" />
				<a class="radius3" href="javascript:;" @click="upload_file"><i class="iconfont">&#xe628;</i>&nbsp;&nbsp;上传</a> -->
				<upload-file type="newupdaload" :group-item="groupItem"></upload-file>
			</div>
			<div class="clearfix"></div>
		</div>
		<div class="tab-content mt10 col-xs-12" id="doc_content">
			<doc-type :item.sync='docList' :filetype='filetype'></doc-type>
			<div class="light-blue pointer tc mt15" v-if="docList.length !== 0" @click="getMore" id="docMore" v-show="loadshow">
				{{moreDoc}}
			</div>
		</div>
</div>
</template>
<script type="text/javascript">
    import docType from './docType';
    import uploadFile from '../../upload/uploadFile';
    import gloabl from '../../../api/globConfig'
    import * as URL from '../../../api/restfull'

    // import {
    // 	uploadAll
    // } from '../../../assets/js/upload';

    import stringUtil from '../../../assets/js/stringUtil';

    import {
        sendMessageInfo
    } from '../../../assets/js/websocket';

    import uploadProgress from './uploadProgress';
    export default {
        data: function() {
            return {
                isSortShow: false,
                isTypeShow: false,
                isPeoShow: false,
                authorList: '',
                groupItem: {},
                searchPeo: '', //存储搜索文档上传者
                docList: [], //查询列表数据存储变量
                type: '', //文件类型参数
                docType: 'DM00103', //时间排序参数
                userId: '',
                currentPeo: '所有人',
                DM00106: '',
                groupList: '',
                nullData: '',
                totalFile: '',
                fileContent: '',
                param: {
                    orderBy: '',
                    page: '',
                    pageSize: '',
                    DM00102: '',
                    DM00107: '',
                    DM00112: '',
                    DM00113: ''
                },
                moreDoc: '',
                pagen: 1,
                loadshow: false,
                filetype: 1,
                sstorage: window.sessionStorage

            }
        },
        watch: {
            getUploadDate: {
                handler() {
                    this.docList.pageList.unshift(this.getUploadDate);
                }
            }
        },
        vuex: {
            getters: {
                getUploadDate(state) {
                    return state.uploadReturnList;
                },
                getPrssBar(state) {
                    return state.pressBar;
                }
            }

        },

        ready() {
            gloabl.doResizeHeight();
            document.onclick = () => {
                this.isSortShow = false;
                this.isTypeShow = false;
            }
            if (this.sstorage.getItem('documentReturn') == 1) {
                this.sstorage.setItem('documentReturn', 0);
                this.param = JSON.parse(this.sstorage.getItem('documentParam'));
            } else {
                this.param.orderBy = this.docType;
            }
            this.getDocData();

            //			this.searchGroup();
        },
        methods: {
            //显示排序方式
            show_sort: function(e) {
                var ev = e || window.event;
                if (ev.stopPropagation) {
                    ev.stopPropagation();
                } else if (window.event) {
                    window.event.cancelBubble = true; //兼容IE
                }
                if (this.isSortShow) {
                    this.isSortShow = false;
                } else {
                    this.isSortShow = true;
                }
                this.isPeoShow = false;
                this.isTypeShow = false;
            },
            //显示所有文档类型
            show_type: function(e) {
                var ev = e || window.event;
                if (ev.stopPropagation) {
                    ev.stopPropagation();
                } else if (window.event) {
                    window.event.cancelBubble = true; //兼容IE
                }
                if (this.isTypeShow) {
                    this.isTypeShow = false;
                } else {
                    this.isTypeShow = true;
                }
                this.isPeoShow = false;
                this.isSortShow = false;
            },
            //查询文档上传者
            show_peo: function(e) {
                this.isSortShow = false;
                this.isTypeShow = false;
                var self = this;
                gloabl.fethAsync([URL.DOC_PER_URL], '', res => {
                    if (res.success) {
                        self.authorList = res.result.list;
                        self.totalFile = res.result;
                    } else {
                        gloabl.tipTools(res.msg);
                        return;
                    }
                })

                var ev = e || window.event;
                if (ev.stopPropagation) {
                    ev.stopPropagation();
                } else if (window.event) {
                    window.event.cancelBubble = true; //兼容IE
                }
                if (this.isPeoShow) {
                    this.isPeoShow = false;
                } else {
                    this.isPeoShow = true;
                }
                this.getSearch();
            },
            //搜索框方法
            getSearch: function() {
                if (this.searchPeo != '') {
                    $('#delDocIcon').show();
                } else {
                    $('#delDocIcon').hide();
                }
            },
            //清空搜索框
            clearText: function() {
                this.searchPeo = '';
                $('#delDocIcon').hide();
            },
            //搜索框enter事件
            searchAuthor: function() {},
            //检索对应文档类型列表
            file_list: function(type, event) {
                var thisName = event.currentTarget.innerHTML;
                $('#fileType').text(thisName);
                this.pagen = 1;
                this.param.page = 1;
                this.param.pageSize = 10;
                this.param.DM00107 = type;
                this.getDocData();
            },
            //初始化文档列表
            getDocData: function() {
                var self = this;
                self.docList = '';
                var p = 'orderBy=' + this.param.orderBy + '&page=' + this.param.page + '&pageSize=' + this.param.pageSize + '&DM00102=' + this.param.DM00102 + '&DM00107=' + this.param.DM00107 + '&DM00112=' + this.param.DM00112 + '&DM00113=' + this.param.DM00113;
                self.sstorage.setItem("documentParam", JSON.stringify(this.param));
                gloabl.fethAsync([URL.DOC_LIST_URL], p, res => {
                    if (res.success) {
                        var result = res.result;
                        if (result != null) {
                            self.docList = result;
                            if (res.result.nums == 0) {
                                self.loadshow = false;
                            } else {
                                self.loadshow = true;
                            }
                            if (res.result.nums == res.result.pageList.length) {
                                self.loadshow = false;
                            } else {
                                self.loadshow = true;
                                self.moreDoc = '加载更多';
                            }
                        }



                    } else {
                        gloabl.tipTools('查询失败');
                        return;
                    }

                })
            },
            //按类型排序
            sizeSort: function(type) {
                this.docType = type;
                var sortText = document.getElementById("sortText");
                this.pagen = 1;
                this.param.page = 1;
                this.param.pageSize = 10;
                this.param.orderBy = type;
                if (type === 'DM00108') {
                    sortText.innerHTML = "容量排序";
                } else {
                    sortText.innerHTML = "时间排序";
                }
                this.getDocData();
            },
            //所有人所有文档
            allpeople: function() {
                this.param.DM00102 = '';
                this.pagen = 1;
                this.param.page = 1;
                this.param.pageSize = 10;
                this.getDocData();
                this.currentPeo = "所有人";
                this.isPeoShow = false;
            },
            //检索个人所有文档
            searchPeoFile: function(id, name) {
                this.userId = id;
                this.currentPeo = name;
                this.param.DM00102 = id;
                this.pagen = 1;
                this.param.page = 1;
                this.param.pageSize = 10;
                this.getDocData();
                this.isPeoShow = false;
            },

            searchGroup: function() {
                gloabl.fethAsync(SEARCH_GROUP_URL, '', res => {
                    if (res.success) {
                        this.groupList = res.result;
                    }
                })
            },


            getMore: function() {
                this.pagen = this.pagen + 1;
                this.param.page = 1;
                this.param.pageSize = 10 * this.pagen;
                this.getDocData();
            }
        },
        components: {
            docType,
            uploadFile
        }
    }
</script>