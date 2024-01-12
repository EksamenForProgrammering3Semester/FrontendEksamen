// main.js


function handleAvailabilityCheck() {
    document.getElementById("content").addEventListener("click", function (event) {
        // Event delegation - check if the clicked element is the button
        if (event.target.id === "checkAvailabilityButton") {
            handleAvailabilityCheck();
        }
    });

    function handleAvailabilityCheck() {
        var hotelId = document.getElementById("hotelId").value;
        var date = document.getElementById("date").value;

        fetch(`http://localhost:8080/rooms/available/${hotelId}/${date}`)
            .then(response => response.json())
            .then(data => displayResult(data))
            .catch(() => displayResult("Error occurred"));
    }

    function displayResult(result) {
        var resultDiv = document.getElementById("result");
        resultDiv.innerHTML = "<h3>Available Rooms:</h3>";

        if (result.length > 0) {
            for (var i = 0; i < result.length; i++) {
                resultDiv.innerHTML += "<p>" + result[i].roomNumber + "</p>";
            }
        } else {
            resultDiv.innerHTML += "<p>No available rooms.</p>";
        }
    }
}

// Export the handleAvailabilityCheck method (for potential future use)
export { handleAvailabilityCheck };
