const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    winingAuctions: [Auction]
    watchlistAuctions: [Auction]
    homeCity: String
  }

  type Auction {
    _id: ID!
    auctionEndDate: String!
    originalFlight_Id: Int!
    aircraftCompany: String!
    aircraftPicture: String
    aircraftSeats: Int!
    aircraftModel: String!
    aircraftTailNum: String!
    arrvAirportCity: String!
    arrvAirportIata: String
    arrvAirportIcao: String
    arrvLocal: String!
    deptAirportCity: String!
    deptAirportIata: String
    deptAirportIcao: String
    deptLocal: String!
    originalPrice: String!
    currentBid: Float!
    bidsHistory: [Bid]
    latestBidUser: User
  }

  type Bid {
    bidTime: String!
    bidAmount: Float
    bidUser: User
  }

  type Auth {
    token: ID
    user: User
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Auction]
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    me: User
    auction(_id: ID!): Auction
    auctions: [Auction]
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Checkout {
    session: ID
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    login(email: String!, password: String!): Auth
    saveflight(winingAuctions: ID!): User
    saveToWatchlist(watchAuctions: ID!): User
    deleteFromWatchlist(_id: ID!): User
    updateBid(_id: ID!, currentBid: Float!): Auction
    updateLatestBidUser(auctions: ID!): Auction
    deleteflight(auctionId: ID!, remuserId: ID!): User
    updateBidHistory(bidAmount: Float!, auctionId: ID!): Auction
    addOrder(products: [ID]!): Order
  }
`;

module.exports = typeDefs;
