<script type="text/javascript">
    import 'bootstrap/dist/css/bootstrap.min.css'
    import '../../../assets/css/reset.css';
    import '../../../assets/css/apply.css';
    import '../../../assets/css/iconfont.css';
    import '../../../assets/css/font1/iconfont.css';
    import '../../../../static/lib/layer/skin/layer.css'
    import 'lightbox2/dist/css/lightbox.css'
    require('lightbox2');
    import 'bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css'
    require('bootstrap-switch');

    require('bootstrap');
    require('jquery.nicescroll/jquery.nicescroll.min');
    require('../../../assets/js/uploadType');

    import '../../../assets/css/main.css'
    import store from '../../../vuex/store';
    import {
        currentThread
    } from '../../../vuex/getters';
    import comparyCard from './comparyCard';
    import sliderBar from './sliderBar';
    import headerBar from './headerBar';
    import about from '../model/about';
    import doc from '../model/document';
    import task from '../model/task';
    import books from '../model/book';
    import perSetting from '../model/perSetting';
    import perInfo from '../model/perInfo';
    import star from '../model/star';
    import docDetaile from '../model/docDetaile';
    import apply from '../model/apply';
    import starDetaile from '../model/starDetaile';
    import card from '../model/card';
    import group from '../model/group';
    import groupNotice from '../model/groupNotice';
    import groupFile from '../model/groupFile';
    import ada from '../model/adacard';
    import fileModel from '../model/fileModel';
    import load from '../../loading/loading';
    import gloabl from '../../../api/globConfig'
    import 'nprogress/nprogress.css'
    var NProgress = require('nprogress');
    import systemConfig from '../../../api/systemConfig'
    export default {
        data() {
            return {
                currentView: 'message',
                currentRight: '',
                sessionList: '',
                search: '',
                sessionIndex: 0,
                is_show: '',
                numberP: 0,
                isShow: false,
                BASE_URL_CONFIG: systemConfig, //全局配置logo,
            }
        }, //初始化
        store,
        ready() {
            document.title = this.BASE_URL_CONFIG.COMMON_BASE.TITLETEXT;
            NProgress.start();
            $('#miuxApp').hide()
            if (sessionStorage.getItem('loading') == null) {
                sessionStorage.setItem('loading', 'loading')
                NProgress.configure({
                    trickleRate: 0.1,
                    trickleSpeed: 400
                });
                setTimeout(() => {
                    $('#miuxApp').show()
                    $('#loadMIUX').hide();
                    NProgress.done();
                }, 4000)
            } else {
                $('#loadMIUX').hide();
                $('#miuxApp').show()
                NProgress.done();
            }
            gloabl.doResizeHeight();
            gloabl.doResizeWidth();
        },

        watch: {
            pressFileObj: {
                handler() {
                    var numberP = this.pressFileObj.pressNum;
                    this.isShow = this.pressFileObj.isShow;
                    $('.progress-bar-striped').css({
                        width: numberP
                    })
                }
            }
        },
        vuex: {
            getters: {
                current(state) {
                    return state.currentRight
                },
                pressFileObj(state) {
                    return state.pressBar
                }
            }
        },
        components: {
            comparyCard,
            sliderBar,
            headerBar,
            books,
            about,
            doc,
            task,
            setting: perSetting,
            star,
            pinfo: perInfo,
            d_detaile: docDetaile,
            card,
            group,
            s_detaile: starDetaile,
            card,
            grop_item: groupNotice,
            grop_file: groupFile,
            ada,
            fileModel,
            load,
            apply,
        }

    }
</script>

<template>
	<div>
	<load></load>
	<div id="miuxApp">
		<object id="NACL" height="0" width="0" data-width="200" data-height="200" data-custom-load="true" data-name="crypto" data-tools="pnacl glibc clang-newlib win" data-configs="Debug Release" data-path="{tc}/{config}"></object>
		<div class="HOME_SLIDER">
			<compary-card></compary-card>
			<slider-bar></slider-bar>
		</div>

			<!-- 右边详细信息-->
		<div class="HOME_CONTENT" id="HOME_CONTENT">
			<header-bar></header-bar>
			<div class="HOME_CONTENT_ITEMS LIST_ITEMS">
				<div class="messageCount" id="messageCount">
					<router-view></router-view>
				</div>

				<div class="COMMENT_MODAL" id="COMMENT_MODAL" style="display: none;">
					<component :is="current"></component>
				</div>
			</div>
		</div>

		<div class="clearfix"></div>
		<div id="rMenu">
			<ul>
				<li id="m_add" data-type="add">添加部门</li>
				<li id="m_del" data-type="del">删除部门</li>
				<li id="m_rename" data-type="rename">重命名</li>
			</ul>
		</div>
		<div id="fileShareModel" style="display: none;">
			<file-model></file-model>
		</div>

		<div id="listener"></div>
		 <div class="upLoadFile" id="pressUpload" :style="{display:pressFileObj.isShow==true?'block':'none' }">
			<h4 class="bottom">文件
				<a href="javascript:;" class="fr light-grey">
					<i class="fs18 iconfont">&#xe60c;</i>
				</a>
				<div class="clearfix"></div>
			</h4>
			<div class="col-xs-12 share_content ">
				<div class="col-xs-2 fs48 ">
                    {{{pressFileObj.fileType | valideType}}}
					<!--<i class="iconfont pdf_color">&#xe623;</i>-->
				</div>
				<div class="col-xs-10 mt10">
					<div class="row overflow nowrap" id="u_fileName">{{pressFileObj.fileName}}</div>
					<div class="row light-grey mt2"><span id="u_pressNum">{{pressFileObj.pressNum}}</span>&nbsp;<span id="u_fileSize">{{pressFileObj.fileSize | fileSize}}</span></div>
					<div class="row">
						<div class="col-xs-8 mt5">
							<div class="progress">
								<div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar" aria-valuenow="{{pressFileObj.pressNum}}" aria-valuemin="0" id="uploadbar" aria-valuemax="100" >
									<span class="sr-only">20% Complete</span>
								</div>
							</div>
						</div>
						<div class="col-xs-4 tc">
							<a href="javascript:;" class="dark-gray"></a>
						</div>

					</div>
				</div>
			</div>
		</div> 

	</div>
	</div>
</template>
<style type="text/css">
    div#rMenu {
        position: absolute;
        visibility: hidden;
        top: 0;
        background-color: #555;
        text-align: left;
        padding: 2px;
        border-radius: 5px;
    }
    
    div#rMenu ul li {
        margin: 1px 0;
        padding: 5px;
        border-radius: 5px;
        cursor: pointer;
        list-style: none outside none;
        color: #fff;
    }
    
    div#rMenu ul li:hover {
        background-color: #DFDFDF;
        color: #555;
    }
</style>