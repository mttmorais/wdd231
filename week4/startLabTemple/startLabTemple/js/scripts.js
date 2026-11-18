import { temples, url } from "../data/temples.js"

// console.log(temples)
// console.log(url)

//--------------------------Grab a reference to the division where we display the items
const showHere = document.querySelector("#showHere")

// Get a reference to the HTML dialog element
const myDialog = document.querySelector("#myDialog")
const myTitle = document.querySelector("#myDialog h2")
const myInfo = document.querySelector("#myDialog p")
const myClose = document.querySelector("#myDialog button")

myClose.addEventListener('click', () => myDialog.close())

//---------------------------Loop through the array JSON items
function displayItems(data) {
    console.log(data)
    data.forEach(x => {
        console.log(x)
        const photo = document.createElement("img")
        photo.src = `${url}${x.path}`
        photo.alt = x.name

        photo.addEventListener('click', () => showStuff(x));
        showHere.appendChild(photo)
    });
}

displayItems(temples)

function showStuff(x) {
    myTitle.innerHTML = x.name
    myInfo.innerHTML = `Dedicated ${x.dedicated} by ${x.person} as temple number ${x.number}`
    myDialog.showModal()
}