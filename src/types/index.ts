export interface Todo {
	id: number
	title: string
	created: string
	isDone: boolean
}

export type TodoRequest = Partial<Todo>

export enum FilterType {
	ALL = 'all',
	IN_WORK = 'inWork',
	COMPLETED = 'completed',
}

export interface TodoInfo {
	all: number
	completed: number
	inWork: number
}

export interface MetaResponse<T, N> {
	data: T[]
	info: N
	meta: {
		totalAmount: number
	}
}

export interface UserRegistration {
	login: string;
	username: string;
	password: string;
	email: string;
	phoneNumber: string;
}

export interface AuthData {
	login: string;
	password: string;
}

export interface Token {
	access: string
	refresh: string
}