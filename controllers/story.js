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