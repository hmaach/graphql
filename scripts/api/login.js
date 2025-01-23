import { AUTH_URL } from "../config.js"

export const submitLogin = async (credentials) => {
    const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${btoa(credentials.username + ":" + credentials.password)}`
        }
    });
    return response.json();
}