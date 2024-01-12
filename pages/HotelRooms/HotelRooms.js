export function HotelRooms() {
    // Attach an event listener to the form
    const hotelForm = document.getElementById('hotelForm');
    hotelForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get the hotelId from the input field
        const hotelId = document.getElementById('hotelId').value;

        // Call the fetchAndDisplayRoomData method with the hotelId
        fetchAndDisplayRoomData(hotelId);
    });
}

function fetchAndDisplayRoomData(hotelId) {
    // Fetch data from the server using the hotelId
    fetch(`http://localhost:8080/rooms/hotel/${hotelId}`)
        .then(response => response.json())
        .then(data => {
            const roomListContainer = document.getElementById('roomList');
            roomListContainer.innerHTML = ''; // Clear previous results

            if (data.length === 0) {
                roomListContainer.innerHTML = '<p>No rooms available for this hotel.</p>';
            } else {
                const table = document.createElement('table');
                table.border = '1';

                // Create table headers
                const headers = ['ID', 'Room Number', 'Number of Beds'];
                const headerRow = document.createElement('tr');

                headers.forEach(headerText => {
                    const th = document.createElement('th');
                    th.textContent = headerText;
                    headerRow.appendChild(th);
                });

                table.appendChild(headerRow);

                // Populate table with room data
                data.forEach(room => {
                    const tr = document.createElement('tr');

                    const tdId = document.createElement('td');
                    tdId.textContent = room.id;

                    const tdRoomNumber = document.createElement('td');
                    tdRoomNumber.textContent = room.roomNumber;

                    const tdNumberOfBeds = document.createElement('td');
                    tdNumberOfBeds.textContent = room.numberOfBeds;

                    tr.appendChild(tdId);
                    tr.appendChild(tdRoomNumber);
                    tr.appendChild(tdNumberOfBeds);

                    table.appendChild(tr);
                });

                roomListContainer.appendChild(table);
            }
        })
        .catch(error => console.error('Error fetching room data:', error));
}

// Call the HotelRooms function when the DOM is loaded

