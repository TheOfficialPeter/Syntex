<template>
    <h1 class="absolute left-[250px] text-xl top-10">Overview</h1>
    <h1 @click="pfpBox = !pfpBox" class="select-none absolute right-16 text-sm top-10 cursor-pointer hover:underline">{{
        gameTitle }}</h1>
    <div class="w-2 h-2 bg-green-200 rounded-full absolute right-10 scale-75 top-12"></div>
    <div class="w-2 h-2 bg-green-300 rounded-full absolute right-10 top-12 animate-ping"></div>

    <div v-if="pfpBox"
        class="absolute right-10 top-20 h-10 shadow-lg px-5 py-3 rounded-md text-xs font-medium text-red-500 flex justify-center align-middle gap-3 cursor-pointer">
        Remove
        <img src="../../public/Remove.svg" alt="Remove Icon">
    </div>

    <div class="select-none flex flex-row gap-5 ml-[250px] mt-[100px]">
        <div class="shadow-md cursor-pointer transition-shadow hover:shadow-lg">
            <h1 class="text-sm my-2 mx-5 text-center">Current Playing</h1>
            <div class="h-[2px] bg-slate-200 rounded-full ml-5 mr-5"></div>
            <h1 class="text-2xl font-semibold my-2 mx-5 text-center">52k</h1>
        </div>
        <div class="shadow-md cursor-pointer transition-shadow hover:shadow-lg">
            <h1 class="text-sm my-2 mx-5 text-center">Reviews</h1>
            <div class="h-[2px] bg-slate-200 rounded-full ml-5 mr-5"></div>
            <h1 class="text-2xl font-semibold my-2 mx-5 text-center">205</h1>
        </div>
    </div>

    <div class="select-none ml-[250px] mt-[20px] shadow-lg w-[400px]">
        <h1 class="text-md px-5 py-3">Players Over Time</h1>
        <div class="h-[2px] bg-slate-200 rounded-full ml-5 mr-5"></div>
        <apexchart width="375" type="area" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<script>
export default {
    name: "DashboardView",
    data() {
        return {
            gameTitle: "",
            pfpBox: false,
            series: [{
                name: 'series1',
                data: [31, 40, 28, 51, 42, 109, 100]
            }],
            chartOptions: {
                chart: {
                    width: 375,
                    type: 'area',
                    toolbar: {
                        show: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'datetime',
                    categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm'
                    },
                },
            },
        }
    },
    mounted() {
        fetch('https://www.roblox.com/games/' + localStorage.getItem('robloxGameId')).then(function (response) {
            response.text().then(function (result) {
                const parser = new DOMParser();
                const parsed = parser.parseFromString(result, "text/html");

                const name = parsed.getElementsByClassName('game-name')[0].innerText;
                console.log(name);

                if (name) {
                    this.gameTitle = name;
                }
                else {
                    this.gameTitle = '[Invalid Name]';
                }
            })
        })
    }
}
</script>