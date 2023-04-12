import * as lib from '../src/index';
import * as types from '../src/types';
import { ObjectId, BSON } from 'bson';

describe('isNil', () => {
	it('should return false for non-nil inputs', () => {
		expect(lib.isNil(0)).toBe(false);
		expect(lib.isNil('')).toBe(false);
		expect(lib.isNil(false)).toBe(false);
		expect(lib.isNil({})).toBe(false);
		expect(lib.isNil([])).toBe(false);
	});

	it('should return true for nil inputs', () => {
		expect(lib.isNil(undefined)).toBe(true);
		expect(lib.isNil(null)).toBe(true);
	});
});

describe('isEmpty', () => {
	it('should return false for non-empty inputs', () => {
		expect(lib.isEmpty(0)).toBe(false);
		expect(lib.isEmpty('hello')).toBe(false);
		expect(lib.isEmpty([1, 2, 3])).toBe(false);
		expect(lib.isEmpty({ foo: 'bar' })).toBe(false);
		expect(lib.isEmpty(undefined)).toBe(false);
		expect(lib.isEmpty(null)).toBe(false);
	});

	it('should return true for empty inputs', () => {
		expect(lib.isEmpty('')).toBe(true);
		expect(lib.isEmpty([])).toBe(true);
		expect(lib.isEmpty({})).toBe(true);
	});
});

describe('isNotNil', () => {
	it('should return true for non-nil inputs', () => {
		expect(lib.isNotNil(0)).toBe(true);
		expect(lib.isNotNil('')).toBe(true);
		expect(lib.isNotNil(false)).toBe(true);
		expect(lib.isNotNil({})).toBe(true);
		expect(lib.isNotNil([])).toBe(true);
	});

	it('should return false for nil inputs', () => {
		expect(lib.isNotNil(undefined)).toBe(false);
		expect(lib.isNotNil(null)).toBe(false);
	});
});

describe('isNotEmpty', () => {
	it('should return true for non-empty inputs', () => {
		expect(lib.isNotEmpty(0)).toBe(true);
		expect(lib.isNotEmpty('hello')).toBe(true);
		expect(lib.isNotEmpty([1, 2, 3])).toBe(true);
		expect(lib.isNotEmpty({ foo: 'bar' })).toBe(true);
		expect(lib.isNotEmpty(undefined)).toBe(true);
		expect(lib.isNotEmpty(null)).toBe(true);
	});

	it('should return false for empty inputs', () => {
		expect(lib.isNotEmpty('')).toBe(false);
		expect(lib.isNotEmpty([])).toBe(false);
		expect(lib.isNotEmpty({})).toBe(false);
	});
});

describe('isNilOrEmpty', () => {
	it('should return true for null or undefined values', () => {
		expect(lib.isNilOrEmpty(null)).toBe(true);
		expect(lib.isNilOrEmpty(undefined)).toBe(true);
	});

	it('should return true for empty strings, objects and arrays', () => {
		expect(lib.isNilOrEmpty('')).toBe(true);
		expect(lib.isNilOrEmpty([])).toBe(true);
		expect(lib.isNilOrEmpty({})).toBe(true);
	});

	it('should return false for non-empty strings and arrays', () => {
		expect(lib.isNilOrEmpty('hello')).toBe(false);
		expect(lib.isNilOrEmpty([1, 2, 3])).toBe(false);
		expect(lib.isNilOrEmpty({ a: 1 })).toBe(false);
	});

	it('should return false for non-null and non-empty values of other types', () => {
		expect(lib.isNilOrEmpty(0)).toBe(false);
	});
});

describe('isNotNilAndNotEmpty', () => {
	it('should return false for null or undefined values', () => {
		expect(lib.isNotNilAndNotEmpty(null)).toBe(false);
		expect(lib.isNotNilAndNotEmpty(undefined)).toBe(false);
	});

	it('should return false for empty strings, objects and arrays', () => {
		expect(lib.isNotNilAndNotEmpty('')).toBe(false);
		expect(lib.isNotNilAndNotEmpty([])).toBe(false);
		expect(lib.isNotNilAndNotEmpty({})).toBe(false);
	});

	it('should return true for non-empty strings and arrays', () => {
		expect(lib.isNotNilAndNotEmpty('hello')).toBe(true);
		expect(lib.isNotNilAndNotEmpty([1, 2, 3])).toBe(true);
		expect(lib.isNotNilAndNotEmpty({ a: 1 })).toBe(true);
	});

	it('should return true for non-null and non-empty values of other types', () => {
		expect(lib.isNotNilAndNotEmpty(0)).toBe(true);
	});
});

describe('leftPad', () => {
	it('leftPad valid input', () => {
		expect(lib.leftPad('hello', 't', 10)).toEqual('ttttthello');
	});
	it('leftPad invalid input', () => {
		expect(lib.leftPad('hello', 't', 4)).toEqual('hello');
	});
});

