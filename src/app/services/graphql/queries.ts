import { gql } from 'apollo-angular';
//
const postBody = `
{
  _id
  isEvent
  isVisible
  eventDate
  eventEndDate
  eventLocation
  title
  departmentId{
    _id
    depName
  }
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
    _id
    firstName
    lastName
  }
  gradeId {
    _id
    gradeName
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

export const QUERY_GRADES = gql`
  query grades {
    grades {
      _id
      gradeName
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
