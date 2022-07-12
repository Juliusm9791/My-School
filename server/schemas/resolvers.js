const { AuthenticationError } = require("apollo-server-express");
const { User, Auction, Order, Bid } = require("../models");
const axios = require("axios").default;
require("dotenv").config();

//const dataFromFile = require("../../client/src/utils/data");

const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .populate("winingauctions")
          .populate("watchlistauctions");

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      return await User.find({})
        .populate("winingAuctions")
        .populate("watchlistAuctions")
        .populate({
          path: "auctions",
          populate: "bidsHistory",
        })
        .populate({
          path: "auctions.bidsHistory",
          populate: "bidUser",
        });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id })
          .populate("winingAuctions")
          .populate("watchlistAuctions");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    auctions: async () => {

      console.log("TEST")

      const headers = {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          "Content-type": "application/json",
        },
      };

      const existingIdList = await Auction.find({});
      const existingOriginalFlight_Ids = [];
      existingIdList.forEach((el) => {
        existingOriginalFlight_Ids.push(el.originalFlight_Id);
      });

      try {
        const response = await axios.get(
          "https://api.airplanemanager.com/api/charter/marketing/oneways/v1",
          headers
        );
        response.data.forEach(async (el) => {
          if (!existingOriginalFlight_Ids.includes(el.id)) {
            await Auction.create({
              originalFlight_Id: el.id,
              aircraftCompany: el.aircraft.contact.company,
              aircraftPicture: el.aircraft.pictureExterior,
              aircraftSeats: el.aircraft.seats,
              aircraftModel: el.aircraft.makeModel,
              aircraftTailNum: el.aircraft.tailNumber,
              arrvAirportCity: el.arrvAirport.city,
              arrvAirportIata: el.arrvAirport.iata,
              arrvAirportIcao: el.arrvAirport.icao,
              arrvLocal: el.arrvLocal,
              deptAirportCity: el.deptAirport.city,
              deptAirportIata: el.deptAirport.iata,
              deptAirportIcao: el.deptAirport.icao,
              deptLocal: el.deptLocal,
              originalPrice: el.oneWayPrice,
              currentBid: el.oneWayPrice,
              auctionEndDate: new Date(el.deptLocal) - 1209600000 // -2 weeks
            });
          }
        });
      } catch (error) {
        console.error(error);
      }
      // console.log(dataFromFile);

      return await Auction.find({}).populate("bidsHistory").populate({
        path: "bidsHistory",
        populate: "bidUser",
      });
    },
    auction: async (parent, args) => {
      return await Auction.findOne({ _id: args._id })
        .populate("bidsHistory")
        .populate({
          path: "bidsHistory",
          populate: "bidUser",
        });
    },

    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate("auctions");

        return user.orders.id(_id);
      }

      throw new AuthenticationError("Not logged in");
    },

    checkout: async (parent, args, context) => {
      const order = new Order({ products: args.products });
      const line_items = [];
      const { products } = await order.populate("products").execPopulate();
      const url = new URL(context.headers.referer).origin;

      for (let i = 0; i < products.length; i++) {
        console.log(`${url}/images/planes/no_image.png`)
        const product = await stripe.products.create({
          name: `Flight ${products[i].aircraftTailNum}`,
          description: `Flight from ${products[i].deptAirportCity} on ${new Date(products[i].deptLocal).toLocaleDateString()} ${new Date(products[i].deptLocal).toLocaleTimeString()}. Arriving to ${products[i].arrvAirportCity} on ${new Date(products[i].arrvLocal).toLocaleDateString()} ${new Date(products[i].arrvLocal).toLocaleTimeString()}`,
          images: [products[i].aircraftPicture !== "" ? `https:${products[i].aircraftPicture}`: `${url}/images/planes/no_image.png`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].currentBid * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/payment`
      });
      return { session: session.id };
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateBid: async (parent, args) => {
      const updatedBidSum = await Auction.findByIdAndUpdate(
        { _id: args._id },
        { currentBid: args.currentBid },
        { new: true }
      );
      return updatedBidSum;
    },
    saveflight: async (parent, { winingAuctions }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { winingAuctions: winingAuctions } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    saveToWatchlist: async (parent, { watchAuctions }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { watchlistAuctions: watchAuctions } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    deleteFromWatchlist: async (parent, { _id }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { watchlistAuctions: _id } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    updateLatestBidUser: async (parent, { auctions }, context) => {
      if (context.user) {
        const updatedAuctionUser = await Auction.findByIdAndUpdate(
          { _id: auctions },
          { latestBidUser: context.user._id },
          { new: true }
        );

        return updatedAuctionUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    deleteflight: async (parent, args, context) => {
      if (context.user) {
        const remUserAucion = await User.findOneAndUpdate(
          { _id: args.remuserId },
          { $pull: { winingAuctions: args.auctionId } },
          { new: true }
        );
        return remUserAucion;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    updateBidHistory: async (parent, args, context) => {
      if (context.user) {
        const bidHistory = await Bid.create({
          bidAmount: args.bidAmount,
          bidUser: context.user._id,
        });
        const addBidHistory = await Auction.findByIdAndUpdate(
          { _id: args.auctionId },
          { $push: { bidsHistory: bidHistory } },
          { new: true }
        );

        return addBidHistory;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
