<template>
    <h1 class="absolute left-[250px] text-xl top-10">Overview</h1>
    <div v-if="!loaded" class="bg-slate-400 w-[100px] h-[20px] absolute right-16 top-10 animate-pulse rounded-full ml-0 mr-0"></div>
    <h1 v-if="loaded" @click="pfpBox = !pfpBox" class="select-none absolute right-16 text-sm top-10 cursor-pointer hover:underline">{{
        gameTitle }}</h1>
    <div class="w-2 h-2 bg-green-200 rounded-full absolute right-10 scale-75 top-12"></div>
    <div class="w-2 h-2 bg-green-300 rounded-full absolute right-10 top-12 animate-ping"></div>

    <div class="select-none flex flex-row gap-5 ml-[250px] mr-3 z-[-1] mt-[75px] py-5 overflow-visible">
        <div v-if="!loaded" class="bg-slate-200 w-[150px] h-[100px] animate-pulse rounded-md ml-0 mr-0"></div>
        <div v-if="loaded" class="bg-white relative border-[1.5px] border-slate-300 cursor-pointer rounded-md w-[200px] h-[100px]">
            <h1 class="text-xs mt-3 text-gray-500 font-medium mb-1 mx-3 text-left">Current Playing</h1>
            <div class="h-8 w-8 flex justify-center items-center bg-green-300 bg-opacity-50 rounded-md absolute right-3 top-3">
                <OhVueIcon name="io-people-sharp" color="#27AF60"></OhVueIcon>
            </div>
            <h1 class="text-xl font-medium my-0 mx-3 text-left">{{ currentPlaying }}</h1>
            <h1 class="text-sm font-medium text-green-700 opacity-60 mt-2 mx-3 text-left">+15% increase</h1>
        </div>

        <div v-if="!loaded" class="bg-slate-200 w-[150px] h-[100px] animate-pulse rounded-md ml-0 mr-0"></div>
        <div v-if="loaded" class="bg-white relative border-[1.5px] border-slate-300 cursor-pointer rounded-md w-[175px] h-[100px]">
            <h1 class="text-xs mt-3 text-gray-500 font-medium mb-1 mx-3 text-left">Favorites</h1>
            <div class="h-8 w-8 flex justify-center items-center bg-green-300 bg-opacity-50 rounded-md absolute right-3 top-3">
                <OhVueIcon name="md-favorite-sharp" color="#27AF60"></OhVueIcon>
            </div>
            <h1 class="text-xl font-medium my-0 mx-3 text-left">{{ favorites }}</h1>
            <h1 class="text-sm font-medium text-gray-700 opacity-60 mt-2 mx-3 text-left">-2% decrease</h1>
        </div>

        <div v-if="!loaded" class="bg-slate-200 w-[150px] h-[100px] animate-pulse rounded-md ml-0 mr-0"></div>
        <div v-if="loaded" class="bg-white relative border-[1.5px] border-slate-300 cursor-pointer rounded-md w-[220px] h-[100px]">
            <h1 class="text-xs mt-3 text-gray-500 font-medium mb-1 mx-3 text-left">Estimated Revenue</h1>
            <div class="h-8 w-8 flex justify-center items-center bg-green-300 bg-opacity-50 rounded-md absolute right-3 top-3">
                <OhVueIcon name="md-attachmoney" color="#27AF60"></OhVueIcon>
            </div>
            <h1 class="text-xl font-medium my-0 mx-3 text-left">{{ format(totalMoney.toString().replace(/,/g, "")) }} <img class="m-0 p-0 h-4 bg-cover inline-flex" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Robux_2019_Logo_gold.svg/768px-Robux_2019_Logo_gold.svg.png"></h1>
            <h1 class="text-sm font-medium text-gray-700 opacity-60 mt-2 mx-3 text-left">-10% decrease</h1>
        </div>
    </div>

    <div v-if="!loaded" class="bg-slate-300 animate-pulse select-none ml-[250px] mt-[10px] rounded-md w-[400px] h-[250px]"></div>
    <div v-if="loaded" class="bg-white select-none ml-[250px] mt-[10px] rounded-md border-[1.5px] border-slate-300 w-[400px]">
        <h1 class="text-md px-5 py-3">Players Over Time</h1>
        <!-- <div class="h-full w-full flex mt-10 justify-center items-center">
            <img src="../../public/Error.svg" alt="Warning Icon">
        </div>
        <h1 class="text-sm font-medium text-center px-5 pt-3 pb-10">Gathering data. Check back later</h1> -->

        <Chart type="line" :data="chartData" :options="chartOptions" class="h-[250px] w-[400px] px-3 py-2 pb-5" />
    </div>
