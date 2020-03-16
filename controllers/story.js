const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Story = require('../models/Story');
const { advancedModelResults } = require('../utils/modelResults');
const { replaceSpaceToUnderscore } = require('../utils/helper');
const { validateSingleImageFile, uploadSingleFile } = require('../utils/fileHandler');
const path = require('path');

exports.getStories = asyncHandler(async (req, res, next) => {
	let data;
	if (req.params.userId) {
		data = await advancedModelResults(Story, req, { user: req.params.userId }, {
			path: 'user',
			select: 'name avatar'
		});

		// generate custom prop

	} else {
		data = await advancedModelResults(Story, req, {}, {
			path: 'user',
			select: 'name avatar'
		});

	}
	return res.status(200).json(data);
});

exports.getPopularStories = asyncHandler(async (req, res, next) => {
	let number = req.query.number || 5;

	const story = await Story.find().populate({
		path: 'user',
		select: 'name avatar'
	});

	if (!story) {
		return next(
			new ErrorResponse(`Story not found`, 404)
		);
	}
	  
	story.sort(function(a, b)  {  
		return b['totalPopularity'] - a['totalPopularity']
	});

	let popularStories = story.slice(0,number);
	res.status(200).json({ success: true, results: popularStories });
});

exports.getRelatedStories = asyncHandler(async (req, res, next) => {
	let limitNumber = req.query.limitnumber || 5;
	const storyCount = await Story.countDocuments();

	let relatedStories = [];
	let randomId = [];
	for (let i = 0; i < limitNumber; i++) {
		var id = Math.floor(Math.random() * storyCount);
		if(!randomId.includes(id)) {
			randomId.push(id);
		}
	}

	for (let j = 0; j < randomId.length; j++) {
		var randomStory = await Story.findOne().skip(randomId[j]).populate({
			path: 'user',
			select: 'name avatar'
		});
		relatedStories.push(randomStory);
	}

	res.status(200).json({ success: true, results: relatedStories });
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
	await uploadSingleFile(file, filePath, next);

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
		await uploadSingleFile(file, filePath, next);

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
		const totalCommentsAndReplies = story.countCommentsAndReplies;
		res.status(200).json({ success: true, data: {comments, totalCommentsAndReplies} });
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
			if (objectCommentStory._id == req.params.comment_id) {
				var x = objectCommentStory.reply.filter((objectReplyComment) => {
					if (objectReplyComment._id != req.params.reply_id) {
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
		res.status(500).send('server error');
	}
});


exports.getLikesByStory = asyncHandler(async (req, res, next) => {
	try {
		const story = await Story.findById(req.params.id);
		const likes = story.likes;
		res.status(200).json({ success: true, data: likes });
	} catch (err) {
		res.status(500).send('server error');
	}
})

exports.likeStory = asyncHandler(async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		let story = await Story.findById(req.params.id);

		const newLike = {
			user: user.id,
			name: user.name,
			avatar: user.avatar
		};

		// prevent like story if the user already like
		let checkUserLikeInStory = story.likes.find((obj) => { return obj.user == user.id });

		if (checkUserLikeInStory == undefined) {
			story.likes.unshift(newLike);
		}

		await story.updateOne({ $set: { likes: story.likes } });
		res.status(200).json({ success: true });
	} catch (err) {
		res.status(500).send('server error');		
	}
})

exports.unlikeStory = asyncHandler(async (req, res, next) => {
	try {
		let story = await Story.findOne({ _id: req.params.id });

		let selectedLikeStory = story.likes.find((obj) => { return obj._id == req.params.like_id });

		if (selectedLikeStory == undefined) {
			return next(
				new ErrorResponse(`Like not found with id of ${req.params.id}`, 404)
			);
		}

		// Make sure user is comment owner
		if (selectedLikeStory.user.toString() !== req.user.id) {
			return next(
				new ErrorResponse(`User ${req.params.id} is not authorized to unlike story`, 404)
			);
		}

		let likeStory = story.likes.filter(function (objectLikeStory) {
			return objectLikeStory._id != req.params.like_id
		});

		await story.updateOne({ $set: { likes: likeStory } });
		res.status(200).json({ success: true });
	} catch (err) {
		res.status(500).send('server error');		
	}
})