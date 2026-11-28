// ------------------------ Header ----------------------------------------
import { initializeNavigation, lastModification } from "./common-use.js";

initializeNavigation();

// ------------------------- Loop through the array of JSON items -----------------------
import { places } from "../data/places.mjs";

const discoverCards = document.querySelector("#discoverCards");

// create the members cards
const displayPlaces = (places) => {
    places.forEach((place) => {

        // create card element
        const card = document.createElement('div');

        // create title element
        const name = document.createElement('h2');
        name.textContent = place.name;
        card.appendChild(name);

        // create address element
        const address = document.createElement('address');
        address.textContent = place.address;
        card.appendChild(address);

        // create description element
        const description = document.createElement('p');
        description.textContent = place.description;
        card.appendChild(description);

        // create figure element
        const figure = document.createElement('figure');
        card.appendChild(figure);

        // create picture element
        const picture = document.createElement('img');
        picture.setAttribute('src', place.photoUrl);
        picture.setAttribute('alt', `Picture of ${place.name}`);
        picture.setAttribute('loading', 'lazy'); 
        figure.appendChild(picture);

        // create button element
        const button = document.createElement('a');
        button.textContent = "Learn More";
        button.classList.add("discoverButton")
        button.setAttribute('href', place.url);
        button.setAttribute('target', '_blank');
        button.setAttribute('alt', `${place.name} Information`);
        button.setAttribute("rel", "noopner noreferrer");
        card.appendChild(button);

        
        // add card to the main div
        discoverCards.appendChild(card);
    });
}

displayPlaces(places);

// Create the visit message
const visitMessage = document.querySelector("#visitMessage");
// The current user timestamp
const currentVisit = Date.now();
// Previous visit from localStorage
const lastVisit = localStorage.getItem("lastVisit");

// 1000 milliseconds = 1 second
// 60 seconds = 1 minute
// 60 minutes = 1 hour
// 24 hours = 1 day
const messageToDays = 1000 * 60 * 60 * 24;

// Check user's previous visit and setting the correct message
if (lastVisit === null) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const daysPassed = Math.floor((currentVisit - Number(lastVisit)) / messageToDays);

    if (daysPassed < 1) {
        visitMessage.textContent = "Back so soon! Awesome! 😊"; 
    } else if (daysPassed === 1) {
        visitMessage.textContent = "You last visited 1 day ago. 😮‍💨";
    } else {
        visitMessage.textContent = `You last visited ${daysPassed} days ago. 🥺`
    }
}

// Store current visit for the next time
localStorage.setItem("lastVisit", currentVisit);

// ------------------------ Footer ----------------------------------------
lastModification();