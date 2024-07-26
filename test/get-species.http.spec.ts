import { Test } from '@nestjs/testing';
import 'reflect-metadata';
import { FinderSpeciesModule } from 'src/core/application/finder-species/finder-species.module';
import { FinderSpeciesService } from 'src/core/application/finder-species/finder-species.services';
import { FinderEntityLink } from 'src/core/application/helpers/finder-entity-chain/finder-entity.director';
import { ItalianDictionary } from 'src/core/domain/dictionaries/italian.dictionary';
import { SpanishDictionary } from 'src/core/domain/dictionaries/spanish.dictionary';
import { SpeciesNotFoundError } from 'src/core/domain/errors/species/species-not-found.error';
import { SpeciesEntity } from 'src/core/domain/species/species.entity';
import { FindSpeciesController } from 'src/infrastructure/http/species/find-species/find-species.controller';

describe('Get Species Controller', () => {
  let controller: FindSpeciesController;
  let finderRepository: FinderEntityLink<SpeciesEntity>

  const mockFinderRepository = {
    findByName: jest.fn()
  }
  const mockWritingRepository = {
    create: jest.fn()
  }


  beforeEach(async () => {
    const mockModuleBuilder = Test.createTestingModule({
      imports: [FinderSpeciesModule],
      controllers: [FindSpeciesController],
      providers: []

    })

    mockModuleBuilder.overrideProvider(FinderEntityLink).useValue(mockFinderRepository)
    mockModuleBuilder.overrideProvider(FinderSpeciesService).useFactory({
      factory(finderRepository) {
        return new FinderSpeciesService([new SpanishDictionary(), new ItalianDictionary()], finderRepository)
      },
      inject: [FinderEntityLink]

    })
    const app = await mockModuleBuilder.compile()

    finderRepository = app.get<FinderEntityLink<SpeciesEntity>>(FinderEntityLink)
    controller = app.get<FindSpeciesController>(FindSpeciesController);
  });

  describe('Get species', () => {
    it('should return spanish translation of the incoming request"', async () => {
      const entity = Object.assign(new SpeciesEntity, {
        "average_height": "2.1",
        "average_lifespan": "400",
        "classification": "Mammal",
        "created": "2014-12-10T16:44:31.486000Z",
        "designation": "Sentient",
        "edited": "2014-12-10T16:44:31.486000Z",
        "eye_colors": ["blue", "green", "yellow", "brown", "golden", "red"],
        "hair_colors": ["black", "brown"],
        "homeworld": "https://swapi.py4e.com/api/planets/14/",
        "language": "Shyriiwook",
        "name": "Wookie",
        "skin_colors": ["gray"],
        "url": "https://swapi.py4e.com/api/species/3/"
      })
      finderRepository.findByName = jest.fn().mockResolvedValueOnce(entity
      )
      const resp = await controller.findByName("name", "es")
      expect(resp).toEqual({
        altura_promedio: '2.1',
        tiempo_vida_estimado: '400',
        clasificacion: 'Mammal',
        designacion: 'Sentient',
        color_ojos: ["blue", "green", "yellow", "brown", "golden", "red"],
        color_pelo: ["black", "brown"],
        planeta_origen: 'https://swapi.py4e.com/api/planets/14/',
        lenguaje: 'Shyriiwook',
        nombre: 'Wookie',
        color_piel: ["gray"]
      }
      );
    });
    it('should throw resource not found"', async () => {
      expect.assertions(1)
      finderRepository.findByName = jest.fn().mockResolvedValueOnce(null)
      try {
        await controller.findByName("name", "es")
      } catch (error) {
        expect(error).toBeInstanceOf(SpeciesNotFoundError)
      }
    });
  });
});
