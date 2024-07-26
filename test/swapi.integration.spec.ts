import { HttpModule, HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import 'reflect-metadata';
import { of } from 'rxjs';
import { Identifier } from 'src/core/domain/base/identifier';
import { SpeciesEntity } from 'src/core/domain/species/species.entity';
import { SpeciesSWAPIFinder } from 'src/infrastructure/integrations/species/species-swapi.finder-repository';

const swapiOutputFactory = (name: string, hasNext: boolean) => ({
    "count": 1,
    "next": hasNext ? "toNextUrl" : null,
    "previous": null,
    "results": [
        {
            "name": name,
            "classification": "mammal",
            "designation": "sentient",
            "average_height": "180",
            "skin_colors": "caucasian, black, asian, hispanic",
            "hair_colors": "blonde, brown, black, red",
            "eye_colors": "brown, blue, green, hazel, grey, amber",
            "average_lifespan": "120",
            "homeworld": "https://swapi.py4e.com/api/planets/9/",
            "language": "Galactic Basic",
            "people": [
                "https://swapi.py4e.com/api/people/88/"
            ],
            "films": [
                "https://swapi.py4e.com/api/films/7/"
            ],
            "created": "2014-12-10T13:52:11.567000Z",
            "edited": "2014-12-20T21:36:42.136000Z",
            "url": "https://swapi.py4e.com/api/species/1/"
        }
    ]
})


describe('SWAPI Integration Test', () => {
    let service: SpeciesSWAPIFinder;

    const mockFinderRepository = {
        findByName: jest.fn()
    }
    const mockHttpService = {
        get: jest.fn()
    }


    beforeEach(async () => {
        const mockModuleBuilder = Test.createTestingModule({
            imports: [HttpModule],
            providers: [SpeciesSWAPIFinder],
        })

        mockModuleBuilder.overrideProvider(HttpService).useValue(mockHttpService)
        const app = await mockModuleBuilder.compile()
        service = app.get<SpeciesSWAPIFinder>(SpeciesSWAPIFinder);
    });

    describe('search SWAPI for species', () => {

        it('should return species entity when its found"', async () => {
            const input = swapiOutputFactory("Cabeza Clava1", true)
            const input2 = swapiOutputFactory("Human", false)
            const output = { "average_height": "180", "average_lifespan": "120", "classification": "mammal", "designation": "sentient", "eye_colors": ["brown", " blue", " green", " hazel", " grey", " amber"], "hair_colors": ["blonde", " brown", " black", " red"], "homeworld": "https://swapi.py4e.com/api/planets/9/", "identifier": {}, "language": "Galactic Basic", "name": "Human", "skin_colors": ["caucasian", " black", " asian", " hispanic"] }
            const expected = Object.assign(new SpeciesEntity, output)
            expected.identifier = new Identifier()
            mockHttpService.get = jest.fn().mockReturnValueOnce(of({ data: input }))
            mockHttpService.get = jest.fn().mockReturnValueOnce(of({ data: input2 }))
            const entity = await service.findByName("Human")
            expect(entity).toEqual(expected)
        });
        it('should return null when theres no species in swapi "', async () => {
            const input1 = swapiOutputFactory("Cabeza Clava1", true)
            const input2 = swapiOutputFactory("Cabeza Clava2", false)
            mockHttpService.get = jest.fn().mockReturnValueOnce(of({ data: input1 }))
            mockHttpService.get = jest.fn().mockReturnValueOnce(of({ data: input2 }))
            const entity = await service.findByName("hello")
            expect(entity).toBe(null)
        });
        /*it.skip('should throw if theres a species whose name is already taken"', async () => {
            const input = {
                "average_height": 2.1,
                "average_lifespan": 400,
                "classification": "Mammal",
                "designation": "Sentient",
                "eye_colors": ["blue", "green", "yellow", "brown", "golden", "red"],
                "hair_colors": ["black", "brown"],
                "homeworld": "https://swapi.py4e.com/api/planets/14/",
                "language": "Shyriiwook",
                "name": "Human3",
                "people": [
                    "https://swapi.py4e.com/api/people/13/"
                ],
                "films": [
                    "https://swapi.py4e.com/api/films/1/",
                    "https://swapi.py4e.com/api/films/2/"
                ],
                "skin_colors": ["gray"],
                "url": "https://swapi.py4e.com/api/species/3/"
            }
            expect.assertions(1)
            mockFinderRepository.findByName = jest.fn().mockResolvedValueOnce(input)
            try {
                await controller.create(input)
            } catch (error) {
                expect(error).toBeInstanceOf(DuplicateSpeciesError)
            }
        });*/
    });
});
