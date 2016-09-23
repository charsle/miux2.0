import Vue from "vue";
import VueRouter from 'vue-router';
import creatTask from '../../components/main/model/creatTask';
import createGroup from '../../components/main/model/createGroup';
import choosePerson from '../../components/main/model/choosePerson';
import item from '../../components/main/model/treeItem';
import createPubGroup from '../../components/main/model/createPubGroup';
import messageContent from '../../components/main/index/messageContent';
import manage from '../../components/main/manage/manage';
import detaile from '../../components/main/model/noticeDetaile';
import app from '../../components/main/index/app';
// import modal from 'vue-bootstrap-modal';
import {
  filters
} from '../../assets/js/filters';
import gloabl from '../../api/globConfig'
filters(Vue);
Vue.config.debug = true;
Vue.component('creat-task', creatTask);
Vue.component('creat-group', createGroup);
Vue.component('creat-pubgroup', createPubGroup);
Vue.component('choose-person', choosePerson);
Vue.component('treeItem', item);
// Vue.component('modal', modal);
Vue.use(VueRouter);

var ada = JSON.parse(gloabl.getCookie('allUserInfo')).ada != null ? JSON.parse(gloabl.getCookie('allUserInfo')).ada : '阿达';

var router = new VueRouter({
  //history:true
});

router.map({
  '/message/:name/:sendid/:sendtype': {
    name: 'message',
    component: messageContent,
  },
  '/contact/:name/:sendid/:sendtype': {
    name: 'contact',
    component: messageContent,
  },
  '/manage/:type': {
    name: 'manage',
    component: manage,
  },
  '/notice/detaile': {
    name: 'notice',
    component: detaile,
  },
})
router.redirect({
  '*': '/message/' + ada.um0102 + '/' + ada.um0101 + '/1'
});
router.start(app, '#MIUX');
