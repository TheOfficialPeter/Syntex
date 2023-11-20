function refreshWindow() {
    // refresh window to initial state
    window.location.reload();
}

window.onload = async function () {
    // game profile menu
    var state = 1;
    const blur = document.querySelector('.blur')
    const finalConnectButton = document.querySelector('.formPopup #button');
    const connectButton = document.getElementsByClassName('infoButton')[0];
    const formPopup = document.getElementsByClassName('formPopup')[0];
    const gameProfile = document.getElementsByClassName('gameTitle')[0];
    const removeButton = document.getElementsByClassName('removeButton')[0];

    if (finalConnectButton) {
        finalConnectButton.onclick = async function () {
            const loading = document.querySelector('.formPopup #loading');
            const button = document.querySelector('.formPopup #button');
            const formTitle = document.querySelector('.formPopup #title');
            const labels = document.querySelectorAll('.formPopup #inputLabel');
            const robloxInput = document.querySelector('.Roblox');
            const steamInput = document.querySelector('.Steam');

            const steamID = steamInput.value;
            const robloxID = robloxInput.value;

            if (steamID != "") {
                // find steam game stats using id
                const response = await fetch(`https://vginsights.com/api/v1/game/${steamID}/quick-stats`);
                const status = response.status;
                
                if (status == 200) {
                    formTitle.innerText = "Connecting..."
                    robloxInput.remove();
                    steamInput.remove();
                    button.remove();

                    labels.forEach(function (e) {
                        e.remove();
                    })

                    loading.style.display = "block";

                    setTimeout(function () {
                        loading.style.display = "none";
                        const loadingClone = loading.cloneNode();
                        loading.remove();

                        loadingClone.style.backgroundImage = "url(assets/Ok.svg)";
                        loadingClone.style.display = "block";
                        loadingClone.style.animation = "none";
                        formTitle.innerText = "Game added";
                        formPopup.appendChild(loadingClone);

                        // remove popup
                        setTimeout(function () {
                            blur.remove()
                        }, 500)
                    }, 1000)
                }
                else {
                    // game not found
                    formTitle.innerText = "Connecting..."
                    robloxInput.remove();
                    steamInput.remove();
                    button.remove();

                    labels.forEach(function (e) {
                        e.remove();
                    })

                    loading.style.display = "block";

                    setTimeout(function () {
                        loading.style.display = "none";
                        formTitle.innerText = "Game not found"
                        robloxInput.remove();
                        steamInput.remove();
                        button.remove();

                        const icon = loading.cloneNode();
                        icon.style.backgroundImage = "url(./assets/404.svg)";
                        icon.style.display = "block";
                        icon.style.animation = "none";

                        labels.forEach(function (e) {
                            e.remove();
                        })

                        formPopup.appendChild(icon);

                        setTimeout(function () {
                            refreshWindow();
                        }, 1000)
                    }, 1000)
                }
            }
            else if (robloxID != "") {
                // find roblox game stats using id
                const response = await fetch(`https://www.roblox.com/games/${robloxID}`);
                const status = response.status;
                const body = await response.text();

                if (status == 200) {
                    formTitle.innerText = "Connecting..."
                    robloxInput.remove();
                    steamInput.remove();
                    button.remove();

                    labels.forEach(function (e) {
                        e.remove();
                    })

                    loading.style.display = "block";

                    // extract information from the website using DOM Parser
                    const parser = new DOMParser();
                    const parsed = parser.parseFromString(body, "text/html");
                    const gameTitle = parsed.querySelector(".game-name").innerText;
                    const currentPlaying = parsed.querySelector("#about > div.section.game-about-container > div.section-content.remove-panel > ul > li:nth-child(1) > p.text-lead.font-caption-body.wait-for-i18n-format-render").innerText;

                    // set game title to dashboard game title
                    document.body.querySelector(".gameTitle").innerText = gameTitle;

                    // set game currently playing
                    document.body.querySelector(".CurrentPlaying").innerText = currentPlaying;

                    setTimeout(function () {
                        loading.style.display = "none";
                        const loadingClone = loading.cloneNode();
                        loading.remove();

                        loadingClone.style.backgroundImage = "url(assets/Ok.svg)";
                        loadingClone.style.display = "block";
                        loadingClone.style.animation = "none";
                        formTitle.innerText = "Game added";
                        formPopup.appendChild(loadingClone);

                        // remove popup
                        setTimeout(function () {
                            blur.remove()
                        }, 500)
                    }, 1000)
                }
                else {
                    // game not found
                    formTitle.innerText = "Connecting..."
                    robloxInput.remove();
                    steamInput.remove();
                    button.remove();

                    labels.forEach(function (e) {
                        e.remove();
                    })

                    loading.style.display = "block";

                    setTimeout(function () {
                        loading.style.display = "none";
                        formTitle.innerText = "Game not found"
                        robloxInput.remove();
                        steamInput.remove();
                        button.remove();

                        const icon = loading.cloneNode();
                        icon.style.backgroundImage = "url(./assets/404.svg)";
                        icon.style.display = "block";
                        icon.style.animation = "none";

                        labels.forEach(function (e) {
                            e.remove();
                        })

                        formPopup.appendChild(icon);

                        setTimeout(function () {
                            refreshWindow();
                        }, 1000)
                    }, 1000)
                }
            }
        }
    }

    if (connectButton) {
        connectButton.onclick = function () {
            const infoIcon = document.getElementsByClassName('info')[0];
            const infoTitle = document.getElementsByClassName('infoTitle')[0];

            infoIcon.remove();
            infoTitle.remove();

            connectButton.remove();

            formPopup.style.display = "block";
        }
    }

    if (gameProfile) {
        gameProfile.onclick = function () {
            if (state == 1) {
                removeButton.style.display = "flex";
                setTimeout(function () {
                    removeButton.style.opacity = "1";
                }, 10)

                state = 0;
            }
            else {
                removeButton.style.opacity = "0";
                setTimeout(function () {
                    removeButton.style.display = "none";
                }, 200)

                state = 1;
            }
        }
    }
}