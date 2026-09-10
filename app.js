// ============================================================
// JOB LEVELING PROTOTYPE
// app.js
// ============================================================

// ------------------------------------------------------------
// JOB LEVELS
// ------------------------------------------------------------

const JOB_LEVELS = {
  "Individual Contributors": [
    "P3",
    "P4",
    "P5",
    "P6",
    "P7"
  ],

  "Managers & Directors": [
    "M2",
    "M3",
    "M4",
    "M5",
    "M6"
  ],

  "Executives": [
    "VP1",
    "VP2",
    "VP3",
    "SVP"
  ]
};


// ------------------------------------------------------------
// DUMMY REQUEST DATA
// ------------------------------------------------------------

const requests = [
  {
    id: "JL-1050",
    employee: "Jordan Lee",
    current: "Senior Product Manager · P6",
    proposed: "P7",
    status: "In Review",
    updated: "Nov 14, 2024"
  },
  {
    id: "JL-1042",
    employee: "Taylor Kim",
    current: "Director, Product Management · M4",
    proposed: "M5",
    status: "Submitted",
    updated: "Nov 1, 2024"
  },
  {
    id: "JL-1038",
    employee: "Alex Rivera",
    current: "Software Engineer · P5",
    proposed: "P6",
    status: "Completed",
    updated: "Oct 28, 2024"
  },
  {
    id: "JL-1031",
    employee: "Morgan Lee",
    current: "Design Manager · M3",
    proposed: "M4",
    status: "Draft",
    updated: "Oct 14, 2024"
  }
];


// ------------------------------------------------------------
// POPULATE JOB LEVEL DROPDOWNS
// ------------------------------------------------------------

function populateLevelSelect(select, selectedLevel) {

  if (!select) return;

  select.innerHTML = "";

  Object.entries(JOB_LEVELS).forEach(([group, levels]) => {

    const optgroup = document.createElement("optgroup");

    optgroup.label = group;

    levels.forEach(level => {

      const option = document.createElement("option");

      option.value = level;
      option.textContent = level;

      if (level === selectedLevel) {
        option.selected = true;
      }

      optgroup.appendChild(option);

    });

    select.appendChild(optgroup);

  });

}


// Proposed level dropdown

const proposedLevelSelect =
  document.getElementById("proposed-level");

populateLevelSelect(
  proposedLevelSelect,
  "P7"
);


// Compensation recommended level dropdown

const recommendedLevelSelect =
  document.getElementById("recommended-level");

populateLevelSelect(
  recommendedLevelSelect,
  "P7"
);


// ------------------------------------------------------------
// STATUS COLORS
// ------------------------------------------------------------

function statusClass(status) {

  if (status === "Completed") {
    return "success";
  }

  if (status === "In Review") {
    return "warning";
  }

  return "neutral";

}


// ------------------------------------------------------------
// PBP REQUEST TABLE
// ------------------------------------------------------------

function renderPbpTable() {

  const table =
    document.getElementById("pbp-request-table");

  if (!table) return;

  table.innerHTML = requests.map(request => `

    <tr>

      <td>
        <strong>${request.id}</strong>
      </td>

      <td>
        ${request.employee}
      </td>

      <td>
        ${request.current}
      </td>

      <td>
        ${request.proposed}
      </td>

      <td>
        <span class="badge ${statusClass(request.status)}">
          ${request.status}
        </span>
      </td>

      <td>
        ${request.updated}
      </td>

    </tr>

  `).join("");

}


// ------------------------------------------------------------
// COMPENSATION REVIEW QUEUE
// ------------------------------------------------------------

function renderCompQueue() {

  const table =
    document.getElementById("comp-queue-table");

  if (!table) return;

  table.innerHTML = requests

    .filter(request =>
      request.status !== "Draft"
    )

    .map(request => `

      <tr>

        <td>
          <strong>${request.id}</strong>
        </td>

        <td>
          ${request.employee}
        </td>

        <td>
          ${request.current.split("·")[1]?.trim() || ""}
        </td>

        <td>
          ${request.proposed}
        </td>

        <td>
          <span class="badge ${statusClass(request.status)}">
            ${request.status}
          </span>
        </td>

      </tr>

    `).join("");

}


// Render tables when page loads

renderPbpTable();
renderCompQueue();


// ------------------------------------------------------------
// SWITCH BETWEEN PBP VIEW AND COMP TEAM VIEW
// ------------------------------------------------------------

