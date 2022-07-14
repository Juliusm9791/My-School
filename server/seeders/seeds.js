const db = require('../config/connection');
const { User, Comment, Department, Group, Post, Reaction } = require('../models');

db.once('open', async () => {


  await Department.deleteMany();

  const departments = await Department.insertMany([
    { depName: "Sciences" },
    { depName: "Literature" },
    { depName: "Sports" },

  ]);

  console.log("departments seeded");

  await Group.deleteMany();

  const groups = await Group.insertMany([
    { faculty: true, parent: false, stutent: false },
    { faculty: false, parent: true, stutent: false },
    { faculty: false, parent: false, stutent: true },

  ]);
  console.log("group  seeded");






  await User.deleteMany();
  const users= await User.insertMany([
    {
      firstName: "Todd",
      middleName: "bbla",
      lastName: "Trulock",
      avatar: "",
      email: "toddtrulock@gmail.com",
      password: "12345678",
      groupName: groups[0]._id,
      depNames: departments[0]._id

    },
    {

      firstName: "olsen",
      middleName: "bbla",
      lastName: "Trulock",
      avatar: "",
      email: "todd@gmail.com",
      password: "12345678",
      groupName: groups[1]._id,
      depNames: departments[1]._id
    }
    ]);
 


  console.log('users seeded');


   await Reaction.deleteMany();

  const reactions = await Reaction.insertMany([
    { like: true, noLike: false, userId: users[0]._id },
    { like: false, noLike: true, userId: users[1]._id },


  ]);
  console.log("reactions  seeded");


  await Comment.deleteMany();
  const comments = await Comment.insertMany([
    {
      comment: "good",
      userId: users[0]._id,
      reactionId: reactions[0]._id

    },
    {
      comment: "yooo",
      userId: users[0]._id,
      reactionId: reactions[0]._id

    }]);
  console.log("comments seeded");

  await Post.deleteMany();

  const posts = await Post.insertMany([
    {
      title: "post1",
      description: "description for post1",
      pictures: "",
      userId: users[0]._id,
      comments: comments[0]._id,
      reactions: reactions[0]._id
    },

    {
      title: "post2",
      description: "description for post2",
      pictures: "",
      userId: users[1]._id,
      comments: comments[0]._id,
      reactions:  reactions[0]._id
    },
    {
      title: "post3",
      description: "description for post",
      pictures: "",
      userId: users[0]._id,
      comments: comments[0]._id,
      reactions: reactions[0]._id
    },

  ]);
  console.log("post  seeded");
  





  process.exit();
});
