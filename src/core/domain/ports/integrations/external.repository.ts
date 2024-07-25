
export interface ExternalRepository<T> {

    findByName(name: string): Promise<T | null>
}

export const ExternalRepository = Symbol('ExternalRepository');