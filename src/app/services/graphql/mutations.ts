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
    $isVisible: Boolean!
    $isEvent: Boolean!
    $eventDate: String
    $eventEndDate: String
    $eventLocation: String
    $departmentId: ID
  ) {
    addPost(
      title: $title
      description: $description
      isVisible: $isVisible
      isEvent: $isEvent
      eventDate: $eventDate
      eventEndDate: $eventEndDate
      eventLocation: $eventLocation
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
export const UPDATE_POST = gql`
  mutation updatePost(
    $postId: ID!
    $title: String!
    $description: String
    $isVisible: Boolean!
    $isEvent: Boolean!
    $eventDate: String
    $eventEndDate: String
    $eventLocation: String
    $departmentId: ID
  ) {
    updatePost(
      _id: $postId
      title: $title
      description: $description
      isVisible: $isVisible
      isEvent: $isEvent
      eventDate: $eventDate
      eventEndDate: $eventEndDate
      eventLocation: $eventLocation
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

export const ADD_COMMENT = gql`
  mutation addComment($comment: String!, $postId: ID!) {
    addComment(comment: $comment, postId: $postId) {
      title
      description
      commentId {
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
