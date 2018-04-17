// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/App';
import router from '@/router';

import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

export const SocketInstance = socketio('http://localhost:8080');
Vue.use(VueSocketIO, SocketInstance);

require('./assets/style.css');
require('bootstrap/dist/css/bootstrap.css');
require('font-awesome/css/font-awesome.css');

Vue.config.productionTip = false;

const states = {
  user: {
    name: ''
  }
};

new Vue({
  el: '#app',
  data: states,
  router,
  components: {App},
  template: '<App/>'
});

