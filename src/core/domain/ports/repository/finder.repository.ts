export interface FinderRepository<T = any> {
    findByName(name: string): Promise<T | null>
}

export const FinderRepository = Symbol('FinderRepository');
