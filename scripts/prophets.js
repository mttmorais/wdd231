
// URL string of the JSON resource
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

// select the HTML div element
const cards = document.querySelector('#cards');

async function getProphetData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        const data = await response.json();

        console.table(data.prophets);

        displayProphets(data.prophets);

    } catch (error) {
        console.error(error);
    }
}

// create the prophets cards
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {

        // create HTML elements
        const card = document.createElement('section');
        const fullName = document.createElement('h2');
        const portrait = document.createElement('img');
        const birthDate = document.createElement('p');
        const birthPlace = document.createElement('p');

        // add content
        fullName.textContent = `${prophet.name} ${prophet.lastName}`;
        birthDate.textContent = `Birth date: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of birth: ${prophet.birthplace}`;


        // add image attribute
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastName}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // add element to the card
        card.appendChild(fullName);
        card.appendChild(portrait);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);

        // add card to the main div
        cards.appendChild(card);
    });
}

//call the function
getProphetData();