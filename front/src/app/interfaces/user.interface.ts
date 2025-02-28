export interface User {
	id: number,
	name: string,
    topics: string[],
	email: string,
    password: string,
	createdAt: Date,
	updatedAt: Date
}
