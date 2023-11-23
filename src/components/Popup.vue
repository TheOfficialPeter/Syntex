<template>
    <div @click="popupOpen = !popupOpen" v-if="!popupOpen" class="flex flex-col justify-center items-center absolute left-52 top-0 bottom-0 right-0">
        <img src="../../public/Info.svg" class="h-20 mb-2" alt="Info Icon">
        <h1 class="text-xl font-bold">INFO</h1>
        <h1 class="text-md">Connect a game to get started</h1>
        <div class="cursor-pointer rounded-full transition-all hover:scale-110 bg-black text-white py-3 px-10 mt-20">Connect</div>
    </div>

    <div v-if="popupOpen" class="select-none absolute left-52 top-0 bottom-0 right-0 ml-10 mt-10">
        <h1 class="text-xl font-medium">Connect a game</h1>
        <h1 class="text-sm font-normal mt-5">Roblox Place ID:</h1>
        <input class="text-sm font-normal mt-5 border-2 rounded-md p-3 w-60 border-slate-200 focus:ring-0 focus:outline-2 focus:outline-[#5e5e5e] select-none">
        <h1 class="text-xl font-medium mt-5">OR</h1>
        <h1 class="text-sm font-normal mt-5">Steam Game ID:</h1>
        <input class="text-sm font-normal mt-5 border-2 rounded-md p-3 w-60 border-slate-200 focus:ring-0 focus:outline-2 focus:outline-[#5e5e5e] select-none">
        
        <div @click="loading = !loading" class="flex items-center jusitfy-center transition-all hover:scale-110 cursor-pointer rounded-full bg-black text-white w-max mt-10 gap-3 px-8 py-3">
            <img v-if="loading" class="h-[20px] animate-spin" src="../../public/Loading.svg" alt="Loading Icon">
            <h1>Connect</h1>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PopupView',
        data() {
            return {
                popupOpen: false,
                loading: false
            }
        }
    }
</script>