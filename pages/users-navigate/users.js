const URL = "https://jsonplaceholder.typicode.com/users/"
import { sanitizeStringWithTableRows } from "../../utils.js"

//Used to cache data from server
let usersFromServer = []

export function initUsers() {
  getAndRenderUsers()
}

 async function getAndRenderUsers() {
  try {
    //Use this if you prefer to cache results (not recommended)
    //usersFromServer = usersFromServer.http://localhost:3000length > 0 ? usersFromServer : await fetch(URL).then(res => res.json())
    usersFromServer = await fetch(URL).then(res => res.json())
    renderAllData(usersFromServer)
  }
  catch (err) {
    console.error("UPS: " + err) //This can be done better - do it
  }
}

function renderAllData(data) {
  const tableRowsArray = data.map(user => `
  <tr>                                
    <td>${user.id} </td>              
    <td>${user.name} </td>                     
    <td>${user.address.street} </td>  
    <td>${user.address.city} </td>
    <td>
   </td>      
  </tr>`)
  const tableRowsString = tableRowsArray.join("\n")
  document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsString)
}