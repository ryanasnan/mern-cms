const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Story = require('../models/Story');
const User = require('../models/User');
const imageDirectory = '../client/public/static/images/demo/';
const fs = require('fs');
const moment = require('moment');


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
const seederNumber = 1000;
var query = User.find({});

query.exec(async function (err, arrIdLists) {
	if (err) return next(err);

	try {
		var incrementStoryDate = 1;
		for (let i = 0; i < seederNumber; i++) {
			var randomNumberComments = Math.floor(Math.random() * 6) + 3;
			var randomNumberReplies = Math.floor(Math.random() * 3) + 1;
			var comments = [];
			var commentStoryDateIndicator = new Date('2020-01-31');
			var decrementCommentStoryDate = -1;

			for (let k = 1; k <= randomNumberComments; k++) {
				var randomUserForCommentStory = arrIdLists[Math.floor(Math.random() * arrIdLists.length)];

				var objectComment = {
					user: randomUserForCommentStory._id,
					name: randomUserForCommentStory.name,
					text: faker.lorem.paragraphs(),
					avatar: randomUserForCommentStory.avatar,
					date: commentStoryDateIndicator.setDate(commentStoryDateIndicator.getDate() + (decrementCommentStoryDate))
				}
				
				comments[k] = objectComment;
				
				var replyCommentDateIndicator = new Date('2020-02-10');
				var decrementReplyCommentDate = -1;
				var replies = [];
				for (let l = 1; l <= randomNumberReplies; l++) {
					var randomUserForReplyComment = arrIdLists[Math.floor(Math.random() * arrIdLists.length)];

					var objectReply = {
						user: randomUserForReplyComment._id,
						name: randomUserForReplyComment.name,
						text: faker.lorem.paragraphs(),
						avatar: randomUserForReplyComment.avatar,
						date: replyCommentDateIndicator.setDate(replyCommentDateIndicator.getDate() + (decrementReplyCommentDate))
					}
					replies[l] = objectReply;
					decrementReplyCommentDate--;
				}
				comments[k].reply = replies;
				decrementCommentStoryDate--;
			}

			
			var randomUserForStory = arrIdLists[Math.floor(Math.random() * arrIdLists.length)];

			var text = '';
			for (let j = 0; j < 7; j++) {
				text += '<p>' + faker.lorem.paragraphs() + '</p>';
			}
			var storyDateIndicator = new Date('2020-01-01');

			var randomFileName = files[Math.floor(Math.random() * files.length)];
			await Story.create({
				title: faker.lorem.sentence(8),
				text: text,
				user: randomUserForStory._id,
				picture: {
					directoryPath,
					fileName: randomFileName,
				},
				comments: comments,
				createdAt: storyDateIndicator.setDate(storyDateIndicator.getDate() + (incrementStoryDate))
			});
			incrementStoryDate++;
		}

		process.exit();
	} catch (error) {
		console.log(error);
		process.exit();
	}
});
