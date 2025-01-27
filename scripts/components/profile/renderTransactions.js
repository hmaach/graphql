import { fetchGraphQL } from "../../api/graphqlRequests.js";
import { GET_LAST_TRANSACTIONS } from "../../api/graphql.js";

export const renderLastTransComponent = async () => {
    // Fetch audits info
    const token = localStorage.getItem("JWT");
    let data

    await fetchGraphQL(GET_LAST_TRANSACTIONS, {}, token)
        .then((response) => {
            if (Array.isArray(response.errors)) {
                throw response.errors[0].message;
            }

            if (response && Array.isArray(response.data.user[0].transactions)) {
                data = response.data.user[0].transactions
            } else {
                throw new Error("Invalid data received!");
            }
        })
        .catch((error) => {
            if (typeof error === "string" && error.includes('JWTExpired')) handleLogout();
            console.error(error);
        });


    // Render audit info
    const container = document.getElementById("last-transactions-info");

    container.innerHTML = /*html*/ `
    <div class="chart-border"></div>
    <h2 class="level-title">Last three transactions</h2>
    <div class="last-transactions-info-container">
        ${data.map(transaction => /*html*/`
            <div class="transaction-item">
                <span class="name">${transaction.object.name}</span>
                <span class="amount">${transaction.amount/1000} KB</span>
                <span class="date">${new Date(transaction.createdAt).toLocaleDateString()}</span>
            </div>
        `).join('')}
    </div>
`;
}