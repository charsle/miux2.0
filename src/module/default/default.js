import Vue from "vue";
import VueRouter from 'vue-router';
import app from '../../components/default/app'
import forgetPwd from '../../components/default/forgetPwd';
import register from '../../components/default/register';
import setting from '../../components/default/setting';
import settingPwd from '../../components/default/settingPwd';
Vue.use(VueRouter);
var router = new VueRouter({
  //history:true
});
router.map({
  '/register': {
    name: 'register',
    component: register,
  },
  '/fpassword': {
    name: 'fpassword',
    component: forgetPwd,
  },
  '/spassword': {
    name: 'spassword',
    component: settingPwd,
  },
  '/setting': {
    name: 'setting',
    component: setting,
  }
})
router.redirect({
  '*': '/register'
});


router.start(app, '#default');
