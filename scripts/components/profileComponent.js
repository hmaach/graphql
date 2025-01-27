import { handleLogout } from "../app/handleAuth.js";
import { renderAuditsInfo } from "./profile/renderAudits.js";
import { renderSkillsChart } from "./graphs/skillsChart.js";
import { renderTransactionsChart } from "./graphs/transactionsChart.js";
import { renderLastTransComponent } from "./profile/renderTransactions.js";
import { renderLevelComponenet } from "./profile/renderLevel.js";

export const renderProfilePage = (user) => {
    document.body.innerHTML = ``;

    // Create container
    const container = document.createElement('div');
    container.className = "main-container";
    container.innerHTML = /*html*/ `
    <div class="profile">
        <div class="profile-header">
            <div class="user-greeting">
                <h1>Welcome back, <span class="user-name">${user.firstName} ${user.lastName}</span>!</h1>
                <p>Here’s your dashboard overview.</p>
            </div>
            <button id="logout-button" class="btn logout-btn">
                <i class="fa-solid fa-right-from-bracket"></i> Logout
            </button>
        </div>
        <div class="profile-container">
            <div id="audits-info"></div>
            <div class="level">
                <div id="level-info"></div>
                <div id="last-transactions-info"></div>
            </div>
            <div id="transaction-info"></div>
            <div id="transactions-chart"></div>
            <div id="skills-chart"></div>
        </div>
    </div>`;

    document.body.appendChild(container);
    document.getElementById('logout-button')?.addEventListener('click', handleLogout);

    renderAuditsInfo()
    renderLevelComponenet()
    renderLastTransComponent()
    renderSkillsChart()
    renderTransactionsChart()
};
