/**
 * Vuex 的状态存储是响应式的. 当 Vue 组件从 store 中读取状态的时候,
 * 若 store 中的状态发生变化，那么相应的组件也会相应地高效地得到更新.
 * 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地分发
 * 状态变更事件(explicitly dispatching mutations)。
 * 这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
// 告诉 vue “使用” vuex
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        currentRight: '', // 右边弹出框状态
        currentID: '', //右边弹出框id
        departmentList: null, // 获取部门人的数据
        currentParentType: '',
        showGroupIcon: [], //是否是频组信息
        taskList: [], //行事历
        finishTaskID: '', //行事历完成id
        chooseSuerPerson: [], //选择参与人员列表
        chooseSuerIndex: [], //选择参与id
        layersObject: null,
        areaManage: '',
        sendNewPersonList: {},
        currentThreadID: null, //当前会话者id
        manageList: [],
        cancelStar: {},
        messageList: [],
        userList: [],
        shareDocData: '',
        noticeTab: false,
        threads: {},
        messages: [],
        pressBar: {},
        taskChecked: false,
        groupListItem: [],
        addPublicGroup: {}, //公开群组
        addSecretGroup: {}, //私密群组
        uploadReturnList: {}, //上传返回值
        chooseFilesItem: {},
        newApplyObj: {},
        editApply: [],

    },
    mutations,
})