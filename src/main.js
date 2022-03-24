import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import 'bootswatch/dist/superhero/bootstrap.min.css'
// import 'bootswatch/dist/sketchy/bootstrap.min.css'
// import 'bootswatch/dist/slate/bootstrap.min.css'
// import 'bootswatch/dist/solar/bootstrap.min.css'
// import 'bootswatch/dist/yeti/bootstrap.min.css'
// import 'bootswatch/dist/cyborg/bootstrap.min.css'
import 'bootswatch/dist/lumen/bootstrap.min.css'
// import 'bootswatch/dist/lux/bootstrap.min.css'




import 'bootstrap/dist/js/bootstrap.min.js'

createApp(App)
    .use(router)
    .mount('#app')
