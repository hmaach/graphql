import { submitLogin } from "../api/authRequests.js"
import { renderLoginPage } from "../components/authComponent.js"
import { writeErrorMessage } from "../utils/error.js"
import { handleProfile } from "./handleProfile.js"

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
            handleProfile()
        } catch (error) {
            writeErrorMessage("login-error", error)
        }
    })
}

export const handleLogout = () => {
    localStorage.removeItem('JWT')
    document.body.innerHTML = ``
    handleLogin()
}