describe('token', () => {
	it('randomness check with default parameters', () => {
		expect(lib.token()).not.toEqual(lib.token());
	});
	it('randomness check with defined parameters', () => {
		expect(lib.token(4)).not.toEqual(lib.token(4));
	});
});

describe('randomNumber', () => {
	it('randomness check with default parameters', () => {
		expect(lib.randomNumber()).not.toEqual(lib.randomNumber());
	});
	it('randomness check with defined parameters', () => {
		expect(lib.randomNumber(10)).not.toEqual(lib.randomNumber(10));
	});
});

describe('sleep', () => {
	const delay = 10;
	it(`should delay code execution by atleast ${delay} seconds`, async () => {
		const startTime = new Date().getTime();
		await lib.sleep(delay);
		const endTime = new Date().getTime();
		const elapsedTime = endTime - startTime + 2;
		expect(elapsedTime).toBeGreaterThanOrEqual(delay);
	});
});

describe('parseBoolean', () => {
	it('should return true for truthy string values', () => {
		expect(lib.parseBoolean('true')).toBe(true);
		expect(lib.parseBoolean('True')).toBe(true);
		expect(lib.parseBoolean('   true   ')).toBe(true);
		expect(lib.parseBoolean('   TRUE   ')).toBe(true);
	});

	it('should return false for falsy string values', () => {
		expect(lib.parseBoolean('false')).toBe(false);
		expect(lib.parseBoolean('False')).toBe(false);
		expect(lib.parseBoolean('   false   ')).toBe(false);
		expect(lib.parseBoolean('   FALSE   ')).toBe(false);
		expect(lib.parseBoolean('   TRUETH   ')).toBe(false);
	});
	it('should return false for null or undefined', () => {
		expect(lib.parseBoolean(null)).toBe(false);
		expect(lib.parseBoolean(undefined)).toBe(false);
	});

	it('should return the original boolean value for boolean input', () => {
		expect(lib.parseBoolean(true)).toBe(true);
		expect(lib.parseBoolean(false)).toBe(false);
	});

	it('should return false for unknown input', () => {
		expect(lib.parseBoolean('abc')).toBe(false);
		// @ts-ignore-next-line
		expect(lib.parseBoolean(123)).toBe(false);
		// @ts-ignore-next-line
		expect(lib.parseBoolean({})).toBe(false);
		// @ts-ignore-next-line
		expect(lib.parseBoolean([])).toBe(false);
	});
});

describe('fieldsListToMongoProjection', () => {
	it('should return an empty object when given an empty array', () => {
		expect(lib.fieldsListToMongoProjection([])).toEqual({});
	});

	it('should return an object with all fields set to 1', () => {
		const fieldsList = ['field1', 'field2', 'field3'];
		const expectedProjection: types.MongoProjectionObject = {
			field1: 1,
			field2: 1,
			field3: 1,
		};
		expect(lib.fieldsListToMongoProjection(fieldsList)).toEqual(
			expectedProjection
		);
	});
});

describe('getPagination', () => {
	it('should return default valid pagination object when given no parameters', () => {
		const expectedPagination: types.PaginationObject = {
			offset: 0,
			limit: 10,
			isPageAndPageSize: true,
		};
		// @ts-ignore-next-line
		expect(lib.getPagination()).toEqual(expectedPagination);
	});

	it('should return default invalid pagination object when given invalid parameters', () => {
		const invalidPage = 'invalidPage';
		const invalidPageSize = 'invalidPageSize';
		const expectedPagination: types.PaginationObject = {
			offset: 0,
			limit: 10,
			isPageAndPageSize: false,
		};
		// @ts-ignore-next-line
		expect(lib.getPagination(invalidPage, invalidPageSize)).toEqual(
			expectedPagination
		);
	});

	it('should return pagination object with correct offset and limit', () => {
		const page = 3;
		const pageSize = 10;
		const expectedPagination: types.PaginationObject = {
			offset: 20,
			limit: 10,
			isPageAndPageSize: true,
		};
		expect(lib.getPagination(page, pageSize)).toEqual(expectedPagination);
	});
});

describe('isValidMongoObjectId', () => {
	it('should return true for valid ObjectIds', () => {
		expect(lib.isValidMongoObjectId(new ObjectId())).toBe(true);
		expect(lib.isValidMongoObjectId('507f1f77bcf86cd799439011')).toBe(true);
	});

	it('should return true for valid number ', () => {
		expect(lib.isValidMongoObjectId(123123123123)).toBe(true);
	});

	it('should return false for invalid ObjectIds', () => {
		expect(lib.isValidMongoObjectId('invalidObjectId')).toBe(false);
		expect(lib.isValidMongoObjectId('')).toBe(false);
		// @ts-ignore-next-line
		expect(lib.isValidMongoObjectId(null)).toBe(false);
		// @ts-ignore-next-line
		expect(lib.isValidMongoObjectId(undefined)).toBe(false);
	});
});

