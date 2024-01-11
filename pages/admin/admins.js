export async function createHotel() {
    // Get form values
    const name = document.getElementById("name").value;
    const street = document.getElementById("street").value;
    const city = document.getElementById("city").value;
    const zip = document.getElementById("zip").value;
    const country = document.getElementById("country").value;

    // Create hotel object
    const hotelData = {
      name: name,
      street: street,
      city: city,
      zip: zip,
      country: country,
    };

    try {
      // Send POST request to the backend
      const response = await fetch("http://localhost:8080/hotels/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hotelData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response as JSON
      const createdHotel = await response.json();

      // Handle the response from the server
      console.log("Hotel created:", createdHotel);

      // Display success message
      showSuccessMessage("Hotel successfully created!");
    } catch (error) {
      console.error("Error creating hotel:", error);
      // Display error message
      showErrorMessage("Error creating hotel. Please try again.");
    }
  }

  function showSuccessMessage(message) {
    // Create a success message element
    const successMessageElement = document.createElement("p");
    successMessageElement.textContent = message;
    successMessageElement.style.color = "green";

    // Append the element to the form
    const form = document.getElementById("createHotelForm");
    form.appendChild(successMessageElement);
  }

  function showErrorMessage(message) {
    // Create an error message element
    const errorMessageElement = document.createElement("p");
    errorMessageElement.textContent = message;
    errorMessageElement.style.color = "red";

    // Append the element to the form
    const form = document.getElementById("createHotelForm");
    form.appendChild(errorMessageElement);
  }