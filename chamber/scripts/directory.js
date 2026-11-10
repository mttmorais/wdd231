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
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");

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

// discovering the membership level
function getMembershipLevel(level) {
    if (level === 1) {
        return "Member";
    } else if (level === 2) {
        return "Silver";
    } else if (level === 3) {
        return "Gold";
    } else {
        return "Unknown"
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
        address.innerHTML = `<span class="label">Address:</span> ${company.address}`;
        phone.innerHTML = `<span class="label">Phone number:</span> ${company.phoneNumber}`;
        website.innerHTML = company.websiteURL;
        level.innerHTML = `<span class="label">Membership Level:</span> ${getMembershipLevel(company.membershipLevel)}`;
        foundationDate.innerHTML = `<span class="label">Foundation date:</span> ${company.foundationDate}`;

        // add url attribute
        website.setAttribute('href', company.websiteURL)
        website.setAttribute('target', '_blank');
        website.setAttribute('rel', 'noopener noreferrer');

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
        card.appendChild(level);
        card.appendChild(foundationDate);
        card.appendChild(website);

        // add card to the main div
        cards.appendChild(card);
    });
}

// --------- PAGE OVERVIEW ---------- 
gridbutton.addEventListener("click", () => {
    cards.classList.replace("list", "grid");
});

listbutton.addEventListener("click", () => {
    cards.classList.replace("grid", "list");
});

//call the function
getMembersData();

// ---------------------------------------- FOOTER ---------------------------------------- 

const lastModified = document.querySelector("#lastModified");
const year = document.querySelector("#currentyear");

const today = new Date();

lastModified.textContent = "Last Modified: " + document.lastModified;
year.textContent = today.getFullYear();