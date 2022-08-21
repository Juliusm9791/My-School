import { gql } from 'apollo-angular';

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      firstName
      middleName
      lastName
      email
    }
  }
}
`;

export const SIGNUP = gql`
mutation addUser(
  $firstName: String!
  $middleName:String
  $lastName: String!
  $email: String!
  $password: String!
) {
  addUser(
    firstName: $firstName
    middleName: $middleName
    lastName: $lastName
    email: $email
    password: $password
  ) {
    user {
      _id
      firstName
      middleName
      lastName
      email
    }
    token
  }
}
`;