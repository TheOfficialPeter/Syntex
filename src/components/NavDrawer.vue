<script>
export default {
	name: 'NavDrawer',
	computed: {
		id() {
			return this.$route.meta.navID
		},
	},
}
</script>

<template>
	<div class="select-none absolute bg-[#19181E] top-0 bottom-0 left-0 w-52">
		<div class="h-10 mx-10 my-10 flex flex-row gap-5 align-middl">
			<img src="../../public/Logo.svg" alt="">
			<h1 class="text-lg text-white leading-10">Syntex</h1>
		</div>

		<ul class="select-none absolute left-5 right-5 top-28 bottom-10 ">
			<router-link to="/">
				<li id="Dashboard" :style="{ 'background-color': id == 1 ? '#211F29' : 'transparent' }"
					class="cursor-pointer flex justify-left align-middle rounded-lg py-3 my-2 transition-all hover:scale-110">
					<img class="mx-3" src="../../public/Home.svg" alt="Home Icon">
					<h1 class="text-gray-300 text-sm font-medium">Dashboard</h1>
				</li>
			</router-link>

			<li id="Tiktok" :style="{ 'background-color': id == 2 ? '#211F29' : 'transparent' }"
				class="cursor-pointer flex justify-left align-middle rounded-lg py-3 my-2 transition-all hover:scale-110">
				<img class="mx-3" src="../../public/TikTok.svg" alt="Home Icon">
				<h1 class="text-gray-300 text-sm font-medium">Tiktok Trends</h1>
			</li>

			<li id="Youtube" :style="{ 'background-color': id == 3 ? '#211F29' : 'transparent' }"
				class="cursor-pointer flex justify-left align-middle rounded-lg py-3 my-2 transition-all hover:scale-110">
				<img class="mx-3" src="../../public/YouTube.svg" alt="Home Icon">
				<h1 class="text-gray-300 text-sm font-medium">Youtube Trends</h1>
			</li>

			<li id="AI" :style="{ 'background-color': id == 4 ? '#211F29' : 'transparent' }"
				class="cursor-pointer flex justify-left align-middle rounded-lg py-3 my-2 transition-all hover:scale-110">
				<img class="mx-3" src="../../public/Brain.svg" alt="Home Icon">
				<h1 class="text-gray-300 text-sm font-medium">AI Assist</h1>
			</li>

			<router-link to="/Settings">
				<li id="Settings" :style="{ 'background-color': id == 5 ? '#211F29' : 'transparent' }"
					class="cursor-pointer flex justify-left align-middle rounded-lg py-3 my-2 transition-all hover:scale-110">
					<img class="mx-3" src="../../public/Settings.svg" alt="Home Icon">
					<h1 class="text-gray-300 text-sm font-medium">Settings</h1>
				</li>
			</router-link>
		</ul>

		<h1 class="absolute text-slate-500 text-xs bottom-5 text-center w-full transition-colors hover:text-blue-500">v.1.0</h1>
	</div>
</template>