// ./pages/test/test.js

export function createReservation() {
    // Define the event handler function
    function submitHandler(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get input values
        const room = document.getElementById("room").value;
        const reservationDate = document.getElementById("reservationDate").value;

        // Guest ID is automatically retrieved from localStorage
        const guest = localStorage.getItem("id");

        // Create the payload
        const payload = {
            "room": room,
            "guest": guest,
            "reservationDate": reservationDate
            // Additional fields specific to your ReservationRequest class
        };

        // Make a POST request using fetch
        fetch("http://localhost:8080/reservations/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(data => {
            // Display success message
            document.getElementById("successMessage").innerText = "Reservation created successfully!";
            document.getElementById("errorMessage").innerText = ""; // Clear error message

            console.log("Reservation created:", data);
            // Handle the response as needed
        })
        .catch(error => {
            // Display error message
            document.getElementById("errorMessage").innerText = "Error creating reservation. Please try again.";
            document.getElementById("successMessage").innerText = ""; // Clear success message

            console.error("Error creating reservation:", error);
            // Handle errors
        });

        // Remove the event listener after submission
        document.getElementById("reservationForm").removeEventListener("submit", submitHandler);
    }

    // Add the event listener
    document.getElementById("reservationForm").addEventListener("submit", submitHandler);
}
