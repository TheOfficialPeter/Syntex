import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import DashboardView from './views/Dashboard.vue'
import VersionView from './views/Version.vue'
import IntegrationsView from './views/Integration.vue'
import DatabaseView from './views/Database.vue'
import './index.css'

const routes = [
    {
        path: '/',
        component: DashboardView,
        meta: { navID: 1 }
    },
    {
        path: '/version',
        component: VersionView,
        meta: { navID: 2 }
    },
    {
        path: '/database',
        component: DatabaseView,
        meta: { navID: 3 }
    },
    {
        path: '/integration',
        component: IntegrationsView,
        meta: { navID: 4}
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
