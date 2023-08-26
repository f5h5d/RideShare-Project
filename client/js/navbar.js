import globalVariables, {
  changeSignedIn,
  changeFullName,
  changeEmail,
} from "./helper.js";
const findARide = document.getElementsByClassName("find-a-ride")[0];
const startATrip = document.getElementsByClassName("start-a-trip")[0];
const logout = document.getElementsByClassName("logout")[0];
const myTrips = document.getElementsByClassName("my-trip")[0];
console.log(findARide);

findARide.addEventListener("click", () => {
  console.log(globalVariables.signedIn);
  localStorage.getItem("signedIn") === "true"
    ? (window.location.pathname = "client/pages/find-information.html")
    : (window.location.pathname = "client/pages/signUp.html");
});

myTrips.addEventListener("click", () => {
  localStorage.getItem("signedIn") === "true"
    ? (window.location.pathname = "client/pages/start-a-trip.html")
    : (window.location.pathname = "client/pages/signUp.html");
});

startATrip.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(localStorage.getItem("trip info"))
  localStorage.getItem("signedIn") === "true"
    ? (window.location.pathname = "client/pages/start-information.html")
    : (window.location.pathname = "client/pages/signUp.html");
});

logout.addEventListener("click", () => {
  localStorage.setItem("signedIn", false);
  window.location.pathname = "client/pages/signUp.html";
});
