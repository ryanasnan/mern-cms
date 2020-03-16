exports.advancedModelResults = async (model, req, filter = {}, populate = {}) => {
	let query;

	query = model.find(filter);

	// Select Fields
	if (req.query.select) {
		const fields = req.query.select.split(',').join(' ');
		query = query.select(fields);
	}

	// Sort
	if (req.query.sort) {
		const sortBy = req.query.sort.split(',').join(' ');
		query = query.sort(sortBy);
	} else {
		query = query.sort('-createdAt');
	}

	// Pagination
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 25;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	// to get total document with filter(find)
	const countTotalDocuments = await model.find(filter).countDocuments(function (err, count) {
		// statement to manipulate the count (optional)
	});

	query = query.skip(startIndex).limit(limit);

	if (populate) {
		query = query.populate(populate);
	}

	// Executing query
	const results = await query;

	// Pagination result
	const pagination = {};
	if (endIndex < countTotalDocuments) {
		pagination.next = {
			page: page + 1,
			limit
		};
	}

	pagination.currentPage = {
		page,
		limit
	};

	if (startIndex > 0) {
		pagination.prev = {
			page: page - 1,
			limit
		};
	}

	return {
		success: true,
		count: results.length,
		totalDocument: countTotalDocuments,
		pagination,
		results
	};
};

exports.totalCommentsAndReplies = (comments) => {
	let totalReplies = 0;
	for (let indexCommentStory = 0; indexCommentStory < comments.length; indexCommentStory++) {
		for (let indexReplyComment = 0; indexReplyComment < comments[indexCommentStory].reply.length; indexReplyComment++) {
			totalReplies = totalReplies + 1;
		}
	}
	let totalCommentsAndReplies = totalReplies + comments.length;

	return totalCommentsAndReplies;
}