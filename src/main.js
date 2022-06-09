import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from "./router";
import ElementPlus from 'element-plus';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faPlus, faEllipsisVertical, faInfo, faPen} from "@fortawesome/free-solid-svg-icons";

library.add(faPlus)
library.add(faEllipsisVertical)
library.add(faInfo)
library.add(faPen)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(ElementPlus)


app.mount('#app')
