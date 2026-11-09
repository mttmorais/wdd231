// ---------------------------------------- HEADER ----------------------------------------

// Store the selected elements that we are going to use
const navbutton = document.querySelector('#ham-button');
const navigation = document.querySelector('.navigation');

// Toggle the open class off and on
navbutton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    navbutton.classList.toggle('open');
});

// ---------------------------------------- MAIN CARDS ---------------------------------------- 

// select the HTML div element
const cards = document.querySelector('#cards');

async function getMembersData() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        const data = await response.json();

        console.table(data.companies);

        displayMembers(data.companies);

    } catch (error) {
        console.error(error);
    }
}

// create the members cards
const displayMembers = (companies) => {
    companies.forEach((company) => {

        // create HTML elements
        const card = document.createElement('section');
        const name = document.createElement('h2');
        const address = document.createElement('p');
        const phone = document.createElement('p');
        const website = document.createElement('a');
        const picture = document.createElement('img');
        const level = document.createElement('p');
        const foundationDate = document.createElement('p');

        // add content
        name.textContent = `${company.name}`;
        address.textContent = `Address: ${company.address}`;
        phone.textContent = `Phone number: ${company.phoneNumber}`;
        website.textContent = company.websiteURL;
        level.textContent = `Membership Level: ${company.membershipLevel}`;
        foundationDate.textContent = `Foundation date: ${company.foundationDate}`;

        // add url attribute
        website.setAttribute('href', company.websiteURL)

        // add image attribute
        picture.setAttribute('src', company.imageFile);
        picture.setAttribute('alt', `Picture of ${company.name}`);
        picture.setAttribute('loading', 'lazy');
        picture.setAttribute('width', '240');
        picture.setAttribute('height', '340');

        // add element to the card
        card.appendChild(name);
        card.appendChild(picture);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(level);
        card.appendChild(foundationDate);

        // add card to the main div
        cards.appendChild(card);
    });
}

//call the function
getMembersData();

// ---------------------------------------- FOOTER ---------------------------------------- 

const lastModified = document.querySelector("#lastModified");
const year = document.querySelector("#currentyear");

const today = new Date();

lastModified.textContent = "Last Modified: " + document.lastModified;
year.textContent = today.getFullYear();