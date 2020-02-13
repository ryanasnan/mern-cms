const express = require('express');
const router = express.Router({ mergeParams: true });
const {
	getStories,
	getStory,
	getStoryBySlug,
	createStory,
	updateStory,
	deleteStory,
	commentStory,
	replyComment,
	getCommentByStory,
	deleteComment,
	deleteReply
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

router
	.route('/:id/comment')
	.get(authWithPassport, getCommentByStory)
	.put(authWithPassport, commentStory);

router
	.route('/:id/comment/:comment_id')
	.delete(authWithPassport, deleteComment);

router
	.route('/:id/comment/:comment_id/reply')
	.put(authWithPassport, replyComment);

router
	.route('/:id/comment/:comment_id/reply/:reply_id')
	.delete(authWithPassport, deleteReply);

module.exports = router;