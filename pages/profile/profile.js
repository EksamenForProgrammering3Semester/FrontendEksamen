// guestDetailsFetcher.js

export function fetchGuestDetailsAndUpdateUI() {
    // Function to fetch guest details
    function fetchGuestDetails(id) {
      fetch(`http://localhost:8080/guest/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          // Assuming there's a function to update the UI with guest details
          updateGuestDetailsUI(data);
        })
        .catch(error => {
          console.error("Error fetching guest details:", error);
        });
    }
  
    // Function to update the UI with guest details
    function updateGuestDetailsUI(data) {
      // Update the HTML or perform any other actions with the guest details
      // For example, assuming there's a div with the id "guestDetailsForm"
      document.getElementById("guestDetailsForm").innerHTML = `
        <h3>${data.username}</h3>
        <p>ID: ${data.id}</p>
        <p>Password: ${data.password}</p>
        <p>First Name: ${data.firstName}</p>
        <p>Last Name: ${data.lastName}</p>
        <p>Email: ${data.email}</p>
        <p>Phone Number: ${data.phoneNumber}</p>
        <p>Role: ${data.role}</p>
        <!-- Add other details as needed -->
      `;
    }
  
    // Check if id exists in local storage
    const guestId = localStorage.getItem("id");
  
    if (guestId) {
      // If id exists, fetch guest details based on the id from local storage
      fetchGuestDetails(guestId);
    } else {
      console.error("Guest ID not found in local storage");
    }

    const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      // Clear local storage and refresh the page
      localStorage.clear();
      location.reload();
    });
  }
}
  
  