import Validator from 'validator';
import isEmpty from './is-empty';

export default function validateStoryInput(data) {
	let errors = {};

	data.title = !isEmpty(data.title) ? data.title : '';
	data.text = !isEmpty(data.text) ? data.text : '';

	if (Validator.isEmpty(data.title)) {
		errors.title = 'Title field is required';
	}

	if (Validator.isEmpty(data.text)) {
		errors.text = 'Text field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
