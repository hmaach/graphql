export const writeErrorMessage = (elementID, message) => {
    const errorElement = document.getElementById(elementID);
    if (errorElement) {
        errorElement.textContent = message
    }
}