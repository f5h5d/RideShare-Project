let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let postalCodeField = document.getElementById("postal-code-field");
let title = document.getElementById("title");

let isOnSignUp = true;

let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)[a-zA-Z]{2,}))$/
let passwordRegex = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/
let postalCodeRegex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i

const onSignIn = () => {
  if (isOnSignUp) {
    postalCodeField.style.maxHeight = "0";
    title.innerHTML = "Sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
    isOnSignUp = false;
  }
}
const onSignUp = () => {
  if (!isOnSignUp) {
    postalCodeField.style.maxHeight = "60px";
    title.innerHTML = "Sign Up";
    signinBtn.classList.add("disable");
    signupBtn.classList.remove("disable");
    isOnSignUp = true;
  }
  else {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const postalCode = document.getElementById("postal-code").value;
    if (email.toLowerCase().match(emailRegex) && !password.match(passwordRegex) && postalCode.match(postalCodeRegex)) {
      
    }
  }
}

signinBtn.addEventListener("click", onSignIn)
signupBtn.addEventListener("click", onSignUp)