import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import DashboardView from './components/Dashboard.vue'
import SettingsView from './views/Settings.vue'
import TiktokView from './views/Tiktok.vue'
import VueApexCharts from "vue3-apexcharts";
import './index.css'

const routes = [
    {
        path: '/',
        component: DashboardView,
        meta: { navID: 1 }
    },
    {
        path: '/Tiktok',
        component: TiktokView,
        meta: { navID: 2 }
    },
    {
        path: '/Settings',
        component: SettingsView,
        meta: { navID: 5 }
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
app.use(VueApexCharts)

app.mount("#app")
