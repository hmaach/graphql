import { handleLogin } from "./app/handleAuth.js"
import { renderProfilePage } from "./components/profile.js"

document.addEventListener('DOMContentLoaded', () => {
    const jwt = localStorage.getItem('JWT')
    if (jwt) {
        renderProfilePage()
    } else {
        handleLogin()
    }
})