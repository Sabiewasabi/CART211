// THIS ONE FILE IS LOADED BY EVERY PAGE. IT DOES FOUR SMALL JOBS:
// 1) OPEN AND CLOSE THE MOBILE MENU  2) MAKE A FAKE PERSON
// 3) REMEMBER IT BETWEEN PAGES       4) SHOW IT AGAIN ON LATER PAGES

// ----- LISTS: ADD YOUR OWN WORDS TO ANY LIST -----
const names = ["Marge Pemberton", "Dax Okonkwo-Lund", "Priya Tumbleweed", "Ottis Quill", "Beatriz Hollowell", "Kofi Brambleton", "Yuki Featherstone", "Winnie Castellano", "Tim Hortons", "Adelina Paccinoma", "Tom Looming"];
const cities = ["Dullsville, Nebraska", "Little Wobbleton", "Port Nowhere", "Cheddar Gorge", "Lake Plausible", "Mount Maybe", "Old City", "MargoLand"];
const jobs = ["lighthouse inspector", "professional cloud namer", "competitive napper", "retired mime", "part-time wizard", "yodeling coach", "Bee keeper", "Cat whisperer", "Pillow fight champion"];

// PICKS ONE RANDOM ITEM FROM A LIST
function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
}

// MAKES A NEW FAKE PERSON AND SAVES IT IN THE BROWSER
// LOCALSTORAGE IS A SMALL NOTEBOOK THE BROWSER KEEPS, SO OTHER PAGES CAN READ IT
function newGhost() {
    localStorage.setItem("name", pick(names));
    localStorage.setItem("city", pick(cities));
    localStorage.setItem("job", pick(jobs));
    localStorage.setItem("age", 18 + Math.floor(Math.random() * 75)); // A NUMBER FROM 18 TO 92
    fillPage();
}

// FINDS EVERY ELEMENT MARKED data-fill="name" (OR age, city, job, hobbies)
// AND WRITES THE SAVED VALUE INTO IT
function fillPage() {
    const spots = document.querySelectorAll('[data-fill]');
    spots.forEach((spot) => {
        const key = spot.getAttribute('data-fill');
        spot.textContent = localStorage.getItem(key) || "(nothing picked)";
    });
}

// SHOWS DETAILS THAT ANY WEBSITE CAN READ WITHOUT ASKING (BAD ENDING PAGE)
function showTracked() {
    document.querySelector('#screen').textContent = screen.width + " x " + screen.height;
    document.querySelector('#language').textContent = navigator.language;
    document.querySelector('#timezone').textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// WAIT UNTIL THE HTML DOCUMENT HAS FINISHED LOADING
// THIS ENSURES THE BUTTONS EXIST BEFORE JS TRIES TO SELECT THEM
document.addEventListener('DOMContentLoaded', () => {

    // ----- MOBILE MENU -----
    const hamburgerButton = document.querySelector('.hamburger-menu button');
    const closeButton = document.querySelector('.close-menu');
    const menu1 = document.querySelector('.menu1');

    // WHEN THE HAMBURGER IS CLICKED, ADD THE CLASS "menu-deployed" SO THE CSS SHOWS THE MENU
    hamburgerButton.addEventListener('click', () => {
        menu1.classList.add('menu-deployed');
    });

    // WHEN THE X IS CLICKED, REMOVE THE CLASS SO THE MENU CLOSES
    closeButton.addEventListener('click', () => {
        menu1.classList.remove('menu-deployed');
    });

    // ----- GHOST ID PAGE: THE "MAKE A DIFFERENT GHOST" BUTTON -----
    const ghostButton = document.querySelector('#new-ghost');
    if (ghostButton) {
        ghostButton.addEventListener('click', newGhost);
        // IF NO GHOST WAS MADE YET, MAKE THE FIRST ONE AUTOMATICALLY
        if (!localStorage.getItem('name')) {
            newGhost();
        }
    }

    // ----- HOBBIES PAGE: CLICKING A HOBBY TURNS IT YELLOW, THEN SAVES THE YELLOW ONES -----
    const chips = document.querySelectorAll('.chip');
    chips.forEach((chip) => {
        chip.addEventListener('click', () => {
            chip.classList.toggle('picked');
            const picked = document.querySelectorAll('.chip.picked');
            const list = [];
            picked.forEach((p) => list.push(p.textContent));
            localStorage.setItem('hobbies', list.join(', '));
        });
    });

    // ----- "PLAY AGAIN" AND "TRY AGAIN" LINKS: ERASE THE SAVED GHOST -----
    const restartLinks = document.querySelectorAll('.restart');
    restartLinks.forEach((link) => {
        link.addEventListener('click', () => {
            localStorage.clear();
        });
    });

    // ----- SHOW SAVED INFORMATION ON THE PAGE -----
    fillPage();
    if (document.querySelector('#screen')) {
        showTracked();
    }
});
