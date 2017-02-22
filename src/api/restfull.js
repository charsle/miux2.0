/*!
 * miux v2.0 定制版  全部api接口
 * Copyright 2016-2016 Miux, Inc.
 * author  charsle(蔡远生);
 */
//登录所有接口
//文件上传
//有权限
//
// //----测试环境－－－－－－－－－begin---------
const COOKIE_PATH = 'http://sm.miux.com:8081/SessionManager/';
const UM_PATH = 'http://test.um.miux.com:8089/MIUX_ESE_UM/';
const CT_PATH = 'http://test.um.miux.com:8089/MIUX_ESE_CT/';
const TM_PATH = 'http://test.tm.miux.com:8089/miux_ESE2.0_tm/'
const DM_PATH = 'http://test.dm.miux.com:8089/miux_dm/';
const MM_PATH = 'http://test.mm.miux.com:8089/miux_mm/'
const CK_PATH = 'http://test.ck.miux.com:8090/miux_ESE_ck/'; //审批流程
//有权限
export const UPLOAD_PRVATE = "http://192.168.1.63:5171/";
// // 无权限
export const UPLOAD_NOT_PRVATE = "http://192.168.1.63:5181/";
export const GET_COOKIE_URL = COOKIE_PATH + 'getSession.action?CTYPE=8'; // 获取全部的cookie
export const URL_DOWNLOAD = 'http://192.168.1.63:5171/download/'; //下载接口(有权限)
export const URL_DOWNLOAD_KEY = 'http://192.168.1.63:82/'; //下载接口（无权限）
export const URL_AUTHORITY = 'http://192.168.1.63:5171/scale/'; //图片缩略图（有权限）
export const URL_SCALE = 'http://192.168.1.63:5181/scale/'; //图片缩略图（无权限）
export const WEBSOCKET_GCOMET = 'http://192.168.1.63:5150/v1/gComet.addr'; // websocket

//---------------end--------------------

// //----云测试环境－－－－－－－－－begin---------
// const COOKIE_PATH = 'http://sm.miux.com:8081/SessionManager/';
// const UM_PATH = 'http://test.um.miux.com:8085/MIUX_YUN_UM/';
//
// const CT_PATH = 'http://test.ct.miux.com:8087/MIUX_YUN_CT/';
// const TM_PATH = 'http://test.tm.miux.com:8086/miux_yun_tm/'
//   //
// const DM_PATH = 'http://test.dm.miux.com:8083/miux_yun_dm/';
// // const DM_PATH = 'http://dm.miux.com:8081/miux_yun_dm/';
// const MM_PATH = 'http://test.mm.miux.com:8084/miux_yun_mm/'
// const CK_PATH = 'http://test.ck.miux.com:8090/miux_ESE_ck/'; //审批流程
//   //   //   // //有权限
// export const UPLOAD_PRVATE = "http://192.168.1.63:5171/";
// // // // 无权限
// export const UPLOAD_NOT_PRVATE = "http://192.168.1.63:5181/";
// export const GET_COOKIE_URL = COOKIE_PATH + 'getSession.action?CTYPE=8'; // 获取全部的cookie
// export const URL_DOWNLOAD = 'http://192.168.1.63:5171/download/'; //下载接口(有权限)
// export const URL_DOWNLOAD_KEY = 'http://192.168.1.63:82/'; //下载接口（无权限）
// export const URL_AUTHORITY = 'http://192.168.1.63:5171/scale/'; //图片缩略图（有权限）
// export const URL_SCALE = 'http://192.168.1.63:5181/scale/'; //图片缩略图（无权限）
// export const WEBSOCKET_GCOMET = 'http://192.168.1.63:5150/v1/gComet.addr'; // websocket

//---------------end--------------------

