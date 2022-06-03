import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from "./router";
import ElementPlus from 'element-plus';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faPhone, faPlus} from "@fortawesome/free-solid-svg-icons";

library.add(faPlus)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(ElementPlus)


app.mount('#app')
