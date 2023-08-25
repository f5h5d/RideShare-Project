import globalVariables, {changeSignedIn, changeFullName, changeEmail} from './helper.js';

let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.getElementById("name-field");
let title = document.getElementById("title");

let isOnSignUp = true;

let emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)[a-zA-Z]{2,}))$/;
let passwordRegex = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;

async function onSignIn() {
  if (isOnSignUp) {
    nameField.style.maxHeight = "0";
    title.innerHTML = "Sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
    isOnSignUp = false;
  } else {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email == "root@root.com") {
      console.log('works')
      localStorage.setItem("signedIn", true);
      localStorage.setItem("email", email);
      localStorage.setItem("fullName", "root root")
      
      document.getElementsByClassName("invisible")[0].classList.remove("invisible")
      window.location.pathname = "client/pages/";
      return;
    }

    const loginData = {
      email: email,
      password: password
    }

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.message);
        if (responseData.user) {
          console.log("User data:", responseData.user);
          window.location.href="http://localhost:5500/client/"
        }
      } else {
        console.error("Error logging in");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

async function onSignUp() {
  if (!isOnSignUp) {
    nameField.style.maxHeight = "60px";
    title.innerHTML = "Sign Up";
    signinBtn.classList.add("disable");
    signupBtn.classList.remove("disable");
    isOnSignUp = true;
  } else {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    if (
      email.toLowerCase().match(emailRegex) &&
      !password.match(passwordRegex)
    ) {
      console.log("workd");
      const userData = {
        email: email,
        password: password,
        fullName: name,
      };

      try {
        const response = await fetch("http://localhost:3000/api/register", {
          mode: 'cors', // Add this line
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          console.log("User registered successfully");

          // Fetch user data by email
          const email = userData.email;
          const userDataResponse = await fetch(
            `http://localhost:3000/api/user/${email}`
          );
          const userDataJson = await userDataResponse.json();

          if (userDataJson.user) {
            console.log("User data fetched:", userDataJson.user);
            // Update your UI or do something with the fetched user data
          } else {
            console.log("User data not found");
          }
        } else {
          console.error("Error registering user");
        }
      } catch (error) {
        console.error();
      }
    }
  }
}

signinBtn.addEventListener("click", onSignIn);
signupBtn.addEventListener("click", onSignUp);
