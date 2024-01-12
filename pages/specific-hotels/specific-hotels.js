// script.js

function setupHotelButtons() {
    function getHotelsByType(hotelType) {
        fetch(`http://localhost:8080/hotels/byType/${encodeURIComponent(hotelType)}`)
            .then(response => response.json())
            .then(data => updateTable(data))
            .catch(error => console.error('Error:', error));
    }

    function updateTable(data) {
        const tableBody = document.getElementById('resultBody');

        // Clear existing table rows
        tableBody.innerHTML = '';

        // Populate the table with the new data
        data.forEach(hotel => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = hotel.id;
            row.insertCell(1).textContent = hotel.name;
            row.insertCell(2).textContent = hotel.street;
            row.insertCell(3).textContent = hotel.city;
            row.insertCell(4).textContent = hotel.zip;
            row.insertCell(5).textContent = hotel.country;
            row.insertCell(6).textContent = hotel.hotelType;
        });
    }

    // Add event listeners for each button
    document.getElementById('familyHouseButton').addEventListener('click', () => getHotelsByType('Family House'));
    document.getElementById('oceanViewButton').addEventListener('click', () => getHotelsByType('Ocean View'));
    document.getElementById('nearCityButton').addEventListener('click', () => getHotelsByType('Near the City'));
}

// Export the setupHotelButtons function
export { setupHotelButtons };
