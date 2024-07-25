export interface FinderRepository<T> {
    findByName(name: string): Promise<T | null>
}

export const FinderRepository = Symbol('FinderRepository');
