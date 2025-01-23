
export const renderProfilePage = () => {
    // Clear previous content
    document.body.innerHTML = ``

    const container = document.createElement('main-container');
    container.innerHTML = /*html*/`
    <div class="login-container">
        <div class="profile">
            <div class="profile-header">
                <h1>Welcome, Hamza Maach!</h1>
                <button id="logout-button" class="btn">Logout <i class="fa-solid fa-right-from-bracket"></i></button>
            </div>
            <div class="profile-container">
            </div
        </div
    </div>`

    document.body.appendChild(container);
}
