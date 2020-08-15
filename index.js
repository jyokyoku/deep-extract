module.exports = (object, key, opts = {separator: '.', default: undefined}) => {
	let tmp = Array.isArray(object) ? object.concat() : Object.assign({}, object);

	key.split(opts.separator).some((keyPart) => {
		if (tmp[keyPart] === undefined) {
			tmp = opts.default;
			return true;

		} else {
			tmp = tmp[keyPart];
		}
	});

	return tmp;
}