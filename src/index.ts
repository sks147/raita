import * as crypto from 'crypto';
import * as types from './types';
import * as util from 'util';
import { ObjectId, BSON } from 'bson';

import * as constants from './constants';
import { phone } from 'phone';
const _isNil = require('@ramda/isnil');
const _isEmpty = require('@ramda/isempty');
const writtenNumber = require('written-number');

/**
 * It returns `true` if `x` is either `null` or `undefined`.
 */
export const isNil: types.ReturnBoolean = _isNil;

/**
 * It returns `true` if `x` is `empty`.
 */
export const isEmpty: types.ReturnBoolean = _isEmpty;

/**
 * It returns `true` if `x` is NOT `null` or `undefined`.
 */
export const isNotNil: types.ReturnBoolean = (x) => !isNil(x);

/**
 * It returns `true` if `x` is NOT `empty`.
 */
export const isNotEmpty: types.ReturnBoolean = (x) => !isEmpty(x);

/**
 * It returns `true` if `x` is `null` or `undefined` or `empty`.
 */
export const isNilOrEmpty: types.ReturnBoolean = (x) => {
	return isNil(x) || isEmpty(x);
};

/**
 * It returns `true` if `x` is NOT `null`, `undefined` and `empty`.
 */
export const isNotNilAndNotEmpty: types.ReturnBoolean = (x) => {
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
 * @example
 * token(10)
 * // returns 'a2377377c2'
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
 * @example
 * fieldsListToMongoProjection(['field1','field2','field3'])
 * // returns { field1: 1, field2: 1, field3: 1 }
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

/**
 * Returns whether input is a valid mongo ObjectId
 */
export const isValidMongoObjectId = (x: string | number | ObjectId): boolean =>
	ObjectId.isValid(x);

/**
 * Convert input to mongo ObjectId
 * @throws BSONError or BSONTypeError if input is invalid ObjectId
 */
export const convertToMongoObjectId = (
	x: string | ObjectId
): ObjectId | BSON.BSONError => new ObjectId(x);

/**
 * Converts a number to Capitalized indian words string
 * @example
 * numberToWords("10348")
 * // returns 'Ten thousand three hundred and forty-eight'
 * numberToWords("invalidNumber")
 * // returns ''
 */
export const numberToIndianWords = (x: number | string): string => {
	if (x === null || x === undefined) {
		return '';
	}
	const str = writtenNumber(x, { lang: 'enIndian' });
	return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};

/**
 * Converts an Indian phone number to E164 format
 * @example
 * formatIndianPhoneNumber("1234567890")
 * // returns '+911234567890'
 * formatIndianPhoneNumber("91-12345-67890")
 * // returns '+911234567890'
 */
export const formatIndianPhoneNumber = (
	phoneNumber: string | number
): string => {
	if (isNilOrEmpty(phoneNumber)) {
		throw Error('Invalid Phone Number');
	}
	if (phoneNumber.toString().length < 10) {
		throw Error('Invalid Phone Number');
	}
	const pVal = phone(phoneNumber.toString(), {
		country: constants.CountryCode.INDIA,
		validateMobilePrefix: false,
		strictDetection: false,
	});
	if (!pVal.isValid) {
		throw Error('Invalid Phone Number');
	}
	return pVal.phoneNumber;
};
