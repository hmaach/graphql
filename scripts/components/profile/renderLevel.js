import { fetchGraphQL } from "../../api/graphqlRequests.js";
import { GET_LEVEL_INFO } from "../../api/graphql.js";

export const renderLevelComponenet = async () => {
    // Fetch audits info
    const token = localStorage.getItem("JWT");
    let data

    await fetchGraphQL(GET_LEVEL_INFO, {}, token)
        .then((response) => {
            if (Array.isArray(response.errors)) {
                throw response.errors[0].message;
            }

            if (response && Array.isArray(response.data.transaction)) {
                data = response.data.transaction[0].amount
            } else {
                throw new Error("Invalid data received!");
            }
        })
        .catch((error) => {
            if (typeof error === "string" && error.includes('JWTExpired')) handleLogout();
            console.error(error);
        });


    // Render audit info
    const container = document.getElementById("level-info");

    container.innerHTML = /*html*/ `
        <div class="chart-border"></div>
        <h2 class="level-title">Your current Level</h2>
        <div class="level-info-container">
            <span>${data}</span>
        </div>

`;
}