import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import FormSubmitButton from "@/components/FormSubmitButton";
import Alerts from "@/components/Alerts";

import VModal from 'vue-js-modal';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import {faPen, faTrashAlt, faPlus, faEye, faUser, faAngleDoubleRight, faAngleDoubleLeft, faCheck, faFileExport} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPen, faTrashAlt, faPlus, faEye, faUser, faAngleDoubleRight, faAngleDoubleLeft, faCheck, faFileExport);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('form-submit-button', FormSubmitButton);
Vue.component('alerts', Alerts);

Vue.use(VModal, { dialog: true });

Vue.use(Toast, {
  position: 'top-right',
  timeout: 4000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.90,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  maxToasts: 20,
  newestOnTop: true
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
