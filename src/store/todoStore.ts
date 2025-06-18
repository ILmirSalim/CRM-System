import { makeAutoObservable } from 'mobx';
import { FilterType, MetaResponse, Todo, TodoInfo } from '../types';
import { fetchFilteredTodos } from '../api';

export class TodoStore {
    filter: FilterType = FilterType.ALL
    isLoading: boolean = false
    todos: Todo[]= []
    todoInfo: TodoInfo = {
        all: 0,
        completed: 0,
        inWork: 0
    }

    // metaData: MetaResponse = {
    //     data: [],
    //     info: {
    //         all: 0,
    //         completed: 0,
    //         inWork: 0,
    //     },
    //     meta: {
    //         totalAmount: 0,
    //     },
    // }

    constructor() {
        makeAutoObservable(this)
    }

    setFilter = (filter: FilterType) => {
        this.filter = filter
    }

    setIsLoading = (isLoading: boolean) => {
        this.isLoading = isLoading
    }

    // setMetaData = (metaData: typeof this.metaData) => {
    //     this.metaData = metaData
    // }

    setTodos = (todos: Todo[]) => {
        this.todos = todos;
    }

    setTodoInfo = (todoInfo: TodoInfo) => {
        this.todoInfo = todoInfo;
    }

    loadFilteredTodos = async () => {
        this.setIsLoading(true);
        try {
            const data = await fetchFilteredTodos(this.filter);
            this.setTodos(data.data);
            this.setTodoInfo(data.info);
        } catch (error) {
            console.log('Failed to load todos:', error);
            throw error;
        } finally {
            this.setIsLoading(false);
        }
    }
}

