import { FinderRepository } from "src/core/domain/ports/repository/finder.repository";

export class FinderEntityChainResponsability<T> implements FinderRepository<T> {


    constructor(private repositories: FinderRepository<T>[]) {

    }

    async findByName(name: string): Promise<T | null> {
        let entity: T = null
        for (const r of this.repositories) {
            entity = await r.findByName(name);
            if (entity) break
        }
        return entity
    }



}