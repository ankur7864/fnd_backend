import Vue from 'vue';
import App from './App.vue';
import Vuelidate from 'vuelidate';
import Router from 'vue-router';
import store from './store';
import router from './router';
import { formatDate } from './filters/formatDate';
import VueToast from 'vue-toast-notification';

import 'vue-toast-notification/dist/theme-sugar.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";




Vue.config.productionTip = false
Vue.use(Router);
Vue.filter( 'formatDate', formatDate );
Vue.use( Vuelidate );
Vue.use( VueToast, {
  position : 'top-right',
});

new Vue({
  router,
  store,
  VueToast,
  render: h => h(App),
}).$mount('#app')
