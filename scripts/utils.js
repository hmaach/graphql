export const formatDate = (date) => {
    if (!date) return ""
    date = new Date(date)
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

export const createSvgElement = (name, attributes) => {
    const svgNS = "http://www.w3.org/2000/svg";
    const element = document.createElementNS(svgNS, name);
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
    return element;
};
