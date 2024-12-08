const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("message");

// Replace with your Formspree endpoint
const FORMSPREE_URL = "https://formspree.io/f/mgveboyq";

function sendFormspree() {
    const formData = {
        name: fullName.value,
        email: email.value,
        phone: phone.value,
        message: message.value,
    };

    fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            if (response.ok) {
                Swal.fire({
                    title: "Success!",
                    text: "Message sent successfully!",
                    icon: "success",
                });
                form.reset(); // Clear the form on success
            } else {
                return response.text().then((text) => {
                    throw new Error(text || "Failed to send the message.");
                });
            }
        })
        .catch((error) => {
            console.error("Formspree Error:", error);
            Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again later.",
                icon: "error",
            });
        });
}

function checkInputs() {
    const items = document.querySelectorAll(".item");
    let isValid = true;

    for (const item of items) {
        if (item.value.trim() === "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
            isValid = false;
        } else {
            item.classList.remove("error");
            item.parentElement.classList.remove("error");
        }

        item.addEventListener("input", () => {
            if (item.value.trim() !== "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            } else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }

    // Additional email validation
    if (email.value.trim() !== "" && !validateEmail(email.value)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");
        isValid = false;
    }

    return isValid;
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (checkInputs()) {
        sendFormspree();
    } else {
        Swal.fire({
            title: "Warning!",
            text: "Please fill all fields correctly.",
            icon: "warning",
        });
    }
});
