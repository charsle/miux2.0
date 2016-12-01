<template>
	<div>
		<div class="col-md-12">
			<div class="member_left col-xs-3" id="member_left">
				<h4 class="p10" style="border-bottom:1px solid #ccc">组织架构</h4>
				<ul id="manage_tree" class="ztree mt10"></ul>
			</div>
			<div class="member_right col-xs-9" id="member_right">
				<div class="col-md-12 member_tab operating_tab">
					<div v-if="showTab" style="width: 100%;">
						<ul>
							<li>已选择 <span class="light-blue">{{checkedNames.length}}</span>人，正在进行批量编辑</li>
							<li>
								部门：
								<select name="" v-model="updateDepart">
									<option value="" selected="selected">不修改</option>
									<option v-for="option in allDepart" :value="option.TM00101">{{option.TM00106}}</option>
								</select>
							</li>
							<li>
								查看权限：
								<select name="" v-model="updateLeave">
									<option value="" selected="selected">不修改</option>
									<option value="1">1级</option>
									<option value="2">2级</option>
									<option value="3">3级</option>
									<option value="4">4级</option>
									<option value="5">5级</option>
								</select>
							</li>
							<!--<li>
								排序：
								<a href="javascript:;" @click="upOrderData" class="btn btn-default glyphicon glyphicon-arrow-up"></a>
								<a href="javascript:;" @click="downOrderData" class="btn btn-default glyphicon glyphicon-arrow-down"></a>
							</li>-->
							<li class="ml20">
								<a href="javascript:;" class="btn btn-default btn-sm" @click="cancelUpdate">取消</a>
								<a href="javascript:;" class="btn btn-primary btn-sm" @click="updateAllPersons">提交</a>
							</li>
							<div class="clearfix"></div>
						</ul>
					</div>
					<div v-if="!showTab">
						<ul style="padding-top:10px;">
							<li>全公司&nbsp;&nbsp;<span class="light-blue">{{manageItem.personNum}}人</span></li>
							<li>
								<a href="javascript:;" class="light-blue underline" @click="addPersons">添加成员</a>
							</li>
							<li>
								<a href="javascript:;" class="light-blue underline" @click="importPersons">导入</a>
							</li>
							<li>
								<a href="javascript:;" class="light-blue underline" @click="exportPersons">导出</a>
							</li>
							<li>
								<div class="manage_search">
									<i class="iconfont light-grey fs18 lh30">&#xe613;</i>
									<input class="manageSearch" v-model="msearch" type="text" placeholder="搜索成员" />
								</div>
							</li>

						</ul>
							<div class="clearfix"></div>
					</div>

				</div>

				<div class="col-md-12" id="showTableHeight">
					<table class="table table-striped fs12">
						<thead>
							<tr class="fs14 bold">
								<td width="3%"><input type="checkbox" name="" v-model="allChecked" /></td>
								<td width="10%">姓名</td>
								<td width="15%">手机</td>
								<td>部门</td>
								<td>职位</td>
								<td width="10%">工号</td>
								<td width="100px">权限</td>
								<td>状态</td>
								<td width="12%"></td>
							</tr>
						</thead>
						<tbody id="tableALLlist">
							<tr class="addPersons" v-for="newItem in newItems">
								<td><input type="checkbox" name="" /></td>
								<td><input type="text" class="form-control" name="userName" style="width: 80%;" maxlength="6"></td>
								<td><input type="text" class="form-control" name="userMobile" style="width: 80%;" maxlength="11"></td>
								<td>
									<select class="form-control" style="width: 80%;" name="userDepat">
										<option v-for="option in allDepart" value="{{option.TM00101}}">{{option.TM00106}}</option>
									</select>
								</td>
								<td><input type="text" class="form-control" name="userPosintion" style="width: 80%;" maxlength="15"></td>
								<td><input type="text" class="form-control" name="userNum" style="width: 80%;"></td>
								<td>
									<select class="form-control" style="width: 80%;" name="userleave">
										<option value="1">1级</option>
										<option value="2">2级</option>
										<option value="3">3级</option>
										<option value="4">4级</option>
										<option value="5">5级</option>
									</select>
								</td>
								<td>
									<a href="javascript:;" class="btn btn-default btn-xs" @click="saveAddPersonData($event,newItem)">保存</a>&nbsp;
									<a href="javascript:;" class="btn btn-default btn-xs" @click="cancelAddItem(newItem)">取消</a>
								</td>
							</tr>

							<tr @mouseenter="mouseEnter($event)" @mouseleave="mouseLeave($event)" class="tr_click_show pointer" v-for="item in searchData | filterBy msearch in 'TM00306' 'TM00308' " track-by="$index">
								<td><input type="checkbox" v-model="checkedNames" :value="item.TM00301" /></td>
								<td>
									<span class="span_click_show">{{item.TM00306}}</span>
									<span class="input_click_show"><input type="text" class="form-control" value="{{item.TM00306}}" name="userName" style="width: 80%;"></span></td>
								<td>
									<span>{{item.TM00308}} </span>
									<!--<span class="input_click_show"><input type="text" value="{{item.TM00308}}" class="form-control" name="userMobile" style="width: 80%;"></span></td>-->
									<td>
										<span class="span_click_show">{{item.orgCname}}</span>
										<span class="input_click_show">
											<select class="form-control opt_{{item.TM00316}}" style="width: 80%;" name="userDepat" id="updateDepat">
												<option  v-for="option in allDepart" value="{{option.TM00101}}"  >{{option.TM00106}}</option>
											</select>
										</span>
									</td>
									<td>
										<span class="span_click_show">{{item.TM00322}}</span>
										<span class="input_click_show">
											<input type="text" class="form-control" value="{{item.TM00322}}" name="userPosintion" style="width: 80%;">
										</span>
									</td>
									<td><span class="span_click_show">{{item.TM00318}}</span>
										<span class="input_click_show"><input type="text" value="{{item.TM00318}}" class="form-control" name="userNum" style="width: 80%;"></span>

									</td>
									<td><span class="span_click_show">{{item.TM00320}}级</span>
										<span class="input_click_show">
										<select class="form-control lev_{{item.TM00320}}" style="width: 80%;" name="userleave">
										<option value="1">1级</option>
										<option value="2">2级</option>
										<option value="3">3级</option>
										<option value="4">4级</option>
										<option value="5">5级</option>
									</select>
										</span>
									</td>
									<td>
										<span>
											<i v-if="item.TM00317==-1" class="iconfont" style="color: red;">&#xe604;</i>
											<i v-if="item.TM00317==1" class="iconfont">&#xe616;</i>
										</span>
									</td>
									<td>
										<div class="showFun">
											<a href="javascript:;"  class="btn btn-default btn-xs"  @click="editSingleData($event,item.TM00316,item.TM00320)">编辑</a>&nbsp;
											<a href="javascript:;" class="btn btn-default btn-xs"  @click="deleteSingleItem(item)">删除</a>
										</div>
										<div class="editFun">
											<a href="javascript:;"  class="btn btn-default btn-xs" @click="saveSinglePersonData($event,item,$index)">保存</a>&nbsp;
											<a href="javascript:;" class="btn btn-default btn-xs"  @click="cancelSingleItem($event)">取消</a>
										</div>
									</td>
							</tr>

						</tbody>
					</table>
				</div>

			</div>
			<div class="clearfix"></div>
		</div>
	</div>
