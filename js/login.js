document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("login").onclick = function () {
    const json = import("./login/dummy-logins.json");
    const email = document.getElementById("email").value;
    const password = document.getElementById("pasw").value;
    if (email === "acb@gov.uassr.web" && password === "admin") {
      document.cookie = "email=acb@gov.uassr.web";
      window.location.href = "/users/home.html";
    } else {
      console.log(
        "Falsche Anmeldeinformationen. Bitte überprüfen Sie Ihre Eingaben."
      );
    }
  };
});
// the below code fragment can be found in:
