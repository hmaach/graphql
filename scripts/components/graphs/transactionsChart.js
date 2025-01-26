import { fetchGraphQL } from "../../api/graphql.js";
import { GET_TRANSACTIONS } from "../../api/queries.js";
import { createSvgElement, formatDate } from "../../utils.js";

export const renderTransactionsChart = async () => {
    const token = localStorage.getItem("JWT");
    const name = "Module";

    const data = await getTransactionsData(name, token);
    if (!data) return;

    const { startAt, endAt, transactions } = data;

    const container = document.getElementById("transactions-chart");
    container.innerHTML = /*html*/`
        <div class="transactions-chart-info">
            <span class="event-name">${name}</span>
            <span class="event-date">${formatDate(startAt)} -> ${formatDate(endAt)}</span>
        </div>
    `;

    const width = Math.min(900, container.clientWidth);
    const height = width * 0.5;
    const padding = 50;

    const axisColor = getComputedStyle(document.documentElement).getPropertyValue("--text-color");
    const lineColor = getComputedStyle(document.documentElement).getPropertyValue("--primary-color");
    const pointColor = lineColor;

    const svg = createSvgElement("svg", {
        width,
        height,
        viewBox: `0 0 ${width} ${height}`,
    });

    const dates = [new Date(startAt), ...transactions.map((t) => new Date(t.createdAt))];
    const maxDate = Math.max(...dates.map((date) => date.getTime()));
    const minDate = Math.min(new Date(startAt).getTime());

    let cumulativeAmount = 0;
    const cumulativeAmounts = [0, ...transactions.map((t) => {
        cumulativeAmount += t.amount;
        return cumulativeAmount;
    })];

    const maxAmount = Math.max(...cumulativeAmounts);
    const minAmount = 0;

    const scales = {
        xScale: (date) => padding + ((date - minDate) / (maxDate - minDate)) * (width - 2 * padding),
        yScale: (amount) => height - padding - ((amount - minAmount) / (maxAmount - minAmount)) * (height - 2 * padding),
    };

    drawAxes(svg, width, height, padding, axisColor);
    drawGridlines(svg, width, height, padding, axisColor, maxAmount, minAmount);
    plotDataPoints(svg, transactions, cumulativeAmounts, scales, { lineColor, pointColor }, startAt, height, padding);

    container.appendChild(svg);
};


const getTransactionsData = async (name, token) => {
    try {
        const response = await fetchGraphQL(GET_TRANSACTIONS, { name }, token);
        const event = response.data.event[0].object.events[0];
        const transactions = Array.isArray(response.data.transaction) ? response.data.transaction : [];
        return {
            startAt: event.startAt,
            endAt: event.endAt,
            transactions,
        };
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return null;
    }
};

const drawAxes = (svg, width, height, padding, axisColor) => {
    const xAxis = createSvgElement("line", {
        x1: padding,
        y1: height - padding,
        x2: width - padding,
        y2: height - padding,
        stroke: axisColor,
        "stroke-width": "1",
    });
    const yAxis = createSvgElement("line", {
        x1: padding,
        y1: padding,
        x2: padding,
        y2: height - padding,
        stroke: axisColor,
        "stroke-width": "1",
    });
    svg.appendChild(xAxis);
    svg.appendChild(yAxis);
};

const drawGridlines = (svg, width, height, padding, axisColor, maxAmount, minAmount, numYLines = 5) => {
    for (let i = 0; i <= numYLines; i++) {
        const y = padding + (i * (height - 2 * padding)) / numYLines;
        const gridLine = createSvgElement("line", {
            x1: padding,
            y1: y,
            x2: width - padding,
            y2: y,
            stroke: axisColor,
            "stroke-width": "1",
            "stroke-dasharray": "1,5",
            "stroke-opacity": "0.1",
        });
        svg.appendChild(gridLine);

        // Add y-axis labels
        const amountLabel = createSvgElement("text", {
            x: padding - 10,
            y: y,
            "text-anchor": "end",
            "alignment-baseline": "middle",
            fill: axisColor,
            "font-size": "10",
        });
        const labelAmount = minAmount + (maxAmount - minAmount) * (1 - i / numYLines);
        amountLabel.textContent = `${Math.round(labelAmount / 1000)} KB`;
        svg.appendChild(amountLabel);
    }
};

const plotDataPoints = (svg, transactions, cumulativeAmounts, scales, colors, startAt, height, padding) => {
    let previousPoint = { x: scales.xScale(new Date(startAt).getTime()), y: height - padding };

    transactions.forEach((transaction, index) => {
        const x = scales.xScale(new Date(transaction.createdAt).getTime());
        const y = scales.yScale(cumulativeAmounts[index + 1]);

        // Draw line from previous point
        const line = createSvgElement("line", {
            x1: previousPoint.x,
            y1: previousPoint.y,
            x2: x,
            y2: y,
            stroke: colors.lineColor,
            "stroke-width": "1",
        });
        svg.appendChild(line);

        // Draw point
        const circle = createSvgElement("circle", {
            cx: x,
            cy: y,
            r: 3,
            fill: colors.pointColor,
        });
        svg.appendChild(circle);

        // Add hover event to show transaction info
        addHoverEvent(circle, transaction, x, y);

        previousPoint = { x, y };
    });
};

const addHoverEvent = (circle, transaction, x, y) => {
    const transactionInfo = document.getElementById("transaction-info");

    circle.addEventListener("mouseover", () => {
        const date = new Date(transaction.createdAt);
        transactionInfo.style.display = "block";
        transactionInfo.style.left = `${x}px`;
        transactionInfo.style.top = `${y}px`;
        transactionInfo.innerHTML = /*html*/`
            <div class="transaction-header">${transaction.object.name}</div>
            <div class="transaction-details">
                <div><strong>Earned XP:</strong> ${transaction.amount / 1000} KB</div>
                <div><strong>Date:</strong> ${date.toDateString()}</div>
            </div>
        `;
    });

    circle.addEventListener("mouseout", () => {
        transactionInfo.style.display = "none";
    });
};

