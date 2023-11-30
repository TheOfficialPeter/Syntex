import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import DashboardView from './components/Dashboard.vue'
import PrimeVue from 'primevue/config';
import './index.css'

const routes = [
    {
        path: '/',
        component: DashboardView,
        meta: { navID: 1 }
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
app.use(PrimeVue);

app.mount("#app")
