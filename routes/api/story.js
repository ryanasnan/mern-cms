const express = require('express');
const router = express.Router({ mergeParams: true });
const {
	getStories,
	getStory,
	getStoryBySlug,
	createStory,
	updateStory,
	deleteStory
} = require('../../controllers/story');

const { authWithPassport } = require('../../middlewares/auth');

router
	.route('/')
	.get(getStories)
	.post(authWithPassport, createStory);

router
	.route('/:id')
	.get(getStory)
	.put(authWithPassport, updateStory)
	.delete(authWithPassport, deleteStory);

router
	.route('/slug/:slug')
	.get(getStoryBySlug);

module.exports = router;