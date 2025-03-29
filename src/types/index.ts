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

export enum TitleLength {
	MAX = 64,
	MIN = 2
}

export interface TodoInfo {
	all: number
	completed: number
	inWork: number
}

export interface MetaResponse {
	data: Todo[]
	info: TodoInfo
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