import * as crypto from 'crypto';
import * as util from 'util';
import * as types from './types';
const { isNil, isEmpty } = require('rambda');

/**
 * Returns whether input is nil OR empty
 */
export const isNilOrEmpty = <T>(x: T): boolean => {
	return isNil(x) || isEmpty(x);
};

/**
 * Returns whether input is not nil AND not empty
 */
export const isNotNilAndNotEmpty = <T>(x: T): boolean => {
	return !isNil(x) && !isEmpty(x);
};

/**
 * Left pad string
 * @param str String to pad
 * @param char Character for padding
 * @param len Length of final string, should be greater than string length
 * @returns paddedString
 */
export const leftPad = (str: string, char: string, len: number): string => {
	if (len < str.length) {
		return str;
	}
	return char.repeat(len - str.length) + str;
};

/**
 * Generate a string with random characters of a given length
 */
export const token = (length: number = 10): string => {
	return crypto
		.randomUUID()
		.split('-')
		.join('')
		.slice(0, length)
		.toLowerCase();
};

/**
 * Generating a random number of a given length.
 */
export const randomNumber = (len: number = 4): number => {
	const minValue = 10 ** (len - 1);
	const maxValue = 10 ** len - 1;
	return Math.floor(minValue + Math.random() * (maxValue - minValue));
};

/**
 * Delay your code execution in milliseconds
 */
export const sleep = util.promisify(setTimeout);

/**
 * Convert truthy string to boolean
 */
export const parseBoolean = (val: string | null | undefined): boolean => {
	if (val === null || val === undefined) {
		return false;
	}
	const regex = new RegExp(/^true$/);
	return regex.test(val.toLowerCase().trim());
};

/**
 * Convert fields string array to a mongo projection object
 * @param fieldsList A list of fields in a mongo record
 * @returns projection object
 */
export const fieldsListToMongoProjection = (
	fieldsList: string[]
): types.MongoProjectionObject => {
	return fieldsList.reduce((projectionObject, item) => {
		return { ...projectionObject, [item]: 1 };
	}, {});
};

/**
 * Get pagination object for your list apis
 * @param page Current page cursor
 * @param pageSize
 * @returns
 */
export const getPagination = (
	page: number = 1,
	pageSize: number = 10
): types.PaginationObject => {
	const validPage = Math.floor(page);
	const validPageSize = Math.floor(pageSize);
	if (!validPage || !validPageSize) {
		return {
			offset: 0,
			limit: 10,
			isPageAndPageSize: false,
		};
	}
	const offset = (validPage - 1) * validPageSize;
	const limit = validPageSize;
	return {
		offset: offset,
		limit: limit,
		isPageAndPageSize: true,
	};
};
