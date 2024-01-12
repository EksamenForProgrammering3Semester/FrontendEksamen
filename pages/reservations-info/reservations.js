export async function populateReservationTable() {
    try {
        // Fetch data from the API endpoint
        const data = await fetch('http://localhost:8080/reservations/all').then(response => response.json());

        // Populate the table with reservation data
        const reservationTable = document.getElementById('reservationTable');
        const tbody = reservationTable.getElementsByTagName('tbody')[0];

        // Clear existing content in the tbody
        tbody.innerHTML = '';

        data.forEach(reservation => {
            const row = tbody.insertRow();

            // Set some padding between the cells
            const cellPaddingValue = '8px';

            row.insertCell(0).textContent = reservation.id;
            row.insertCell(1).textContent = reservation.room.roomNumber;
            row.insertCell(2).textContent = reservation.room.numberOfBeds;
            row.insertCell(3).textContent = reservation.room.hotel.name;
            row.insertCell(4).textContent = reservation.guest.username;
            row.insertCell(5).textContent = reservation.reservationDate;

            // Apply padding to each cell
            Array.from(row.cells).forEach(cell => {
                cell.style.padding = cellPaddingValue;
            });
        });

        // Set some padding between the header cells
        const headerCells = reservationTable.querySelectorAll('thead th');
        const headerPaddingValue = '12px';

        headerCells.forEach(headerCell => {
            headerCell.style.padding = headerPaddingValue;
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// ./pages/test/test.js

// Function to delete a reservation
// ./pages/test/test.js

// Function to delete a reservation
// ./pages/test/test.js

// Function to delete a reservation
// ./pages/test/test.js

// Function to delete a reservation
// ./pages/test/test.js

export function deleteReservation() {
    const deleteButton = document.getElementById("deleteReservationButton");
    const reservationIdInput = document.getElementById("reservationIdInput");
    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");

    deleteButton.addEventListener("click", async () => {
        const reservationIdToDelete = reservationIdInput.value.trim();

        if (reservationIdToDelete) {
            try {
                const response = await fetch(`http://localhost:8080/reservations/${reservationIdToDelete}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                });
                populateReservationTable()

                if (!response.ok) {
                    throw new Error(`Failed to delete reservation with ID ${reservationIdToDelete}: ${response.statusText}`);
                }

                const data = await response.json();
                
             
            } catch (error) {
              
            }
        } else {
            errorMessage.innerText = "Please enter a valid Reservation ID";
            successMessage.innerText = "";
        }
    });
}



// Example usage:


// Set up event listener in JavaScript