// //----云平台正式环境－－－－－－－－－begin---------
// const COOKIE_PATH = 'http://hz.miux.com.cn:8086/SessionManager/';
// const UM_PATH = 'http://hz.miux.com.cn:8084/MIUX_YUN_UM/';
// const CT_PATH = 'http://hz.miux.com.cn:8083/MIUX_YUN_CT/';
// const TM_PATH = 'http://hz.miux.com.cn:8082/miux_yun_tm/'
// const DM_PATH = 'http://hz.miux.com.cn:8081/miux_yun_dm/';
// const MM_PATH = 'http://hz.miux.com.cn:8085/miux_yun_mm/'
// const CK_PATH = 'http://test.ck.miux.com:8090/miux_ESE_ck/'; //审批流程
//   //   // //有权限
// export const UPLOAD_PRVATE = "http://hz.miux.com.cn:7171/";
// // // 无权限
// export const UPLOAD_NOT_PRVATE = "http://hz.miux.com.cn:7181/";
// export const GET_COOKIE_URL = COOKIE_PATH + 'getSession.action?CTYPE=8'; // 获取全部的cookie
// export const URL_DOWNLOAD = 'http://hz.miux.com.cn:7171/download/'; //下载接口(有权限)
// export const URL_DOWNLOAD_KEY = 'http://hz.miux.com.cn:82/'; //下载接口（无权限）
// export const URL_AUTHORITY = 'http://hz.miux.com.cn:7171/scale/'; //图片缩略图（有权限）
// export const URL_SCALE = 'http://hz.miux.com.cn:7181/scale/'; //图片缩略图（无权限）
// export const WEBSOCKET_GCOMET = 'http://hz.miux.com.cn:7150/v1/gComet.addr'; // websocket
//---------------end--------------------


// //----演示云平台正式环境－－－－－－－－－begin---------
// const COOKIE_PATH = 'http://dl.miux.com.cn:8086/SessionManager/';
// const UM_PATH = 'http://dl.miux.com.cn:8084/MIUX_YUN_UM/';
// const CT_PATH = 'http://dl.miux.com.cn:8083/MIUX_YUN_CT/';
// const TM_PATH = 'http://dl.miux.com.cn:8082/miux_yun_tm/'
// const DM_PATH = 'http://dl.miux.com.cn:8081/miux_yun_dm/';
// const MM_PATH = 'http://dl.miux.com.cn:8085/miux_yun_mm/'
// const CK_PATH = 'http://test.ck.miux.com:8090/miux_ESE_ck/'; //审批流程
//     //   // //有权限
// export const UPLOAD_PRVATE = "http://dl.miux.com.cn:7171/";
// // // 无权限
// export const UPLOAD_NOT_PRVATE = "http://dl.miux.com.cn:7181/";
// export const GET_COOKIE_URL = COOKIE_PATH + 'getSession.action?CTYPE=8'; // 获取全部的cookie
// export const URL_DOWNLOAD = 'http://dl.miux.com.cn:7171/download/'; //下载接口(有权限)
// export const URL_DOWNLOAD_KEY = 'http://dl.miux.com.cn:82/'; //下载接口（无权限）
// export const URL_AUTHORITY = 'http://dl.miux.com.cn:7171/scale/'; //图片缩略图（有权限）
// export const URL_SCALE = 'http://dl.miux.com.cn:7181/scale/'; //图片缩略图（无权限）
// export const WEBSOCKET_GCOMET = 'http://dl.miux.com.cn:7150/v1/gComet.addr'; // websocket
//---------------end--------------------








