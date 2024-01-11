// admin.js

// Update the URL to point to your new endpoint
const URL = "http://localhost:8080/hotels/";

let hotelDetails = null;
let handlersInitialized = false;

export async function initFindHotel(match) {
  // Clear input field from previous runs
  document.getElementById("hotel-details").innerHTML = "";
  if (!handlersInitialized) {
    hotelDetails = document.getElementById("hotel-details");
    document.getElementById("btn-fetch-hotel").addEventListener("click", getHotel);
    handlersInitialized = true;
  }
  // Check if hotelID is provided via a query parameter and if yes, use it to fetch and render the hotel
  if (match?.params?.id) {
    const id = match.params.id;
    document.getElementById("hotel-details").innerHTML = "";
    fetchAndRenderHotel(id);
  }
}

const navigoRoute = "find-hotel";

async function getHotel(evt) {
  evt.preventDefault();
  fetchAndRenderHotel();
}

// Get the hotel from the input field, or via the ID provided via the URL, and render it
async function fetchAndRenderHotel(idFromURL) {
  const id = idFromURL ? idFromURL : document.getElementById("hotel-id-input").value;
  if (!id) {
    hotelDetails.innerHTML = "";
    appendParagraph(hotelDetails, "Please provide an id", "color:red");
    return;
  }
  try {
    const hotel = await fetch(URL + id).then(res => res.json());

    // Check if the hotel object is not empty
    if (Object.keys(hotel).length === 0) {
      throw new Error("No hotel found for id: " + id);
    }

    hotelDetails.innerHTML = "";
    // Build the DOM with the hotel details
    appendParagraph(hotelDetails, "ID: " + hotel.id);
    appendParagraph(hotelDetails, "Name: " + hotel.name);
    appendParagraph(hotelDetails, "Street: " + hotel.street);
    appendParagraph(hotelDetails, "City: " + hotel.city);
    appendParagraph(hotelDetails, "ZIP: " + hotel.zip);
    appendParagraph(hotelDetails, "Country: " + hotel.country);
    appendParagraph(hotelDetails, "Number of Rooms: " + hotel.numberOfRooms);
    // Next two lines --> Update the URL in the browser, but do not call the handler (Remove if you don't care)
    const queryString = "?id=" + id;
    window.router.navigate(`/${navigoRoute}${queryString}`, { callHandler: false, updateBrowserURL: true });
  } catch (err) {
    hotelDetails.innerHTML = "";
    appendParagraph(hotelDetails, "Could not find hotel: " + id, "color:red");
  }
}

// Helper function to append a p-tag to a given parent, with a given text and optional style
function appendParagraph(outerElement, value, style) {
  let p = document.createElement("p");
  p.textContent = value;
  if (style) {
    p.style = style;
  }
  outerElement.appendChild(p);
}
