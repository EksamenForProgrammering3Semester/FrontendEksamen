export function createUserFormHandler() {
  // Find the registration form
  const userForm = document.getElementById('createUserForm');

  // Define the submit event handler for registration
  const submitHandler = function(event) {
    event.preventDefault(); // Prevents the form from submitting normally

    // Get values from the registration form fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    // Create a user object with the registration form data
    const user = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber
    };

    // Make a POST request to the server for registration
    fetch('http://localhost:8080/guest/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(response => {
      if (response.ok) {
        alert('User created successfully!');
        // Reset the form after processing
        userForm.reset();
      } else {
        alert('Failed to create user. Please check the input data.');
      }
    })
    .catch(error => {
      console.error('Error creating user:', error);
      alert('Error creating user. Please try again.');
    });
  };

  // Attach the submit event listener to the registration form
  userForm.addEventListener('submit', submitHandler);

  // Find the login form
  const loginForm = document.getElementById('loginForm');

  // Define the submit event handler for login
  const loginHandler = function(event) {
    event.preventDefault(); // Prevents the form from submitting normally

    // Get values from the login form fields
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // Make a GET request to the server for login
    fetch(`http://localhost:8080/guest/login?username=${loginUsername}&password=${loginPassword}`)
    .then(response => response.json())
    .then(data => {
      if (data) {
        alert('Login successful!');
        localStorage.setItem('role', data.role); // assuming 'role' is the attribute in your data object
        localStorage.setItem('id', data.id);

        // Perform any additional actions after successful login
      } else {
        alert('Login failed. Please check your credentials.');
      }
    })
    .catch(error => {
      console.error('Error during login:', error);
      alert('Error during login. Please try again.');
    });
  };

  // Attach the submit event listener to the login form
  loginForm.addEventListener('submit', loginHandler);

  document.addEventListener('DOMContentLoaded', function() {
    createUserFormHandler();
  });
}
