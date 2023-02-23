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
    fireUid: String
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

  type Picture {
    order: Int!
    location: String!
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
    pictures: [Picture]
    departmentId: Department
    gradeId: [Grade]
    userId: User
    commentId: [Comment]
    reactionId: [Reaction]
    createdAt: String!
    updatedAt: String
  }

  type Notification {
    _id: ID
    sender: User
    receiver: User
    type: String
    isRead: Boolean
    referPost: Post
    createdAt: String
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
    notifications: [Notification]
  }

  input pictureInput {
    order: Int!
    location: String
  }

  type Mutation {
    addUser(
      firstName: String!
      middleName: String
      lastName: String!
      avatar: String
      email: String!
      password: String!
      fireUid: String
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
    login(email: String!, password: String!, fireUid: String): Auth
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
      gradeId: [ID]
      pictures: [pictureInput]
      commentId: ID
      reactionId: ID
    ): Post
    updatePost(
      _id: ID!
      userId: ID
      isVisible: Boolean
      isEvent: Boolean
      eventDate: String
      eventEndDate: String
      eventLocation: String
      title: String
      description: String
      departmentId: ID
      gradeId: [ID]
      pictures: [pictureInput]
      commentId: ID
      reactionId: ID
    ): Post

    updatePhotos(_id: ID!, pictures: [pictureInput]!): Post
    deletePhotos(_id: ID!, pictureId: Int!): Post
    addComment(comment: String!, postId: ID!): Post

    deletePost(_id: ID!): Post

    addReactionLike(postId: ID): Reaction

    addNotification(receiver: ID!, type: String!, referPost: ID!): Notification
    updateNotification(_id: ID!, isRead: Boolean): Notification
    deleteNotification(_id: ID!): Notification
    deleteNotificationByPostId(referPost: ID!): Notification
  }

  type Subscription {
    postAdded: Post
    commentAdded: Comment
    postUpdated: Post
    meUpdated: User
  }
`;

module.exports = typeDefs;
