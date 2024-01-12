// room-info.js

export function roominfo() {
    var submitBtn = document.getElementById("submitBtn");

    if (submitBtn) {
        submitBtn.addEventListener("click", function () {
            var roomNumberInput = document.getElementById("roomNumber");

            if (roomNumberInput) {
                var roomNumber = roomNumberInput.value;

                fetch(`http://localhost:8080/rooms/${roomNumber}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        displayTable(data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        });
    }

    function displayTable(data) {
        var tableBody = document.getElementById("tableBody");

        if (tableBody) {
            tableBody.innerHTML = ""; // Clear existing data

            if (Array.isArray(data)) {
                data.forEach(room => {
                    var row = tableBody.insertRow();
                    row.insertCell(0).innerText = room.id;
                    row.insertCell(1).innerText = room.roomNumber;
                    row.insertCell(2).innerText = room.numberOfBeds;
                });
            } else if (typeof data === 'object') {
                // If response is an object, handle it accordingly
                var row = tableBody.insertRow();
                row.insertCell(0).innerText = data.id;
                row.insertCell(1).innerText = data.roomNumber;
                row.insertCell(2).innerText = data.numberOfBeds;
            } else {
                // Handle the case when the response is not an array or object
                console.error('Invalid response format:', data);
            }
        }
    }
}
