const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Department {
    _id: ID
    depName: String!
  }
  
  type Grade {
    _id: ID
    gradeName: String!
  }

  type Group {
    _id: ID
    groupName: String!
  }

  type User {
    _id: ID
    firstName: String!
    middleName: String
    lastName: String!
    avatar: String
    email: String!
    password: String!
    aboutMe: String
    address: String
    phoneNumber: String
    departmentId: [Department]
    groupId: [Group]
    gradeId: [Grade]
  }

  type Reaction {
    _id: ID
    noLike: Boolean
    like: Boolean
    userId: User
  }

  type Comment {
    _id: ID
    comment: String!
    userId: User
    reactionId: [Reaction]
    createdAt: String!
    updatedAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Post {
    _id: ID
    isVisible: Boolean!
    isEvent: Boolean!
    eventDate: String
    eventEndDate: String
    eventLocation: String
    title: String!
    description: String!
    pictures: String
    departmentId: Department
    gradeId: [Grade]
    userId: User
    commentId: [Comment]
    reactionId: [Reaction]
    createdAt: String!
    updatedAt: String
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    me: User
    posts(title: String, user: ID): [Post]
    post(_id: ID!): Post
    faculties: [Group]
    departments: [Department]
    grades: [Grade]
  }

  type Mutation {
    addUser(
      firstName: String!
      middleName: String
      lastName: String!
      avatar: String
      email: String!
      password: String!
    ): Auth
    updateMe(
      firstName: String
      middleName: String
      lastName: String
      avatar: String
      email: String
      password: String
      aboutMe: String
      address: String
      phoneNumber: String
      groupId: [ID]
      gradeId: [ID]
      departmentId: [ID]
    ): User
    login(email: String!, password: String!): Auth
    addPost(
      userId: ID
      isVisible: Boolean!
      isEvent: Boolean!
      eventDate: String
      eventEndDate: String
      eventLocation: String
      title: String!
      description: String
      departmentId: ID
      pictures: String
      commentId: ID
      reactionId: ID
    ): Post
    updatePost(
      _id: ID!
      userId: ID
      isVisible: Boolean!
      isEvent: Boolean!
      eventDate: String
      eventEndDate: String
      eventLocation: String
      title: String!
      description: String
      departmentId: ID
      pictures: String
      commentId: ID
      reactionId: ID
    ): Post

    addComment(comment: String!, postId: ID!): Post

    deletePost(_id: ID!): Post
  }

  type Subscription {
    postAdded: Post
    commentAdded: Comment
    postUpdated: Post
  }
`;

module.exports = typeDefs;
