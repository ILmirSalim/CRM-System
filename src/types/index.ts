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

export interface MetaResponse<Todo, TodoInfo> {
	data: Todo[]
	info: TodoInfo
	meta: {
		totalAmount: number
	}
}