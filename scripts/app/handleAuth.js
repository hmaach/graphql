import { submitLogin } from "../api/login.js"
import { renderLoginPage } from "../components/auth.js"
import { renderProfilePage } from "../components/profile.js"
import { writeErrorMessage } from "../utils/error.js"

export const handleLogin = () => {
    renderLoginPage()
    const btn = document.getElementById("login-button")
    btn.addEventListener('click', async () => {
        const credentials = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
        }
        try {
            const response = await submitLogin(credentials)
            if (response.error) {
                throw response.error
            }
            localStorage.setItem('JWT', response)
            renderProfilePage()
        } catch (error) {
            writeErrorMessage("login-error", error)
        }
    })
}
