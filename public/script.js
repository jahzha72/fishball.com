/**
 * DOM ELEMENTS (Requirement 15)
 */
const loginBtn = document.getElementById('loginBtn');
const searchBtn = document.getElementById('searchBtn');
const idInput = document.getElementById('idSearch');
const loader = document.getElementById('loader');
const errorContainer = document.getElementById('errorContainer');
const resultsContainer = document.getElementById('resultsContainer');

/**
 * UTILITY FUNCTIONS (Requirement 14)
 * Handles UI states to prevent code duplication.
 */
function toggleLoading(show) {
    loader.classList.toggle('hidden', !show);
    loginBtn.disabled = show;
    searchBtn.disabled = show;
    if (show) loginBtn.style.opacity = "0.7";
    else loginBtn.style.opacity = "1";
}

function showError(message) {
    errorContainer.innerText = message;
    errorContainer.classList.remove('hidden');
    resultsContainer.innerHTML = "";
    // Auto-hide error after 5 seconds
    setTimeout(() => errorContainer.classList.add('hidden'), 5000);
}

/**
 * CORE API FUNCTIONS (Requirement 6 & 14)
 */

// Function Explanation: Redirects user to the secure OAuth route on the server.
function handleLogin() {
    toggleLoading(true);
    window.location.href = `${CONFIG.BASE_URL}/auth/facebook`;
}

// Function Explanation: Fetches public data via local API using Fetch/Async/Await.
async function handleSearch() {
    // Requirement 9: Input Validation (Whitespace trimming)
    const id = idInput.value.trim();

    // Requirement 9: Check empty fields
    if (!id) {
        showError("Validation Error: Please enter an ID or Username.");
        return;
    }

    // Requirement 9: Check for invalid characters (Security check)
    const regex = /^[a-zA-Z0-9.]+$/;
    if (!regex.test(id)) {
        showError("Invalid Input: Symbols and spaces are not allowed.");
        return;
    }

    // Requirement 10: Show Loading State
    toggleLoading(true);
    resultsContainer.innerHTML = ""; 

    try {
        // Requirement 6: Using fetch() with async/await
        const response = await fetch(`${CONFIG.BASE_URL}/api/search/${id}`);
        
        if (!response.ok) {
            // Requirement 8: Failed API call handling
            throw new Error("User not found or ID is private.");
        }

        const data = await response.json();

        // Requirement 7: Display in HTML using DOM Manipulation
        // Replace the innerHTML part in handleSearch
        resultsContainer.innerHTML = `
            <div class="profile-card">
    <div class="cover"></div>
    <img src="${data.picture.data.url}" class="avatar">
    <div class="card-content">
        <span class="badge">Verified Profile</span>
        <h2>${data.name}</h2>
        
        <div class="info-row">
            <div class="info-item">
                <strong>Platform</strong>
                Facebook
            </div>
            <div class="info-item">
                <strong>User ID</strong>
                ${data.id}
            </div>
        </div>
        
        <a href="/" class="footer-btn">Return to Search</a>
    </div>
</div>
        `;
    } catch (err) {
        // Requirement 8: Error handling for failed requests
        showError(err.message);
    } finally {
        toggleLoading(false);
    }
}

/**
 * EVENT LISTENERS
 */
loginBtn.addEventListener('click', handleLogin);
searchBtn.addEventListener('click', handleSearch);

// Allow pressing "Enter" to search
idInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});