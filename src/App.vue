<template>
    <NavDrawer></NavDrawer>
    <PopupView v-if="!gameAdded"></PopupView>
    <router-view v-if="gameAdded"></router-view>
</template>

<script>
import NavDrawer from './components/NavDrawer.vue';
import PopupView from './components/Popup.vue';

export default {
    name: "App",
    components: { NavDrawer, PopupView },
    data() {
        return {
            gameAdded: false
        }
    }
}
</script>
