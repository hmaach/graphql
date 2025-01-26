import { handleLogout } from "../app/handleAuth.js";
import { renderTransactionsChart } from "./graphs/transactionsChart.js";

export const renderProfilePage = (user) => {
    document.body.innerHTML = ``;

    // Create container
    const container = document.createElement('div');
    container.className = "main-container";
    container.innerHTML = /*html*/ `
    <div class="profile">
        <div class="profile-header">
            <h1>Welcome, ${user.firstName + " " + user.lastName}!</h1>
            <button id="logout-button" class="btn">
                Logout <i class="fa-solid fa-right-from-bracket"></i>
            </button>
        </div>
        <div class="profile-container">
            <div id="transaction-info"></div>
            <div id="transactions-chart">
            </div>
        </div>
    </div>`;
    document.body.appendChild(container);
    document.getElementById('logout-button')?.addEventListener('click', handleLogout);

    renderTransactionsChart()
};
