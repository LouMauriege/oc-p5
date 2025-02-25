export interface User {
	id: number,
	name: string,
    topics: string[],
	email: string,
	createdAt: Date,
	updatedAt: Date
}
