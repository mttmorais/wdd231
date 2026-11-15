import { initializeNavigation, lastModification } from "./common-use.js";

initializeNavigation()

// -----------------------------------EVENTS ----------------------------------

const eventsContainer = document.querySelector("#events");

const events = [
    {
        name: "Celebration Community Festival",
        date: "November 12, 2026",
        location: "Celebration Town Center",
        description: "Join our community for a day of activities, local business, food and entertainment."
    },
    {
        name: "Small Business Networking",
        date: "November 20, 2026",
        location: "Celebration Lakeside Park",
        description: "Connect with local entrepreneurs and build valuable business relationship."
    },
    {
        name: "Holiday Market",
        date: "December 5, 2026",
        location: "Celebration Town Center",
        description: "Discover local products, support small business, and enjoy the atmosphere."
    }
];

// display events
function displayEvents(events) {
    events.forEach((event) => {
        
        // create HTML elements
        const card = document.createElement("section");
        const name = document.createElement("h3");
        const date = document.createElement("p");
        const location = document.createElement("p");
        const description = document.createElement("p");

        // add content
        name.textContent = event.name;
        date.textContent = event.date;
        location.textContent = event.location;
        location.classList.add("event-location");
        description.textContent = event.description;

        // add element to the card
        card.appendChild(name);
        card.appendChild(date);
        card.appendChild(location);
        card.appendChild(description);

        // add card to the HTML container
        eventsContainer.appendChild(card);
    });
}

displayEvents(events);

// -----------------------------------WEATHER ----------------------------------

// select HTML elements
const currentWeather = document.querySelector("#weather-current");
const weatherForecast = document.querySelector("#weather-forecast");

// Celebration, Florida coordinates
const latitude = 28.3191;
const longitude = -81.5409;

// select HTML elements
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=efa317c51f3cc311c05ba9a702adc7bc`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=efa317c51f3cc311c05ba9a702adc7bc`;


// get weather information
async function getWeather() {
    try {
        const response = await fetch(weatherURL);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error("Error fetching weather information", error);
    }
}

// get weather forecast
async function getForecast() {
    try {
        const response = await fetch(forecastURL);
        if (response.ok) {
            const data = await response.json();

            // filter forecast for 12pm
            const dailyForecast = data.list.filter((forecast) => {
                return forecast.dt_txt.includes("12:00:00");
            });
            
            console.log(dailyForecast);

            // extract forecast information
            const forecastData = dailyForecast.map((forecast) => {
                return {
                    date: forecast.dt_txt,
                    temperature: forecast.main.temp,
                    description: forecast.weather[0].description,
                    icon: forecast.weather[0].icon
                };
            });

            displayForecast(forecastData);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error("Error fetching forecast weather:", error);
    }
}

getForecast();

// display weather forecast
function displayForecast(forecastData) {
    forecastData.forEach((forecast) => {

        // create HTML elements
        const card = document.createElement("section");
        const date = document.createElement("h3");
        const icon = document.createElement("img");
        const temperature = document.createElement("p");
        const description = document.createElement("p");

        // format date
        const forecastDate = new Date(forecast.date);
        date.textContent = forecastDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric"
        });

        // weather icon
        icon.setAttribute("src", `https://openweathermap.org/img/wn/${forecast.icon}@2x.png`);
        icon.setAttribute("alt", forecast.description);

        // add content
        temperature.textContent = `${Math.round(forecast.temperature)}°F`;
        description.textContent = forecast.description.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

        // append elements
        card.appendChild(date);
        card.appendChild(icon);
        card.appendChild(temperature);
        card.appendChild(description);

        weatherForecast.appendChild(card);
    });
}

// display weather
function displayWeather(data) {
    const temperature = document.createElement("p");
    const feelsLike = document.createElement("p");
    const humidity = document.createElement("p");
    const icon = document.createElement("img");
    const description = document.createElement("p");

    temperature.textContent = `${Math.round(data.main.temp)}°F`;
    feelsLike.textContent = `Feels Like: ${Math.round(data.main.feels_like)}°F`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    const desc = data.weather[0].description.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    icon.setAttribute("alt", data.weather[0].description);
    description.textContent = desc;

    currentWeather.appendChild(temperature);
    currentWeather.appendChild(feelsLike);
    currentWeather.appendChild(humidity);
    currentWeather.appendChild(icon);
    currentWeather.appendChild(description);
}

getWeather();

// -----------------------------------BUSINESS SPOTLIGHTS ----------------------------------

// select HTML elements
const spotlightCards = document.querySelector("#spotlights-cards");

async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        const data = await response.json();

        const eligibleCompanies = data.companies.filter((company) => {
            return company.membershipLevel === 2 || company.membershipLevel === 3;
        });

        const selectedCompanies = eligibleCompanies.sort(() => Math.random() - 0.5).slice(0, 3);

        displaySpotlights(selectedCompanies);

    } catch (error) {
        console.error("Error fetching business spotlights:", error);
    }
}

getSpotlights();

// create the spotlights cards
function displaySpotlights(selectedCompanies) {
    selectedCompanies.forEach((company) => {
        // create HTML elements
        const card = document.createElement("section");
        const image = document.createElement("img");
        const name = document.createElement("h3");
        const phone = document.createElement("p");
        const address = document.createElement("p");
        const website = document.createElement("a");
        const membership = document.createElement("p");

        // add a label to each membership level
        if (company.membershipLevel === 3) {
            membership.textContent = "Gold Member";
        } else if (company.membershipLevel === 2) {
            membership.textContent = "Silver Member";
        }

        // add content
        name.textContent = company.name;
        phone.textContent = company.phoneNumber;
        address.textContent = company.address;
        website.textContent = "Visit Website";

        // add image attribute
        image.setAttribute("src", company.imageFile);
        image.setAttribute("alt", `${company.name} logo`);

        // add url attribute
        website.setAttribute("href", company.websiteURL);
        website.setAttribute("target", "_blank");
        website.setAttribute("rel", "noopner noreferrer");

        // add element to the card
        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(phone);
        card.appendChild(address);
        card.appendChild(website);
        card.appendChild(membership);

        // add card to section spotlights-card
        spotlightCards.appendChild(card);
    });
}

lastModification()