describe('convertToMongoObjectId', () => {
	it('should return an ObjectId when a valid string is provided', () => {
		const objectId = new ObjectId();
		const objectIdString = objectId.toHexString();
		expect(lib.convertToMongoObjectId(objectId)).toEqual(objectId);
		expect(lib.convertToMongoObjectId(objectIdString)).toEqual(objectId);
	});

	it('should throw a BSONError when an invalid string is provided', () => {
		expect(() => lib.convertToMongoObjectId('invalidObjectId')).toThrow(
			BSON.BSONError
		);
	});

	it('should return new ObjectId when null, undefined or empty object is provided', () => {
		expect(() =>
			// @ts-ignore-next-line
			lib.isValidMongoObjectId(lib.convertToMongoObjectId(null))
		).toBeTruthy();
		expect(() =>
			// @ts-ignore-next-line
			lib.isValidMongoObjectId(lib.convertToMongoObjectId(undefined))
		).toBeTruthy();
		expect(() =>
			// @ts-ignore-next-line
			lib.isValidMongoObjectId(lib.convertToMongoObjectId({}))
		).toBeTruthy();
	});
});

describe('numberToIndianWords', () => {
	it('should convert a number to capitalized indian words string', () => {
		expect(lib.numberToIndianWords(0)).toBe('Zero');
		expect(lib.numberToIndianWords(1)).toBe('One');
		expect(lib.numberToIndianWords(9)).toBe('Nine');
		expect(lib.numberToIndianWords(10)).toBe('Ten');
		expect(lib.numberToIndianWords(11)).toBe('Eleven');
		expect(lib.numberToIndianWords(19)).toBe('Nineteen');
		expect(lib.numberToIndianWords(20)).toBe('Twenty');
		expect(lib.numberToIndianWords(21)).toBe('Twenty-one');
		expect(lib.numberToIndianWords(99)).toBe('Ninety-nine');
		expect(lib.numberToIndianWords(100)).toBe('One hundred');
		expect(lib.numberToIndianWords(101)).toBe('One hundred and one');
		expect(lib.numberToIndianWords(348)).toBe(
			'Three hundred and forty-eight'
		);
		expect(lib.numberToIndianWords(1000)).toBe('One thousand');
		expect(lib.numberToIndianWords(1348)).toBe(
			'One thousand three hundred and forty-eight'
		);
		expect(lib.numberToIndianWords(10000)).toBe('Ten thousand');
		expect(lib.numberToIndianWords(10348)).toBe(
			'Ten thousand three hundred and forty-eight'
		);
	});

	it('should convert a valid number string to capitalized indian words string', () => {
		expect(lib.numberToIndianWords('20')).toBe('Twenty');
		expect(lib.numberToIndianWords('21')).toBe('Twenty-one');
		expect(lib.numberToIndianWords('1000')).toBe('One thousand');
		expect(lib.numberToIndianWords('1348')).toBe(
			'One thousand three hundred and forty-eight'
		);
		expect(lib.numberToIndianWords('10000')).toBe('Ten thousand');
		expect(lib.numberToIndianWords('10348')).toBe(
			'Ten thousand three hundred and forty-eight'
		);
	});

	it('should return empty string when an invalid input is provided', () => {
		expect(lib.numberToIndianWords('invalid')).toBe('');
	});

	it('should return empty string when null or undefined is provided', () => {
		// @ts-ignore-next-line
		expect(lib.numberToIndianWords(null)).toBe('');
		// @ts-ignore-next-line
		expect(lib.numberToIndianWords(undefined)).toBe('');
		// @ts-ignore-next-line
		expect(lib.numberToIndianWords({})).toBe('');
	});
});

describe('formatIndianPhoneNumber', () => {
	it('should format the phone number to E.164 format', () => {
		expect(lib.formatIndianPhoneNumber('1234567890')).toBe('+911234567890');
		expect(lib.formatIndianPhoneNumber('+911234567890')).toBe(
			'+911234567890'
		);
		expect(lib.formatIndianPhoneNumber(1234567890)).toBe('+911234567890');
		expect(lib.formatIndianPhoneNumber('91-12345-67890')).toBe(
			'+911234567890'
		);
		expect(lib.formatIndianPhoneNumber('+91-12345-67890')).toBe(
			'+911234567890'
		);
	});

	it('should throw an error when an invalid input is provided', () => {
		expect(() =>
			lib.formatIndianPhoneNumber('notaphonenumber')
		).toThrowError();
		expect(() =>
			// @ts-ignore-next-line
			lib.formatIndianPhoneNumber(null)
		).toThrowError();
		expect(() =>
			// @ts-ignore-next-line
			lib.formatIndianPhoneNumber(undefined)
		).toThrowError();
		expect(() =>
			// @ts-ignore-next-line
			lib.formatIndianPhoneNumber('123456789')
		).toThrowError();
	});
});
