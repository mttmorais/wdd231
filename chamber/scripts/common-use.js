// ---------------------------------------- HEADER ----------------------------------------
export function initializeNavigation() {

    // Store the selected elements that we are going to use
    const navbutton = document.querySelector('#ham-button');
    const navigation = document.querySelector('.navigation');

    // Check if both element exist
    if (navbutton && navigation) {
        // Toggle the open class off and on
        navbutton.addEventListener('click', () => {
            navigation.classList.toggle('open');
            navbutton.classList.toggle('open');
        });
    }
}

// ---------------------------------------- FOOTER ---------------------------------------- 
export function lastModification() {

    // Store the selected elements that we are going to use
    const lastModified = document.querySelector("#lastModified");
    const year = document.querySelector("#currentyear");

    const today = new Date();

    // Check if both element exist
    if (lastModified && year) {
        // Show content
        lastModified.textContent = "Last Modified: " + document.lastModified;
        year.textContent = today.getFullYear();
    }
}