import { gql } from 'apollo-angular';

export const QUERY_ME = gql`
query user {
  me {
    _id
    firstName
    middleName
    lastName
    email
  }
}
`;
