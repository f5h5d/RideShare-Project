const continueBtn = document.getElementById("signupBtn");

async function onSubmit(e) {
  e.preventDefault();
  const startLocation =
    document.getElementsByClassName("starting-location")[0].value;
  const endLocation =
    document.getElementsByClassName("ending-location")[0].value;
  const date = document.getElementsByClassName("date")[0].value;
  const phoneNumber = document.getElementById("phone").value;
  if (
    startLocation !== "Starting Location" &&
    endLocation !== "Ending Location" &&
    date !== "" &&
    phoneNumber.length == 10
  ) {
    const email = localStorage.getItem("email");
    const fullName = localStorage.getItem("fullName");

    const riderData = {
      email,
      fullName,
      startLocation,
      endLocation,
      date,
      phoneNumber,
    };

    if (email === "root@root.com" && fullName === "root root") {
      console.log('hi')
      localStorage.setItem(
        "trip info",
        JSON.stringify({
          startLocation,
          endLocation,
          date,
          phoneNumber,
        })
      );

      window.location.pathname = "client/pages/find-a-ride.html";
    } else {
      try {
        const response = await fetch("http://localhost:3000/addRider", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(riderData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.message); // Success message from the server
          localStorage.setItem(
            "trip info",
            JSON.stringify({
              startLocation,
              endLocation,
              date,
              phoneNumber,
            })
          );

          window.location.pathname = "client/pages/find-a-ride.html";
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
}

continueBtn.addEventListener("click", onSubmit);
