import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import SettingsView from './Settings.vue'
import './index.css'

const routes = [
    {
        path: '/',
        component: App,
        meta: { navID: 1 }
    },
    {
        path: '/Settings',
        component: SettingsView,
        meta: { navID: 4 }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    console.log('Route changed from', from.fullPath, 'to', to.fullPath);
    next();
});

const app = createApp(App)

app.use(router)

app.mount("#app")
