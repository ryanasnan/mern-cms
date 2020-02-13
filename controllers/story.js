const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Story = require('../models/Story');
const { advancedModelResults } = require('../utils/modelResults');
const { replaceSpaceToUnderscore } = require('../utils/helper');
const { validateSingleImageFile, uploadSingleFile } = require('../utils/fileHandler');
const path = require('path');

exports.getStories = asyncHandler(async (req, res, next) => {
	if (req.params.userId) {
		const data = await advancedModelResults(Story, req, { user: req.params.userId }, {
			path: 'user',
			select: 'name avatar'
		});

		return res.status(200).json(data);
	} else {
		const data = await advancedModelResults(Story, req, {}, {
			path: 'user',
			select: 'name avatar'
		});

		return res.status(200).json(data);
	}
});

exports.getStory = asyncHandler(async (req, res, next) => {
	const story = await Story.findById(req.params.id).populate({
		path: 'user',
		select: 'name avatar'
	});

	if (!story) {
		return next(
			new ErrorResponse(`Story not found with id of ${req.params.id}`, 404)
		);
	}

	res.status(200).json({ success: true, results: story });
});

exports.getStoryBySlug = asyncHandler(async (req, res, next) => {
	const story = await Story.findOne(req.params).populate({
		path: 'user',
		select: 'name avatar'
	});


	if (!story) {
		return next(
			new ErrorResponse(`Story not found with slug of ${req.params.slug}`, 404)
		);
	}
	res.status(200).json({ success: true, results: story });
});

exports.getRandomStory = asyncHandler(async (req, res, next) => {
	const storyCount = await Story.countDocuments();
	const random = await Math.floor(Math.random() * storyCount);

	const randomStory = await Story.findOne().skip(random).populate({
		path: 'user',
		select: 'name avatar'
	});

	res.status(200).json({ success: true, results: randomStory })
})

exports.createStory = asyncHandler(async (req, res, next) => {
	const files = req.files;

	if (!files) {
		return next(new ErrorResponse(`Please upload a file`, 400));
	}

	const file = files.picture;
	// if has multiple image, just create the loop
	validateSingleImageFile(file, next);

	// Add user to req.body
	req.body.user = req.user.id;

	let story = await Story.create(req.body);
	// no need to check if story fail or not, cause when the create model fail, the code below will not execute (mongoose use callback so will never returning the process)

	const dateNow = Date.now();
	const fileName = `picture_story_${replaceSpaceToUnderscore(story.title.substring(0, 15))}_${dateNow}_${story.id}${path.parse(file.name).ext}`;
	const directoryPath = `${process.env.FILE_UPLOAD_DIRECTORY}/${process.env.FILE_IMAGE_DIRECTORY}`;
	const filePath = `${process.env.CLIENT_PUBLIC_PATH}/${directoryPath}/${fileName}`;
	uploadSingleFile(file, filePath, next);

	story = await Story.findByIdAndUpdate(story.id,
		{
			picture: {
				directoryPath: directoryPath,
				fileName
			}
		},
		{
			new: true
		}
	);

	res.status(201).json({
		success: true,
		data: story
	});
});

exports.updateStory = asyncHandler(async (req, res, next) => {
	let story = await Story.findById(req.params.id);

	if (!story) {
		return next(
			new ErrorResponse(`Story not found with id of ${req.params.id}`, 404)
		);
	}

	// Make sure user is story user
	if (story.user.toString() !== req.user.id) {
		return next(
			new ErrorResponse(`User ${req.params.id} is not authorized to update this story`, 404)
		);
	}

	let hasNewImage = false;
	if (req.query.has_new_image) {
		hasNewImage = (req.query.has_new_image === 'true');
	}

	if (hasNewImage) {
		const files = req.files;

		if (!files) {
			return next(new ErrorResponse(`Please upload a file`, 400));
		}

		const file = files.picture;
		// if has multiple image, just create the loop
		validateSingleImageFile(file, next);

		const dateNow = Date.now();
		const fileName = `picture_story_${replaceSpaceToUnderscore(req.body.title.substring(0, 15))}_${dateNow}_${story.id}${path.parse(file.name).ext}`;
		const directoryPath = `${process.env.FILE_UPLOAD_DIRECTORY}/${process.env.FILE_IMAGE_DIRECTORY}`;
		const filePath = `${process.env.CLIENT_PUBLIC_PATH}/${directoryPath}/${fileName}`;
		uploadSingleFile(file, filePath, next);

		// Delete old file if necessary

		// add object on picture before update
		req.body.picture = {
			directoryPath,
			fileName
		}
	}

	story = await Story.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	})

	res.status(200).json({ success: true, data: story });
});

