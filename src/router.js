import { createRouter, createWebHashHistory } from 'vue-router'
import StartView from './views/StartView.vue'
import MiniView from './views/MiniView.vue'

const routes = [
    { 
        path: '/',
        component: StartView 
    },
    { 
        name: 'next',
        path: '/mini',
        component: MiniView 
    }
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes // short for `routes: routes`
})

export default router