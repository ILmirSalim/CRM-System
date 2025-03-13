export interface Todo {
    id: number
    title: string
    created: string
    isDone: boolean
}

export interface TodoRequest {
    title?: string
    isDone?: boolean
}

export enum FilterType {
    ALL = 'all',
    IN_WORK = 'inWork',
    COMPLETED = 'completed',
}
