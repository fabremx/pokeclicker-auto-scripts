// ==UserScript==
// @name         Pokeclicker Auto Underground
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto Underground Script
// @author       fabremx
// @match        https://www.pokeclicker.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pokeclicker.com
// @grant        none
// ==/UserScript==

const TIME_BETWEEN_EACH_BOMB = 30000;
const RED_COLOR = '#e12e1c';
const GREEN_COLOR = '#00bc8c';

let autoUndergroundActivated = true;

function toggleButton() {
    autoUndergroundActivated = !autoUndergroundActivated;

    changeButtonColor(autoUndergroundActivated);
    if (autoUndergroundActivated) {
        launch();
    }
}

function changeButtonColor(isActivated) {
    const button = document.querySelector('#autoUnderground');
    button.style.backgroundColor = isActivated ? GREEN_COLOR : RED_COLOR;
}

function createToggle() {
    const toggleDiv = document.createElement('div')
    toggleDiv.style.width = "150px";
    toggleDiv.style.height = "100px";
    toggleDiv.style.margin = "auto";
    toggleDiv.innerHTML = `<button id="autoUnderground">Auto Underground ${autoUndergroundActivated ? 'Enabled' : 'Disabled'}</button>`;

    const button = toggleDiv.querySelector('button');
    button.addEventListener('click', toggleButton, false);

    button.style.backgroundColor = autoUndergroundActivated ? GREEN_COLOR : RED_COLOR;
    button.style.color = "white";
    button.style.border = "none";
    button.style.padding = "10px";
    button.style.borderRadius = "5px";

    document.getElementById('mineModal').appendChild(toggleDiv)
}

function launch() {
    const bombButton = document.querySelector("#dig > div:nth-child(4) > button.col-12.col-md-4.btn.btn-warning");
    if (!autoUndergroundActivated) return;

    bombButton.click();

    const intervalId = setInterval(() => {
        if (!autoUndergroundActivated) {
            clearInterval(intervalId);
            return;
        };

        bombButton.click();
    }, TIME_BETWEEN_EACH_BOMB)
}

(() => {
    createToggle();
    launch();
})();