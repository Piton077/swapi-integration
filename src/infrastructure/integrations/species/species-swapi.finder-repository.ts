import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { firstValueFrom } from "rxjs";
import { FinderRepository } from "src/core/domain/ports/repository/finder.repository";
import { SpeciesEntity } from "src/core/domain/species/species.entity";
import { SWAPIOutputDto, SWAPISpeciesDTO } from "./dto/output/swapi.output.dto";

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
                this.httpService.get(`${next}`),
            );
            retrievedEntity = data2.results.find(v => v.name === name)
            next = data2.next
        }
        if (retrievedEntity) {

            return this.mapToEntity(retrievedEntity);
        }
        return null
    }

    mapToEntity(swapiResp: SWAPISpeciesDTO) {
        const entity = new SpeciesEntity()
        entity.average_height = swapiResp.average_height
        entity.average_lifespan = swapiResp.average_lifespan
        entity.classification = swapiResp.classification
        entity.created = swapiResp.created
        entity.designation = swapiResp.designation
        entity.edited = swapiResp.edited
        entity.eye_colors = swapiResp.eye_colors == 'none' ? [] : swapiResp.eye_colors.split(",")
        entity.hair_colors = swapiResp.hair_colors == 'none' ? [] : swapiResp.hair_colors.split(",")
        entity.homeworld = swapiResp.homeworld
        entity.language = swapiResp.language
        entity.name = swapiResp.name
        entity.skin_colors = swapiResp.skin_colors == 'none' ? [] : swapiResp.skin_colors.split(",")
        return entity
    }

}