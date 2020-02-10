const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Story = require('../models/Story');
const User = require('../models/User');
const imageDirectory = '../client/public/static/images/demo/';
const fs = require('fs');

// get all files in directory
let files = fs.readdirSync(imageDirectory);

// get jpg files only
files = files.filter(function (currentChar) {
	// console.log(currentChar);   // a, b, c on separate lines
	return currentChar.split('.').pop() == 'jpg';
});

dotenv.config({ path: '../config/config.env' });

connectDB();

let directoryPath = `${process.env.FILE_STATIC_DIRECTORY}/${process.env.FILE_IMAGE_DIRECTORY}/demo`;
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
				text += '<p>' + faker.lorem.paragraphs() + '</p>';
			}

			var randomFileName = files[Math.floor(Math.random() * files.length)];
			await Story.create({
				title: faker.lorem.sentence(8),
				text: text,
				user: randomId,
				picture: {
					directoryPath,
					fileName: randomFileName,
				}
			});
		}

		process.exit();
	} catch (error) {
		console.log(error);
		process.exit();
	}
});
