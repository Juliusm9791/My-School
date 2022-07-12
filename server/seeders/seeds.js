const db = require('../config/connection');
const { User } = require('../models');

db.once('open', async () => {


  await User.deleteMany();


 await User.create(
    {
      firstName: "Todd",
      lastName: "Trulock",
      email: "toddtrulock@gmail.com",
      password: "12345678",
      homeCity: "Atlanta"
    });
  
  console.log('users seeded');


  process.exit();
});
