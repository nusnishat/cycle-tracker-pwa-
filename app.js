// app.js

// Function to render content based on the page
function renderPage(page) {
    const content = document.getElementById("content");
  
    switch (page) {
      case 'home':
        content.innerHTML = `
          <h1>Welcome to the Period Tracker</h1>
          <form id="new-period">
            <fieldset>
              <legend>Enter your period start and end date</legend>
              <p>
                <label for="start-date">Start date</label>
                <input type="date" id="start-date" required />
              </p>
              <p>
                <label for="end-date">End date</label>
                <input type="date" id="end-date" required />
              </p>
            </fieldset>
            <p>
              <button type="submit">Add Period</button>
            </p>
          </form>
        `;
        break;
  
      case 'history':
        content.innerHTML = `
          <h1>Your Period History</h1>
          <div id="past-periods"></div>
        `;
        renderPastPeriods(); // Render past periods if available
        break;
  
      case 'settings':
        content.innerHTML = `
          <h1>Settings</h1>
          <p>Adjust your preferences here.</p>
        `;
        break;
  
      default:
        content.innerHTML = `<h1>404 Page Not Found</h1>`;
    }
  }
  
  // Listen for hash changes
  window.addEventListener('hashchange', () => {
    const page = window.location.hash.substring(1) || 'home'; // Default to home page
    renderPage(page);
  });
  
  // Initial page load
  window.addEventListener('load', () => {
    const page = window.location.hash.substring(1) || 'home'; // Default to home page
    renderPage(page);
  });
  
  // Render past periods from localStorage
  function renderPastPeriods() {
    const pastPeriodContainer = document.getElementById('past-periods');
    const periods = getAllStoredPeriods();
  
    if (periods.length === 0) {
      pastPeriodContainer.innerHTML = '<p>No periods recorded.</p>';
      return;
    }
  
    const pastPeriodList = document.createElement("ul");
    periods.forEach((period) => {
      const periodEl = document.createElement("li");
      periodEl.textContent = `From ${formatDate(period.startDate)} to ${formatDate(period.endDate)}`;
      pastPeriodList.appendChild(periodEl);
    });
  
    pastPeriodContainer.appendChild(pastPeriodList);
  }
  
  // Function to format dates for display
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { timeZone: "UTC" });
  }
  
  // Store new period in localStorage
  function storeNewPeriod(startDate, endDate) {
    const periods = getAllStoredPeriods();
    periods.push({ startDate, endDate });
    periods.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    window.localStorage.setItem("period-tracker", JSON.stringify(periods));
  }
  
  // Get all stored periods from localStorage
  function getAllStoredPeriods() {
    const data = window.localStorage.getItem("period-tracker");
    return data ? JSON.parse(data) : [];
  }
  
  // Handle form submission for adding periods
  document.getElementById('new-period')?.addEventListener("submit", (event) => {
    event.preventDefault();
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;
    if (!startDate || !endDate || startDate > endDate) {
      alert('Please enter valid dates.');
      return;
    }
    storeNewPeriod(startDate, endDate);
    renderPastPeriods();
  });
  