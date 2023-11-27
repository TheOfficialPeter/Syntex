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
    },
    mounted() {
        if (window.localStorage.getItem('robloxGameId') != null) {
            this.gameAdded = true;
        }
        else if (window.localStorage.getItem('steamGameId') != null) {
            this.gameAdded = true;
        }
    }
}
</script>

<style>
    body {
        background-color: #F3F6FB;
    }
</style>
