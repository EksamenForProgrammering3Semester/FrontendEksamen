// app.js

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

export async function deleteReservation() {
    const deleteIdInput = document.getElementById('deleteId');
    const reservationId = deleteIdInput.value;

    try {
        // Perform the deletion by calling your API endpoint
        await fetch(`http://localhost:8080/api/reservations/${reservationId}`, {
            method: 'DELETE',
        });

        // Refresh the reservation table after deletion
        populateReservationTable();

        // Clear the input field
        deleteIdInput.value = '';
    } catch (error) {
        console.error('Error deleting reservation:', error);
    }
}

// Add an event listener to call deleteReservation when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Add click event listener to the delete button
    document.getElementById('deleteButton').addEventListener('click', deleteReservation);

    // Initial population of the reservation table
    populateReservationTable();
});



