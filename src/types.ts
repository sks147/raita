export interface MongoProjectionObject {
	[key: string]: 1;
}
export interface PaginationObject {
	offset: number;
	limit: number;
	isPageAndPageSize: boolean;
}

export type ReturnBoolean = <T>(x: T) => boolean;
