import { submitLogin } from "../api/login.js"
import { renderLoginPage } from "../components/auth.js"
import { renderProfilePage } from "../components/profile.js"
import { writeErrorMessage } from "../utils/error.js"

export const handleLogin = () => {
    renderLoginPage()
    const form = document.getElementById("login-form")
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const credentials = {
            username: form?.username.value,
            password: form?.password.value,
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

export const handleLogout = () => {
    document.getElementById('logout-button')?.addEventListener('click', () => {
        localStorage.removeItem('JWT')
        document.body.innerHTML = ``
        handleLogin()
    })
}
