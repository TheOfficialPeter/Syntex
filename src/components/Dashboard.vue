<template>
    <h1 class="absolute left-[250px] text-xl top-10">Overview</h1>
    <h1 @click="pfpBox = !pfpBox" class="select-none absolute right-16 text-sm top-10 cursor-pointer hover:underline">{{
        gameTitle || '-' }}</h1>
    <div class="w-2 h-2 bg-green-200 rounded-full absolute right-10 scale-75 top-12"></div>
    <div class="w-2 h-2 bg-green-300 rounded-full absolute right-10 top-12 animate-ping"></div>

    <div v-if="pfpBox" @click="remove()"
        class="fixed z-30 right-10 top-20 h-10 shadow-[rgba(0,0,0,.2)] shadow-xl bg-white px-5 py-3 rounded-md text-xs font-medium text-red-500 flex justify-center align-middle gap-3 cursor-pointer">
        Remove
        <img src="../../public/Remove.svg" alt="Remove Icon">
    </div>

    <div class="select-none flex flex-row gap-5 ml-[250px] z-[-1] mt-[100px]">
        <div class="bg-white shadow-md cursor-pointer rounded-md transition-shadow hover:shadow-lg">
            <h1 class="text-sm my-2 mx-5 text-center">Current Playing</h1>
            <div class="h-[2px] bg-slate-200 rounded-full ml-5 mr-5"></div>
            <h1 class="text-2xl font-semibold my-2 mx-5 text-center">{{ currentPlaying || "-" }}</h1>
        </div>
        <div v-if="platform == 'roblox'" class="bg-white shadow-md cursor-pointer rounded-md transition-shadow hover:shadow-lg">
            <h1 class="text-sm my-2 mx-5 text-center">Favorites</h1>
            <div class="h-[2px] bg-slate-200 rounded-full ml-5 mr-5"></div>
            <h1 class="text-2xl font-semibold my-2 mx-5 text-center">{{ favorites || "-" }}</h1>
        </div>
        <div v-if="platform == 'roblox' && showUpdated == true"
            class="bg-white shadow-md cursor-pointer rounded-md transition-shadow hover:shadow-lg">
            <h1 class="text-sm my-2 mx-5 text-center">Last Updated</h1>
            <div class="h-[2px] bg-slate-200 rounded-full ml-5 mr-5"></div>
            <h1 class="text-2xl font-semibold my-2 mx-5 text-center">{{ lastUpdated || "-" }}</h1>
        </div>
        <div v-if="gameRating" class="bg-white shadow-md cursor-pointer rounded-md transition-shadow hover:shadow-lg">
            <h1 class="text-sm my-2 mx-5 text-center">Positive Reviews</h1>
            <div class="h-[2px] bg-slate-200 rounded-full ml-5 mr-5"></div>
            <h1 class="text-2xl font-semibold my-2 mx-5 text-center">{{ gameRating + "%" || "-" }}</h1>
        </div>
        <div v-if="gameReviews" class="bg-white shadow-md cursor-pointer rounded-md transition-shadow hover:shadow-lg">
            <h1 class="text-sm my-2 mx-5 text-center">Total Reviews</h1>
            <div class="h-[2px] bg-slate-200 rounded-full ml-5 mr-5"></div>
            <h1 class="text-2xl font-semibold my-2 mx-5 text-center">{{ gameReviews || "-" }}</h1>
        </div>
    </div>

    <div class="bg-white select-none ml-[250px] mt-[20px] rounded-md shadow-lg w-[400px]">
        <h1 class="text-md px-5 py-3">Players Over Time</h1>
        <div class="h-[2px] bg-slate-200 rounded-full ml-5 mr-5"></div>
        <div class="h-full w-full flex mt-10 justify-center items-center">
            <img src="../../public/Error.svg" alt="Warning Icon">
        </div>
        <h1 class="text-sm font-medium text-center px-5 pt-3 pb-10">Gathering data. Check back later</h1>

        <!--<apexchart width="375" type="area" :options="chartOptions" :series="series"></apexchart>-->
    </div>
</template>

<script>
export default {
    name: "DashboardView",
    data() {
        return {
            gameTitle: null,
            platform: null,

            lastUpdated: null,
            gameRating: null,
            gameReviews: null,
            currentPlaying: null,
            favorites: null,
            showUpdated: true,

            pfpBox: false,
            formatter: Intl.NumberFormat('en', { notation: 'compact' }),
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
    methods: {
        formatNumberToUnit(number) {
            return this.formatter.format(number);
        },
        remove() {
            localStorage.removeItem('robloxGameId');
            localStorage.removeItem('steamGameId');
            location.reload();
        },
        gameData() {
            if (localStorage.getItem('robloxGameId') != null) {
                const this2 = this;
                this2.platform = 'roblox';

                fetch('https://www.roblox.com/games/' + localStorage.getItem('robloxGameId')).then(function (response) {
                    response.text().then(function (result) {
                        const parser = new DOMParser();
                        const parsed = parser.parseFromString(result, "text/html");

                        const name = parsed.getElementsByClassName('game-name')[0].innerText;
                        let playing = parsed.querySelector('#about > div.section.game-about-container > div.section-content.remove-panel > ul > li:nth-child(1) > p.text-lead.font-caption-body.wait-for-i18n-format-render').innerText;
                        let fav = parsed.querySelector('.game-favorite-count').innerText;
                        let update = parsed.querySelector('#about > div.section.game-about-container > div.section-content.remove-panel > ul > li:nth-child(5) > p.text-lead').innerText;

                        if (name) {
                            playing = this2.formatNumberToUnit(parseInt(playing.replace(/,/g, "")));
                            fav = this2.formatNumberToUnit(parseInt(fav.replace(/,/g, "")));

                            this2.lastUpdated = update;
                            this2.gameTitle = name;
                            this2.currentPlaying = playing;
                            this2.favorites = fav;
                        }
                        else {
                            this2.gameTitle = '[Invalid Name]';
                            this2.currentPlaying = "-";
                            this2.favorites = "-";
                            this2.lastUpdated = "-";
                        }
                    })
                })
            }
            else if (localStorage.getItem('steamGameId') != null) {
                const this2 = this;
                this2.platform = 'steam';

                fetch('https://vginsights.com/api/v1/game/' + localStorage.getItem('steamGameId')).then(function (response) {
                    response.json().then(function (result) {
                        this2.gameTitle = result['name'];
                        this2.gameRating = result['rating'];
                        this2.gameReviews = result['reviews'];
                    })
                })

                fetch('https://vginsights.com/api/v1/game/' + localStorage.getItem('steamGameId') + '/quick-stats').then(function (response) {
                    response.json().then(function (result) {
                        this2.currentPlaying = this2.formatNumberToUnit(parseInt(result['players_latest'].toString().replace(/,/g, "")));
                    })
                })
            }
        }
    },
    mounted() {
        this.gameData();
    }
}
</script>