export interface CreationRepository<T> {
    create(entity: T): Promise<T>
}

export const CreationRepository = Symbol('CreationRepository');
