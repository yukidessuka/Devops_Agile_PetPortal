document.addEventListener("DOMContentLoaded", function () {
    let searchInput = document.getElementById("search");
    let dateInput = document.getElementById("filter-date");
    let timeInput = document.getElementById("filter-time");

    if (searchInput) {
        searchInput.addEventListener("input", filterPets);
    } else {
        console.error("Search input not found!");
    }

    if (dateInput) {
        dateInput.addEventListener("input", filterPets);
    } else {
        console.error("Date input not found!");
    }

    if (timeInput) {
        timeInput.addEventListener("input", filterPets);
    } else {
        console.error("Time input not found!");
    }
});

function filterPets() {
    let input = document.getElementById("search")?.value.toLowerCase() || "";
    let dateFilter = document.getElementById("filter-date")?.value || "";
    let timeFilter = document.getElementById("filter-time")?.value || "";
    let petCards = document.querySelectorAll(".pet-card");

    petCards.forEach(card => {
        let petNameElement = card.querySelector(".pet-title span");
        let petDateElement = card.querySelector(".pet-date");
        let petTimeElement = card.querySelector(".pet-time");

        let petName = petNameElement ? petNameElement.textContent.toLowerCase() : "";
        let petDate = petDateElement ? petDateElement.textContent : "";
        let petTime = petTimeElement ? petTimeElement.textContent : "";

        let matchesName = petName.includes(input);
        let matchesDate = dateFilter ? petDate === dateFilter : true;
        let matchesTime = timeFilter ? petTime === timeFilter : true;

        card.style.display = matchesName && matchesDate && matchesTime ? "block" : "none";
    });
}