//开发环境－－－－－－－－－－begin－－－－－－－－－
// const COOKIE_PATH = 'http://sm.miux.com:8081/SessionManager/';
// const UM_PATH = 'http://um.miux.com:8081/MIUX_ESE_UM/';
// const CT_PATH = 'http://um.miux.com:8081/MIUX_ESE_CT/';
// const TM_PATH = 'http://tm.miux.com:8081/miux_ESE2.0_tm/'
// const DM_PATH = 'http://dm.miux.com:8081/miux_dm/';
// const MM_PATH = 'http://mm.miux.com:8081/miux_mm/';
// const CK_PATH = 'http://test.ck.miux.com:8090/miux_ESE_ck/'; //审批流程
// // 有权限
// export const UPLOAD_PRVATE = "http://192.168.1.63:5171/";
// // 无权限
// export const UPLOAD_NOT_PRVATE = "http://192.168.1.63:5181/";
// export const URL_DOWNLOAD = 'http://192.168.1.63:5171/download/'; //下载接口(有权限)
// export const URL_DOWNLOAD_KEY = 'http://192.168.1.63:82/'; //下载接口（无权限）
// export const URL_SCALE = 'http://192.168.1.63:5181/scale/'; //图片缩略图（无权限）
// export const URL_AUTHORITY = 'http://192.168.1.63:5171/scale/'; //图片缩略图（有权限）
// export const GET_COOKIE_URL = COOKIE_PATH + 'getSession.action?CTYPE=8'; // 获取全部的cookie
// export const WEBSOCKET_GCOMET = 'http://192.168.1.63:5150/v1/gComet.addr'; // websocket

//--------------end---------------


//正式环境打开－－－－－－begin－－－－－－－－－－－－－
// const COOKIE_PATH = 'http://sm.miux.com.cn:8083/SessionManager/';
// const UM_PATH = 'http://um.miux.com.cn:8082/MIUX_ESE_UM/';
// const CT_PATH = 'http://um.miux.com.cn:8081/MIUX_ESE_CT/';
// const TM_PATH = 'http://tm.miux.com.cn:8084/miux_ESE2.0_tm/'
// const DM_PATH = 'http://dm.miux.com.cn:8085/miux_dm/';
// const MM_PATH = 'http://mm.miux.com.cn:8086/miux_mm/';
// export const UPLOAD_PRVATE = "http://fs.miux.com.cn:5171/";
// const CK_PATH = 'http://test.ck.miux.com:8090/miux_ESE_ck/'; //审批流程
// // 无权限
// export const UPLOAD_NOT_PRVATE = "http://fs.miux.com.cn:5181/";
// export const URL_DOWNLOAD = UPLOAD_PRVATE + 'download/'; //下载接口(有权限)
// export const URL_DOWNLOAD_KEY = 'http://fs.miux.com.cn:82/'; //下载接口（无权限）
// export const URL_SCALE = UPLOAD_NOT_PRVATE + 'scale/'; //图片缩略图（无权限）
// export const URL_AUTHORITY = 'http://fs.miux.com.cn:5171/scale/'; //图片缩略图（有权限）
// export const GET_COOKIE_URL = COOKIE_PATH + 'getSession.action?CTYPE=8'; // 获取全部的cookie
// export const WEBSOCKET_GCOMET = 'http://push.miux.com.cn:5150/v1/gComet.addr'; // websocket
//-----------end------------------------

//正式环境打开－－－－－－世纪之光begin－－－－－－－－－－－－－
// const COOKIE_PATH = 'http://miux.copticomm.com:8086/SessionManager/';
// const UM_PATH = 'http://miux.copticomm.com:8084/MIUX_ESE_UM/';
// const CT_PATH = 'http://miux.copticomm.com:8083/MIUX_ESE_CT/';
// const TM_PATH = 'http://miux.copticomm.com:8082/miux_ESE2.0_tm/'
// const DM_PATH = 'http://miux.copticomm.com:8081/miux_dm/';
// const MM_PATH = 'http://miux.copticomm.com:8085/miux_mm/';
// const CK_PATH = 'http://test.ck.miux.com:8090/miux_ESE_ck/'; //审批流程
// export const UPLOAD_PRVATE = "http://miux.copticomm.com:5171/";

// // //无权限
// export const UPLOAD_NOT_PRVATE = "http://miux.copticomm.com:5181/";
// export const URL_DOWNLOAD = UPLOAD_PRVATE + 'download/'; //下载接口(有权限)
// export const URL_DOWNLOAD_KEY = 'http://miux.copticomm.com:82/'; //下载接口（无权限）
// export const URL_SCALE = UPLOAD_NOT_PRVATE + 'scale/'; //图片缩略图（无权限）
// export const URL_AUTHORITY = 'http://miux.copticomm.com:5171/scale/'; //图片缩略图（有权限）
// export const GET_COOKIE_URL = COOKIE_PATH + 'getSession.action?CTYPE=8'; // 获取全部的cookie
// export const WEBSOCKET_GCOMET = 'http://miux.copticomm.com:5150/v1/gComet.addr'; // websocket
//-----------end------------------------

