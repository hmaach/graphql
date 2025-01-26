import { handleLogin } from "./app/handleAuth.js"
import { handleProfile } from "./app/handleProfile.js"

document.addEventListener('DOMContentLoaded', () => {
    const jwt = localStorage.getItem('JWT')
    if (jwt) {
        handleProfile()
    } else {
        handleLogin()
    }
})