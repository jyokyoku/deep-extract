# deep-extract
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Extracts values from a deep hierarchy of objects.

## Installation

Use NPM:
```shell-script
$ npm i deep-extract
```

Use Yarn:
```shell-script
$ yarn add deep-extract
```

## Usage

```js
import extract from 'deep-extract';

const object = {
	'key1': {
		'key1-1': {
			'key1-1-1': 'value1',
			'key1-1-2': 'value2',
		},
		'key1-2': [
			'value3',
			'value4'
		]
	},
}

extract(object, 'key1.key-1-1');
// -> { 'key1-1-1: 'value1', 'key1-1-2': 'value2' }

extract(object, 'key1.key1-2.0');
// -> value3

extract(object, 'key2');
// -> undefined

extract(object, 'key1@key-1-1@key1-1-1', {separator: '@'});
// -> value1

extract(object, 'key2', {default: []);
// -> []
```