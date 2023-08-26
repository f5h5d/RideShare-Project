const continueBtn = document.getElementById("signupBtn");

function isTodayOrFuture(dateString) {
  const inputDate = new Date(dateString);
  const today = new Date();
  
  // Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison
  today.setHours(0, 0, 0, 0);

  return inputDate >= today;
}

async function onSubmit(e) {
  e.preventDefault();
  const startLocation =
    document.getElementsByClassName("starting-location")[0].value;
  const endLocation =
    document.getElementsByClassName("ending-location")[0].value;
  const date = document.getElementById("date").value;
  const phoneNumber = document.getElementById("phone").value;
  const seats = document.getElementById("seats").value;
  const dateCheck = new Date();

  if (
    startLocation !== "Starting Location" &&
    endLocation !== "Ending Location" && startLocation !== endLocation && 
    date !== "" && isTodayOrFuture(date) &&
    phoneNumber.length == 10 &&
    seats > 0
  ) {
    const email = localStorage.getItem("email");
    const fullName = localStorage.getItem("fullName");

    console.log(date);

    const driverData = {
      email,
      fullName,
      startLocation,
      endLocation,
      date,
      phoneNumber,
      seats,
    };

    try {
      const response = await fetch("http://localhost:3000/addDriver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(driverData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Success message from the server
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

continueBtn.addEventListener("click", onSubmit);
