const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Story = require('../models/Story');
const { advancedModelResults } = require('../utils/modelResults');

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
	const story = await Story.findById(req.params.id);

	if (!story) {
		return next(
			new ErrorResponse(`Story not found with id of ${req.params.id}`, 404)
		);
	}

	res.status(200).json({ success: true, data: story });
});

exports.createStory = asyncHandler(async (req, res, next) => {
	// Add user to req.body
	req.body.user = req.user.id;

	const story = await Story.create(req.body);

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

	story = await Story.findOneAndUpdate(req.params.id, req.body, {
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
	story = await Story.findOneAndDelete(req.params.id);

	res.status(200).json({ success: true, data: {} });
});