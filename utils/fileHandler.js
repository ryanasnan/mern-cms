const ErrorResponse = require('./errorResponse');

/* No need to be return, if the file processing fail, will return on middleware error response */

exports.validateSingleImageFile = (file, nextHandlerMiddleware) => {
	// Make sure the image is a photo
	if (!file.mimetype.startsWith('image')) {
		throw nextHandlerMiddleware(new ErrorResponse(`Please upload an image file`, 400));
	}

	// Check filesize
	if (file.size > process.env.MAX_FILE_UPLOAD) {
		throw nextHandlerMiddleware(
			new ErrorResponse(
				`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
				400
			)
		);
	}
}

exports.uploadSingleFile = (objFile, filePath, nextHandlerMiddleware) => {
	objFile.mv(filePath, async err => {
		if (err) {
			throw nextHandlerMiddleware(new ErrorResponse(`Problem with file upload`, 500));
		}
	});
}