import Vue from 'vue'
import App from './../../components/adminapp/app'
import store from '../../vuex/store';
import choosePerson from '../../components/main/model/choosePerson';
import item from '../../components/main/model/treeItem';
import {
  filters
} from '../../assets/js/filters';
filters(Vue);
Vue.component('choose-person', choosePerson);
Vue.component('treeItem', item);
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: {
    App
  },
  store
})
