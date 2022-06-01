const UP = 'ArrowUp';
const DOWN = 'ArrowDown';
const LEFT = 'ArrowLeft';
const RIGHT = 'ArrowRight';

const POKEMON_NAME_TO_CATCH = 'Pinsir';
const NUMBER_STEPS_BEFORE_REDIRECTION = 4;
const TIME_BETWEEN_EACH_STEP = 400;
const DIRECTIONS = [RIGHT, LEFT];

const RED_COLOR = '#e12e1c';
const GREEN_COLOR = '#00bc8c';

let currentDirection = DIRECTIONS[0]
let autoSafariActivated = false;

function calculDirection(index) {
    const changingDirection = (index % NUMBER_STEPS_BEFORE_REDIRECTION) === 0;

    if (changingDirection) {
        currentDirection = DIRECTIONS[(DIRECTIONS.findIndex(d => d === currentDirection) + 1) % DIRECTIONS.length]
    }

    return currentDirection;
}
function moveTo(direction) {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: direction }));
    document.dispatchEvent(new KeyboardEvent('keyup', { key: direction }));
}

function isFightingPokemon() {
    return document.getElementById('safariBattleModal').className.includes('show');
}

function isSerchedPokemon() {
    const pokemon = document.querySelector("#safariBattleModal > div > div > div.modal-body.p-0 > div > div > div > h2.pageItemTitle > knockout:nth-child(2) > knockout:nth-child(1)").textContent;

    return pokemon === POKEMON_NAME_TO_CATCH;
}

function getButtons() {
    return document.querySelectorAll('#safariBattleModal .modal-footer .row button');
}

function throwPokeball() {
    const buttons = getButtons();
    buttons[0].click()
}

function run() {
    const buttons = getButtons();
    buttons[buttons.length - 1].click()
}

function toggleButton() {
    autoSafariActivated = !autoSafariActivated;

    changeButtonColor(autoSafariActivated);
    if (autoSafariActivated) {
        launch();
    }
}

function changeButtonColor(isActivated) {
    const button = document.querySelector('#autoSafari');
    button.style.backgroundColor = isActivated ? GREEN_COLOR : RED_COLOR;
}

function createToggle() {
    const toggleDiv = document.createElement('div')
    toggleDiv.style.width = "100px";
    toggleDiv.style.height = "100px";
    toggleDiv.style.margin = "auto";
    toggleDiv.innerHTML = `<button id="autoSafari">${autoSafariActivated ? 'Disable' : 'Enable'} Auto Safari</button>`;

    const button = toggleDiv.querySelector('button');
    button.addEventListener('click', toggleButton, false);

    button.style.backgroundColor = RED_COLOR;
    button.style.color = "white";
    button.style.border = "none";
    button.style.padding = "4px 10px";
    button.style.borderRadius = "5px";

    document.getElementById('safariModal').appendChild(toggleDiv)
}

function launch() {
    let index = 0;

    const intervalId = setInterval(() => {
        if (!autoSafariActivated) {
            clearInterval(intervalId);
            return;
        };

        const direction = calculDirection(index)
        moveTo(direction)

        index = index + 1;

        if (!isFightingPokemon()) return;

        isSerchedPokemon()
            ? throwPokeball()
            : run();
    }, TIME_BETWEEN_EACH_STEP)
}

(() => {
    createToggle();
    launch();
})()
