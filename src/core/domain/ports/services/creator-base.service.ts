

export interface CreatorBaseService<T, U> {
    create(input: T): Promise<U>
}

export const FinderBaseService = Symbol('FinderBaseService');
