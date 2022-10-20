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
    $middleName: String
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

export const ADD_POST = gql`
  mutation addPost(
    $title: String!
    $description: String
    $isEvent: Boolean
    $departmentId: ID
  ) {
    addPost(
      title: $title
      description: $description
      isEvent: $isEvent
      departmentId: $departmentId
    ) {
      title
      description
      isEvent
      departmentId {
        _id
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($_id: ID!) {
    deletePost(_id: $_id) {
      _id
    }
  }
`;
