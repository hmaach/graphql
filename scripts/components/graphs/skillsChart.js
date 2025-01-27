import { fetchGraphQL } from "../../api/graphqlRequests.js";
import { GET_SKILLS } from "../../api/graphql.js";
import { createSvgElement, drawAxes, drawGridlines, getMaxAmountPerSkill } from "../../utils/svg.js";

export const renderSkillsChart = async () => {
    const token = localStorage.getItem("JWT");
    let skillsMap = [];

    await fetchGraphQL(GET_SKILLS, {}, token)
        .then((response) => {
            if (Array.isArray(response.errors)) {
                throw response.errors[0].message;
            }
            const transactions = response?.data.user[0].transactions;
            if (response && Array.isArray(transactions)) {
                skillsMap = Array.from(getMaxAmountPerSkill(transactions).entries());
            } else {
                throw new Error("Invalid data received!");
            }
        })
        .catch((error) => {
            if (typeof error === "string" && error.includes('JWTExpired')) handleLogout();
            console.error(error);
        });

    const container = document.getElementById("skills-chart");
    container.innerHTML = /*html*/ `
        <div class="chart-border"></div>
        <div class="skills-chart-info">
            <h2 class="label">Your skills</h2>
        </div>
    `;

    const width = Math.min(900, container.clientWidth);
    const height = width * 0.6;
    const padding = 50;
    const barWidth = (width - 2 * padding) / skillsMap.length;

    const axisColor = getComputedStyle(document.documentElement).getPropertyValue("--text-color");
    const barColor = getComputedStyle(document.documentElement).getPropertyValue("--primary-color");


    const svg = createSvgElement("svg", {
        width,
        height,
        viewBox: `0 0 ${width} ${height}`,
    });

    const maxAmount = 100;
    const minAmount = 0;

    // Draw axes and gridlines
    drawAxes(svg, width, height, padding, axisColor);
    drawGridlines(svg, width, height, padding, axisColor, maxAmount, minAmount, 10, "%");

    // Draw bars for each skill
    skillsMap.forEach(([skill, amount], index) => {
        const barHeight = ((amount - minAmount) / (maxAmount - minAmount)) * (height - 2 * padding);
        const x = padding + index * barWidth;
        const y = height - padding - barHeight;

        // Create bar
        const bar = createSvgElement("rect", {
            x,
            y,
            width: barWidth * 0.8, // Add spacing between bars
            height: barHeight,
            fill: barColor,
        });
        svg.appendChild(bar);

        // Add skill labels
        const label = createSvgElement("text", {
            x: x + barWidth * 0.4,
            y: height - padding + 15,
            "text-anchor": "middle",
            "font-size": "10",
            fill: axisColor,
        });
        label.textContent = skill.replace("skill_", "");
        svg.appendChild(label);

        // Add value labels
        const valueLabel = createSvgElement("text", {
            x: x + barWidth * 0.4,
            y: y - 5,
            "text-anchor": "middle",
            "font-size": "13",
            fill: axisColor,
        });
        valueLabel.textContent = amount +" %";
        svg.appendChild(valueLabel);
    });

    container.appendChild(svg);
};
