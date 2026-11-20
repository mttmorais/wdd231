import { initializeNavigation, lastModification } from "./common-use.js";

initializeNavigation();

/*------------------------------ DIALOG ------------------------------*/
// Get a reference to the HTML dialog elements
const membershipDetails = document.querySelector("#membershipDetails");
const closeButton = document.querySelector("#closeButton");

const card = document.querySelector("#membershipInfo");

const title = document.querySelector("#membershipDetails h2");
const subTitle = document.querySelector("#membershipDetails h3");
const benefits = document.querySelector("#membershipDetails ul");
const cost = document.querySelector("#membershipDetails p");

// Add an click function to closeButton
closeButton.addEventListener('click', () => {
    membershipDetails.close();
});

// Get the information from "members.json"
async function getMembersData() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        const data = await response.json();

        console.table(data.membership);

        displayMembershipLevels(data.membership);

    } catch (error) {
        console.error(error);
    }
}

// Function do display the membership levels
function displayMembershipLevels(membership) {
    membership.forEach(info => {
        // Create the cards
        const membershipCard = document.createElement("section");
        membershipCard.classList.add("card");
        
        // Create cardTitle
        const cardTitle = document.createElement("h3");
        cardTitle.textContent = `${info.title} Level`;

        // Create the button
        const openButton = document.createElement("button");
        openButton.classList.add("openButton");
        openButton.textContent = "More Information";
        // Create the click function
        openButton.addEventListener('click', () => {
            showMembershipInfo(info);
        });

        membershipCard.appendChild(cardTitle);
        membershipCard.appendChild(openButton);

        card.appendChild(membershipCard);
    });
}

// Function do show the membership information
function showMembershipInfo(info) {

    // Add content
    title.innerHTML = info.title;
    subTitle.textContent = "Benefits:"
    benefits.innerHTML = "";

    info.benefits.forEach(benefit => {
        const item = document.createElement("li");
        item.textContent = benefit;

        benefits.appendChild(item);
    });

    cost.innerHTML = `<strong>Cost: </strong>${info.cost}`;

    membershipDetails.showModal();

}

// Close the modal if click outside the dialog
membershipDetails.addEventListener('click', (event) => {
    if (event.target === membershipDetails) {
        membershipDetails.close();
    }
});

getMembersData();

// -----------------------------------  ----------------------------------

lastModification();