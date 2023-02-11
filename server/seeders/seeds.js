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
    { depName: "EXTRACURRICULAR" },
    { depName: "TRANSPORTATION" },
    { depName: "FOOD SERVICES" },
  ]);
  console.log("departments seeded");

  // GRADES
  await Grade.deleteMany();

  const grades = await Grade.insertMany([
    { gradeName: "K" },
    { gradeName: "1st" },
    { gradeName: "2nd" },
    { gradeName: "3rd" },
    { gradeName: "4th" },
    { gradeName: "5th" },
  ]);

  console.log("Grades seeded");

  // GROUPS
  await Group.deleteMany();

  const groups = await Group.insertMany([
    { groupName: "Faculty" },
    { groupName: "Parent" },
    { groupName: "Student" },
    { groupName: "Not Assigned" },
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
    gradeId: grades[Math.floor(Math.random() * grades.length)]._id,
    aboutMe: "test",
    address: "123 Test St, Test",
    phoneNumber: "123-456-7890",
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
      avatar: faker.image.avatar(),
      email: firstname + lastname + "@gmail.com",
      password: "12345678",
      groupId: groups[randomGroup]._id,
      departmentId: departments[randomDept]._id,
      gradeId: grades[Math.floor(Math.random() * grades.length)]._id,
      aboutMe: faker.lorem.paragraph(),
      phoneNumber: faker.phone.number(),
      address: faker.address.streetAddress(),
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

  let applyAllGrades = [];
  grades.map((grade) => applyAllGrades.push(grade._id));

  const posts = await Post.insertMany([
    {
      isVisible: true,
      isEvent: true,
      eventDate: "04-26-2023",
      eventEndDate: "04-26-2023",
      eventLocation: "Community Center",
      title: "English Extra Credit Opportunities",
      departmentId: departments[1].id,
      gradeId: [grades[1]._id, grades[2]._id],
      description:
        "Each semester I have special opportunity to choose one of you to represent our class at the Speakers’ Showcase. All communications professors can nominate one student to submit their best speech. If you are nominated you will receive extra credit. In addition, a panel of judges will choose the top six presentations to be in the Showcase. If you are chosen to be in the Showcase, you will receive additional extra credit and possibly money or prizes. This is a win-win! The next showcase is April 26th. Your presentation videos will be due April 17th.",
      pictures: [
        {
          order: 0,
          location:
            "https://user-images-8d8a6cbf-fd68-4ab3-bbdf-fe392c16d283.s3.us-east-2.amazonaws.com/0.jpg",
        },
      ],
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },

    {
      isVisible: true,
      isEvent: false,
      title: "Bus stop chaperone",
      departmentId: departments[13].id,
      gradeId: applyAllGrades,
      description:
        "Bus Riders: We are in search of an adult bus stop chaperone for each stop along the route. Please lookout for a signup sheet that will be circulating by our transportation officials. We appreciate any volunteers that want to step up to ensure safety of our students at each and every bus stop in the district.",
      pictures: [
        {
          order: 0,
          location:
            "https://user-images-8d8a6cbf-fd68-4ab3-bbdf-fe392c16d283.s3.us-east-2.amazonaws.com/1.1.jpg",
        },
        {
          order: 1,
          location:
            "https://user-images-8d8a6cbf-fd68-4ab3-bbdf-fe392c16d283.s3.us-east-2.amazonaws.com/1.jpg",
        },
      ],
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      isVisible: true,
      isEvent: true,
      eventDate: "05-12-2023 9:00 AM",
      eventEndDate: "05-12-2023 10:00 AM",
      eventLocation: "Main Office",
      title: "Device Distribution",
      departmentId: departments[0].id,
      gradeId: [grades[2]._id, grades[3]._id, grades[4]._id, grades[5]._id],
      description:
        "Pitt County Schools is pleased to announce that they have transitioned to being a 1-to-1 district. Our second and third grade students will be receiving iPads while fourth and fifth graders will be receiving Chromebooks. Your child will use the same device for the remainder of the year. A detailed device agreement is coming home with the students and can be submitted when picking up devices, but before the device can be taken home. ",
      pictures: [
        {
          order: 0,
          location:
            "https://user-images-8d8a6cbf-fd68-4ab3-bbdf-fe392c16d283.s3.us-east-2.amazonaws.com/2.1.jpg",
        },
        {
          order: 1,
          location:
            "https://user-images-8d8a6cbf-fd68-4ab3-bbdf-fe392c16d283.s3.us-east-2.amazonaws.com/2.jpg",
        },
      ],
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      isVisible: true,
      isEvent: true,
      eventDate: "06-03-2023",
      eventEndDate: "06-03-2023",
      eventLocation: "Whole School",
      title: "Open House",
      departmentId: departments[0].id,
      gradeId: [grades[2]._id, grades[3]._id],
      description:
        "Open House will look different this year. Students who are coming on A and B weeks will participate in a virtual Open House on December 1st for 1st-5th grade.  Each teacher will send out a virtual open house video to view by 4:30pm. Your child’s teacher will contact you to either set up times to meet virtually through Zoom or do a live question and answer session for parents who would like to attend. We understand this may cause some anxiety, however, we can assure you we will be available to answer questions, address concerns, and introduce ourselves to our Eagles!",
      pictures: [
        {
          order: 0,
          location:
            "https://user-images-8d8a6cbf-fd68-4ab3-bbdf-fe392c16d283.s3.us-east-2.amazonaws.com/3.jpg",
        },
      ],
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      isVisible: true,
      isEvent: false,
      title: "Masks and Hand washing",
      departmentId: departments[8].id,
      gradeId: applyAllGrades,
      description:
        "Students will be provided 5 masks and a lanyard. Students may choose to use these masks, or any other appropriate mask. Please do not send students with masks that contain inappropriate images or words. The lanyard is to be used to make sure that while students are eating, the masks do not fall to the ground or become mixed up with another student's mask.",
      pictures: [
        {
          order: 0,
          location:
            "https://user-images-8d8a6cbf-fd68-4ab3-bbdf-fe392c16d283.s3.us-east-2.amazonaws.com/4.1.jpg",
        },
        {
          order: 1,
          location:
            "https://user-images-8d8a6cbf-fd68-4ab3-bbdf-fe392c16d283.s3.us-east-2.amazonaws.com/4.2.jpg",
        },
        {
          order: 2,
          location:
            "https://user-images-8d8a6cbf-fd68-4ab3-bbdf-fe392c16d283.s3.us-east-2.amazonaws.com/4.jpg",
        },
      ],
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      isVisible: true,
      isEvent: false,
      title: "School Lunch",
      departmentId: departments[14].id,
      gradeId: applyAllGrades,
      description:
        " Lunch money can be paid online with the system PaySchools Central found at payschoolscentral.com or students may bring cash or a check weekly or monthly.If you feel your family may qualify for free/reduced lunch status please make sure you get the form from the office or your child’s teacher. If you were approved last year it continues for the first 4 weeks of school but a new application must be filled out each year.  ",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      isVisible: true,
      isEvent: true,
      eventDate: "06-20-2023 6:00 PM",
      eventEndDate: "06-20-2023 9:00 PM",
      eventLocation: "School Library",
      title: "PTA Meeting",
      departmentId: departments[0].id,
      gradeId: [grades[1]._id, grades[2]._id],
      description:
        "We would like to invite our first & second grader parents to our second PTA meeting of this academic year. It will take place in the school library at 6:45pm on Monday November 7th. We look forward to seeing you all and discussing next year's curriculum revisions in more detail",
      pictures: [
        {
          order: 0,
          location:
            "https://user-images-8d8a6cbf-fd68-4ab3-bbdf-fe392c16d283.s3.us-east-2.amazonaws.com/6.png",
        },
      ],
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      isVisible: true,
      isEvent: true,
      eventDate: "07-02-2023 7:00 PM",
      eventEndDate: "07-02-2023 8:30 PM",
      eventLocation: "Gymnasium",
      title: "Graduation Concert!",
      departmentId: departments[6].id,
      gradeId: [grades[5]._id],
      description:
        "This year our graduating fifth graders will enjoy a concert courtesy of our own school band, perform in the gymnasium on April 27th at 11:30am just before first period lunch. We will celebrate and also raise funds for Bully Prevention and towards aiding local animal shelters.",
      pictures: [
        {
          order: 0,
          location:
            "https://user-images-8d8a6cbf-fd68-4ab3-bbdf-fe392c16d283.s3.us-east-2.amazonaws.com/7.1.jpg",
        },
        {
          order: 1,
          location:
            "https://user-images-8d8a6cbf-fd68-4ab3-bbdf-fe392c16d283.s3.us-east-2.amazonaws.com/7.jpg",
        },
      ],
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      isVisible: true,
      isEvent: true,
      eventDate: "10-02-2023",
      eventEndDate: "10-03-2023",
      eventLocation: "Room 101",
      title: "School Pictures",
      departmentId: departments[0].id,
      gradeId: [grades[1]._id, grades[2]._id],
      description:
        "School pictures are scheduled to take place on Tuesday, October 2nd & Wednesday October 3rd for the First and Second grade classes only. We will continue in about a week with the 3rd graders once they finish standardized testing at the end of the month. Remember to wear your best outfit and smile!",
      pictures: [
        {
          order: 0,
          location:
            "https://user-images-8d8a6cbf-fd68-4ab3-bbdf-fe392c16d283.s3.us-east-2.amazonaws.com/8.jpg",
        },
      ],
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      isVisible: true,
      isEvent: true,
      eventDate: "11-07-2023 10:00 AM",
      eventEndDate: "11-07-2023 12:00 PM",
      eventLocation: "Biology Classroom",
      title: "Biology Quiz",
      departmentId: departments[3].id,
      gradeId: [grades[4]._id],
      description:
        "Module Quiz: Heads up fourth graders, this week’s quiz includes 25 multiple-choice questions, and you have one hour complete the assignment once you begin. The quiz takes place on Friday.  Presentation: Be sure to reference the rubric for this assignment that can be found in the course documents folder. As always, I am happy to help!",
      pictures: [
        {
          order: 0,
          location:
            "https://user-images-8d8a6cbf-fd68-4ab3-bbdf-fe392c16d283.s3.us-east-2.amazonaws.com/9.jpg",
        },
      ],
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
    {
      isVisible: true,
      title: "Algebra Project",
      departmentId: departments[2].id,
      gradeId: [grades[5]._id],
      description:
        "To all our fifth graders, quick reminder that we are just 3 days away from the final project due date. Make sure you have done the following things before you turn in your project: Review the feedback from the first submission, read the rubric for the final presentation guidelines (found in the folder where you submit your  presentation), touch base with me if you have any questions.",
      userId: users[Math.floor(Math.random() * users.length)]._id,
      commentId: comments[Math.floor(Math.random() * comments.length)]._id,
      reactionId: reactions[Math.floor(Math.random() * reactions.length)]._id,
    },
  ]);
  console.log("post seeded");

  process.exit();
});
