// Open and close the popup form
const openFormButton = document.getElementById("openFormButton");
const popupForm = document.getElementById("popupForm");
const closeButton = document.querySelector(".close");

openFormButton.addEventListener("click", () => {
  popupForm.style.display = "flex";  // Use flex to align the form
});

closeButton.addEventListener("click", () => {
  popupForm.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === popupForm) {
    popupForm.style.display = "none";
  }
});

// Handle form submission using EmailJS
document.getElementById("emailForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Send form data using EmailJS
  emailjs.send("service_outt123", "template_wug9b8o", {
    from_name: name,
    from_email: email,
    message: message
  }).then(function(response) {
    console.log('SUCCESS!', response.status, response.text);
}, function(error) {
    console.error('Error sending email:', JSON.stringify(error));
  });

  // Close the popup after form submission
  popupForm.style.display = "none";
});
