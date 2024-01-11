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
      </td>      
    </tr>`);

  const tableRowsString = tableRowsArray.join("\n");
  document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsString);

  // Add event listener to handle details and delete buttons
  document.getElementById("tbl-body").addEventListener("click", handleButtonAction);
}

async function handleButtonAction(evt) {
  const target = evt.target;
  if (!target.id.startsWith("row-btn_")) {
    return;
  }

  const parts = target.id.split("_");
  const id = parts[2];
  const btnAction = parts[1];

  if (btnAction === "delete") {
    const confirmed = confirm("Are you sure you want to delete hotel with id: " + id);
    if (confirmed) {
      await deleteHotelById(id);
      getAllHotels(); // Refresh the list after deletion
    }
  }
}

async function deleteHotelById(id) {
  const deleteURL = `http://localhost:8080/hotels/${id}`;
  try {
    await fetch(deleteURL, {
      method: "DELETE",
    });
    alert("Hotel deleted successfully!");
  } catch (error) {
    console.error("Error deleting hotel: " + error);
    alert("Error deleting hotel");
  }
}
