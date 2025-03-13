// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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

document.addEventListener("DOMContentLoaded", () => {
    const bookingsTable = document.getElementById("bookings-table");
    const bookingRef = ref(database, "bookings/");

    // Fetch bookings from Firebase
    onValue(bookingRef, (snapshot) => {
        bookingsTable.innerHTML = ""; // Clear previous data
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const booking = childSnapshot.val();
                const bookingId = childSnapshot.key; // Get Firebase key for deletion

                // Create table row
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${booking.name || "N/A"}</td>
                    <td>${booking.phone || "N/A"}</td>
                    <td>${booking.email || "N/A"}</td>
                    <td>${booking.persons || "N/A"}</td>
                    <td>${booking.date || "N/A"}</td>
                    <td>${booking.timestamp ? new Date(booking.timestamp).toLocaleString() : "N/A"}</td>
                    <td><button class="delete-btn" data-id="${bookingId}">Delete</button></td>
                `;
                bookingsTable.appendChild(row);
            });

            // Attach event listeners to delete buttons
            document.querySelectorAll(".delete-btn").forEach((btn) => {
                btn.addEventListener("click", (event) => {
                    const id = event.target.getAttribute("data-id");
                    deleteBooking(id);
                });
            });
        } else {
            bookingsTable.innerHTML = "<tr><td colspan='7'>No bookings found</td></tr>";
        }
    });

    async function deleteBooking(id) {
        if (!id) return;
        if (!confirm("Are you sure you want to delete this booking?")) return;

        try {
            await remove(ref(database, `bookings/${id}`));
            alert("Booking deleted successfully.");
        } catch (error) {
            console.error("Error deleting booking:", error);
            alert("Failed to delete booking.");
        }
    }
});
