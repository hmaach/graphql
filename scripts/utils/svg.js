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
    const chartHeight = height - 2 * padding;
    const step = chartHeight / numYLines;

    for (let i = 0; i <= numYLines; i++) {
        const y = padding + i * step;
        const amount = maxAmount - ((maxAmount - minAmount) * i) / numYLines;

        svg.appendChild(
            createSvgElement("line", {
                x1: padding,
                y1: y,
                x2: width - padding,
                y2: y,
                stroke: axisColor,
                "stroke-width": "1",
                "stroke-dasharray": "1,5",
                "stroke-opacity": "0.4",
            })
        );

        const label = createSvgElement("text", {
            x: padding - 10,
            y: y,
            "text-anchor": "end",
            fill: axisColor,
            "font-size": "10",
        });

        label.textContent = `${Math.round(amount > 100 ? amount / 1000 : amount)} ${unit}`;
        svg.appendChild(label);
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