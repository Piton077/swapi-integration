export interface WritingRepository<T> {
    create(entity: T): Promise<T>
}

export const WritingRepository = Symbol('WritingRepository');
