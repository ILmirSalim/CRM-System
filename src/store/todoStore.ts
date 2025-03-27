import { makeAutoObservable } from 'mobx';
import { FilterType, MetaResponse } from '../types';

export class TodoStore {
    filter: FilterType = FilterType.ALL
    isLoading: boolean = false
    metaData: MetaResponse = {
        data: [],
        info: {
            all: 0,
            completed: 0,
            inWork: 0,
        },
        meta: {
            totalAmount: 0,
        },
    }

    constructor() {
        makeAutoObservable(this)
    }

    setFilter = (filter: FilterType) => {
        this.filter = filter
    }

    setIsLoading = (isLoading: boolean) => {
        this.isLoading = isLoading
    }

    setMetaData = (metaData: typeof this.metaData) => {
        this.metaData = metaData
    }
}

