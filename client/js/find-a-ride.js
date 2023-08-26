try {
  let data = [];
  if (localStorage.getItem("email") !== "root@root.com" && localStorage.getItem("name") !== "root root") {
    const response = await fetch("http://localhost:3000/getDrivers"); // Assumes the server is running on the same host and port
  data = await response.json();
  }

  const fakeUsers = [
    {
        date: "2023-09-01",
        email: "example1@example.com",
        endLocation: "Toronto",
        fullName: "John Doe",
        id: 32,
        phoneNumber: "9876543210",
        seats: "3",
        startLocation: "Mississauga"
    },
    {
        date: "2023-09-02",
        email: "example2@example.com",
        endLocation: "London",
        fullName: "Jane Smith",
        id: 33,
        phoneNumber: "5555555555",
        seats: "4",
        startLocation: "Windsor"
    },
    {
      date: "2023-09-03",
      email: "example3@example.com",
      endLocation: "Ottawa",
      fullName: "Robert Johnson",
      id: 34,
      phoneNumber: "1112223333",
      seats: "2",
      startLocation: "Kingston"
  },
  {
      date: "2023-09-04",
      email: "example4@example.com",
      endLocation: "Kitchener",
      fullName: "Alice Williams",
      id: 35,
      phoneNumber: "7778889999",
      seats: "5",
      startLocation: "Waterloo"
  },
  {
      date: "2023-09-05",
      email: "example5@example.com",
      endLocation: "Niagara Falls",
      fullName: "Michael Brown",
      id: 36,
      phoneNumber: "4444444444",
      seats: "8",
      startLocation: "St. Catharines"
  }
];
  data = [...data, ...fakeUsers]

  const tripInfo = JSON.parse(localStorage.getItem('trip info'))
  const releventData = [];

  for (let x of data) {
    console.log(tripInfo.startLocation)
    console.log(x.startLocation)

    if (tripInfo.startLocation === x.startLocation && tripInfo.endLocation === x.endLocation && tripInfo.date === x.date) { releventData.push(x)}
  }

  for (let x of releventData) {
    const newDiv = document.createElement("section");
    newDiv.innerHTML = `<div class="card bg-dark text-light h-100" id=${x.id}>
                          <div class="card-body">
                            <div>
                              <p class="card-title text-warning fs-1 fw-bold">${x.startLocation} to ${x.endLocation}</p>
                              <p class="fs-4">Name: ${x.fullName}</p>
                            </div>
                            <div>
                              <p class="card-text fs-4">FAX: ${x.phoneNumber} <br />Seats Left: ${x.seats}</p>
                            </div>
                          </div>
                        </div>`;

    document.getElementsByClassName("innerContainer")[0].appendChild(newDiv);


    newDiv.addEventListener("click", () => {
      console.log("hi")
    document.getElementsByClassName("modal")[0].classList.add("visible")
    })
  }
} catch (error) {
  console.error("Error fetching drivers data:", error);
}
