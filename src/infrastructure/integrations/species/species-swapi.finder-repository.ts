import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { firstValueFrom } from "rxjs";
import { FinderRepository } from "src/core/domain/ports/repository/finder.repository";
import { SpeciesEntity } from "src/core/domain/species/species.entity";
import { SWAPIOutputDto } from "./dto/output/swapi.output.dto";

@Injectable()
export class SpeciesSWAPIFinder implements FinderRepository<SpeciesEntity> {

    constructor(private httpService: HttpService) { }


    async findByName(name: string): Promise<SpeciesEntity> {
        const { data } = await firstValueFrom<AxiosResponse<SWAPIOutputDto>>(
            this.httpService.get(`${process.env.SWAPI_API_URL}/species`),
        );
        let next = data.next
        let retrievedEntity = data.results.find((v) => name === v.name)
        while (!retrievedEntity && next) {
            const { data: data2 } = await firstValueFrom<AxiosResponse<SWAPIOutputDto>>(
                this.httpService.get(`${data.next}`),
            );
            retrievedEntity = data2.results.find(v => v.name === name)
            next = data2.next
        }
        if (retrievedEntity) {
            return Object.assign(new SpeciesEntity, retrievedEntity)
        }
        return null
    }

}