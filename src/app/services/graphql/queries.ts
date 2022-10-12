import { gql } from 'apollo-angular';

const postBody = `
{
  _id
  isEvent
  eventDate
  title
  description
  createdAt
  reactionId {
    _id
    like
    userId {
      _id
      firstName
      lastName
    }
  }
  commentId {
    _id
    comment
    userId {
      _id
      firstName
      lastName
    }
    createdAt
  }
  userId {
<<<<<<< Updated upstream
    _id
=======
>>>>>>> Stashed changes
    firstName
    lastName
  }
}
}
`;

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

export const QUERY_FACULTIES = gql`
  query faculties {
    faculties {
      _id
      groupName
    }
  }
`;

export const QUERY_DEPARTMENTS = gql`
  query departments {
    departments {
      _id
      depName
    }
  }
`;
export const QUERY_POSTS = gql`
  query posts {
    posts ${postBody}
`;
export const QUERY_POST = gql`
  query post($_id: ID!) {
    post(_id: $_id) ${postBody}
`;

export const QUERY_USER_POSTS = gql`
  query userPosts {
    userPosts ${postBody}
`;