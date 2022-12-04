const { AuthenticationError } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
const {
  User,
  Department,
  Group,
  Post,
  Comment,
  Reaction,
  Grade,
} = require("../models");
const pubsub = new PubSub();

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({}).populate("departmentId").populate("groupId");
    },
    me: async (parent, args, context) => {
      if (("me", context.user)) {
        return await User.findById(context.user._id)
          .populate("departmentId")
          .populate("gradeId")
          .populate("groupId");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    posts: async (parent, args) => {
      return await Post.find({})
        .sort({ createdAt: "desc" })
        .populate("userId")
        .populate("commentId")
        .populate("departmentId")
        .populate("reactionId")
        .populate("gradeId")
        .populate({
          path: "reactionId",
          populate: "userId",
        })
        .populate({
          path: "commentId",
          populate: "userId",
        });
    },

    post: async (parent, args, context) => {
      return await Post.findById(args._id)
        .populate("userId")
        .populate("commentId")
        .populate("departmentId")
        .populate("reactionId")
        .populate("gradeId")
        .populate({
          path: "reactionId",
          populate: "userId",
        })
        .populate({
          path: "commentId",
          populate: "userId",
        });
    },
    faculties: async (parent, args) => {
      return await Group.find({});
    },
    departments: async (parent, args) => {
      return await Department.find({});
    },
    grades: async (parent, args) => {
      return await Grade.find({});
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addPost: async (parents, args, context) => {
      const newPost = await Post.create({
        isVisible: args.isVisible,
        isEvent: args.isEvent,
        eventDate: args.eventDate,
        eventEndDate: args.eventEndDate,
        eventLocation: args.eventLocation,
        departmentId: args.departmentId,
        gradeId: args.gradeId,
        title: args.title,
        description: args.description,
        commentId: args.commentId,
        reactionId: args.ReactionId,
        userId: context.user._id,
        pictures: args.pictures,
      });
      pubsub.publish("POST_ADDED", {
        postAdded: {
          isVisible: args.isVisible,
          title: args.title,
          description: args.description,
          eventDate: args.eventDate,
          eventEndDate: args.eventEndDate,
          eventLocation: args.eventLocation,
          commentId: args.commentId,
          reactionId: args.ReactionId,
          userId: context.user._id,
        },
      });
      return newPost;
    },
    addComment: async (parents, args, context) => {
      if (context.user) {
        const newComment = await Comment.create({
          comment: args.comment,
          userId: context.user._id,
        });
        const updatedPost = await Post.findByIdAndUpdate(
          { _id: args.postId },
          { $addToSet: { commentId: newComment._id } },
          { new: true }
        );
        pubsub.publish("COMMENT_ADDED", {
          commentAdded: {
            comment: args.comment,
            userId: context.user._id,
          },
        });
        return updatedPost;
      }
      throw new AuthenticationError("Not logged in");
    },
    updatePost: async (parent, args, context) => {
      if (context.user) {
        return await Post.findByIdAndUpdate(
          args._id,
          {
            isVisible: args.isVisible,
            isEvent: args.isEvent,
            eventDate: args.eventDate,
            eventEndDate: args.eventEndDate,
            eventLocation: args.eventLocation,
            departmentId: args.departmentId,
            gradeId: args.gradeId,
            title: args.title,
            description: args.description,
            pictures: args.pictures,
          },
          {
            new: true,
          }
        );
      }
      pubsub.publish("POST_UPDATED", {
        postUpdated: {
          isVisible: args.isVisible,
          title: args.title,
          description: args.description,
          eventDate: args.eventDate,
          eventEndDate: args.eventEndDate,
          eventLocation: args.eventLocation,
          commentId: args.commentId,
          reactionId: args.ReactionId,
          userId: context.user._id,
        },
      });

      throw new AuthenticationError("Not logged in");
    },

    deletePost: async (parent, args, context) => {
      if (context.user) {
        return await Post.findByIdAndDelete(
          { _id: args._id },
          async (err, post) => {
            await Comment.deleteMany({
              _id: {
                $in: post.commentId,
              },
            });
          }
        );
      }
      throw new AuthenticationError("Not logged in");
    },

    updateMe: async (parent, args, context) => {
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
  Subscription: {
    postAdded: { subscribe: () => pubsub.asyncIterator("POST_ADDED") },
    commentAdded: { subscribe: () => pubsub.asyncIterator("COMMENT_ADDED") },
  },
};

module.exports = resolvers;