</template>
<style type="text/css">
    .input_click_show,
    .showFun,
    .editFun {
        display: none;
    }
    
    #showTableHeight .table>tbody>tr>td {
        height: 40px;
    }
    
    .manage_search {
        margin-top: -10px;
    }
</style>
<script type="text/javascript">
    import gloabl from '../../../api/globConfig'
    import * as URL from '../../../api/restfull'
    import manageList from './manageList';

    // import UploadFile from '../../../assets/js/upload';
    import {
        uploadAll
    } from '../../../assets/js/upload';

    import {
        treeInit
    } from '../../../assets/js/manageTree';
    export default {
        ready() {
            setTimeout(() => {
                gloabl.doResizeWidth();
                gloabl.doResizeHeight();
            }, 60)

            this.getTeamsTree();
            this.getAllDepart();

        },
        data() {
            return {
                manageItem: Object,
                searchData: [],
                allDepart: [],
                isShow: false,
                checkedNames: [],
                updateDepart: '',
                updateLeave: '',
                newItems: [],
                edit: true,
                nameReg: /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z]){1,8}$/
            }
        },
        components: {
            manageList
        },
        computed: {
            showTab() {
                return this.checkedNames.length > 0 ? true : false
            },
            // 全选
            allChecked: {
                get: function() {
                    return this.checkedCount == this.searchData.length;
                },
                set: function(value) {
                    if (value) {
                        this.checkedNames = this.searchData.map(function(item) {
                            return item.TM00301;
                        })
                    } else {
                        this.checkedNames = []
                    }
                }
            },
            checkedCount: {
                get: function() {
                    return this.checkedNames.length;
                }
            }
        },
        vuex: {
            getters: {
                getMangeList(state) {
                    return state.manageList;
                }
            }
        },
        watch: {
            getMangeList: {
                handler() {
                    this.searchData = this.getMangeList;
                }
            }
        },
        methods: {
            //交换数组元素
            //上移
            upOrderData() {
                //					//选中
                //					var carray = this.checkedNames;
                //					console.log(carray);
                //					//老list
                //					var oarray = this.getMangeList;
                //					//新list
                //					var narray = [];
                //					//新check
                //					var ckarray = [];
                //					//是否交换下标位置
                //					var isRepeat = false;
                //					for(var i = 0; i < oarray.length; i++) {
                //						//是否间隔
                //						var isPush = false;
                //						for(var j = 0; j < carray.length; j++) {
                //							if(isRepeat) {
                //								narray.push(oarray[i - 1]);
                //								isRepeat = false;
                //								isPush = true;
                //								continue;
                //							} else {
                //								var findex = carray[j].split(';');
                //								if(i == findex[1] - 1) {
                //									narray.push(oarray[i + 1]);
                //									ckarray.push(findex[0] + ';' + i);
                //									isRepeat = true;
                //									isPush = true;
                //									continue;
                //								}
                //							}
                //
                //						}
                //						if(!isPush)
                //							narray.push(oarray[i]);
                //					}
                //					//this.getMangeList = narray;
                //					console.log(ckarray);
                //					this.checkedNames = ckarray;
                //					this.$store.dispatch('MANAGE_LIST', narray);
            },
            //下移
            downOrderData() {},
            //查询部门机构树
            getTeamsTree() {
                gloabl.fethAsync([URL.SEARCH_TEAM_TREE_URL], '', res => {
                    if (res.success) {
                        this.manageItem = res.result;
                        this.manageItem.open = true;
                        this.getRightManageList(this.manageItem.id);
                        treeInit(this.manageItem, this);
                    }

                })
            },
            getRightManageList: function(id) {
                var lay = layer.load(2);
                var param = 'TM00101=' + id;
                gloabl.fethAsync([URL.SEARCH_ONE_DPART_URL], param, res => {
                    if (res.success) {
                        this.searchData = res.result;
                        layer.close(lay);
                    }
                });
            },
            //查询所有部门
            getAllDepart() {
                gloabl.fethAsync([URL.SEARCH_ALL_DEPART_URL], '', res => {
                    if (res.success) {
                        this.allDepart = res.result;
                    }
                })
            },
            //添加成员
            addPersons() {
                this.newItems.push({
                    name: ''
                });
            },
            //保存添加人员
            saveAddPersonData(ev, item) {
                var curr = $(ev.currentTarget).closest('tr');
                var name = curr.find('input[name="userName"]').val(),
                    mobile = curr.find('input[name="userMobile"]').val(),
                    depat = curr.find('select[name="userDepat"]').val(),
                    postion = curr.find('input[name="userPosintion"]').val(),
                    num = curr.find('input[name="userNum"]').val(),
                    leave = curr.find('select[name="userleave"]').val();
                var params = 'TM00306=' + name + '&TM00308=' + mobile + '&TM00316=' + depat + '&TM00322=' + postion + '&TM00318=' + num + '&TM00320=' + leave;
                if (!this.nameReg.test(name)) {
                    gloabl.tipTools('姓名只能是字母或者汉字！长度为8个字符');
                    return;
                }
                if (!gloabl.mobileReg.test(mobile)) {
                    gloabl.tipTools('您输入的电话号码不合法!');
                    return;
                }
                if (postion.length > 8) {
                    gloabl.tipTools('职位最多不能超过8个字符!');
                    return;
                }
                gloabl.fethAsync([URL.ADD_PERSONS_SINGLE_URL], params, res => {
                    if (res.success) {
                        this.getMangeList.unshift(res.result);
                        this.newItems.$remove(item);
                    } else {
                        gloabl.tipTools(res.error, 'input[name="userMobile"]')
                    }
                })

            },
            // 保存单条数据
            saveSinglePersonData(ev, item, index) {
                var curr = $(ev.currentTarget).closest('tr');
                var name = curr.find('input[name="userName"]').val(),
                    depat = curr.find('select[name="userDepat"]').val(),
                    postion = curr.find('input[name="userPosintion"]').val(),
                    num = curr.find('input[name="userNum"]').val(),
                    leave = curr.find('select[name="userleave"]').val();
                var params = 'TM00301=' + item.TM00301 + '&TM00306=' + name + '&TM00316=' + depat + '&TM00322=' + postion + '&TM00318=' + num + '&TM00320=' + leave;
                if (!this.nameReg.test(name)) {
                    gloabl.tipTools('姓名只能是字母或者汉字！长度为8个字符');
                    return;
                }
                if (postion.length > 8) {
                    gloabl.tipTools('职位最多不能超过8个字符!');
                    return;
                }
                gloabl.fethAsync([URL.UPDATE_PERSION_DATA_URL], params, res => {
                    if (res.success) {
                        this.getMangeList.$set(index, res.result)
                        curr.find('.span_click_show').show();
                        curr.find('.input_click_show,.showFun,.editFun').hide();
                    } else {
                        gloabl.tipTools(res.error, 'input[name="userMobile"]')
                    }

                })
            },
            mouseLeave(ev) {
                var curr = $(ev.currentTarget);
                curr.find('.showFun').hide();
            },
            mouseEnter(ev) {
                var curr = $(ev.currentTarget);
                var edi = curr.find('.editFun');
                if (edi.css('display') != 'block') {
                    curr.find('.showFun').show();
                }

            },
            //删除单条记录，
            deleteSingleItem(item) {
                layer.confirm('您确定要删除 <span class="light-blue">' + item.TM00306 + '</span> 这位成员吗？', () => {
                    gloabl.fethAsync([URL.DELETE_MERMBER_URL], 'TM00301=' + item.TM00301, res => {
                        if (res.success) {
                            this.getMangeList.$remove(item);
                            this.manageItem.personNum = (this.manageItem.personNum - 1);
                            layer.closeAll();
                        }
                    })
                })

            },
            //编辑人员
            editSingleData(ev, opt, lev) {
                var curr = $(ev.currentTarget);
                curr.closest('tr').find('.span_click_show,.showFun').hide();
                curr.closest('tr').find('.input_click_show,.editFun').show();
                $('.opt_' + opt).val(opt);
                $('.lev_' + lev).val(lev);
            },
            //取消
            cancelSingleItem(ev) {
                var curr = $(ev.currentTarget).closest('tr');
                curr.find('.span_click_show').show();
                curr.find('.input_click_show,.showFun,.editFun').hide();
            },
            //批量修改成员
            updateAllPersons() {
                var params = 'TMT01=' + this.checkedNames + '&TM00316=' + this.updateDepart + '&TM00320=' + this.updateLeave;
                gloabl.fethAsync([URL.UPDATE_ALL_PERSION_DATA_URL], params, res => {
                    if (res.success) {
                        gloabl.tipTools('修改成功!');
                        this.getTeamsTree();
                    }
                })
            },
            //取消批量修改
            cancelUpdate() {
                this.showTab = false;
                this.checkedNames = [];
            },
            //取消单个添加
            cancelAddItem(item) {
                this.newItems.$remove(item)
            },
            //导入成员
            importPersons() {
                gloabl.layer.open({
                    type: 1,
                    shade: 0.3,
                    title: '导入联系人',
                    area: ['350px'],
                    skin: '',
                    btn: ['确定', '取消'],
                    content: '<div style="padding:15px;">选择文件:<input type="file" id="xlsfile" accept=".xls,.xlsx"  name="file"><p class="mt10"><a href="../../../../static/resource/template.xls">下载标准模板</a>&nbsp;&nbsp;&nbsp;<span>用我们提供的标准模板编辑联系人信息</span></p></div>',
                    yes() {
                        //accept=".xls,.xlsx"
                        var up_file = document.getElementById('xlsfile');
                        //console.log(up_file.files[0].type)
                        if (up_file.value === '') {
                            gloabl.tipTools('上传文件为空,请选择!', '#xlsfile');
                            return;
                        }
                        var data = {
                                type: 2,
                                xls: 'xls',
                                parames: '',
                                callback: function() {}
                            }
                            // var upload = new UploadFile(up_file.files[0], data);
                            // upload.initFileUpload(function(d) {
                            //     console.log(d);
                            // });

                        // console.log(upload)
                        uploadAll(2, up_file.files[0], 'xls', '', function(res) {

                        });
                    }
                });
            },
            getFileDownToken(key, type) {
                var param = 'DM00110=' + key;
                gloabl.fethAsync([URL.GET_DOWN_TOKEN_URL], param, res => {
                    var token = res.result;
                    var url = [URL.URL_DOWNLOAD] + key + type + '?token=' + token;
                    new FileDownloader({
                        url: encodeURI(url),
                        filename: key + type
                    });
                    // 	var a = document.createElement('a');
                    // 	a.setAttribute('href', url);
                    // 	a.setAttribute('target', '_blank');
                    // 	a.setAttribute('id', 'downid');
                    // 	//防止反复添加
                    // 	if (!document.getElementById('downid')) {
                    // 		document.body.appendChild(a);
                    // 	}
                    // 	a.click();
                });
            },
            //导出成员
            exportPersons() {
                gloabl.fethAsync([URL.DOWN_MEMBER_EXCEL_URL], '', res => {
                    if (res.success) {
                        if (res.result != null) {
                            var key = res.result;
                            key = key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
                            var typeD = res.result.substring(res.result.lastIndexOf('.'), res.result.length);
                            this.getFileDownToken(key, typeD);
                        }
                        gloabl.tipTools('导出成功');
                    } else {
                        gloabl.layer.msg("导出失败");
                    }
                })
            }
        }
    }
</script>