document
  .querySelectorAll(".nav-link")
  .forEach(button => {

    button.addEventListener("click", () => {

      // Remove active navigation state

      document
        .querySelectorAll(".nav-link")
        .forEach(navButton =>
          navButton.classList.remove("active")
        );

      button.classList.add("active");


      // Hide all views

      document
        .querySelectorAll(".view")
        .forEach(view =>
          view.classList.remove("active")
        );


      // Show selected view

      const viewName =
        button.dataset.view;

      const selectedView =
        document.getElementById(
          `${viewName}-view`
        );

      if (selectedView) {
        selectedView.classList.add("active");
      }

    });

  });


// ------------------------------------------------------------
// START NEW REQUEST
// ------------------------------------------------------------

const newRequestButton =
  document.getElementById("new-request-btn");

if (newRequestButton) {

  newRequestButton.addEventListener(
    "click",
    () => {

      const dashboard =
        document.getElementById(
          "pbp-dashboard"
        );

      const form =
        document.getElementById(
          "pbp-form"
        );

      if (dashboard) {
        dashboard.classList.add("hidden");
      }

      if (form) {
        form.classList.remove("hidden");
      }

    }
  );

}


// ------------------------------------------------------------
// EMPLOYEE LOOKUP
// MOCK WORKDAY INTEGRATION
// ------------------------------------------------------------

const lookupButton =
  document.getElementById("lookup-btn");

if (lookupButton) {

  lookupButton.addEventListener(
    "click",
    () => {

      const employeeIdField =
        document.getElementById(
          "employee-id"
        );

      if (!employeeIdField) return;

      const employeeId =
        employeeIdField.value.trim();


      if (employeeId === "123456") {

        alert(
          "Demo: Employee information retrieved from Workday and organization chart retrieved from Aware."
        );

      } else {

        alert(
          "Prototype uses dummy data. Enter Employee ID 123456 to demonstrate the Workday lookup."
        );

      }

    }
  );

}


// ------------------------------------------------------------
// UPDATE PROPOSED ORG CHART WHEN LEVEL CHANGES
// ------------------------------------------------------------

if (proposedLevelSelect) {

  proposedLevelSelect.addEventListener(
    "change",
    event => {

      const titleField =
        document.getElementById(
          "proposed-title"
        );

      const chartRole =
        document.getElementById(
          "chart-role"
        );

      if (!titleField || !chartRole) {
        return;
      }

      chartRole.textContent =
        `${titleField.value} · ${event.target.value}`;

    }
  );

}


// ------------------------------------------------------------
// UPDATE PROPOSED ORG CHART WHEN JOB TITLE CHANGES
// ------------------------------------------------------------

const proposedTitleField =
  document.getElementById(
    "proposed-title"
  );

if (proposedTitleField) {

  proposedTitleField.addEventListener(
    "input",
    event => {

      const chartRole =
        document.getElementById(
          "chart-role"
        );

      if (!chartRole) return;

      const level =
        proposedLevelSelect
          ? proposedLevelSelect.value
          : "";

      chartRole.textContent =
        `${event.target.value} · ${level}`;

    }
  );

}


// ------------------------------------------------------------
// UPDATE PROPOSED MANAGER
// ------------------------------------------------------------

const proposedManagerField =
  document.getElementById(
    "proposed-manager"
  );

if (proposedManagerField) {

  proposedManagerField.addEventListener(
    "input",
    event => {

      const chartManager =
        document.getElementById(
          "chart-manager"
        );

      if (!chartManager) return;

      chartManager.textContent =
        event.target.value ||
        "Proposed Manager";

    }
  );

}


// ------------------------------------------------------------
// RESET PROPOSED ORG CHART TO CURRENT MANAGER
// ------------------------------------------------------------

const resetOrgButton =
  document.getElementById(
    "reset-org"
  );

if (resetOrgButton) {

  resetOrgButton.addEventListener(
    "click",
    () => {

      const managerField =
        document.getElementById(
          "proposed-manager"
        );

      const chartManager =
        document.getElementById(
          "chart-manager"
        );

      if (managerField) {
        managerField.value =
          "Taylor Kim";
      }

      if (chartManager) {
        chartManager.textContent =
          "Taylor Kim";
      }

    }
  );

}


// ------------------------------------------------------------
// SAVE PBP REQUEST AS DRAFT
// ------------------------------------------------------------

