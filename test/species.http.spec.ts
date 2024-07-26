import { Test } from '@nestjs/testing';
import 'reflect-metadata';
import { CreateSpeciesServices } from 'src/core/application/create-species/create-species.service';
import { FinderSpeciesModule } from 'src/core/application/finder-species/finder-species.module';
import { FinderSpeciesService } from 'src/core/application/finder-species/finder-species.services';
import { ItalianDictionary } from 'src/core/domain/dictionaries/italian.dictionary';
import { SpanishDictionary } from 'src/core/domain/dictionaries/spanish.dictionary';
import { FinderRepository } from 'src/core/domain/ports/repository/finder.repository';
import { WritingRepository } from 'src/core/domain/ports/repository/writing.repository';
import { SpeciesEntity } from 'src/core/domain/species/species.entity';
import { FindSpeciesController } from 'src/infrastructure/http/species/find-species/find-species.controller';

describe('Species Controller', () => {
  let controller: FindSpeciesController;
  let finderRepository: FinderRepository<SpeciesEntity>
  let creationRepository: WritingRepository<SpeciesEntity>

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
      providers: [
        {
          provide: FinderRepository,
          useValue: mockFinderRepository
        },
        {
          provide: WritingRepository,
          useValue: mockWritingRepository
        },
      ]

    })
    mockModuleBuilder.overrideProvider(FinderSpeciesService).useFactory({
      factory(finderRepository) {
        return new FinderSpeciesService([new SpanishDictionary(), new ItalianDictionary()], finderRepository)
      },
      inject: [FinderRepository]

    })
    mockModuleBuilder.overrideProvider(CreateSpeciesServices).useFactory({
      factory(finderRepository, creationRepository) {
        return new CreateSpeciesServices(finderRepository, creationRepository)

      },
      inject: [FinderRepository, WritingRepository]
    })
    const app = await mockModuleBuilder.compile()

    creationRepository = app.get<WritingRepository<SpeciesEntity>>(WritingRepository);
    finderRepository = app.get<FinderRepository<SpeciesEntity>>(FinderRepository)
    controller = app.get<FindSpeciesController>(FindSpeciesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const entity = Object.assign(new SpeciesEntity, {
        "average_height": "2.1",
        "average_lifespan": "400",
        "classification": "Mammal",
        "created": "2014-12-10T16:44:31.486000Z",
        "designation": "Sentient",
        "edited": "2014-12-10T16:44:31.486000Z",
        "eye_colors": "blue, green, yellow, brown, golden, red",
        "hair_colors": "black, brown",
        "homeworld": "https://swapi.py4e.com/api/planets/14/",
        "language": "Shyriiwook",
        "name": "Wookie",
        "skin_colors": "gray",
        "url": "https://swapi.py4e.com/api/species/3/"
      })
      finderRepository.findByName = jest.fn().mockResolvedValueOnce(entity
      )
      const resp = await controller.findByName("name", "es")
      expect(resp).toEqual({});
    });
  });
});
