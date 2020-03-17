const dotenv = require('dotenv');
const connectDB = require('../config/db');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

dotenv.config({ path: '../config/config.env' });

connectDB();

const faker = require('faker');

const seederNumber = 5;
var query = User.find({});

query.exec(async function (err, arrIdLists) {
	if (err) return next(err);

	try {
		for (let i = 1; i <= seederNumber; i++) {
			var firstName = faker.name.firstName().toLowerCase();
			var lastName = faker.name.lastName().toLowerCase();
			
			var name = `${firstName} ${lastName}`;
			var avatar = "https://ui-avatars.com/api/?size=256&name=" + name.split(' ').join('+');
			var email = `${firstName}.${lastName}@mail.com`;

			var password = '123123';

			var checkUser = await User.findOne({ email: email });
			if (!checkUser) {
				var user = await User.create({
					name,
					email,
					password,
					avatar
				});
			}
		}
		process.exit();
	} catch (error) {
		console.log(error);
		process.exit();
	}
});
