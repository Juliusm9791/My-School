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
  pictures {
    order
    location
  }
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
      avatar
    }
  }
  commentId {
    _id
    comment
    userId {
      _id
      firstName
      lastName
      avatar
    }
    createdAt
  }
  userId {
    _id
    firstName
    lastName
    avatar
  }
  gradeId {
    _id
    gradeName
  }
}
}
`;

export const QUERY_ME = gql`
  query Query {
    me {
      _id
      aboutMe
      address
      email
      firstName
      lastName
      avatar
      aboutMe
      phoneNumber
      address
      gradeId {
        _id
        gradeName
      }
      departmentId {
        _id
        depName
      }
      groupId {
        _id
        groupName
      }
      password
      phoneNumber
    }
  }
`;

export const QUERY_USERS = gql`
  query Query {
    users {
      _id
      avatar
      aboutMe
      address
      email
      firstName
      lastName
      aboutMe
      phoneNumber
      address
      gradeId {
        _id
        gradeName
      }
      departmentId {
        _id
        depName
      }
      groupId {
        _id
        groupName
      }

      phoneNumber
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

export const QUERY_USER = gql`
  query User($id: ID!) {
    user(_id: $id) {
      _id
      aboutMe
      address
      avatar
      departmentId {
        _id
        depName
      }
      email
      firstName
      gradeId {
        _id
        gradeName
      }
      groupId {
        _id
        groupName
      }
      lastName
      phoneNumber
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

export const QUERY_NOTIFICATIONS = gql`
query Query {
  notifications {
    _id
    createdAt
    isRead
    type
    receiver {
      _id
    }
    sender {
      _id
      firstName
      lastName
    }
    referPost {
      _id
      title
    }
  }
}
`;
