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
  }`;

export const QUERY_FACULTIES = gql`
  query faculties {
    faculties {
      _id
      groupName
    }
  }`;

export const QUERY_DEPARTMENTS = gql` 
query departments {
  departments {
    _id
  depName
  }
}`;

