(() => {
  "use strict";

  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const DEFAULT_INCOME = 10;
  const DEFAULT_EXPENSE = 15;

  // ── Build the input rows ──────────────────────────────────────────────────
  function buildRows() {
    const tbody = document.getElementById("inputBody");
    MONTHS.forEach((month, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="fw-semibold">${month}</td>
        <td>
          <div>
            <input
              type="number"
              id="income-${i}"
              class="form-control"
              min="0"
              step="0.01"
              value="${DEFAULT_INCOME}"
              aria-label="${month} income"
            />
            <div class="invalid-feedback">Value cannot be negative.</div>
          </div>
        </td>
        <td>
          <div>
            <input
              type="number"
              id="expense-${i}"
              class="form-control"
              min="0"
              step="0.01"
              value="${DEFAULT_EXPENSE}"
              aria-label="${month} expense"
            />
            <div class="invalid-feedback">Value cannot be negative.</div>
          </div>
        </td>`;
      tbody.appendChild(row);
    });
  }

  // ── Validation ────────────────────────────────────────────────────────────
  function attachValidation() {
    const inputs = document.querySelectorAll('#inputBody input[type="number"]');
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        const val = parseFloat(input.value);
        if (input.value !== "" && val < 0) {
          input.value = 0;
          input.classList.add("is-invalid");
        } else {
          input.classList.remove("is-invalid");
        }
      });

      // Also catch manual blur (spin-button edge case)
      input.addEventListener("blur", () => {
        if (input.value === "" || parseFloat(input.value) < 0) {
          input.value = 0;
          input.classList.add("is-invalid");
        }
      });
    });
  }

  // ── Read current values from the DOM ─────────────────────────────────────
  function readValues() {
    const income = [];
    const expense = [];
    MONTHS.forEach((_, i) => {
      income.push(
        Math.max(
          0,
          parseFloat(document.getElementById(`income-${i}`).value) || 0,
        ),
      );
      expense.push(
        Math.max(
          0,
          parseFloat(document.getElementById(`expense-${i}`).value) || 0,
        ),
      );
    });
    return { income, expense };
  }

  // ── Chart.js bar chart ────────────────────────────────────────────────────
  let chart = null;

  function buildChart() {
    const ctx = document.getElementById("barChart").getContext("2d");
    const { income, expense } = readValues();

    chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: MONTHS.map((m) => m.slice(0, 3)), // Jan, Feb, …
        datasets: [
          {
            label: "Income",
            data: income,
            backgroundColor: "rgba(25, 135, 84, 0.75)",
            borderColor: "rgba(25, 135, 84, 1)",
            borderWidth: 1,
            borderRadius: 4,
          },
          {
            label: "Expense",
            data: expense,
            backgroundColor: "rgba(220, 53, 69, 0.75)",
            borderColor: "rgba(220, 53, 69, 1)",
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "top" },
          title: {
            display: true,
            text: "Monthly Income vs Expense",
            font: { size: 16, weight: "bold" },
            padding: { bottom: 16 },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` $${ctx.parsed.y.toFixed(2)}`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (val) => `$${val}`,
            },
            grid: { color: "rgba(0,0,0,0.06)" },
          },
          x: {
            grid: { display: false },
          },
        },
      },
    });
  }

  function refreshChart() {
    if (!chart) return;
    const { income, expense } = readValues();
    chart.data.datasets[0].data = income;
    chart.data.datasets[1].data = expense;
    chart.update();
  }

  // ── Tab switching — refresh chart when Chart tab is shown ─────────────────
  function attachTabListener() {
    const chartTabBtn = document.getElementById("chart-tab");
    chartTabBtn.addEventListener("shown.bs.tab", refreshChart);
  }

  // ── Bootstrap ensures Chart.js script is loaded before DOMContentLoaded ───
  document.addEventListener("DOMContentLoaded", () => {
    buildRows();
    attachValidation();
    buildChart();
    attachTabListener();
  });
})();
