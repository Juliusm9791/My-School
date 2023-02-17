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
    $gradeId: [ID]
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
      gradeId: $gradeId
    ) {
      _id
      title
      description
      isEvent
      departmentId {
        _id
      }
      gradeId {
        _id
      }
    }
  }
`;

export const ADD_NOTIFICATION = gql`
  mutation Mutation(
    $receiver: ID!
    $type: String!
    $referPost: ID!
  ) {
    addNotification(
      receiver: $receiver
      type: $type
      referPost: $referPost
    ) {
      _id
      createdAt
    }
  }
`;
export const UPDATE_POST = gql`
  mutation updatePost(
    $postId: ID!
    $title: String
    $description: String
    $isVisible: Boolean
    $isEvent: Boolean
    $eventDate: String
    $eventEndDate: String
    $eventLocation: String
    $departmentId: ID
    $gradeId: [ID]
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
      gradeId: $gradeId
    ) {
      title
      description
      isEvent
      departmentId {
        _id
      }
      gradeId {
        _id
      }
    }
  }
`;

export const UPDATE_NOTIFICATION = gql`
  mutation UpdateNotification($id: ID!, $isRead: Boolean) {
    updateNotification(_id: $id, isRead: $isRead) {
      _id
      isRead
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

export const DELETE_NOTIFICATION = gql`
  mutation Mutation($id: ID!) {
    deleteNotification(_id: $id) {
      _id
    }
  }
`;

export const UPDATE_ME = gql`
  mutation UpdateMe(
    $firstName: String!
    $lastName: String!
    $avatar: String
    $email: String
    $password: String
    $aboutMe: String
    $address: String
    $phoneNumber: String
    $gradeId: [ID]
    $departmentId: [ID]
    $groupId: [ID]
  ) {
    updateMe(
      firstName: $firstName
      lastName: $lastName
      avatar: $avatar
      email: $email
      password: $password
      aboutMe: $aboutMe
      address: $address
      phoneNumber: $phoneNumber
      gradeId: $gradeId
      departmentId: $departmentId
      groupId: $groupId
    ) {
      _id
    }
  }
`;
export const UPDATE_AVATAR = gql`
  mutation UpdateMe($avatar: String!) {
    updateMe(avatar: $avatar) {
      _id
    }
  }
`;

export const UPDATE_PHOTOS = gql`
  mutation UpdatePhotos($id: ID!, $pictures: [pictureInput]!) {
    updatePhotos(_id: $id, pictures: $pictures) {
      _id
      pictures {
        order
        location
      }
    }
  }
`;

export const DELETE_PHOTOS = gql`
  mutation DeletePhotos($id: ID!, $pictureId: Int!) {
    deletePhotos(_id: $id, pictureId: $pictureId) {
      _id
      pictures {
        order
        location
      }
    }
  }
`;

export const ADD_REACTION_LIKE = gql`
  mutation addReaction($postId: ID!) {
    addReactionLike(postId: $postId) {
      like
      _id
    }
  }
`;
