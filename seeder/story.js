const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Story = require('../models/Story');
const User = require('../models/User');

dotenv.config({ path: '../config/config.env' });

connectDB();

const faker = require('faker');
const seederNumber = 50;
var query = User.find({}).select('_id');

query.exec(async function (err, arrIdLists) {
	if (err) return next(err);

	try {
		for (let i = 0; i < seederNumber; i++) {
			var randomId = arrIdLists[Math.floor(Math.random() * arrIdLists.length)]._id;

			var text = '';
			for (let j = 0; j < 7; j++) {
				text += '<p>' + faker.lorem.paragraphs() +'</p>';
			}

			await Story.create({
				title: faker.lorem.sentence(8),
				text: text ,
				user: randomId
			});
		}

		process.exit();
	} catch (error) {
		console.log(error);
		process.exit();
	}
});