//正式环境打开－－－－－－miux线上测试begin－－－－－－－－－－－－－
// const COOKIE_PATH = 'http://dl.miux.com.cn:8086/SessionManager/';
// const UM_PATH = 'http://dl.miux.com.cn:8084/MIUX_ESE_UM/';
// const CT_PATH = 'http://dl.miux.com.cn:8083/MIUX_ESE_CT/';
// const TM_PATH = 'http://dl.miux.com.cn:8082/miux_ESE2.0_tm/'
// const DM_PATH = 'http://dl.miux.com.cn:8081/miux_dm/';
// const MM_PATH = 'http://dl.miux.com.cn:8085/miux_mm/';
// export const UPLOAD_PRVATE = "http://dl.miux.com.cn:5171/";
// // 无权限
// export const UPLOAD_NOT_PRVATE = "http://dl.miux.com.cn:5181/";
// export const URL_DOWNLOAD = UPLOAD_PRVATE + 'download/'; //下载接口(有权限)
// export const URL_DOWNLOAD_KEY = 'http://dl.miux.com.cn:82/'; //下载接口（无权限）
// export const URL_SCALE = UPLOAD_NOT_PRVATE + 'scale/'; //图片缩略图（无权限）
// export const URL_AUTHORITY = 'http://dl.miux.com.cn:5171/scale/'; //图片缩略图（有权限）
// export const GET_COOKIE_URL = COOKIE_PATH + 'getSession.action?CTYPE=8'; // 获取全部的cookie
// export const WEBSOCKET_GCOMET = 'http://dl.miux.com.cn:5150/v1/gComet.addr'; // websocket
//-----------end------------------------


//审批功能
export const CREATE_APPLY = CK_PATH + 'ESCK001.action' //创建审批
export const EDITOR_APPLY = CK_PATH + 'ESCK002.action' //重新编辑审批
export const GIVE_UP_APPLY = CK_PATH + 'ESCK003.action' //放弃审批审批
export const DELIVER_APPLY = CK_PATH + 'ESCK004.action' //转呈审批
export const APPLY_LISTS = CK_PATH + 'ESCK005.action' //审批列表
export const APPLY_DETAILE = CK_PATH + 'ESCK006.action' //审批列表详细
export const IS_LOOK_APPLY = CK_PATH + 'ESCK007.action' //审批查看取消小红点

export const IMAGE_CODE_URL = UM_PATH + 'ESUMG003.action'; //图片验证码
export const LOGIN_URL = UM_PATH + 'ESUMG006.action'; //登录

//管理员
export const ADMIN_LOGIN_URL = UM_PATH + 'ESUMG040.action'; //管理员登录
export const CHOOSE_TEAR_URL = UM_PATH + 'ESUMG041.action'; //选择团腿


export const VALIDE_COLDE_URL = UM_PATH + 'ESUMG004.action'; //效验验证码
export const PHONE_COLDE_URL = UM_PATH + 'ESUMG001.action'; //短信验证码
export const VALIDE_PHONE_COLDE_URL = UM_PATH + 'ESUMG002.action'; //手机验证码验证
export const VALIDE_PHONE_BOOLEAR_URL = UM_PATH + 'ESUMG004.action'; //验证码手机验证码
export const REGISTER_URL = UM_PATH + 'ESUMG004.action'; //注册第一步
export const IS_REGISTER_URL = UM_PATH + 'ESUMG005.action'; //注册第二步
export const RESET_PASSWORD_URL = UM_PATH + 'ESUMG007.action'; //重置密码

