export const GET_USER_INFO = /*gql*/`
{
  user {
    login
    auditsAssigned
    firstName
    lastName
  }
}`

export const GET_TRANSACTIONS = /*gql*/`
query GetTransactions($name: String!) {
  event(where: {object: {name: {_eq: $name}}}){
    object{
      events{
            startAt
            endAt
            }
        }
    }
  transaction(
    where: {
      _and: [
        { type: { _eq: "xp" } }, 
        { event: { object: { name: { _eq: $name } } } },
      ]
    },
    order_by: {createdAt: asc}
  ) {
    amount
    object {
      name
    }
    createdAt
  }
}`
