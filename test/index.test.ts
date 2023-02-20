import * as lib from '../src/index';
import * as types from '../src/types';

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
		const elapsedTime = endTime - startTime;
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
	it('should return default pagination object when given invalid parameters', () => {
		const invalidPage = 0;
		const invalidPageSize = 0;
		const expectedPagination: types.PaginationObject = {
			offset: 0,
			limit: 10,
			isPageAndPageSize: false,
		};
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
