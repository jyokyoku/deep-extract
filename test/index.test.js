const extract = require('../index');

const object = {
	'key1': {
		'key1-1': [
			'value1',
			'value2',
		],
		'key1-2': {
			'key1-2-1': 'value3',
			'key1-2-2': 'value4'
		}
	},
	'key2': [
		'value5',
		'value6'
	]
}

const array = [
	[
		'value1-1',
		'value1-2',
	],
	'value3',
]

test('extract from object', () => {
	expect(extract(object, 'key1')).toStrictEqual({
		'key1-1': [
			'value1',
			'value2',
		],
		'key1-2': {
			'key1-2-1': 'value3',
			'key1-2-2': 'value4'
		}
	});
	expect(extract(object, 'key2')).toStrictEqual(['value5', 'value6']);
});

test('extract deep value from object', () => {
	expect(extract(object, 'key1.key1-1.0')).toBe('value1');
	expect(extract(object, 'key1.key1-2.key1-2-1')).toBe('value3');
});

test('specified invalid keys from object', () => {
	expect(extract(object, 'key3')).toBe(undefined);
	expect(extract(object, 'key1.key4')).toBe(undefined);
});

test('extract value from array', () => {
	expect(extract(array, '0')).toStrictEqual(['value1-1', 'value1-2']);
	expect(extract(array, '1')).toBe('value3');
});

test('extract deep value from array', () => {
	expect(extract(array, '0.0')).toBe('value1-1');
	expect(extract(array, '0.1')).toBe('value1-2');
});

test('specified invalid keys from array', () => {
	expect(extract(array, '3')).toBe(undefined);
	expect(extract(array, '0.4')).toBe(undefined);
});

test('change keys separator', () => {
	expect(extract(object, 'key1:key1-1:0', {separator: ':'})).toBe('value1');
	expect(extract(object, 'key1@key1-2@key1-2-1', {separator: '@'})).toBe('value3');
	expect(extract(array, '0=0', {separator: '='})).toBe('value1-1');
	expect(extract(array, '0~1', {separator: '~'})).toBe('value1-2');
});

test('change default return value', () => {
	expect(extract(object, 'key3', {default: null})).toBe(null);
	expect(extract(object, 'key1.key4', {default: 0})).toBe(0);
	expect(extract(array, '3', {default: ''})).toBe('');
	expect(extract(array, '0.4', {default: 'none'})).toBe('none');
});