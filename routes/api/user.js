const express = require('express');
const router = express.Router();

const storyRouter = require('./story');
router.use('/:userId/story', storyRouter);

module.exports = router;