export function HotelRooms() {
    document.addEventListener('DOMContentLoaded', async function() {
        // Add an event listener to the button for fetching hotel rooms
        var fetchButton = document.getElementById('btn-fetch-hotel');
        fetchButton.addEventListener('click', fetchAndDisplayRooms);

        // Function to fetch and display hotel rooms
        async function fetchAndDisplayRooms() {
            // Set the hotel ID for the request
            var hotelId = document.getElementById("hotel-id-input").value;

            try {
                // Make the API request using Fetch and await
                var response = await fetch(`http://localhost:8080/rooms/hotel/${hotelId}`);
                var data = await response.json();

                // Display the room list in a table
                displayRoomList(data);
            } catch (error) {
                console.error('Error fetching room list:', error);
            }
        }

        function displayRoomList(rooms) {
            var roomListTableBody = document.getElementById('roomListTableBody');

            if (rooms.length === 0) {
                roomListTableBody.innerHTML = '<tr><td colspan="3">No rooms available for the selected hotel.</td></tr>';
            } else {
                var html = '';
                rooms.forEach(function(room) {
                    html += '<tr>' +
                            '<td>' + room.roomNumber + '</td>' +
                            '<td>' + room.numberOfBeds + '</td>' +
                            '<td>' + room.pricePerDay + '</td>' +
                            '</tr>';
                });
                roomListTableBody.innerHTML = html;
            }
        }
    });
}
