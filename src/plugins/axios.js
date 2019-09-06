import axios from 'axios';

export default {
  install(Vue) {
    const instance = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
      auth: {
        username: process.env.VUE_APP_API_USERNAME,
        password: process.env.VUE_APP_API_PASSWORD
      }
    });
    Vue.api = instance;
    Vue.prototype.$api = instance;
  }
}
