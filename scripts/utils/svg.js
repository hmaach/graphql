export const createSvgElement = (name, attributes) => {
    const svgNS = "http://www.w3.org/2000/svg";
    const element = document.createElementNS(svgNS, name);
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
    return element;
}

export const drawAxes = (svg, width, height, padding, axisColor) => {
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

export const drawGridlines = (svg, width, height, padding, axisColor, maxAmount, minAmount, numYLines, unit) => {
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
        const amount = minAmount + (maxAmount - minAmount) * (1 - i / numYLines);
        const labelAmount = amount > 100 ? Math.round(amount / 1000) : Math.round(amount)
        amountLabel.textContent = `${labelAmount} ${unit}`;
        svg.appendChild(amountLabel);
    }
};


export const getMaxAmountPerSkill = (transactions) => {
    const maxSkillMap = new Map();

    transactions.forEach((transaction) => {
        const { type, amount } = transaction;

        if (!maxSkillMap.has(type) || maxSkillMap.get(type) < amount) {
            maxSkillMap.set(type, amount); 
        }
    });

    return maxSkillMap;
}