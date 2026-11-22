import { initializeNavigation, lastModification } from "./common-use.js";

initializeNavigation();

/*------------------------------ FORM ------------------------------*/
// Create the thank you page getting the information from the membership form
const myInfo = new URLSearchParams(window.location.search);
console.log(myInfo);

// console.log(myInfo.get('firstName'));
// console.log(myInfo.get('lastName'));
// console.log(myInfo.get('title'));
// console.log(myInfo.get('email'));
// console.log(myInfo.get('phoneNumber'));
// console.log(myInfo.get('businessName'));
// console.log(myInfo.get('description'));
// console.log(myInfo.get('level'));

const timestamp = myInfo.get('timestamp');
const submittedTime = new Date(timestamp);

// Format date to local browser time
const formatDate = submittedTime.toLocaleString('en-US', {
    dateStyle: "long",
    timeStyle: "short"
});

// Check the membership level
let membershipLevel;

if (myInfo.get('level') === "np") {
    membershipLevel = "Non Profit Membership";
} else if (myInfo.get('level') === "bronze") {
    membershipLevel = "Bronze Membership";
} else if (myInfo.get('level') === "silver") {
    membershipLevel = "Silver Membership";
} else if (myInfo.get('level') === "gold") {
    membershipLevel = "Gold Membership";
}

document.querySelector("#results").innerHTML = `
<p>Welcome ${myInfo.get('firstName')} ${myInfo.get('lastName')},</p>
<p>now you company: ${myInfo.get('businessName')} joined in our group.</p>
<p>You applied for ${membershipLevel} Level.</p>
<p>Your email is ${myInfo.get('email')}</p>
<p>Your email is ${myInfo.get('phoneNumber')}</p>
<p>Form Submitted on ${formatDate}</p>`;

// ----------------------------------- FOOTER ----------------------------------

lastModification();