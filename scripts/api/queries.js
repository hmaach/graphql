export const GET_USER_INFO = `
{
  user {
    login
    auditsAssigned
    firstName
    lastName
  }
}`

export const GET_TRANSACTIONS = `
query GetTransactions($name: String!) {
  transaction(
    where: {
      _and: [
        { type: { _eq: "xp" } }, 
        { event: { object: { name: { _eq: $name } } } },
        { object: { object_type: { type: { _eq: "project" } } } }
      ]
    },
    order_by: {createdAt: asc}
  ) {
    userLogin
    amount
    object {
      name
    }
    createdAt
  }
}`
