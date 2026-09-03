const form = document.getElementById("event-form");
const eventTitle = document.getElementById("event-title");
const eventAuthor = document.getElementById("event-author");
const eventDate = document.getElementById("event-date");
const eventTime = document.getElementById("event-time");
const eventDescription = document.getElementById("event-description");
const eventsList = document.getElementById("events-list");
const searchInput = document.getElementById("search-input");
const noSearchResults = document.getElementById("no-search-results");
const loadingIndicator = document.getElementById("loading-indicator");

const events = [];

function sanitizeInput(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.textContent;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const newEvent = {
        title: sanitizeInput(eventTitle.value.trim()),
        author: sanitizeInput(eventAuthor.value.trim()),
        date: eventDate.value,
        time: eventTime.value,
        description: sanitizeInput(eventDescription.value.trim())
    };
    events.push(newEvent);
    displayEvents(events);
    form.reset();
});

function displayEvents(eventsDisplay) {
    eventsList.innerHTML = "";

    if (eventsDisplay.length === 0) {
        noSearchResults.hidden = false;
        return;
    }
    noSearchResults.hidden = true;

    eventsDisplay.forEach(function (event) {
        const listItem = document.createElement("li");

        const title = document.createElement("h3");
        title.textContent = event.title;

        const author = document.createElement("p");
        author.textContent = "Author: " + event.author;

        const date = document.createElement("p");
        date.textContent = "Date: " + event.date;

        const time = document.createElement("p");
        time.textContent = "Time: " + event.time;

        if (event.description) {
            const description = document.createElement("p");
            description.textContent = event.description;
            listItem.appendChild(description);
        }

        listItem.appendChild(title);
        listItem.appendChild(author);
        listItem.appendChild(date);
        listItem.appendChild(time);
        eventsList.appendChild(listItem);
    });
}

function showLoading() {
    loadingIndicator.hidden = false;
}

function hideLoading() {
    loadingIndicator.hidden = true;
}

async function loadEvents() {
    showLoading();
    try {
        await new Promise(function (resolve) {
            setTimeout(resolve, 2000);
        });
        console.log("Events are loaded successfully");
    } 
    catch (error) {
        console.error("Error occurs while loading events:", error);
    } 
    finally {
        hideLoading();
        displayEvents(events);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadEvents();
});

searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredEvents = events.filter(function (event) {
        return (
            event.title.toLowerCase().includes(searchTerm) ||
            event.author.toLowerCase().includes(searchTerm) ||
            event.date.includes(searchTerm)
        );
    });
    
    displayEvents(filteredEvents);
});