import { FinderRepository } from "src/core/domain/ports/repository/finder.repository";

export class FinderEntityLink<T> implements FinderRepository<T> {

    private next: FinderEntityLink<T>

    constructor(private repository: FinderRepository<T>, private isExternal: boolean) {

    }
    async findByName(name: string): Promise<T> {

        let entity: T = await this.repository.findByName(name)
        if (entity) return entity
        if (this.next) {
            return this.next.findByName(name)
        } else {
            return null
        }
    }

    setNext(repository: FinderEntityLink<T>) {
        this.next = repository
    }


}