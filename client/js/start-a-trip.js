const email = localStorage.getItem("email");
const container = document.getElementById("trip-container");
let trip;
if (email === "root@root.com") {
  trip = JSON.parse(localStorage.getItem("trip info"));
    const newDiv = document.createElement("div");

    newDiv.innerHTML = `          <div class="card bg-dark text-light h-100">
    <div class="card-body" style="display: flex; justify-content: space-between;">
      <div>
        <div>
          <p class="card-title text-warning fs-1 fw-bold">
            ${trip.startLocation} to ${trip.endLocation}
          </p>
          <p class="fs-4">Name: ${trip.fullName}</p>
        </div>
        <div>
          <p class="card-text fs-4">
            Email: ${trip.email}<br />FAX: ${trip.phoneNumber}<br />Seats
            Left: ${trip.seats}
          </p>
        </div>
      </div>
      <button class="trip-cancel" id="trip-cancel">Cancel</button>
    </div>
    </div>`;

    container.appendChild(newDiv);

    document
      .getElementById("trip-cancel")
      .addEventListener("click", cancelTrip);
} else {
  fetch(`http://localhost:3000/api/getTripsByEmail/${email}`)
    .then((response) => response.json())
    .then((data) => {
      trip = data;
      for (let x of trip) {
        console.log(x);
        const newDiv = document.createElement("div");

        newDiv.innerHTML = `          <div class="card bg-dark text-light h-100">
        <div class="card-body" style="display: flex; justify-content: space-between;">
          <div>
            <div>
              <p class="card-title text-warning fs-1 fw-bold">
                ${x.startLocation} to ${x.endLocation}
              </p>
              <p class="fs-4">Name: ${x.fullName}</p>
            </div>
            <div>
              <p class="card-text fs-4">
                Email: ${x.email}<br />FAX: ${x.phoneNumber}<br />Seats
                Left: ${x.seats}
              </p>
            </div>
          </div>
          <button class="trip-cancel" id="trip-cancel">Cancel</button>
        </div>
        </div>`;

        container.appendChild(newDiv);

        document
          .getElementById("trip-cancel")
          .addEventListener("click", cancelTrip);
      }
    })
    .catch((error) => {
      console.error("Error fetching trips:", error);
    });
}

async function cancelTrip() {
  if (localStorage.getItem("email") === "root@root.com") {
    console.log("dleteing");
    localStorage.removeItem("trip info");
    window.location.reload();
  } else {
    try {
      const response = await fetch("http://localhost:3000/deleteTripByEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Success message from the server
        localStorage.removeItem("trip info");
        window.location.reload();
      } else {
        console.error("Error:", response.status);
        // Handle error response
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle fetch error
    }
  }
}
console.log(trip);

if (trip !== undefined) {
}
