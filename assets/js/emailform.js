// Open and close the popup form
const openFormButton = document.getElementById("openFormButton");
const popupForm = document.getElementById("popupForm");
const closeButton = document.querySelector(".close");
const popupSuccess = document.getElementById("popupSuccess");
const imageOptions = document.querySelectorAll('.image-option');

imageOptions.forEach((option) => {
  option.addEventListener('click', () => {
    option.classList.toggle('selected');
  });
});

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

window.addEventListener("click", (event) => {
  if (event.target === popupSuccess) {
    popupSuccess.style.display = "none";
  }
});

// Initialize EmailJS
(function () {
  emailjs.init("42awK1IIf_Kx2SeXW"); // Replace with your EmailJS user ID
})();

// Confetti Animation
function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

// Update budget value display
const budgetSlider = document.getElementById('budget');
const budgetValue = document.getElementById('budget-value');

if (budgetSlider && budgetValue) {
  budgetSlider.addEventListener('input', () => {
    budgetValue.textContent = budgetSlider.value;
  });
}

// Handle form submission using EmailJS
document.getElementById("emailForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Collect form data
  const title = document.querySelector('input[name="title"]:checked').value;
  const name = document.getElementById("client-name").value;
  const email = document.getElementById("client-email").value;
  const groupSize = document.getElementById("group-size").value;
  const groupAgeRange = document.getElementById("group-age-range").value;
  const dreamExperience = document.getElementById("dream-experience").value;
  const favoritePart = document.getElementById("favorite-part").value;
  const skillLevel = document.getElementById("skill-level").value;
  const budget = document.getElementById("budget").value;
  const accommodation = document.getElementById("accommodation").value;
  const travelSeason = document.getElementById("travel-season").value;
  const equipmentRental = document.getElementById("equipment-rental").value;
  const otherDetails = document.getElementById("other-details").value;

  // Collect selected golf courses
  const selectedCourses = [];
  document.querySelectorAll('.image-option.selected').forEach((option) => {
    selectedCourses.push(option.getAttribute('data-value'));
  });

  // Collect selected non-golf activities
  const selectedActivities = [];
  document.querySelectorAll('.checkbox-activities input[type="checkbox"]:checked').forEach((checkbox) => {
    selectedActivities.push(checkbox.value);
  });

  // Prepare email template parameters
  const templateParams = {
    title: title,
    name: name,
    email: email,
    group_size: groupSize,
    group_age_range: groupAgeRange,
    dream_experience: dreamExperience,
    favorite_part: favoritePart,
    skill_level: skillLevel,
    budget: budget,
    accommodation: accommodation,
    travel_season: travelSeason,
    equipment_rental: equipmentRental,
    selected_courses: selectedCourses.join(", "),
    selected_activities: selectedActivities.join(", "),
    other_details: otherDetails,
  };

  // Send form data using EmailJS
  emailjs.send("service_outt123", "template_wug9b8o", templateParams)
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);
      triggerConfetti(); // Trigger confetti animation
    })
    .catch(function (error) {
      console.error('Error sending email:', JSON.stringify(error));
      alert('Oops! Something went wrong. Please try again.');
    });

  // Reset the form
  document.getElementById("emailForm").reset();

  // Close the popup after form submission
  document.getElementById("popupForm").style.display = "none";

  document.getElementById("popupSuccess").style.display = "flex";
});

// Multi-page form navigation
const pages = document.querySelectorAll('.form-page');
const nextButtons = document.querySelectorAll('.next-button');
const prevButtons = document.querySelectorAll('.prev-button');
const submitButton = document.querySelector('button[type="submit"]');
const formNavigation = document.querySelector('.form-navigation');
let currentPage = 0;

function updateNavigation() {
  // Update button visibility
  nextButtons.forEach(btn => btn.style.display = currentPage === pages.length - 1 ? 'none' : 'block');
  submitButton.style.display = currentPage === pages.length - 1 ? 'block' : 'none';
  prevButtons.forEach(btn => btn.style.display = currentPage === 0 ? 'none' : 'block');

  // Add or remove 'first-page' class based on current page
  if (currentPage === 0) {
    formNavigation.classList.add('first-page');
  } else {
    formNavigation.classList.remove('first-page');
  }
}

nextButtons.forEach(button => {
  button.addEventListener('click', () => {
    pages[currentPage].style.display = 'none';
    currentPage++;
    pages[currentPage].style.display = 'block';
    updateNavigation();
  });
});

prevButtons.forEach(button => {
  button.addEventListener('click', () => {
    pages[currentPage].style.display = 'none';
    currentPage--;
    pages[currentPage].style.display = 'block';
    updateNavigation();
  });
});