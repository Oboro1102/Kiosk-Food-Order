import { createApp } from 'vue'
import "@/assets/css/bootstrap-reboot.min.css"
import "@/assets/scss/base.scss"
import App from './App.vue'
import store from './store'

createApp(App).use(store).mount('#app')
