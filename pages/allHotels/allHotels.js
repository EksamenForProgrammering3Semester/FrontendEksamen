import { sanitizeStringWithTableRows } from "../../utils.js";

const URL = "http://localhost:8080/hotels/all";

export function allHotels() {
  getAllHotels();
}

export async function getAllHotels() {
  try {
    const hotelsFromServer = await fetch(URL).then(res => res.json());
    showAllHotelData(hotelsFromServer);
  } catch (error) {
    console.error("Error fetching hotels: " + error);
  }
}

function showAllHotelData(data) {
  const tableRowsArray = data.map(hotel => `
    <tr>                                
      <td>${hotel.id} </td>              
      <td>${hotel.name} </td>                     
      <td>${hotel.street} </td>  
      <td>${hotel.city} </td>
      <td>${hotel.zip} </td>
      <td>${hotel.country} </td>
      <td>${hotel.numberOfRooms} </td>
      <td>
        <button id="row-btn_delete_${hotel.id}" type="button" class="btn btn-sm btn-danger">Delete</button>
        <button id="row-btn_update_${hotel.id}" type="button" class="btn btn-sm btn-primary">Update</button>
      </td>      
    </tr>`);

  const tableRowsString = tableRowsArray.join("\n");
  document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsString);

  // Add event listener to handle delete and update buttons
  document.getElementById("tbl-body").addEventListener("click", handleButtonAction);
}

let isUpdateFormDisplayed = false;

async function handleButtonAction(evt) {
  const target = evt.target;
  const id = getHotelIdFromButtonId(target.id);

  if (target.id.startsWith("row-btn_delete")) {
    const confirmed = confirm("Are you sure you want to delete hotel with id: " + id);
    if (confirmed) {
      await deleteHotelById(id);
      getAllHotels(); // Refresh the list after deletion
    }
  } else if (target.id.startsWith("row-btn_update")) {
    // Check if the update form is already displayed
    if (!isUpdateFormDisplayed) {
      // Retrieve the current values of the hotel
      const hotelData = await fetch(`http://localhost:8080/hotels/${id}`).then(res => res.json());

      // Create a form dynamically
      const updateForm = document.createElement('form');
      updateForm.innerHTML = `
        <label for="newName">New Hotel Name:</label>
        <input type="text" id="newName" name="newName" value="${hotelData.name}" required><br>

        <label for="newStreet">New Street:</label>
        <input type="text" id="newStreet" name="newStreet" value="${hotelData.street}" required><br>

        <label for="newCity">New City:</label>
        <input type="text" id="newCity" name="newCity" value="${hotelData.city}" required><br>

        <label for="newZip">New ZIP Code:</label>
        <input type="text" id="newZip" name="newZip" value="${hotelData.zip}" required><br>

        <label for="newCountry">New Country:</label>
        <input type="text" id="newCountry" name="newCountry" value="${hotelData.country}" required><br>

        <button type="button" id="submitUpdate">Submit Update</button>
      `;

      // Append the form to the page
      document.body.appendChild(updateForm);

      // Add an event listener to the submit button
      const submitButton = document.getElementById('submitUpdate');
      submitButton.addEventListener('click', async function () {
        // Retrieve the updated values from the form
        const newName = document.getElementById('newName').value;
        const newStreet = document.getElementById('newStreet').value;
        const newCity = document.getElementById('newCity').value;
        const newZip = document.getElementById('newZip').value;
        const newCountry = document.getElementById('newCountry').value;

        // Create an object with the updated values
        const updatedHotel = {
          name: newName,
          street: newStreet,
          city: newCity,
          zip: newZip,
          country: newCountry
        };

        // Make a PUT request to update the hotel
        await updateHotelById(id, updatedHotel);

        // Remove the form from the page after updating
        document.body.removeChild(updateForm);

        // Refresh the hotel list after update
        getAllHotels();

        // Update the flag to indicate that the form is no longer displayed
        isUpdateFormDisplayed = false;
      });

      // Update the flag to indicate that the form is currently displayed
      isUpdateFormDisplayed = true;
    }
  }
}

function getHotelIdFromButtonId(buttonId) {
  const parts = buttonId.split("_");
  return parts[2];
}

async function deleteHotelById(id) {
  const deleteURL = `http://localhost:8080/hotels/${id}`;
  try {
    const response = await fetch(deleteURL, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Hotel deleted successfully!");
    } else if (response.status === 404) {
      alert("Hotel not found");
    } else if (response.status === 500) {
      alert("Error deleting hotel: Internal Server Error");
    } else {
      alert("Error deleting hotel");
    }
  } catch (error) {
    console.error("Error deleting hotel: " + error);
    alert("Error deleting hotel");
  }
}
async function updateHotelById(id, updatedHotel) {
  const updateURL = `http://localhost:8080/hotels/update/${id}`;
  try {
    await fetch(updateURL, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedHotel),
    });
    alert("Hotel updated successfully!");

    // Add a button to finish the update process
    const finishButton = document.createElement('button');
    finishButton.textContent = 'Finish Update';
    finishButton.addEventListener('click', function () {
      // You can navigate to a new page or perform any other action to finish the update
      location.reload(); // For simplicity, reloading the page
    });

  } catch (error) {
    console.error("Error updating hotel: " + error);
    alert("Error updating hotel");
  }
}
