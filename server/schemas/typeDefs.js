const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Department {
    _id: ID
    depName: String!
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
    departmentId: [Department]
    groupId: [Group]
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
    isEvent: Boolean!
    eventDate: String
    title: String!
    description: String!
    pictures: String
    departmentId: Department
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
    updateUser(
      firstName: String!
      middleName: String
      lastName: String!
      avatar: String
      email: String!
      password: String!
    ): User
    login(email: String!, password: String!): Auth
    addPost(
      userId: ID
      isEvent: Boolean
      eventDate: String
      title: String!
      description: String
      departmentId: ID
      pictures: String
      commentId: ID
      reactionId: ID
    ): Post
    updatePost(
      _id: ID!
      title: String!
      description: String
      pictures: String
    ): Post

    addComment(comment: String!, postId: ID!): Post

    deletePost(_id: ID!): Post
  }

  type Subscription {
    postAdded: Post
    commentAdded: Comment
  }
`;

module.exports = typeDefs;
