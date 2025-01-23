import { writeErrorMessage } from "../utils/error.js";

export const renderLoginPage = () => {
    const container = document.createElement('div');
    container.innerHTML = /*html*/`
    <div class="login-container">
        <div class="login-card">
            <h1>Login</h1>
            <input type="text" id="username" placeholder="username or email" required/>
            <input type="password" id="password" placeholder="password" required/>
            <span class="error" id="login-error"></span>
            <button id="login-button" class="btn">Login <i class="fa-solid fa-right-to-bracket"></i></button>
        </div>
    </div>`

    document.body.appendChild(container);

    // empty the error message
    document.getElementById('username')?.addEventListener("focus", () => {
        writeErrorMessage("login-error","")
    })
    document.getElementById('password')?.addEventListener("focus", () => {
        writeErrorMessage("login-error","")
    })
}
