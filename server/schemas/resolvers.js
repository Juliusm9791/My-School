const { AuthenticationError } = require("apollo-server-express");
const {
  User,
  Department,
  Group,
  Post,
  Comment,
  Reaction,
} = require("../models");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // user: async (parent, args, context) => {
    //   if (context.user) {

    //     const user = await User.findById(args._id)
    //       .populate("departmentId")
    //       .populate("groupId");

    //     return user;
    //   }

    //   throw new AuthenticationError("Not logged in");
    // },
    users: async () => {
      return await User.find({}).populate("departmentId").populate("groupId");
    },
    me: async (parent, args, context) => {
      console.log(context.user);
      if (context.user) {
        return await User.findById(context.user._id)
          .populate("departmentId")
          .populate("groupId");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    posts: async (parent, args) => {
      return await Post.find({})
        .populate("userId")
        .populate("commentId")
        .populate({
          path: "commentId",
          populate: "userId",
        })
        .populate("reactionId");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addPost: async (parents, args, context) => {
      console.log(context);
      const newPost = await Post.create({
        title: args.title,
        description: args.description,
        pictures: args.pictures,
        commentId: args.commentId,
        reactionId: args.ReactionId,
        userId: context.user._id,
      });

      console.log("ADD PRODUCT ARGSSS", args);
      return newPost;
    },
    updatePost: async (parent, args, context) => {
      if (context.user) {
        return await Post.findByIdAndUpdate(
          args._id,
          {
            title: args.title,
            description: args.description,
            pictures: args.pictures,
          },
          {
            new: true,
          }
        );
      }

      throw new AuthenticationError("Not logged in");
    },

    // deleteflight: async (parent, args, context) => {
    //   if (context.user) {
    //     const remUserAucion = await User.findOneAndUpdate(
    //       { _id: args.remuserId },
    //       { $pull: { winingAuctions: args.auctionId } },
    //       { new: true }
    //     );
    //     return remUserAucion;
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },

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
