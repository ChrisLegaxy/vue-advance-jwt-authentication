import Vue from 'vue';
import axios from '@/utils/axios';

const AxiosPlugin = {
  install(vue: typeof Vue) {
    vue.prototype.$axios = axios;
  },
};

Vue.use(AxiosPlugin);
