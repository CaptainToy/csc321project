// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoXSaBmOTodQNYkWpiKBGU2t-ZuIEenzw",
  authDomain: "restaurant-31675.firebaseapp.com",
  projectId: "restaurant-31675",
  storageBucket: "restaurant-31675.appspot.com",
  messagingSenderId: "341352125854",
  appId: "1:341352125854:web:1cd1829f8349b5b42bb28f",
  measurementId: "G-Y1K2L8DCEP",
  databaseURL: "https://restaurant-31675-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Handle Form Submission
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("booking-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get form values
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const persons = document.getElementById("persons").value;
    const date = document.getElementById("date").value;

    // Validate inputs
    if (!name || !phone || !email || !persons || !date) {
      alert("Please fill all fields.");
      return;
    }

    // Push data to Firebase
    const bookingRef = ref(database, "bookings/");
    const newBookingRef = push(bookingRef);
    set(newBookingRef, {
      name,
      phone,
      email,
      persons,
      date,
      timestamp: new Date().toISOString(),
    })
      .then(() => {
        alert("Booking Successful!");
        form.reset(); // Clear form fields
      })
      .catch((error) => {
        alert("Booking failed: " + error.message);
      });
  });
});
