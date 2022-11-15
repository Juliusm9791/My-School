const db = require("../config/connection");

const { faker } = require("@faker-js/faker");
const {
  User,
  Comment,
  Department,
  Group,
  Post,
  Reaction,
  Grade,
} = require("../models");

db.once("open", async () => {
  // DEPARTMENTS
  // delete any previous department entries
  await Department.deleteMany();
  // create 3 departments
  const departments = await Department.insertMany([
    { depName: "ADMINISTRATION" },
    { depName: "ENGLISH" },
    { depName: "MATH" },
    { depName: "SCIENCE" },
    { depName: "SOCIAL STUDIES" },
    { depName: "ART" },
    { depName: "MUSIC" },
    { depName: "ATHLETICS" },
    { depName: "HEALTH" },
    { depName: "FOREIGN LANGUAGE" },
    { depName: "LIBRARY" },
    { depName: "GUIDANCE" },
    { depName: "EXTRA-CURRICULARS" },
    { depName: "TRANSPORTATION" },
    { depName: "FOOD SERVICES" },
  ]);
  console.log("departments seeded");

  // GROUPS
  await Group.deleteMany();

  const groups = await Group.insertMany([
    { groupName: "Faculty" },
    { groupName: "Parent" },
    { groupName: "Student" },
  ]);

  console.log("group seeded");
  // USERS
  await User.deleteMany();

  const fakeUsers = [];

  const testUser = {
    firstName: "test",
    middleName: "test",
    lastName: "test",
    avatar: "",
    email: "testemail@gmail.com",
    password: "12345678",
    groupId: groups[Math.floor(Math.random() * groups.length)]._id,
    departmentId:
      departments[Math.floor(Math.random() * departments.length)]._id,
    gradeId: [Math.floor(Math.random()*12+1)],
    aboutme: "test",
    address: "123 Test St, Test",
    phoneNumber: "123-456-7890"
  };
  fakeUsers.push(testUser);

  for (let i = 0; i < 20; i++) {
    firstname = faker.name.firstName();
    lastname = faker.name.lastName();
    // random number generator to pick a random department and group
    let randomDept = Math.floor(Math.random() * departments.length);
    let randomGroup = Math.floor(Math.random() * groups.length);

    const fakeUser = {
      firstName: firstname,
      middleName: faker.name.middleName(),
      lastName: lastname,
      avatar: "",
      email: firstname + lastname + "@gmail.com",
      password: "12345678",
      groupId: groups[randomGroup]._id,
      departmentId: departments[randomDept]._id,
      gradeId: [Math.floor(Math.random()*12+1)],
      aboutme: faker.lorem.paragraph,
      phoneNumber: faker.phone.number,
      address: faker.address.streetAddress
    };

    fakeUsers.push(fakeUser);
  }

  const users = await User.create(fakeUsers);

  console.log("users seeded");
  // REACTIONS
  await Reaction.deleteMany();

  const fakeReactions = [];

  for (let i = 0; i < 20; i++) {
    let randomUser = Math.floor(Math.random() * users.length);
    fakeLike = { like: true, noLike: false, userId: users[randomUser]._id };
    fakeReactions.push(fakeLike);
  }

  const reactions = await Reaction.insertMany(fakeReactions);
  // const reactions = await Reaction.insertMany([
  // 	{ like: true, noLike: false, userId: users[0]._id },
  // 	{ like: false, noLike: true, userId: users[1]._id },
  // ]);

  console.log("reactions seeded");
  // COMMENTS
  await Comment.deleteMany();
  const comments = await Comment.insertMany([
    {
      comment: "Thanks for the Update!",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      comment:
        "I private messaged you about my son please respond at your soonest convenience.",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      comment: "love this!",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      comment: "can you please elaborate on this?",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      comment: "When is the first football game?",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      comment: "Got it! Thanks!",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      comment: "Noted",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
  ]);

  console.log("comments seeded");
  // POSTS
  await Post.deleteMany();

  const posts = await Post.insertMany([
    {
      isVisible: true,
      title: "English 203 Extra Credit Opportunities",
      departmentId: departments[1].id,
      grade: [2],
      description:
        "Each semester I have special opportunity to choose one of you to represent our class at the Speakers’ Showcase. All communications professors can nominate one student to submit their best speech. If you are nominated you will receive extra credit. In addition, a panel of judges will choose the top six presentations to be in the Showcase. If you are chosen to be in the Showcase, you will receive additional extra credit and possibly money or prizes. This is a win-win! The next showcase is April 26th. Your presentation videos will be due April 17th.",
      pictures: "",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },

    {
      isVisible: true,
      title: "Bus stop chaperone",
      departmentId: departments[13].id,
      grade: [1, 2, 3, 4, 5, 6],
      description:
        "Bus Riders: We ask that all parents of students riding the bus please wait with your child until they have boarded the bus each morning.  This will give our driver time to ensure that it is your child’s correct week to be at school.  Buses will have a roster and signage in the window indicating the week of attendance (Green-Week A, Yellow-Week B). At the end of the school day, bus riders will be escorted to the bus by school staff.",
      pictures: "",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      isVisible: true,
      title: "Device Distribution",
      departmentId: departments[0].id,
      grade: [0, 1, 2],
      description:
        "Pitt County Schools is pleased to announce that they have transitioned to being a 1-to-1 district. K-2 students will be receiving iPads while 3rd-5th graders will be receiving Chromebooks. Your child will use the same device for three consecutive school years. A detailed device agreement is coming home on the first student day or when picking up devices for virtual learning and will need to be signed and returned before the device may travel home with your child. ",
      pictures: "",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      isVisible: true,
      title: "Open House",
      departmentId: departments[0].id,
      grade: [7, 8, 9],
      description:
        "Open House will look different this year.  Students who are coming on A and B weeks will participate in a virtual Open House on August 13th for 1st-5th grade.  Each teacher will send out a virtual open house video to view by 3:00 on Open House. Your child’s teacher will contact you to either set up times to meet virtually through Zoom or do a live question and answer session for parents who would like to attend.  We understand this may cause some anxiety, however, we can assure you we will be available to answer questions, address concerns, and introduce ourselves to our Eagles!",
      pictures: "",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      isVisible: true,
      title: "Masks and Hand washing",
      departmentId: departments[8].id,
      grade: [10],
      description:
        " Students will be provided 5 masks and a lanyard.  Students may choose to use these masks, or any other appropriate mask.  Please do not send students with masks that contain inappropriate images or words. The lanyard is to be used to make sure that while students are eating, the lanyards do not fall to the ground or become mixed up with another student's mask.",
      pictures: "",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      isVisible: true,
      title: "School Nutrition",
      departmentId: departments[14].id,
      grade: [11, 12],
      description:
        " Lunch money can be paid online with the system PaySchools Central found at payschoolscentral.com or students may bring cash or a check weekly or monthly.If you feel your family may qualify for free/reduced lunch status please make sure you get the form from the office or your child’s teacher. If you were approved last year it continues for the first 4 weeks of school but a new application must be filled out each year.  ",
      pictures: "",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      isVisible: true,
      title: "PTA MEETING",
      departmentId: departments[0].id,
      grade: [2, 3, 4],
      description:
        "We would like to invite all Parents and Carers to our second PTA meeting of this academic year. It will take place in the school library at 6.45pm on Monday 7th November. We look forward to seeing you then. ",
      pictures: "",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      isVisible: true,
      title: "FGO THEME AND MISSION FOR THE YEAR:",
      departmentId: departments[12].id,
      grade: [6, 7, 9],
      description:
        "This year our FGO will have two focuses. We will be focused on Monthly School Spirit Days to create a school-wide sense of community and enthusiasm for being an amazing Fishkill Frog! We will also be focused on raising money and collecting goods for our school and our community.  Your FGO has been working on creating these focuses. Our school focus will be on Bully Prevention and our community focus will be towards aiding Animal Shelters and Endangered Animals. Each month, we will collect alternately for each of these focuses.  ",
      pictures: "",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      isVisible: true,
      title: "School Pictures",
      departmentId: departments[0].id,
      grade: [0],
      description:
        "school pictures on Tuesday, October 2nd & Wednesday October 3rd.",
      pictures: "",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      isVisible: true,
      title: "Biology 1 Quiz",
      departmentId: departments[3].id,
      grade: [4],
      description:
        "Module Quiz: It includes 25 multiple-choice questions, and you have 75 minutes  complete the assignment once you begin. The quiz is due on Friday by 11.59pm • Presentation: Be sure to reference the rubric for this assignment that can be found in the course documents folder. The presentation upload is due on Friday by 11.59pm.  As always, I am happy to help.",
      pictures: "",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      isVisible: true,
      title: "Calculus Project",
      departmentId: departments[2].id,
      grade: [6],
      description:
        "Just a reminder that we are 3 days away from your final project being due.Make sure you have  done the following things before you turn in your project: • Review the feedback on your rough draft • Read the rubric for the final presentation(found in the folder where you submit your  presentation)• Touch base with me if you have any questions ",
      pictures: "",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
  ]);
  console.log("post seeded");

  process.exit();
});
