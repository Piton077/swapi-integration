

export interface CreatorBaseService<T> {
    create(input: T): Promise<void>
}

export const FinderBaseService = Symbol('FinderBaseService');
