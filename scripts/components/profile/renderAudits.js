import { fetchGraphQL } from "../../api/graphqlRequests.js";
import { GET_AUDITS_INFO } from "../../api/graphql.js";

export const renderAuditsInfo = async () => {
    // Fetch audits info
    const token = localStorage.getItem("JWT");
    let data

    await fetchGraphQL(GET_AUDITS_INFO, {}, token)
        .then((response) => {
            if (Array.isArray(response.errors)) {
                throw response.errors[0].message;
            }

            data = response?.data.user[0];
            if (!response && typeof data !== 'object') {
                throw new Error("Invalid data received!");
            }
        })
        .catch((error) => {
            if (typeof error === "string" && error.includes('JWTExpired')) handleLogout();
            console.error(error);
        });


    const succeeded = data.audits_aggregate.aggregate.count
    const failed = data.failed_audits.aggregate.count
    const total = succeeded + failed

    const succeededPercentage = (succeeded / total) * 100
    const failedPercentage = (failed / total) * 100

    // Render audit info
    const container = document.getElementById("audits-info");

    container.innerHTML = /*html*/ `
    <div class="chart-border"></div>
    <h2 class="audits-title">Your Audit Statistics</h2>
    <div class="audits-grid">
        <div class="audit-card">
            <span class="audit-number">${(data.auditRatio).toFixed(1)}</span>
            <span class="audit-label">Audit Ratio</span>
        </div>
        <div class="audit-card">
            <span class="audit-number">${total}</span>
            <span class="audit-label">Total Audits</span>
        </div>
        <div class="audit-card">
            <span class="audit-number" style="color:green;">${(succeededPercentage).toFixed(1)} %</span>
            <span class="audit-label">Success Rate</span>
        </div>
        <div class="audit-card">
            <span class="audit-number" style="color:red;">${(failedPercentage).toFixed(1)} %</span>
            <span class="audit-label">Fail Rate</span>
        </div>
    </div>
`;
}