//个人设置
export const SETTING_URL = UM_PATH + 'ESUMG008.action'; //获取个人信息
export const SEND_SMS = UM_PATH + 'ESUMG001.action'; //发送短信
export const VALIDE_SMS = UM_PATH + 'ESUMG002.action'; //验证短信码
export const UPDATE_MOBILE = UM_PATH + 'ESUMG011.action'; //变更手机号码
export const UPDATE_PASSWORD_URL = UM_PATH + 'ESUMG009.action'; //修改密码
export const CHANGE_STATE_URL = UM_PATH + 'ESUMG010.action'; //推送开关
export const SAVE_PARSON_URL = UM_PATH + 'ESUMG015.action'; //1.15.	头像上传

export const UPDATE_SIGN_URL = UM_PATH + 'ESUMG012.action'; //1.12.	签名修改
export const UPDATA_EMAIL_URL = UM_PATH + 'ESUMG013.action'; //1.13.	邮箱修改
export const UPDATA_PHONE_URL = UM_PATH + 'ESUMG014.action'; //1.14.	工作电话修改
//左侧最近消息
export const MESSAGE_URL = UM_PATH + 'ESUMG027.action'; //1.27.	最新消息列表
export const CONTACT_URL = UM_PATH + 'ESUMG026.action'; //1.26.	最新联系人列表
//最新消息红点
export const MESSAGE_RED_URL = UM_PATH + 'ESUMG028.action'; //1.28.	标记最新消息已读
//与我有关
export const ABOUT_URL = UM_PATH + 'ESUMG021.action'; //1.21.	与我相关列表查询
export const ADD_AND_UPDATE_KEYWORDS_URL = UM_PATH + 'ESUMG022.action'; //	1.22.	新增或更新高亮关键词
export const SEARCH_KEYWORDS_URL = UM_PATH + 'ESUMG033.action'; //	1.33.  	查询用户关键字
export const DELETE_KEYWORDS_URL = UM_PATH + 'ESUMG023.action'; //	1.23.	删除高亮关键词
export const DELETE_ABOUT_URL = UM_PATH + 'ESUMG024.action'; //	1.24.	删除与我相关

//通讯录星标

export const BOOKS_FOR_STAR_URL = UM_PATH + 'ESUMG019.action'; //左侧列表或者通讯录人员星标列表
export const SEARCH_PARSON_STAR = UM_PATH + 'ESUMG036.action'; //查询人员是否星标
export const ADD_STAR_OR_CANCEL_STAR_URL = UM_PATH + 'ESUMG020.action'; //1.20.	人员星标或取消星标
//登出接口
export const LOGIN_OUT_URL = UM_PATH + 'ESUMG025.action';
//星标收藏
export const START_LIST_URL = UM_PATH + 'ESUMG016.action'; //星标列表
export const ADD_START_URL = UM_PATH + 'ESUMG017.action'; //1.17.	文档星标/消息星标 添加星标
export const DELETE_START_URL = UM_PATH + 'ESUMG018.action'; //1.18.	文档星标/消息星标  取消星标
//行事历

export const GET_TASKING_LIST = CT_PATH + 'ESCTG001.action'; //正在执行的行事历
export const GET_TASKDONE_LIST = CT_PATH + 'ESCTG002.action'; //已完成的行事历
export const GET_LEFT_TASKDONE_LIST = CT_PATH + 'ESCTG003.action'; //左侧行事历
export const TASK_DETAILE_URL = CT_PATH + 'ESCTG006.action'; //行事历详情
export const NEW_TASK_URL = CT_PATH + 'ESCTG005.action'; //创建行事历
export const REFRESH_TASK_URL = CT_PATH + 'ESCTG004.action'; //行事历更新
/**
 * TM************************************** TM ********************************
 */