const saveDraftButton =
  document.getElementById(
    "save-draft-btn"
  );

if (saveDraftButton) {

  saveDraftButton.addEventListener(
    "click",
    () => {

      alert(
        "Draft saved successfully in this prototype."
      );

    }
  );

}


// ------------------------------------------------------------
// SUBMIT PBP REQUEST
// ------------------------------------------------------------

const submitRequestButton =
  document.getElementById(
    "submit-request-btn"
  );

if (submitRequestButton) {

  submitRequestButton.addEventListener(
    "click",
    () => {

      const rationaleField =
        document.getElementById(
          "rationale"
        );

      const compRationale =
        document.getElementById(
          "comp-rationale"
        );


      // Copy PBP rationale to Comp view

      if (
        rationaleField &&
        compRationale
      ) {

        compRationale.textContent =
          rationaleField.value;

      }


      alert(
        "Request submitted successfully. The Compensation Team has been notified."
      );


      // Automatically switch to Comp view
      // for demonstration purposes.

      const compNavButton =
        document.querySelector(
          '[data-view="comp"]'
        );

      if (compNavButton) {
        compNavButton.click();
      }

    }
  );

}


// ------------------------------------------------------------
// COPY INITIAL RATIONALE TO COMP VIEW
// ------------------------------------------------------------

const rationaleField =
  document.getElementById(
    "rationale"
  );

const compRationale =
  document.getElementById(
    "comp-rationale"
  );

if (
  rationaleField &&
  compRationale
) {

  compRationale.textContent =
    rationaleField.value;

}


// ------------------------------------------------------------
// SAVE COMPENSATION EVALUATION DRAFT
// ------------------------------------------------------------

const saveEvaluationButton =
  document.getElementById(
    "save-eval-btn"
  );

if (saveEvaluationButton) {

  saveEvaluationButton.addEventListener(
    "click",
    () => {

      alert(
        "Compensation evaluation draft saved."
      );

    }
  );

}


// ------------------------------------------------------------
// SUBMIT COMPENSATION DECISION
// ------------------------------------------------------------

const submitDecisionButton =
  document.getElementById(
    "submit-decision-btn"
  );

if (submitDecisionButton) {

  submitDecisionButton.addEventListener(
    "click",
    () => {

      const selectedDecision =
        document.querySelector(
          'input[name="decision"]:checked'
        );

      const recommendedLevel =
        document.getElementById(
          "recommended-level"
        );

      const notesField =
        document.getElementById(
          "evaluation-notes"
        );

      const shareWithPbp =
        document.getElementById(
          "share-with-pbp"
        );

      const notification =
        document.getElementById(
          "notification"
        );


      // Require evaluation notes

      if (
        !notesField ||
        !notesField.value.trim()
      ) {

        alert(
          "Please enter evaluation notes before submitting the decision."
        );

        return;

      }


      const decision =
        selectedDecision
          ? selectedDecision.value
          : "No decision selected";

      const level =
        recommendedLevel
          ? recommendedLevel.value
          : "";


      // Show confirmation message

      if (notification) {

        notification.classList.remove(
          "hidden"
        );

        notification.textContent =
          "Decision submitted. The PBP has been notified.";

      }


      // Prototype notification

      if (
        shareWithPbp &&
        shareWithPbp.checked
      ) {

        alert(
          `Decision submitted and PBP notified.\n\nDecision: ${decision}\nRecommended Level: ${level}`
        );

      } else {

        alert(
          "Decision submitted. Evaluation summary was not shared with the PBP."
        );

      }

    }
  );

}


// ------------------------------------------------------------
// DEMO INFORMATION
// ------------------------------------------------------------
//
// DATA SOURCES REPRESENTED IN THIS PROTOTYPE:
//
// WORKDAY
// - Employee name
// - Employee ID
// - Location
// - Current job title
// - Current level
// - Job family
// - Current manager
// - Manager title
//
// AWARE
// - Current organization chart
// - Reporting relationships
// - Proposed organization chart preview
//
// TALENT REVIEW
// - Overall talent rating
// - Promotion readiness
// - Key strengths
// - Development areas
//
// IMPORTANT:
// Talent Review information appears ONLY in the PBP view.
// It is intentionally excluded from the Compensation Team view.
//
// This prototype does not connect to real Autodesk systems.
// All employee and organization information is dummy data.
// ------------------------------------------------------------
