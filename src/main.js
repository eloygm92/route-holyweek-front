import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from "./router";
import ElementPlus from 'element-plus';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faPlus, faEllipsisVertical, faInfo, faPen, faChurch} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

library.add(faPlus, faEllipsisVertical, faInfo, faPen, faClock, faChurch);

const app = createApp(App)

app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(router)
app.use(ElementPlus)


app.mount('#app')
