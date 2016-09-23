/**
 * Mutations 本质上是一个事件系统：每个 mutation 都有一个 事件名 (name) 和 一个 回调函数 (handler).
 * 任何一个 Mutation handler 的第一个参数永远为所属 store 的整个 state 对象：
 */

import * as types from './mutation-types'

import gloabl from '../api/globConfig'
import * as URL from '../api/restfull'
export default {
  [types.SWITCH_RIGHT](state, curr, id, parentType) {
    id = id ? id : '';
    parentType = parentType ? parentType : '';
    state.currentRight = curr;
    state.currentID = id;
    state.currentParentType = parentType;
    $('.CONTENT_HEADERT_RIGHT a').removeClass('tab_active');
    $('.icon_' + curr).addClass('tab_active');
    gloabl.golableTab();
  },
  [types.CHANGE_HEADER_NAME](state, obj) {
    state.threads = obj;
  },
  [types.DEPART_LIST_PERSON](state, id) {
    gloabl.fethAsync([URL.REGITER_PERSON_URL], 'TM00101=' + id, res => {
      if (res.success) {
        if (res.result !== null) {
          state.departmentList = res.result;
        } else {
          state.departmentList = [];
        }
      }
    });
  },
  [types.CHOOSE_ALL_PERSON](state, obj) {
    state.chooseSuerPerson = obj;
  },
  [types.CHOOSE_ALL_INDEX](state, obj) {
    state.chooseSuerIndex = obj;
  },
  [types.SHOW_GROUP_ICON](state, obj) {
    state.showGroupIcon = obj;
  },
  [types.SEND_MESSAGE](state, obj) {
    state.messages = obj;
  },
  [types.MANAGE_LIST](state, list) {
    state.manageList = list;
  },
  [types.MESSAGE_LIST](state, list) {
    state.messageList = list;
  },
  [types.TASK_LIST](state, list) {
    state.taskList = list;
  },
  [types.FINISH_TASH_ID](state, list) {
    state.finishTaskID = list;
  },
  [types.AREA_MANAGE](state, id) {
    state.areaManage = id;
  },
  [types.LAYER_OBJECT](state, obj) {
    state.layersObject = obj;
  },
  [types.SUPER_MANAGER](state, obj) {
    state.userList = obj;
  },
  [types.SHARE_DOC_DATA](state, obj) {
    state.shareDocData = obj;
  },
  [types.NOTICE_NAME](state, bool) {
    state.noticeTab = bool;
  },
  [types.PARESS_BAR](state, num) {
    state.pressBar = num;
  },
  [types.SEND_NEW_PERSON_LIST](state, list) {
    state.sendNewPersonList = list;
  },
  [types.CANCEL_STAR](state, list) {
    state.cancelStar = list;
  },
  [types.TASK_CHECKED](state, bool) {
    state.taskChecked = bool;
  },
  [types.GROUP_LIST_ITEM](state, list) {
    state.groupListItem = list;
  },
  [types.ADD_PUBLIC_GROUP](state, list) {
    state.addPublicGroup = list;
  },
  [types.ADD_SECRET_GROUP](state, list) {
    state.addSecretGroup = list;
  }
}
