

export interface FinderBaseService<T> {
    findByName(name: string, language: string): Promise<T>
}

export const FinderBaseService = Symbol('FinderBaseService');
