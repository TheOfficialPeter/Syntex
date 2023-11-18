window.onload = function() {
    // game profile menu
    var state = 1;
    const finalConnectButton = document.querySelector('.formPopup #button');
    const connectButton = document.getElementsByClassName('infoButton')[0];
    const formPopup = document.getElementsByClassName('formPopup')[0];
    const profileIcon = document.getElementsByClassName('gamePfp')[0];
    const removeButton = document.getElementsByClassName('removeButton')[0];

    if (finalConnectButton) {
        finalConnectButton.onclick = function() {
            const formTitle = document.querySelector('.formPopup #title');
            const formInput = document.querySelector('.formPopup #title');
        }
    }

    if (connectButton) {
        connectButton.onclick = function() {
            const infoIcon = document.getElementsByClassName('info')[0];
            const infoTitle = document.getElementsByClassName('infoTitle')[0];

            infoIcon.remove();
            infoTitle.remove();

            connectButton.remove();

            formPopup.style.display = "block";
        }
    }

    if (profileIcon) {
        profileIcon.onclick = function() {
            if (state == 1) {
                removeButton.style.display = "flex"; 
                setTimeout(function(){
                    removeButton.style.opacity = "1"; 
                },10)

                state = 0;
            }
            else
            {
                removeButton.style.opacity = "0"; 
                setTimeout(function(){
                    removeButton.style.display = "none"; 
                },200)

                state = 1;
            }
        }
    }
}