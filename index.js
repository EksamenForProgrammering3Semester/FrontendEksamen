import "https://unpkg.com/navigo"  //Will create the global Navigo object used below
import "https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.0/purify.min.js"

import {
  setActiveLink, renderHtml, loadHtml
} from "./utils.js"

import { initNavigate } from "./pages/navigate/navigate.js"
import { allHotels } from "./pages/allHotels/allHotels.js"
import { initUsers } from "./pages/users-navigate/users.js"
import { initFindHotel } from "./pages/findHotel/findHotel.js"
import { createUserFormHandler } from "./pages/signUp/signUp.js"
import { createHotel , createRoom} from "./pages/admin/admin.js";
import {fetchGuestDetailsAndUpdateUI} from "./pages/profile/profile.js"
import {populateReservationTable, deleteReservation} from "./pages/reservations-info/reservations.js"
import {createReservation} from "./pages/test/test.js"
import {setupHotelButtons} from"./pages/specific-hotels/specific-hotels.js"
import {HotelRooms} from"./pages/HotelRooms/HotelRooms.js"
import {roominfo} from "./pages/roominfo/roominfo.js"





window.addEventListener("load", async () => {

  const templateAdmin = await loadHtml("./pages/admin/admin.html")


  const templateUsersModal = await loadHtml("./pages/allHotels/allHotels.html")

  const templateUsersNavigate = await loadHtml("./pages/users-navigate/users.html")

  const templateFindHotel = await loadHtml("./pages/findHotel/findHotel.html")

  const templateNavigate = await loadHtml("./pages/navigate/navigate.html")

  const templateNotFound = await loadHtml("./pages/notFound/notFound.html")

  const templateSignUp = await loadHtml("./pages/signUp/signUp.html")

  const templatetest = await loadHtml("./pages/test/test.html")

  const templateprofile = await loadHtml("./pages/profile/profile.html")

  const templatereservations = await loadHtml("./pages/reservations-info/reservations.html")

  const templatespecifichotels = await loadHtml("./pages/specific-hotels/specific-hotels.html")

  const templateHotelRooms = await loadHtml("./pages/HotelRooms/HotelRooms.html")

  const templateroominfo = await loadHtml("./pages/roominfo/roominfo.html")






  

  
  const router = new Navigo("/",{hash:true});
  //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
  window.router = router
 

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url)
        done()
      }
    })
    .on({
      //For very simple "templates", you can just insert your HTML directly like below
      "/": () => document.getElementById("content").innerHTML =
        `<h2>Home</h2>
      <p style='margin-top:2em'>
      This is the content of the the hotel app <br/>
      it displays all the features of the hotel system. 
      </p>
     `,
     "/admin": () => {
      renderHtml(templateAdmin, "content");
      createHotel()
      createRoom()
    },    

      "/allHotels": () => {
        renderHtml(templateUsersModal, "content")
        allHotels()
      },
      "/users-navigate": () => {
        renderHtml(templateUsersNavigate, "content")
        initUsers()
      },
      "/find-hotel": (match) => {
        renderHtml(templateFindHotel, "content")
        initFindHotel(match)
      },

      "/navigate-programatically": () => {
        renderHtml(templateNavigate, "content")
        initNavigate()
      },
      "/signup": () => {
        renderHtml(templateSignUp, "content")
          createUserFormHandler();
      
      },
      "/test": (match) => {
        renderHtml(templatetest, "content")

        createReservation()
      },
      "/profile": (match) => {
        renderHtml(templateprofile, "content")
        fetchGuestDetailsAndUpdateUI()
      },
      "/reservation": () => {
        renderHtml(templatereservations, "content")
        populateReservationTable()
        deleteReservation()
      
      }
      ,
      "/specific-hotels": () => {
        renderHtml(templatespecifichotels, "content")
        setupHotelButtons()
        
      }
      ,
      "/HotelRooms": () => {
        renderHtml(templateHotelRooms, "content")
        HotelRooms()
        
      } ,
      "/findRooms": () => {
       renderHtml(templateroominfo, "content")
       roominfo()
        
      }
    })
    .notFound(() => {
      renderHtml(templateNotFound, "content")
    })
    .resolve()
});


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
    + ' Column: ' + column + ' StackTrace: ' + errorObj);
}