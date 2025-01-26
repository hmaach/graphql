import { fetchGraphQL } from "../../api/graphql.js";
import { GET_TRANSACTIONS } from "../../api/queries.js";

export const renderTransactionsGraph = async () => {
    const token = localStorage.getItem('JWT');
    const name = "Module";
    let transactions

    await fetchGraphQL(GET_TRANSACTIONS, { name }, token)
        .then((response) => {
            if (Array.isArray(response.data.transaction)) {
                transactions = response.data.transaction
            }
        })
        .catch((error) => {
            console.error(error);
            return
        });

    console.log(transactions);

}