import { createApp } from 'vue'
import router from './router/router'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import Tabs from './components/Tabs.vue'

const app = createApp(App)
const pinia = createPinia()
  
app.component('Tabs', Tabs)
app.use(router).use(pinia)
app.mount('#app')
