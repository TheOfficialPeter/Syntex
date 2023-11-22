<template>
	<NavDrawer></NavDrawer>
    <router-view></router-view>
</template>

<script>
import NavDrawer from './components/NavDrawer.vue';

export default {
    name: "App",
    components: { NavDrawer }
}
</script>
