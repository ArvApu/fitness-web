import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import FormSubmitButton from "@/components/FormSubmitButton";
import Alerts from "@/components/Alerts";

import VModal from 'vue-js-modal';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPen, faTrashAlt, faPlus, faEye, faUser, faCircleNotch, faSpinner} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPen, faTrashAlt, faPlus, faEye, faUser, faCircleNotch, faSpinner );

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('form-submit-button', FormSubmitButton);
Vue.component('alerts', Alerts);

Vue.use(VModal, { dialog: true });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
