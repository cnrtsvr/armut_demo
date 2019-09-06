import Vue from 'vue';
import App from './App.vue';

import Vuetify from 'vuetify'
import axiosPlugin from './plugins/axios.js';

Vue.config.productionTip = false;

Vue.use(Vuetify);
import 'vuetify/dist/vuetify.min.css';

Vue.use(axiosPlugin);


new Vue({
  render: h => h(App),
}).$mount('#app');
