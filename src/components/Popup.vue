<template>
    <div @click="error = !error" class="fixed top-0 left-52 right-0 bg-[#19181E] py-3 z-10 shadow-lg"
        :class="[error == true ? 'opacity-1' : 'opacity-0']">
        <h1 class="mt-0 mb-2 mx-3 text-lg font-bold text-white">{{ errorTitle }}</h1>
        <h1 class="p-0 mt-0 ml-3 text-gray-500 text-sm mb-5">{{ errorText }}</h1>
        <div ref="loading" class="absolute bottom-0 h-2 left-0 w-[0%] bg-gray-500"></div>
    </div>

    <div v-if="!popupOpen" class="flex flex-col justify-center items-center absolute left-52 top-0 bottom-0 right-0">
        <img src="../../public/Info.svg" class="h-20 mb-2" alt="Info Icon">
        <h1 class="text-xl font-bold">INFO</h1>
        <h1 class="text-md">Connect a game to get started</h1>
        <div @click="popupOpen = !popupOpen"
            class="cursor-pointer rounded-full transition-all hover:scale-110 bg-black text-white py-3 px-10 mt-20">Connect
        </div>
    </div>

    <div v-if="popupOpen" class="select-none absolute left-52 top-0 bottom-0 right-0 ml-10 mt-10">
        <h1 class="text-xl font-medium">Connect a game</h1>
        <h1 class="text-sm font-normal mt-5">Roblox Place ID:</h1>
        <input v-model="robloxGameId" v-on:input="saveRoblox"
            class="text-sm font-normal mt-5 border-2 rounded-md p-3 w-60 border-slate-200 focus:ring-0 focus:outline-2 focus:outline-[#5e5e5e] select-none">
        <h1 class="text-xl font-medium mt-5">OR</h1>
        <h1 class="text-sm font-normal mt-5">Steam Game ID:</h1>
        <input v-model="steamGameId" v-on:input="saveSteam"
            class="text-sm font-normal mt-5 border-2 rounded-md p-3 w-60 border-slate-200 focus:ring-0 focus:outline-2 focus:outline-[#5e5e5e] select-none">

        <div @click="loading = !loading; checkForGame()"
            class="flex items-center jusitfy-center transition-all hover:scale-110 cursor-pointer rounded-full bg-black text-white w-max mt-10 gap-3 px-8 py-3">
            <img v-if="loading" class="h-[20px] animate-spin" src="../../public/Loading.svg" alt="Loading Icon">
            <h1>Connect</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PopupView',
    methods:
    {
        async checkForGame() {
            if (this.robloxGameId != "") {
                const response = await fetch('https://www.roblox.com/games/' + this.robloxGameId);

                if (response.status == 200) {
                    this.errorTitle = "Game Found";
                    this.errorText = "Game was found. Adding information...";
                    this.error = true;

                    const delay = new Promise(resolve => {
                        setTimeout(resolve, 5000);
                    });

                    await delay;
                    this.error = false;

                    this.saveRoblox();
                    window.location.reload();
                }
                else if (response.status == 404) {
                    this.errorTitle = "Not Found";
                    this.errorText = "ID's provided does not match any games online. Please try a different ID";
                    this.error = true;

                    const loadingBar = this.$refs.loading;
                    loadingBar.style.transition = "all linear 5s";
                    loadingBar.style.width = "100%";

                    // disable loading progress bar on button
                    this.loading = false;

                    const delay = new Promise(resolve => {
                        setTimeout(resolve, 5000);
                    });

                    await delay;
                    loadingBar.style.transition = "all linear .1s";
                    loadingBar.style.width = "0%";
                    loadingBar.style.transition = "all linear .1s";
                    this.error = false;

                    localStorage.removeItem('robloxGameId');
                }

                this.loading = false;
            }
            else if (this.steamGameId != "") {
                console.log('steam');
                const response = await fetch('https://store.steampowered.com/app/' + this.steamGameId);
                console.log(response);

                if (response.status == 200) {
                    this.errorTitle = "Game Found";
                    this.errorText = "Game was found. Adding information...";
                    this.error = true;

                    const delay = new Promise(resolve => {
                        setTimeout(resolve, 5000);
                    });

                    await delay;
                    this.error = false;

                    this.saveSteam();
                    window.location.reload();
                }
                else {
                    this.errorTitle = "Not Found";
                    this.errorText = "ID's provided does not match any games online. Please try a different ID";
                    this.error = true;

                    const loadingBar = this.$refs.loading;
                    loadingBar.style.transition = "all linear 5s";
                    loadingBar.style.width = "100%";

                    // disable loading progress bar on button
                    this.loading = false;

                    const delay = new Promise(resolve => {
                        setTimeout(resolve, 5000);
                    });

                    await delay;
                    loadingBar.style.transition = "all linear .1s";
                    loadingBar.style.width = "0%";
                    loadingBar.style.transition = "all linear .1s";
                    this.error = false;

                    localStorage.removeItem('steamGameId');
                }
            }
        },
        saveRoblox() {
            localStorage.setItem('robloxGameId', this.robloxGameId);

        },
        saveSteam() {
            localStorage.setItem('steamGameId', this.steamGameId);
        }
    },
    data() {
        return {
            popupOpen: false,
            loading: false,
            robloxGameId: '',
            steamGameId: '',
            error: false,
            errorTitle: "",
            errorText: ""
        }
    }
}
</script>