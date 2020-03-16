export const jpgDemoImg = (name) => require(`../img/demo/${name}.jpg`);

export const jpegDemoImg = (name) => require(`../img/demo/${name}.jpeg`);

export const isObjectExist = (obj) => typeof obj !== 'undefined' ? true : false

export const isObjectEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

// parameter convention doesnt allow to use empty object and javascript type data null is object too
export const isNullOrEmptyObject = (val) => {
	let res = true;
	if (val !== null) {
		res = (Object.keys(val).length === 0 && val.constructor === Object)
	}
	return res;
}

export const serializeObjToQueryString = (obj) => Object.keys(obj).map(key => key + '=' + obj[key]).join('&');

export const removeTagHtml = (string) => {
	let regex = /(<([^>]+)>)/ig;
	let result = string.replace(regex, "");
	return result;
}

export const preventDuplicateSameObjectDocumentId = (initialarray, newArray) => {
	return Object.values([...initialarray, ...newArray].reduce((acc, item) => {
		if (typeof acc[item.term] === 'undefined') {
			// set default value for each term as 0
			acc[item._id] = item;
		} else {
			// add to total count of each term
			acc[item._id].count += item.count;

			// potentially add logic to handle changing "selected" too...
		}

		return acc;
	}, {}))
}

export const arrayPaginator = (items, page, limit) => {
	var page = page || 1,
		limit = limit || 3
	let	offset = (page - 1) * limit,

		paginatedItems = items.slice(offset).slice(0, limit),
		totalPages = Math.ceil(items.length / limit);
		return {
		page: page,
		limit: limit,
		previousPage: page - 1 ? page - 1 : null,
		nextPage: (totalPages > page) ? page + 1 : null,
		total: items.length,
		totalPages: totalPages,
		data: paginatedItems
	};
};