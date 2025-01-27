import { fetchGraphQL } from "../api/graphqlRequests.js"
import { GET_USER_INFO } from "../api/graphql.js"
import { renderProfilePage } from "../components/profileComponent.js"
import { handleLogout } from "./handleAuth.js"

export const handleProfile = async () => {
    const token = localStorage.getItem('JWT')

    fetchGraphQL(GET_USER_INFO, {}, token)
        .then((response) => {
            if (Array.isArray(response.errors)) {
                throw response.errors[0].message
            }
            const user = response?.data.user;
            if (response && Array.isArray(user)) {
                renderProfilePage(user[0])
            } else {
                throw new Error("Invalid data received!");
            }
        })
        .catch((error) => {
            if (typeof error === "string" && error.includes('JWTExpired')) handleLogout()
            console.error(error);
        });
}