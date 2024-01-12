// admin.js

// Import necessary functions or objects if needed
// import { renderHtml, loadHtml } from "./utils.js";

export function createHotel() {
  // Find the button and attach a click event listener
  var createHotelButton = document.getElementById('createHotelButton');

  // Function to handle the click event
  function handleClick() {
    // Disable the button to prevent multiple clicks
    createHotelButton.disabled = true;

    // Remove the event listener to prevent further clicks
    createHotelButton.removeEventListener('click', handleClick);

    // Get values from the form fields
    var name = document.getElementById('name').value;
    var street = document.getElementById('street').value;
    var city = document.getElementById('city').value;
    var zip = document.getElementById('zip').value;
    var country = document.getElementById('country').value;

    // Create a hotel request object with the form data
    var hotelRequest = {
      name: name,
      street: street,
      city: city,
      zip: zip,
      country: country
    };

    // Make a POST request to the server
    fetch('http://localhost:8080/hotels/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hotelRequest),
    })
    .then(response => response.json())
    .then(data => {
      // Display the response data or perform additional actions
      console.log('Hotel created:', data);

      // Update the 'verifier' element with the response data
      document.getElementById('verifier').innerText = 'Hotel created with the following details:\n' +
        'Hotel Name: ' + data.name + '\n' +
        'Street: ' + data.street + '\n' +
        'City: ' + data.city + '\n' +
        'ZIP Code: ' + data.zip + '\n' +
        'Country: ' + data.country;
    })
    .catch(error => {
      console.error('Error creating hotel:', error);
    })
    .finally(() => {
      // Re-enable the button after the process is complete
      createHotelButton.disabled = false;
    });
  }

  // Attach the click event listener
  createHotelButton.addEventListener('click', handleClick);
}



export function createRoom() {
  // Find the button and attach a click event listener
  document.getElementById('createRoomButton').addEventListener('click', function() {
    // Get values from the form fields
    var roomNumber = document.getElementById('roomNumber').value;
    var numberOfBeds = document.getElementById('numberOfBeds').value;
    var hotelId = document.getElementById('hotelId').value;
    var pricePerDay = document.getElementById('pricePerDay').value; // Added line

    // Create a room request object with the form data
    var roomRequest = {
      roomNumber: roomNumber,
      numberOfBeds: numberOfBeds,
      hotelId: hotelId,
      pricePerDay: pricePerDay, // Added line
    };

    // Make a POST request to the server
    fetch('http://localhost:8080/rooms/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roomRequest),
    })
    .then(response => response.json())
    .then(data => {
      // Display the response data or perform additional actions
      console.log('Room created:', data);

      // Update the 'roomVerifier' element with the response data
      document.getElementById('roomVerifier').innerText = 'Room created with the following details:\n' +
        'Room Number: ' + data.roomNumber + '\n' +
        'Number of Beds: ' + data.numberOfBeds + '\n' +
        'Hotel ID: ' + hotelId + '\n' +
        'Price Per Day: ' + data.pricePerDay; // Updated line
    })
    .catch(error => {
      console.error('Error creating room:', error);
    });
  });
}