</template>

<script>
import Chart from 'primevue/chart';
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { IoRemoveCircleSharp, IoPeopleSharp, MdFavoriteSharp, MdAttachmoney } from "oh-vue-icons/icons";

addIcons(IoRemoveCircleSharp, IoPeopleSharp, MdFavoriteSharp, MdAttachmoney);

export default {
    name: "DashboardView",
    components: { Chart, OhVueIcon },
    data() {
        return {
            gameTitle: null,
            loaded: false,

            lastUpdated: null,
            gameRating: null,
            totalMoney: 0,
            reviewSummary: null,
            currentPlaying: null,
            favorites: null,
            showUpdated: true,

            pfpBox: false,
            formatter: Intl.NumberFormat('en', { notation: 'compact' }),

            chartData: null,
            chartOptions: null
        }
    },
    methods: {
        setChartData() {
            return {
                labels: ['15 Nov', '16 Nov', '17 Nov'],
                datasets: [
                    {
                        data: [205, 305, 100],
                        fill: false,
                        borderColor: "#22c55e",
                        tension: 0.4
                    }
                ]
            };
        },
        setChartOptions() {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            return {
                maintainAspectRatio: false,
                aspectRatio: 0.6,
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    }
                }
            };
        },
        format(number) {
            return this.formatter.format(number);
        },
        remove() {
            localStorage.removeItem('robloxGameId');
            location.reload();
        },
        fetchMoney() {
            if (localStorage.getItem('robloxGameId') != null) {
                const this2 = this;

                fetch('https://www.roblox.com/games/getgamepassesinnerpartial?startIndex=0&maxRows=50&placeId=' + localStorage.getItem('robloxGameId')).then(function(response) {
                    response.text().then(function(result) {
                        const parser = new DOMParser();
                        let parsed = parser.parseFromString(result, 'text/html');

                        const passes = parsed.querySelectorAll('.store-card');

                        passes.forEach(function(pass) {
                            let link = pass.querySelector('.gear-passes-asset').href;
                            link = link.replace(/.*:\/\/[^/]+/, '');

                            let cost = pass.querySelector('.text-robux').innerText;
                            console.log(cost);

                            fetch('https://www.roblox.com' + link).then(function(response2) {
                                response2.text().then(function(result2) {
                                    parsed = parser.parseFromString(result2, 'text/html');
                                    
                                    let upvote = parsed.querySelector('#vote-up-text').innerText;
                                    let downvote = parsed.querySelector('#vote-down-text').innerText;
                                    let totalVotes = parseInt(upvote) + parseInt(downvote)

                                    let totalIncome = totalVotes * cost
                                    this2.totalMoney += totalIncome;
                                })
                            })
                        })
                    })
                })
            }
        },
        gameData() {
            if (localStorage.getItem('robloxGameId') != null) {
                const this2 = this;

                fetch('https://www.roblox.com/games/' + localStorage.getItem('robloxGameId')).then(function (response) {
                    response.text().then(function (result) {
                        const parser = new DOMParser();
                        const parsed = parser.parseFromString(result, "text/html");

                        const name = parsed.getElementsByClassName('game-name')[0].innerText;
                        let playing = parsed.querySelector('#about > div.section.game-about-container > div.section-content.remove-panel > ul > li:nth-child(1) > p.text-lead.font-caption-body.wait-for-i18n-format-render').innerText;
                        let fav = parsed.querySelector('.game-favorite-count').innerText;
                        let update = parsed.querySelector('#about > div.section.game-about-container > div.section-content.remove-panel > ul > li:nth-child(6) > p.text-lead').innerText;

                        if (name) {
                            playing = this2.format(parseInt(playing.replace(/,/g, "")));
                            fav = this2.format(parseInt(fav.replace(/,/g, "")));

                            this2.lastUpdated = update;
                            this2.gameTitle = name;
                            this2.currentPlaying = playing;
                            this2.favorites = fav;
                            this2.loaded = true;
                        }
                        else {
                            this2.gameTitle = '[Invalid Name]';
                            this2.currentPlaying = "-";
                            this2.favorites = "-";
                            this2.lastUpdated = "-";
                            this2.loaded = true;
                        }
                    })
                })
            }
        }
    },
    mounted() {
        this.gameData();
        this.fetchMoney();
        this.chartData = this.setChartData();
        this.chartOptions = this.setChartOptions();
    }
}
</script>