exports.deleteStory = asyncHandler(async (req, res, next) => {
	let story = await Story.findById(req.params.id);

	if (!story) {
		return next(
			new ErrorResponse(`Story not found with id of ${req.params.id}`, 404)
		);
	}

	// Make sure user is story user
	if (story.user.toString() !== req.user.id) {
		return next(
			new ErrorResponse(`User ${req.params.id} is not authorized to delete this story`, 404)
		);
	}
	story = await Story.findByIdAndDelete(req.params.id);

	res.status(200).json({ success: true, data: {} });
});

exports.commentStory = asyncHandler(async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		let story = await Story.findById(req.params.id);

		const newComment = {
			user: req.user.id,
			text: req.body.text,
			name: user.name,
			avatar: user.avatar
		};

		story.comments.unshift(newComment);

		story = await story.update({ $set: { comments: story.comments } });
		res.status(200).json({ success: true, data: story.comments });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
})

exports.replyComment = asyncHandler(async (req, res, next) => {
	try {
		console.log(req.params.id);
		const user = await User.findById(req.user.id).select('-password');
		let story = await Story.findById(req.params.id);

		let comment = story.comments.find(
			comment => comment.id === req.params.comment_id
		);

		// Make sure comment exists
		if (!comment) {
			return res.status(404).json({ msg: 'Comment does not exist' });
		}

		let mentionComment = '';
		if (req.query.mention) {
			mentionComment = req.query.mention;
		}

		const newComment = {
			user: req.user.id,
			text: req.body.text,
			name: user.name,
			avatar: user.avatar,
			mention: mentionComment
		};

		comment.reply.push(newComment);

		story = await story.update({ $set: { comments: story.comments } });

		res.status(200).json({ success: true, data: comment });

	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
})

exports.getCommentByStory = asyncHandler(async (req, res, next) => {
	try {
		const story = await Story.findById(req.params.id);

		const comments = story.comments;
		res.status(200).json({ success: true, data: comments });
	} catch (err) {
		res.status(500).send('server error');
	}
})

exports.deleteComment = asyncHandler(async (req, res, next) => {
	try {
		let story = await Story.findOne({ _id: req.params.id });

		let commentStory = story.comments.find((obj) => { return obj._id == req.params.comment_id });

		if (commentStory == undefined) {
			return next(
				new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404)
			);
		}

		// Make sure user is comment owner
		if (commentStory.user.toString() !== req.user.id) {
			return next(
				new ErrorResponse(`User ${req.params.id} is not authorized to delete this comment`, 404)
			);
		}

		let comments = story.comments;
		comments = comments.filter(function (obj) {
			return obj._id != req.params.comment_id;
		});

		story = await story.updateOne({ $set: { comments: comments } });

		res.status(200).json({ success: true });
	} catch (err) {
		res.status(500).send('server error');
	}
});

exports.deleteReply = asyncHandler(async (req, res, next) => {
	try {
		let story = await Story.findOne({ _id: req.params.id });

		let selectedCommentStory = story.comments.find((obj) => { return obj._id == req.params.comment_id });

		if (selectedCommentStory == undefined) {
			return next(
				new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404)
			);
		}

		let replyComment = selectedCommentStory.reply.find((obj) => { return obj._id == req.params.reply_id });

		if (replyComment == undefined) {
			return next(
				new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404)
			);
		}

		// Make sure user is comment owner
		if (replyComment.user.toString() !== req.user.id) {
			return next(
				new ErrorResponse(`User ${req.params.id} is not authorized to delete this comment`, 404)
			);
		}

		let commentStory = story.comments.filter(function (objectCommentStory) {
			if(objectCommentStory._id == req.params.comment_id) {
				var x = objectCommentStory.reply.filter((objectReplyComment) => {
					if(objectReplyComment._id != req.params.reply_id) {
						return true;
					}
					else {
						return false;
					}
				});
				objectCommentStory.reply = x;
				return true
			} else {			
				return true;
			}
		});

		story = await story.updateOne({ $set: { comments: commentStory } });
		res.status(200).json({ success: true });

	} catch (err) {
		console.log(err);
		res.status(500).send('server error');
	}
});
/*
edit comment dan delete comment
		// Check user
		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}
*/