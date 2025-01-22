export const renderLoginPage = () => {
    const container = document.createElement('div');
    container.innerHTML = /*html*/`
    <div class="login-container">
        <div class="login-card">
            <h1>Login</h1>
            <input type="text" id="username" placeholder="username or email" required/>
            <input type="password" id="password" placeholder="password" required/>
            <button id="login-button">Login</button>
        </div>
    </div>`

    document.body.appendChild(container);
}