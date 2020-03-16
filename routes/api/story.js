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
	deleteReply,
	getLikesByStory,
	likeStory,
	unlikeStory
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
	.get(getCommentByStory)
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

router
	.route('/:id/like')
	.get(getLikesByStory)
	.post(authWithPassport, likeStory);

router
	.route('/:id/unlike/:like_id')
	.delete(authWithPassport, unlikeStory)

module.exports = router;