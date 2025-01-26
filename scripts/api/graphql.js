import { GRAPHQL_URL } from "../config.js";

export const fetchGraphQL = async (query, variables, token) => {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            query: query,
            variables: variables,
        }),
    });

    return response.json();
};

