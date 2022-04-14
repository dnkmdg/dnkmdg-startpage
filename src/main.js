import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import localeSv from 'dayjs/locale/sv'
import router from './router'

dayjs.extend(localizedFormat)
dayjs.locale('sv')

const app = createApp(App)

app.use(router)
app.mount('#app')