//团队管理
export const UPDATE_PERSION_DATA_URL = TM_PATH + 'ESTMG001.action'; //1.1.	修改人员数据
export const UPDATE_ALL_PERSION_DATA_URL = TM_PATH + 'ESTMG002.action'; //1.2.	批量修改人员数据
export const UPDATE_TEAR_LOGO_URL = TM_PATH + 'ESTMG003.action'; //1.3.	修改团队LOGO
export const UPDATE_TEAR_NAME_URL = TM_PATH + 'ESTMG004.action'; //1.4.	修改团队名称
export const SEARCH_TEAR_NAME_URL = TM_PATH + 'ESTMG035.action'; //1.4.	查询团队名称
export const SEARCH_TEAR_ASSISTANT_URL = TM_PATH + 'ESTMG049.action'; //1.4.	查询团队助理名称
export const UPDATE_TEAR_ASSISTANT_URL = TM_PATH + 'ESTMG050.action'; //1.4.	查询团队助理名称
export const UPLOAD_ASSISTANT_URL = TM_PATH + 'ESTMG051.action'; //1.51.修改团队助理LOGO

export const DOWN_MEMBER_EXCEL_URL = TM_PATH + 'ESTMG055.action'; //1.55.导出人员数据

export const ADD_SUPER_MANAGER_URL = TM_PATH + 'ESTMG005.action'; //1.5.	添加超级管理员
export const ADD_AREA_MANAGER_URL = TM_PATH + 'ESTMG006.action'; //1.6.	添加区域管理员
export const SEARCH_SUPER_MANAGER_URL = TM_PATH + 'ESTMG007.action'; //1.7.	查询超级管理员
export const SEARCH_AREA_MANAGER_URL = TM_PATH + 'ESTMG008.action'; //1.8.	查询区域管理员
export const REMOVE_SUPER_MANAGER_URL = TM_PATH + 'ESTMG009.action'; //1.9.	移出超级管理员
export const REMOVE_AREA_MANAGER_URL = TM_PATH + 'ESTMG010.action'; //1.10.	移出区域管理员
export const ADD_DEPARTMENT_URL = TM_PATH + 'ESTMG011.action'; //1.11.	添加部门
export const UPDATE_DEPARTMENT_NAME_URL = TM_PATH + 'ESTMG012.action'; //1.12.	修改部门名称
export const DETELE_DEPARTMENT_URL = TM_PATH + 'ESTMG013.action'; //1.13.	删除部门
export const SEARCH_MANAGE_LOG_URL = TM_PATH + 'ESTMG014.action'; //1.14.	查询管理日志

export const ROBOT_DATA_URL = TM_PATH + 'ESTMG058.action'; //1.59. 删除团队成员
export const DELETE_MERMBER_URL = TM_PATH + 'ESTMG059.action'; //1.59. 删除团队成员
export const GROUP_IMAGE_URL = TM_PATH + 'ESTMG057.action'; //1.57. 修改频组LOGO
export const SEARCH_MAIN_URL = TM_PATH + 'ESTMG061.action'; //1.57. 修改频组LOGO




//通讯录
export const BOOKS_TEMA_URL = TM_PATH + 'ESTMG015.action'; //查询通讯录人员
export const BOOKS_GROUP_URL = TM_PATH + 'ESTMG016.action'; //频组

export const SEARCH_TEAM_TREE_URL = TM_PATH + 'ESTMG034.action'; //1.34. 查询部门机构树

export const SEARCH_TEMA_URL = TM_PATH + 'ESTMG037.action'; //查询所有部门
export const SEARCH_ALL_DEPART_URL = TM_PATH + 'ESTMG054.action'; //查询所有部门（平级）
export const SEARCH_ONE_DPART_URL = TM_PATH + 'ESTMG038.action'; //查询单个部门的人
export const CREATE_GROUP_URL = TM_PATH + 'ESTMG017.action'; //创建频组
export const SEARCH_BOOKS_NUM_URL = TM_PATH + 'ESTMG036.action'; //1.15.	查询通讯录人员
export const SEARCH_GROUP_BASE_INFO_URL = TM_PATH + 'ESTMG021.action'; //1.20.	查询频组简介和查询频组基本信息

