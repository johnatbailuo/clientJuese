import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.js'
import './assets/main.css'

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
// add stylesheet



const app = createApp(App)

app.use(router)
app.use(bootstrap)
app.use(VueAxios, axios)
app.mount('#app')
app.component('EasyDataTable', Vue3EasyDataTable);
