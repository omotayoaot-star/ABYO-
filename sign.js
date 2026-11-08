const form = document.getElementById("login");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const fullname = document.getElementById("fullname").value;

    const email = document.getElementById("email").value;

    const username = document.getElementById("username")

    const message = document.getElementById("message");

    if (password.length < 8) {

        message.textContent = "Password must contain at least 8 characters.";

        message.style.color = "red";
    } else {

        message.textContent = "Registration successful, " + fullname + "!";

        message.style.color = "green";

        form.reset();

    }
     


});