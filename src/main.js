import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootswatch/dist/superhero/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

createApp(App)
    .use(router)
    .mount('#app')