export const ADD_PERSONS_SINGLE_URL = TM_PATH + 'ESTMG032.action'; //1.20.	查询频组简介和查询频组基本信息
export const INVITED_JOIN_URL = TM_PATH + 'ESTMG018.action'; //1.30邀请加入频组
export const CANCLE_AND_REFUSE_URL = TM_PATH + 'ESTMG043.action'; //1.30邀请加入频组
export const UPDATE_GROUP_NAME_URL = TM_PATH + 'ESTMG022.action'; //1.22.	修改频组名称
export const GROUP_INVIRED_PARSON_URL = TM_PATH + 'ESTMG030.action'; //	30邀请加入频组
export const UPDATE_GROUP_INTRO_URL = TM_PATH + 'ESTMG023.action'; //1.23.	修改频组简介
export const UPDATE_GROUP_NOTICE_URL = TM_PATH + 'ESTMG024.action'; //1.24.	修改频组公告
export const UPDATE_GROUP_DISTURB_URL = TM_PATH + 'ESTMG025.action'; //1.25.	修改频组免打扰
export const REMOVE_GROUP_MANAGE_URL = TM_PATH + 'ESTMG028.action'; //1.28 移出频组管理员
export const EXIT_GROUP_URL = TM_PATH + 'ESTMG026.action'; //1.26.	退出频组
export const DELETE_GROUP_URL = TM_PATH + 'ESTMG019.action'; //1.26.	删除频组
export const FIND_GROUP_NUM_URL = TM_PATH + 'ESTMG044.action'; //1.44. 查询频组人员
export const FIND_PRATIVE_CARD_URL = TM_PATH + 'ESTMG045.action'; //1.45. 查询个人名片
export const VALIDE_CARD_MOBILE_URL = TM_PATH + 'ESTMG046.action'; //个人名片验证手机号
export const REGITER_PERSON_URL = TM_PATH + 'ESTMG060.action'; //个人名片验证手机号

export const UP_MANAGE_URL = TM_PATH + 'ESTMG027.action'; //1.27.	提升为频组管理员
export const REMOVE_GROUP_PERSON_URL = TM_PATH + 'ESTMG029.action'; //移出频组成员



/**
 * DM************************************** DM ********************************
 */
//文档

export const DOC_UPLOAD_URL = DM_PATH + 'ESDMG001.action'; //文档上传
export const DOC_LIST_URL = DM_PATH + 'ESDMG004.action'; //文档列表
export const DOC_PER_URL = DM_PATH + 'ESDMG005.action'; // 查询上传者
//文档详情
export const GET_DOCDETA_URL = DM_PATH + 'ESDMG006.action'; //文档库查看详情
export const DOC_DEL_URL = DM_PATH + 'ESDMG003.action'; //文档删除
export const DOC_COMMENT_URL = DM_PATH + 'ESDMG007.action'; //文档评论
export const SEARCH_GROUP_URL = DM_PATH + 'ESDMG008.action'; //查询当前用户所在群组列表
export const GET_UPLOAD_TOKEN_URL = DM_PATH + 'ESDMG009.action'; //获取上传凭证
export const GET_DOWN_TOKEN_URL = DM_PATH + 'ESDMG010.action'; //获取下载凭证
/**
 * MM
 */
export const CANCEL_MESSAGE_URL = MM_PATH + 'ESMMG003.action'; //1.3.	消息撤回=======
export const HISTORY_MESSAGE_URL = MM_PATH + 'ESMMG002.action'; //1.2.	历史消息查询
export const SEND_VOTE_URL = MM_PATH + 'ESMMG004.action'; //1.4.	发起投票
export const REFRESH_VOTE_URL = MM_PATH + 'ESMMG005.action'; //1.5.	刷新(查询投票结果)
export const CHOOSE_VOTE_URL = MM_PATH + 'ESMMG006.action'; //1.6.	投票
export const GROUP_NOTIC = MM_PATH + 'ESMMG007.action'; //1.7.	频组公告历史消息查询
export const GROUP_NOTIC_DEL = MM_PATH + 'ESMMG008.action'; //1.7.	频组公告历史消息查询
export const NOTIC_DETAILE = MM_PATH + 'ESMMG009.action'; //1.7.	公告详情

/*
 * URL
 */