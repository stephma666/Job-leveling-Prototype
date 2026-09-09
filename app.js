// -----------------------------
// Dummy request data
// -----------------------------

const requests = [
  {
    id: "JL-1042",
    employee: "Jordan Lee",
    currentRole: "Senior Product Manager",
    proposedLevel: "IC6",
    status: "In Review"
  },
  {
    id: "JL-1038",
    employee: "Taylor Morgan",
    currentRole: "Software Engineer",
    proposedLevel: "IC5",
    status: "Completed"
  },
  {
    id: "JL-1031",
    employee: "Alex Rivera",
    currentRole: "Design Manager",
    proposedLevel: "M5",
    status: "Draft"
  }
];


// -----------------------------
// Elements
// -----------------------------

const screens = document.querySelectorAll(".screen");

const homeScreen = document.getElementById("home-screen");
const formScreen = document.getElementById("form-screen");
const reviewScreen = document.getElementById("review-screen");
const confirmationScreen =
  document.getElementById("confirmation-screen");

const requestTableBody =
  document.getElementById("request-table-body");

const form =
  document.getElementById("request-form");

let currentRequest = {};


// -----------------------------
// Screen navigation
// -----------------------------

function showScreen(screen) {

  screens.forEach(item => {
    item.classList.remove("active");
  });

  screen.classList.add("active");
}


// -----------------------------
// Render request list
// -----------------------------

function renderRequests() {

  requestTableBody.innerHTML = "";

  requests.forEach(request => {

    const row = document.createElement("tr");

    row.innerHTML = `
      <td><strong>${request.id}</strong></td>
      <td>${request.employee}</td>
      <td>${request.currentRole}</td>
      <td>${request.proposedLevel}</td>
      <td>
        <span class="status">
          ${request.status}
        </span>
      </td>
    `;

    requestTableBody.appendChild(row);

  });

}


// -----------------------------
// Start new request
// -----------------------------

document
  .getElementById("new-request-button")
  .addEventListener("click", () => {

    form.reset();

    showScreen(formScreen);

  });


// -----------------------------
// Cancel
// -----------------------------

document
  .getElementById("cancel-button")
  .addEventListener("click", () => {

    showScreen(homeScreen);

  });


// -----------------------------
// Review submission
// -----------------------------

form.addEventListener("submit", event => {

  event.preventDefault();

  currentRequest = {
    employeeName:
      document.getElementById("employee-name").value,

    employeeId:
      document.getElementById("employee-id").value,

    currentTitle:
      document.getElementById("current-title").value,

    currentLevel:
      document.getElementById("current-level").value,

    proposedTitle:
      document.getElementById("proposed-title").value,

    proposedLevel:
      document.getElementById("proposed-level").value,

    rationale:
      document.getElementById("rationale").value
  };

  const reviewContent =
    document.getElementById("review-content");

  reviewContent.innerHTML = `

    ${reviewRow(
      "Employee",
      currentRequest.employeeName
    )}

    ${reviewRow(
      "Employee ID",
      currentRequest.employeeId || "Not provided"
    )}

    ${reviewRow(
      "Current Job",
      `${currentRequest.currentTitle} (${currentRequest.currentLevel})`
    )}

    ${reviewRow(
      "Proposed Job",
      `${currentRequest.proposedTitle || "No title change"} (${currentRequest.proposedLevel})`
    )}

    ${reviewRow(
      "Business Rationale",
      currentRequest.rationale
    )}

  `;

  showScreen(reviewScreen);

});


function reviewRow(label, value) {

  return `
    <div class="review-row">

      <div class="review-label">
        ${label}
      </div>

      <div class="review-value">
        ${value}
      </div>

    </div>
  `;

}


// -----------------------------
// Edit request
// -----------------------------

document
  .getElementById("edit-button")
  .addEventListener("click", () => {

    showScreen(formScreen);

  });


// -----------------------------
// Submit request
// -----------------------------

document
  .getElementById("submit-button")
  .addEventListener("click", () => {

    const newId =
      "JL-" + Math.floor(1000 + Math.random() * 9000);

    requests.unshift({
      id: newId,
      employee: currentRequest.employeeName,
      currentRole: currentRequest.currentTitle,
      proposedLevel: currentRequest.proposedLevel,
      status: "Submitted"
    });

    document
      .getElementById("confirmation-request-id")
      .textContent = newId;

    renderRequests();

    showScreen(confirmationScreen);

  });


// -----------------------------
// Return home
// -----------------------------

document
  .getElementById("return-home-button")
  .addEventListener("click", () => {

    showScreen(homeScreen);

  });


// Initial page load
renderRequests();
