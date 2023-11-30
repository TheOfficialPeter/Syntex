<template>
	<div class="select-none absolute bg-[#19181E] top-0 bottom-0 left-0 w-52 z-20">
		<div class="h-10 mx-10 my-10 flex flex-row gap-5 align-middl">
			<img src="../../public/Logo.svg" alt="">
			<h1 class="text-lg text-white leading-10">Syntex</h1>
		</div>

		<ul class="select-none absolute left-5 right-5 top-28 bottom-10 ">
			<router-link to="/">
				<li id="Dashboard" :style="{ 'background-color': id == 1 ? '#211F29' : 'transparent' }"
					class="cursor-pointer flex justify-left align-middle rounded-lg py-3 my-2 transition-all hover:scale-110">
					<OhVueIcon v-if="gameAdded" class="mx-3" name="md-home-round" fill="white"></OhVueIcon>
					<OhVueIcon v-if="!gameAdded" class="mx-3" name="io-add-circle-sharp" fill="white"></OhVueIcon>
					<h1 v-if="gameAdded" class="text-gray-300 text-sm font-medium">Dashboard</h1>
					<h1 v-if="!gameAdded" class="text-gray-300 text-sm font-medium">Add Game</h1>
				</li>
			</router-link>

			<router-link to="/version">
				<li v-if="gameAdded" id="Versions" :style="{ 'background-color': id == 2 ? '#211F29' : 'transparent' }"
					class="cursor-pointer flex justify-left align-middle rounded-lg py-3 my-2 transition-all hover:scale-110">
					<OhVueIcon class="mx-3" name="bi-calendar-fill" fill="white"></OhVueIcon>
					<h1 class="text-gray-300 text-sm font-medium">Game Versions</h1>
				</li>
			</router-link>

			<li v-if="gameAdded" id="Database" :style="{ 'background-color': id == 3 ? '#211F29' : 'transparent' }"
				class="cursor-pointer flex justify-left align-middle rounded-lg py-3 my-2 transition-all hover:scale-110">
				<OhVueIcon class="mx-3" name="hi-solid-database" fill="white"></OhVueIcon>
				<h1 class="text-gray-300 text-sm font-medium">Database Stats</h1>
			</li>

			<router-link to="/integration">
				<li v-if="gameAdded" id="Integrations" :style="{ 'background-color': id == 4 ? '#211F29' : 'transparent' }"
					class="cursor-pointer flex justify-left align-middle rounded-lg py-3 my-2 transition-all hover:scale-110">
					<OhVueIcon class="mx-3" name="fa-link" fill="white"></OhVueIcon>
					<h1 class="text-gray-300 text-sm font-medium">Integrations</h1>
				</li>
			</router-link>

			<li v-if="gameAdded" @click="remove()" id="Remove" :style="{ 'background-color': id == 5 ? '#211F29' : 'transparent' }"
				class="cursor-pointer flex justify-left align-middle rounded-lg py-3 my-2 transition-all hover:scale-110">
				<OhVueIcon class="mx-3" name="ri-logout-box-fill" fill="white"></OhVueIcon>
				<h1 class="text-gray-300 text-sm font-medium">Remove Game</h1>
			</li>
		</ul>

		<h1 class="absolute text-slate-500 text-xs bottom-5 text-center w-full transition-colors hover:text-green-500">v.1.0
		</h1>
	</div>
</template>

<script>
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { HiSolidDatabase, MdHomeRound, FaLink, RiLogoutBoxFill, IoAddCircleSharp, BiCalendarFill, IoSettings } from "oh-vue-icons/icons";

addIcons(HiSolidDatabase, MdHomeRound, BiCalendarFill, FaLink, IoSettings, RiLogoutBoxFill, IoAddCircleSharp );

export default {
	name: 'NavDrawer',
	components: { OhVueIcon },
	computed: {
		id() {
			return this.$route.meta.navID
		},
	},
	methods: {
		remove() {
            localStorage.removeItem('robloxGameId');
            location.reload();
        },
	},
	data() {
        return {
            gameAdded: false,
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